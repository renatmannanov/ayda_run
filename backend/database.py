import os
from motor.motor_asyncio import AsyncIOMotorClient

# Use environment variable or default to local
MONGO_URL = os.getenv("MONGO_URL", "mongodb://localhost:27017")
DB_NAME = "runner_app"

client = AsyncIOMotorClient(MONGO_URL)
db = client[DB_NAME]

async def get_database():
    return db
