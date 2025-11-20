from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .routes import users, activities

app = FastAPI(title="Runner Matching API")

# CORS setup for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users.router, tags=["users"])
app.include_router(activities.router, tags=["activities"])

@app.get("/")
async def root():
    return {"message": "Runner Matching API is running"}

@app.get("/health")
async def health_check():
    return {"status": "ok"}
