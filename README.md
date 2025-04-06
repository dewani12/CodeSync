# CodeSync
> CodeSync is a real-time collaborative code editor that enables developers to write and edit code together in shared workspaces, making pair programming and remote collaboration seamless. The platform supports multiple programming languages with syntax highlighting, real-time cursors showing collaborator positions, and instant updates across all connected users. With features like persistent project storage, version history, and integrated chat, teams can easily maintain context and communication while coding. The platform also includes user authentication, customizable editor themes, and the ability to share sessions via unique URLs, making it perfect for remote teams, technical interviews, and educational settings.
# Screenshots
![Image](https://github.com/user-attachments/assets/386d9a3f-ea84-45de-ae6f-bd87d55351b7)
![Image](https://github.com/user-attachments/assets/5e5c58fa-bc7e-4769-9e28-17147ea1b4d0)
![Image](https://github.com/user-attachments/assets/0c4bb6e0-2fc2-433d-a986-93014229b79a)
![Image](https://github.com/user-attachments/assets/2a2513f9-2ecf-4b9f-a60d-7607a066eb27)

# Features Implemented
## Frontend
* CodeEditor (Multiple Language Support)
* FileView
* Terminal (Api Compilation)
* SignIn & SignUp Page
* Dashboard Page

## Backend
* Persistant storage (S3)
* Real Time updates
* User Authentication (with OAuth)
* Role Based Access
* Workspace Privacy

## Library/Packages Used 
* @aws-sdk/client-s3
* bcrypt
* cookie-parser
* cors
* dotenv
* express
* jsonwebtoken
* mongoose
* nodemailer
* passport
* passport-google-oauth20
* express
* socket.io
* codemirror
* tailwindcss
* axios
* socket.io-client

## Note
> Collaborative Code Editor feature is being developed in a separate repository and has not yet been merged into this project.
```
https://github.com/dewani12/codesync-test
```

# Local Setup 1
```
git clone https://github.com/dewani12/CodeSync.git
cd CodeSync
```
## client
```
cd frontend
npm run dev
```
## server
```
cd backend
npm run dev
```
# Local Setup 2
```
git clone https://github.com/dewani12/codesync-test.git
cd codesync-test
```
## client
```
cd client
npm run dev
```
## server
```
cd server
npm run dev
```

# Team Members
* Gaurav Dewani
* Aksh Dhingra
