from fastapi import FastAPI, HTTPException, Request, status
from fastapi.middleware.cors import CORSMiddleware
import requests
from requests.auth import HTTPBasicAuth
from urllib.parse import quote
import os

app = FastAPI()

# Allow CORS for the frontend at http://localhost:5173
origins = ["http://localhost:5173"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Spotify credentials and redirect URI
CLIENT_ID = "a4d815a76b9c4fc58fb924a58d776fcc"
CLIENT_SECRET = "cadd0572edce4ff9b83ce1f03de4db6c"
REDIRECT_URI = "http://localhost:8080/callback"

# In-memory token store (use a proper database in production)
token_store = {}

@app.post("/api/spotify/exchange-code")
async def exchange_authorization_code(request: Request):
    body = await request.json()
    authorization_code = body.get("code")
    
    if not authorization_code:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail="Authorization code is missing.")

    token_url = "https://accounts.spotify.com/api/token"
    headers = {
        "Content-Type": "application/x-www-form-urlencoded"
    }
    
    # Prepare the request body
    form_data = {
        "grant_type": "authorization_code",
        "code": authorization_code,
        "redirect_uri": REDIRECT_URI
    }
    
    try:
        response = requests.post(token_url,
                                 data=form_data,
                                 headers=headers,
                                 auth=HTTPBasicAuth(CLIENT_ID, CLIENT_SECRET))
        response.raise_for_status()
        data = response.json()
        
        if "error" in data:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=data)
        
        # Store tokens in the token store
        token_store["access_token"] = data.get("access_token")
        token_store["refresh_token"] = data.get("refresh_token")
        
        return data
    except requests.exceptions.HTTPError as e:
        raise HTTPException(status_code=response.status_code, detail=response.text)
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                            detail=str(e))

@app.get("/api/spotify/refresh-token")
async def refresh_access_token():
    refresh_token = token_store.get("refresh_token")
    if not refresh_token:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail="No refresh token available.")
    
    token_url = "https://accounts.spotify.com/api/token"
    headers = {
        "Content-Type": "application/x-www-form-urlencoded"
    }
    
    form_data = {
        "grant_type": "refresh_token",
        "refresh_token": refresh_token
    }
    
    try:
        response = requests.post(token_url,
                                 data=form_data,
                                 headers=headers,
                                 auth=HTTPBasicAuth(CLIENT_ID, CLIENT_SECRET))
        response.raise_for_status()
        data = response.json()
        
        # Update the access token in the store
        token_store["access_token"] = data.get("access_token")
        
        return data
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                            detail=f"Error refreshing access token: {str(e)}")

@app.get("/api/spotify/genres")
async def get_user_genres():
    access_token = token_store.get("access_token")
    if not access_token:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail="No access token available.")
    
    url = "https://api.spotify.com/v1/me/top/artists?limit=50"
    headers = {
        "Authorization": f"Bearer {access_token}"
    }
    
    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        data = response.json()
        
        # Extract genres from the response
        artists = data.get("items", [])
        genre_counts = {}
        for artist in artists:
            genres = artist.get("genres", [])
            for genre in genres:
                genre_counts[genre] = genre_counts.get(genre, 0) + 1
        
        return genre_counts
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                            detail=f"Error fetching genres: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8080)
