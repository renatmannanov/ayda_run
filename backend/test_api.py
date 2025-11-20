import requests
import json

url = "http://127.0.0.1:8000/users"
payload = {
    "user_tg_id": 999999,
    "user_tg_username": "api_test_user",
    "user_email": "api@test.com",
    "user_strava_link": "http://strava.com/api"
}
headers = {
    "Content-Type": "application/json"
}

try:
    response = requests.post(url, json=payload, headers=headers)
    print(f"Status Code: {response.status_code}")
    print(f"Response: {response.text}")
except Exception as e:
    print(f"Error: {e}")
