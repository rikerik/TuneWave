# Online Song Player Application

## Overview

![Online Song Player](/image.jpg)

This application is an online song player that combines a React frontend with a Java backend to deliver a seamless music streaming experience. The app features JWT authentication for secure user access and leverages React for playing tracks across different pages. Future enhancements include cloud storage for tracks and integrating AI to fetch lyrics dynamically.

## Features

- **React Frontend**: A responsive and interactive UI for an enjoyable music listening experience.
- **Java Backend**: Handles authentication, track management, and API endpoints.
- **JWT Authentication**: Ensures secure and authenticated access to the application.
- **Track Playback**: Play tracks seamlessly on every page of the application.
- **Future Enhancements**:
  - **Cloud Storage**: Store and manage tracks on a cloud service for scalability and accessibility.
  - **AI Lyrics Fetching**: Implement AI to dynamically retrieve and display lyrics for the currently playing track.
  - **Visualizer**: Implement visualizer made with p5.js library.

## Installation

### Backend (Java)

1. Clone the repository:

   ```bash
   git clone https://github.com/rikerik/OnlineSong.git
   ```

2. Navigate to backend directory
   cd backend

3. Install dependencies and build project:
   nvm install

4. Install backend server
   nmv spring-boot:run

### Frontend (React)

1. Navigate to frontend directory
   cd song-front

2. Install dependencies and build project:
   npm install

3. Install backend server
   npm start
