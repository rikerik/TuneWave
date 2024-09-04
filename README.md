# Online Song Player Application

## Overview

![Online Song Player](/image.jpg)

This application is an online song player that combines a React frontend with a Java backend to deliver a seamless music streaming experience. The app features JWT authentication for secure user access and leverages React for playing tracks across different pages. Additionally, it utilizes Amazon S3 for storing and retrieving tracks, ensuring efficient and scalable media storage. Future enhancements include integrating AI to fetch lyrics dynamically and implementing a visualizer made in p5.js for a more immersive user experience.

## Features

- **React Frontend**: A responsive and interactive UI for an enjoyable music listening experience.
- **Java Backend**: Handles authentication, track management, and API endpoints.
- **JWT Authentication**: Ensures secure and authenticated access to the application.
- **Track Playback**: Play tracks seamlessly on every page of the application.
- **Amazon S3 Integration**: Stores and manages tracks on Amazon S3 for scalability and accessibility.
- **Future Enhancements**:
  - **AI Lyrics Fetching**: Implement AI to dynamically retrieve and display lyrics for the currently playing track.
  - **Visualizer**: Implement visualizer made with p5.js library.

## Installation

### Backend (Java)

1. Clone the repository:

   ```bash
   git clone https://github.com/rikerik/OnlineSong.git
   ```

2. Navigate to directory
   cd OnlineSong

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
