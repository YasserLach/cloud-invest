
# Cloud Invest test overview

This project is a test assignment given to me by the company Cloud Invest to evaluate my skills. The goal of this project is to develop a simple task management application using Firebase as the database, Node.js for the backend, and Ionic for the mobile application.


## Prerequisites

Node.js (I have the version v18.20.5)

npm (I have the version v10.8.2)

Ionic CLI (I have the version v7.2.0)


## Backend Setup Instructions
    1. Navigate to the Backend Directory : 
        cd cloud-back

    2. Initialize the Project & Create a package.json File :
        npm init -y

    3.Install Express :
        npm install express

    4.Create the Express Application :
        Create a server.js file in the project directory and set up the application

    5.Install .env Dependency and Add a .env File :
        npm install dotenv

    6.Install nodemon and Add it to the Scripts in package.json
        npm install --save-dev nodemon

    7.Update the scripts section in package.json to include:
        "scripts": {
        "start": "node server.js",
        "dev": "nodemon server.js"
        }
## Running the Backend
    1. Run the Server :
        - For development with live-reloading:
            npm run dev
        - For production:
            npm run start

    2. Run the Backend Using Docker
        docker-compose up --build -d
## Frontend Setup and Run instruction

    1.Install Ionic CLI :
        npm install -g @ionic/cli

    2.Navigate to the frontend directory :
        cd cloud-ui
    
    3.Initialize an Ionic App : 
        ionic init tabs
    
    4.Install Dependencies:
        npm install
    
    5.Serve the App:
        ionic serve
## Project Structure and Design

This project follows a Model-View-Controller (MVC) architecture :

        1. Controllers (taskController):
            - Handles business logic and communicates with the database
        
        2. Routes (taskRoutes):
            - Maps HTTP routes to controller methods

        3. Models (taskModel):
            - Defines the structure and validation rules for data entities
            - I utilized the Joi library to define and validate the task schema
        
        4. Server (server.js):
            - Entry point for the application
## Android APK: Build and Install Instructions

    1. Navigate to the frontend directory :
        cd cloud-ui
    
    2. Build the Ionic Application
        ionic build
    
    3. Build the Android APK 
        ionic capacitor build android

        This will open Android Studio with the project loaded.
            -In Android Studio, go to Build > Build Bundle(s) / APK(s) > Build APK(s).