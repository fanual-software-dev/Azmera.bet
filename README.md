# 🎰 Azmera Bet

Azmera Bet is a modern betting platform built with **Next.js** for the frontend and **Nest.js** for the backend.  
It provides users with a seamless betting experience, real-time interactions, and secure backend services.

---

## 🚀 Tech Stack

### Frontend
- [Next.js](https://nextjs.org/) – React framework for SSR & SSG
- [Tailwind CSS](https://tailwindcss.com/) – Styling
- [Chakra UI](https://chakra-ui.com/) – UI components
- [Axios](https://axios-http.com/) – API requests
- [Socket.IO Client](https://socket.io/) – Real-time updates

### Backend
- [Nest.js](https://nestjs.com/) – Scalable Node.js framework
- [MongoDB](https://www.mongodb.com/) – Database (via MongoDB Atlas)
- [Mongoose](https://mongoosejs.com/) – ODM
- [Socket.IO](https://socket.io/) – Real-time communication
- [JWT](https://jwt.io/) – Authentication

---

## 📂 Project Structure

azmera-bet/
│── frontend/ # Next.js application
│── backend/ # Nest.js application
│── README.md # Project documentation

2. Frontend Setup

cd frontend
npm install
npm run dev


3. Backend setup

cd backend
npm install
npm run start:dev


🔑 Environment Variables

Frontend (/frontend/.env.local)

NEXT_PUBLIC_API_URL=http://localhost:5000

Backend (/backend/.env)

PORT=5000
MONGO_URI=your_mongodb_atlas_connection
JWT_SECRET=your_secret_key


📌 Features

🔐 Secure authentication (JWT-based)

⚡ Real-time betting updates (Socket.IO)

📊 Live match data & odds

🎨 Responsive UI with Tailwind & Chakra

🗄️ MongoDB Atlas for scalable storage


👨‍💻 Author

Azmera Bet Team
Developed by passionate engineers using modern web technologies.
