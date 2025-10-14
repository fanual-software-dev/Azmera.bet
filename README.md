# 🎰 Azmera Bet

Azmera Bet is a modern betting platform built with **Next.js** for the frontend and **Nest.js** for the backend.  
It provides users with a seamless betting experience, real-time interactions, fast payment methods and secure backend services.

---

## 🚀 Tech Stack

### Frontend
- [Next.js](https://nextjs.org/) – React framework for SSR & SSG
- [Tailwind CSS](https://tailwindcss.com/) – Styling
- [Shad-cn](https://ui.shadcn.com/) – UI components
- [Axios](https://axios-http.com/) – API requests
- [Socket.IO Client](https://socket.io/) – Real-time updates
- [React-Hook-Form](https://react-hook-form.com/) - Form handling


### Backend
- [Nest.js](https://nestjs.com/) – Scalable Node.js framework
- [MongoDB](https://www.mongodb.com/) – Database (via MongoDB Atlas)
- [Mongoose](https://mongoosejs.com/) – ODM
- [Socket.IO](https://socket.io/) – Real-time communication
- [JWT](https://jwt.io/) – Authentication
- [Arif pay](https://arifpay.net/) – Local payment gateway

---




## 📂 Project Structure

azmera-bet/
│── frontend/ # Next.js application
│── backend/ # Nest.js application
│── README.md # Project documentation

2. Frontend Setup

- cd frontend
- npm install
- npm run dev


3. Backend setup

- cd backend
- npm install
- npm run start:dev


🔑 Environment Variables

Frontend (/frontend/.env.local)

- NEXT_PUBLIC_API_URL=YOUR_BACKEND_URL

Backend (/backend/.env)

- PORT=PORT_NUMBER
- MONGO_URI=YOUR_MONGODB_URL
- JWT_SECRET=your_jwt_secret
- SMS_PROVIDER_URL=YOUR_SMS_PROVIDER_URL
- SMS_API_KEY=YOUR_SMS_API_KEY

---





📌 Features

🔐 Secure authentication (JWT-based)

⚡ Real-time betting updates (Socket.IO)

📊 Live match data & odds

🎨 Responsive UI with Tailwind & Shad-cn

🗄️ MongoDB Atlas for scalable storage


---


👨‍💻 Author

Fanual Asfaw

- A passionate solo developer of Azmera betting site using modern web technologies.
