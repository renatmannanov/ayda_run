from fastapi import APIRouter, HTTPException, Body, Depends
from backend.models_user import User, UserCreate, UserUpdate
from backend.database import get_database
from motor.motor_asyncio import AsyncIOMotorDatabase

router = APIRouter()

@router.post("/users", response_model=User)
async def create_or_update_user(user: UserCreate, db: AsyncIOMotorDatabase = Depends(get_database)):
    user_dict = user.dict()
    
    # Upsert user based on user_tg_id
    result = await db["users"].find_one_and_update(
        {"user_tg_id": user.user_tg_id},
        {"$set": user_dict},
        upsert=True,
        return_document=True
    )
    
    # Convert _id to string
    result["_id"] = str(result["_id"])
    return result

@router.get("/users/{user_tg_id}", response_model=User)
async def get_user(user_tg_id: int, db: AsyncIOMotorDatabase = Depends(get_database)):
    user = await db["users"].find_one({"user_tg_id": user_tg_id})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    user["_id"] = str(user["_id"])
    return user
