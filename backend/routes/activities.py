from fastapi import APIRouter, HTTPException, Depends, UploadFile, File
from backend.models_activity import Activity, ActivityCreate
from backend.database import get_database
from motor.motor_asyncio import AsyncIOMotorDatabase
from typing import Optional

router = APIRouter()

@router.post("/activities", response_model=Activity)
async def create_activity(activity: ActivityCreate, db: AsyncIOMotorDatabase = Depends(get_database)):
    activity_dict = activity.dict()
    
    # TODO: If strava_activity_link is present, we might want to fetch details here if not provided
    # For now, we assume the frontend or a previous step sends the populated data
    
    result = await db["activities"].insert_one(activity_dict)
    
    created_activity = await db["activities"].find_one({"_id": result.inserted_id})
    created_activity["_id"] = str(created_activity["_id"])
    
    return created_activity

@router.post("/activities/upload_gpx")
async def upload_gpx(file: UploadFile = File(...)):
    # TODO: Save file to disk or cloud storage
    # For MVP, just return a fake URL
    return {"url": f"/uploads/{file.filename}"}

@router.get("/activities", response_model=list[Activity])
async def list_activities(db: AsyncIOMotorDatabase = Depends(get_database)):
    activities = []
    cursor = db["activities"].find({"is_archived": False})
    async for doc in cursor:
        doc["_id"] = str(doc["_id"])
        activities.append(doc)
    return activities
