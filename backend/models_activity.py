from pydantic import BaseModel, Field, HttpUrl
from typing import List, Optional, Literal
from datetime import datetime, time, date
from enum import Enum

class ActivityType(str, Enum):
    RUN = "Run"
    TRAIL_RUN = "Trail run"
    WALK = "Walk"
    HIKE = "Hike"

class ActivityOption(str, Enum):
    ONCE = "once"
    RECURRING = "recurring"

class ActivityMetric(str, Enum):
    KM = "km"
    MILE = "mile"

class ActivityBase(BaseModel):
    # Common Info
    activity_name: str
    activity_type: ActivityType
    activity_option: ActivityOption
    activity_start_time: str # "HH:MM" format
    
    # Specifics
    activity_metric: ActivityMetric
    activity_distance: float
    activity_total_elevation_gain: float
    
    # Location
    # For manual: Google Maps Link. For Strava: [lat, lng]
    activity_start_point_link: Optional[str] = None 
    activity_start_latlng: Optional[List[float]] = None
    activity_city: Optional[str] = None
    activity_country: Optional[str] = None
    
    # Scheduling
    activity_date: Optional[str] = None # For ONCE: "YYYY-MM-DD"
    activity_week_day: Optional[str] = None # For RECURRING: "Monday", etc.
    
    # Files/Links
    activity_gpx_url: Optional[str] = None
    strava_activity_link: Optional[str] = None # If created from Strava

class ActivityCreate(ActivityBase):
    creator_user_tg_id: int

class Activity(ActivityBase):
    activity_id: str = Field(..., alias="_id")
    creator_user_tg_id: int
    created_at: datetime = Field(default_factory=datetime.utcnow)
    is_archived: bool = False

    class Config:
        populate_by_name = True
