# Facebook Chatbot Using Flask and React

This is a simple chatbot application built using Flask as the backend API and React for the frontend UI. It allows for chatting with Facebook users and storing the conversation history in a database.

## Features

- Connects with Facebook messenger using webhook and handles message events
- Stores conversations in SQLite database
- REST API for retrieving chats, sending messages
- React frontend for displaying chats and messaging
- Login/Registration page 

## Getting Started

1. Install dependencies
    - pip install -r requirements.txt
    - npm install

2. Setup your Facebook app and page

3. Generate page access token and update config.py

4. Run backend
    - python app.py

5. Run frontend 
    - npm start

6. Verify webhook url with Facebook

7. User can now interact through Facebook messenger!

## Directories

- Backend
   - app.py - Flask app with routes for API
   - config.py - Settings
   - messages.db - SQLite database
- Frontend
   - src/ - React code
   - App.js - Main component
   - Dashboard.js - Chat UI
   - LandingPage.js - Login page

## Usage

- Login/Register using the LandingPage 
- View active chats on left sidebar
- Select chat to see messages 
- Send new messages
- See profile details on right sidebar

## Future Improvements

- Add user authentication
- Store/retrieve user profiles 
- Search/filter chats
- Support for media/file sharing
- Notification on new messages
