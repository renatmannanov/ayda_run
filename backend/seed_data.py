import asyncio
import sys
import os
from datetime import datetime

# Ensure we can import from backend
sys.path.append(os.getcwd())

from backend.database import get_database
from backend.models_user import UserCreate
from backend.models_activity import ActivityCreate, ActivityType, ActivityOption, ActivityMetric

async def seed_data():
    db = await get_database()
    
    print("Starting database seeding...")

    # 1. Create Default System User
    system_user_id = 100000
    system_user = {
        "user_tg_id": system_user_id,
        "user_tg_username": "ayda_run_system",
        "user_tg_firstname": "Ayda",
        "user_tg_lastname": "System",
        "user_email": "system@aydarun.com",
        "user_tg_about": "Official system account for Ayda Run events.",
        "goals": ["Community", "Events"],
        "interests": ["Running", "Trail"]
    }
    
    # Upsert User
    await db["users"].find_one_and_update(
        {"user_tg_id": system_user_id},
        {"$set": system_user},
        upsert=True
    )
    print(f"[OK] System User created/updated: {system_user['user_tg_username']}")

    # 2. Create Activities
    # Clear existing activities for this user to avoid duplicates on re-run
    await db["activities"].delete_many({"creator_user_tg_id": system_user_id})
    print("[INFO] Cleared old system activities.")

    activities = [
        # --- ALMATY ---
        {
            "activity_name": "Morning Medeu Run",
            "activity_type": ActivityType.RUN,
            "activity_option": ActivityOption.ONCE,
            "activity_start_time": "07:00",
            "activity_metric": ActivityMetric.KM,
            "activity_distance": 10.5,
            "activity_total_elevation_gain": 300,
            "activity_start_point_link": "https://goo.gl/maps/MedeuLink",
            "activity_date": "2025-06-15",
            "creator_user_tg_id": system_user_id,
            "activity_city": "Almaty",
            "activity_country": "Kazakhstan"
        },
        {
            "activity_name": "Terrenkur Evening Jog",
            "activity_type": ActivityType.RUN,
            "activity_option": ActivityOption.RECURRING,
            "activity_start_time": "19:00",
            "activity_metric": ActivityMetric.KM,
            "activity_distance": 5.0,
            "activity_total_elevation_gain": 50,
            "activity_start_point_link": "https://goo.gl/maps/TerrenkurLink",
            "activity_week_day": "Wednesday",
            "creator_user_tg_id": system_user_id,
            "activity_city": "Almaty",
            "activity_country": "Kazakhstan"
        },
        {
            "activity_name": "Kok Tobe Trail",
            "activity_type": ActivityType.TRAIL_RUN,
            "activity_option": ActivityOption.ONCE,
            "activity_start_time": "08:00",
            "activity_metric": ActivityMetric.KM,
            "activity_distance": 8.0,
            "activity_total_elevation_gain": 400,
            "activity_start_point_link": "https://goo.gl/maps/KokTobeLink",
            "activity_date": "2025-06-20",
            "creator_user_tg_id": system_user_id,
            "activity_city": "Almaty",
            "activity_country": "Kazakhstan"
        },
        
        # --- NOVI SAD ---
        {
            "activity_name": "Danube Kej Run",
            "activity_type": ActivityType.RUN,
            "activity_option": ActivityOption.RECURRING,
            "activity_start_time": "18:30",
            "activity_metric": ActivityMetric.KM,
            "activity_distance": 7.0,
            "activity_total_elevation_gain": 10,
            "activity_start_point_link": "https://goo.gl/maps/KejLink",
            "activity_week_day": "Tuesday",
            "creator_user_tg_id": system_user_id,
            "activity_city": "Novi Sad",
            "activity_country": "Serbia"
        },
        {
            "activity_name": "Fruska Gora Hike",
            "activity_type": ActivityType.HIKE,
            "activity_option": ActivityOption.ONCE,
            "activity_start_time": "09:00",
            "activity_metric": ActivityMetric.KM,
            "activity_distance": 15.0,
            "activity_total_elevation_gain": 600,
            "activity_start_point_link": "https://goo.gl/maps/FruskaGoraLink",
            "activity_date": "2025-05-10",
            "creator_user_tg_id": system_user_id,
            "activity_city": "Novi Sad",
            "activity_country": "Serbia"
        },
        {
            "activity_name": "City Center Walk",
            "activity_type": ActivityType.WALK,
            "activity_option": ActivityOption.ONCE,
            "activity_start_time": "10:00",
            "activity_metric": ActivityMetric.KM,
            "activity_distance": 4.0,
            "activity_total_elevation_gain": 0,
            "activity_start_point_link": "https://goo.gl/maps/CenterLink",
            "activity_date": "2025-05-12",
            "creator_user_tg_id": system_user_id,
            "activity_city": "Novi Sad",
            "activity_country": "Serbia"
        }
    ]

    for act in activities:
        # Add created_at timestamp
        act["created_at"] = datetime.utcnow()
        act["is_archived"] = False
        await db["activities"].insert_one(act)
        print(f"   + Created activity: {act['activity_name']}")

    print("[OK] Seeding complete!")

if __name__ == "__main__":
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    loop.run_until_complete(seed_data())
