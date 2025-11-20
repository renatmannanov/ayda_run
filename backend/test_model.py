from models_user import UserCreate, User
from datetime import datetime

# Test data matching the new structure
test_data = {
    "user_tg_id": 123456789,
    "user_tg_username": "testuser",
    "user_tg_firstname": "Test",
    "user_tg_lastname": "User",
    "user_email": "test@example.com",
    "user_strava_id": 987654321,
    "goals": ["Marathon"]
}

try:
    # Test creation validation
    user_create = UserCreate(**test_data)
    print("UserCreate validation passed")
    
    # Test full user model (simulating DB retrieval)
    db_data = test_data.copy()
    db_data["_id"] = "some_mongo_id"
    db_data["created_at"] = datetime.utcnow()
    
    user = User(**db_data)
    print(f"User model created: {user.user_id}")
    print(f"Telegram ID: {user.user_tg_id}")
    
except Exception as e:
    print(f"Validation failed: {e}")
