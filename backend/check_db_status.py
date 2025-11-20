import asyncio
import sys
import os

# Ensure we can import from backend
sys.path.append(os.getcwd())

from backend.database import get_database
from motor.motor_asyncio import AsyncIOMotorClient

async def check_db_status():
    try:
        # Connect directly to client to list databases
        client = AsyncIOMotorClient("mongodb://localhost:27017")
        dbs = await client.list_database_names()
        print(f"Databases found: {dbs}")
        
        if "runner_app" in dbs:
            print("\n[OK] Database 'runner_app' exists.")
            db = client["runner_app"]
            collections = await db.list_collection_names()
            print(f"Collections in 'runner_app': {collections}")
            
            # Check counts
            for col_name in collections:
                count = await db[col_name].count_documents({})
                print(f" - {col_name}: {count} documents")
                
                # Print one document as sample
                if count > 0:
                    sample = await db[col_name].find_one()
                    print(f"   Sample {col_name}: {sample}")
        else:
            print("\n[WARN] Database 'runner_app' does NOT exist yet (it will be created on first write).")
            
    except Exception as e:
        print(f"\n[ERROR] Error connecting to MongoDB: {e}")

if __name__ == "__main__":
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    loop.run_until_complete(check_db_status())
