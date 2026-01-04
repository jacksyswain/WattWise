# WattWise


⚡ WattWise
Smart Energy Usage Awareness

WattWise is a full-stack smart energy monitoring application that helps users track electricity consumption in real time, understand daily and monthly usage, estimate electricity bills, and make informed energy-saving decisions.

Designed with real electricity meter logic, WattWise works as a powerful dashboard MVP that can seamlessly transition from simulated data to real IoT-based meter inputs.

🌟 Key Highlights

🔌 Real-time electricity meter simulation

⏱ Time-based energy increment (like real meters)

📊 Daily & monthly energy analytics

💰 Accurate bill estimation

📅 Day-wise consumption charts

💳 Integrated “Pay Now” user flow (payment-ready UI)

🧠 Single source of truth architecture (meter-driven system)

🧠 How WattWise Works (Core Concept)

WattWise follows real electricity meter behavior:

Meter Reading (kWh)  ← increases with time
        ↓
Today Usage          ← difference from day start
        ↓
Monthly Usage        ← difference from month start
        ↓
Estimated Bill       ← monthly usage × tariff


🔑 Everything is derived from a single master meter reading, ensuring accuracy, consistency, and scalability.

🏗️ Tech Stack
Backend

Node.js

Express.js

MongoDB (Mongoose)

REST APIs

Time-based energy calculation logic

Frontend

React (Vite)

Tailwind CSS

Recharts

Axios

Ready for Integration

IoT devices (ESP32 / Smart Meter chips)

Payment gateways (Razorpay / UPI)

Mobile apps (React Native)

⚡ Features
🔴 Live Energy Monitoring

Meter starts at a base value (e.g., 14981.7 kWh)

Automatically increases +0.2 units every minute

Independent of API refreshes

🔵 Today Usage

Calculated from day-start meter reading

Increases live as power is consumed

Reflects accurately on charts

🟡 Monthly Usage & Billing

Month-start meter reading captured once

Monthly units = current − month start

Estimated bill = units × ₹8 (configurable)

📊 Energy Analytics Dashboard

Day-wise bar chart for the current month

Future days automatically shown as 0

Today’s bar grows live with consumption

💳 Pay Now (UI-Ready)

Clean, user-friendly payment modal

Designed for easy integration with real gateways

📁 Project Structure
wattwise-backend/
├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── app.js
│   └── server.js
├── .env
└── package.json

wattwise-frontend/
├── src/
│   ├── pages/
│   ├── services/
│   └── components/
└── package.json

▶️ Getting Started
Backend Setup
npm install
npm run dev


.env

MONGO_URI=mongodb://localhost:27017/wattwise


Server runs on:

http://localhost:5000

Frontend Setup
npm install
npm run dev


Frontend runs on:

http://localhost:5173

📡 Core APIs
Feature	Endpoint
Live Power	/api/live-power
Today Usage	/api/usage/today
Monthly Usage & Bill	/api/billing/monthly
Monthly Chart	/api/chart/monthly
🎯 Use Cases

Residential electricity monitoring

PGs, hostels, rental properties

Small businesses & shops

Energy awareness & analytics platforms

IoT / Smart meter MVPs

Portfolio & startup demos

🛣️ Roadmap

🔐 User authentication (JWT)

🕛 Midnight auto-reset (cron jobs)

📱 Mobile app (React Native)

💳 Real payment integration (Razorpay)

🧾 Invoice & bill history

📈 AI-based energy predictions

🌱 Sustainability & carbon tracking

🧑‍💻 Author

Jyoti Prakash Swain (Jacksy)
Full-Stack & Frontend Developer

GitHub: https://github.com/jacksyswain

LinkedIn: https://www.linkedin.com/in/jyoti-prakash-swain-64154823a/

📄 License

MIT License
Free to use, modify, and extend.

⭐ Final Note

WattWise is not just a demo — it’s a production-ready foundation for smart energy systems.
Built with real-world logic, scalable architecture, and clean UX, it’s ideal for startups, portfolios, and IoT products.