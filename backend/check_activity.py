import sys
import os
sys.path.append(os.getcwd())
from backend.database import get_database

async def check_latest_activity():
    db = await get_database()
    # Find the most recent activity
    cursor = db["activities"].find().sort("created_at", -1).limit(1)
    async for document in cursor:
        print("Latest Activity Found:")
        print(document)
        return

    print("No activities found.")

if __name__ == "__main__":
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    loop.run_until_complete(check_latest_activity())
