from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
from datetime import datetime

class UserBase(BaseModel):
    # Telegram Basic
    user_tg_id: int
    user_tg_username: Optional[str] = None
    user_tg_firstname: Optional[str] = None
    user_tg_lastname: Optional[str] = None
    user_tg_phone: Optional[str] = None
    user_tg_photo: Optional[str] = None
    user_tg_premium: Optional[bool] = None

    # Telegram Extended
    user_tg_about: Optional[str] = None
    user_tg_birthday: Optional[str] = None # Keep as string for now, or datetime if format is known

    # User Input
    user_email: Optional[EmailStr] = None
    user_strava_link: Optional[str] = None

    # Strava
    user_strava_id: Optional[int] = None
    user_strava_username: Optional[str] = None
    user_strava_firstname: Optional[str] = None
    user_strava_lastname: Optional[str] = None
    user_strava_country: Optional[str] = None
    user_strava_city: Optional[str] = None
    user_strava_sex: Optional[str] = None
    user_strava_premium: Optional[bool] = None

    # App Specific (Legacy/Future compatibility)
    # Keeping these generic ones for now as they might be computed or app-specific
    location: Optional[List[float]] = None  # [longitude, latitude]
    pace: Optional[str] = None 
    goals: List[str] = [] 
    interests: List[str] = [] 

class UserCreate(UserBase):
    pass

class UserUpdate(BaseModel):
    # Allow updating any field
    user_tg_username: Optional[str] = None
    user_tg_firstname: Optional[str] = None
    user_tg_lastname: Optional[str] = None
    user_tg_phone: Optional[str] = None
    user_tg_photo: Optional[str] = None
    user_tg_premium: Optional[bool] = None
    user_tg_about: Optional[str] = None
    user_tg_birthday: Optional[str] = None
    user_email: Optional[EmailStr] = None
    user_strava_link: Optional[str] = None
    user_strava_id: Optional[int] = None
    user_strava_username: Optional[str] = None
    user_strava_firstname: Optional[str] = None
    user_strava_lastname: Optional[str] = None
    user_strava_country: Optional[str] = None
    user_strava_city: Optional[str] = None
    user_strava_sex: Optional[str] = None
    user_strava_premium: Optional[bool] = None
    location: Optional[List[float]] = None
    pace: Optional[str] = None
    goals: Optional[List[str]] = None
    interests: Optional[List[str]] = None

class User(UserBase):
    user_id: str = Field(..., alias="_id") # Mapped from MongoDB _id
    created_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        populate_by_name = True
