#  Booklit — Travel Experiences Booking Platform  

Booklit is a full-stack web application that allows users to explore and book unique travel experiences worldwide.  
It includes features like experience browsing, booking with time slots, promo code discounts, and checkout confirmation.

---

##  Features

 Browse curated travel experiences (with images, price, and details)  
 Select available dates and times for booking  
 Apply working **promo codes** for discounts  
 Seamless checkout flow with validation  
 Fully responsive frontend built with **Next.js + Tailwind CSS**  
 Backend built using **Express.js + Prisma + PostgreSQL**  

---

##  Tech Stack

| Layer | Technology |
|--------|-------------|
| **Frontend** | Next.js (React, TypeScript), Tailwind CSS |
| **Backend** | Node.js, Express.js |
| **Database** | PostgreSQL (via Prisma ORM) |
| **Deployment** | Frontend → Vercel, Backend → Render |

---

## ⚙️ Setup Instructions

Follow these steps to set up **Booklit** locally on your system 👇

### 1. Clone the Repository

```bash
git clone https://github.com/<your-username>/Booklit.git
cd Booklit
```
### 2. Backend Setup
```bash
cd booklit-backend
npm install
```
In the booklit-backend folder, create a .env file:  
```bash
DATABASE_URL="postgresql://<username>:<password>@localhost:5432/booklit"
PORT=5000
```
Run Database Migrations  
```bash
npx prisma migrate deploy
npx prisma db seed

```
Start the Server
```bash
npm run build
npm start
```


### 3. Frontend Setup
```bash
cd ../frontend
npm install
```
Create a .env.local file
```bash
NEXT_PUBLIC_API_URL="http://localhost:5000"
npm run dev

```

### 4. Test the promo codes
You can test promo functionality using these working codes:

SAVE10	Percent Discount	10% off	Jan 1, 2026
FLAT100	Flat Discount	₹100 off	Jan 1, 2026

### 5. Testing the App

1 Visit the homepage → view all travel experiences
2️ Click Book Now on any experience
3️ Choose a date/time and quantity
4️ Enter details on the Checkout page
5️ Apply one of the promo codes above
6️ Confirm booking — you’ll be redirected to the confirmation page  

### 6. Live Demo

Frontend (Vercel): https://booklit-neon.vercel.app

Backend (Render): https://booklit-xsrj.onrender.com  

API Endpoints

Below are all backend routes exposed by the Express + Prisma API:

Experiences Routes
Method	Endpoint	Description
GET	/experiences	Fetch all travel experiences
GET	/experiences/:id	Fetch details for a single experience
POST	/experiences	Add a new experience (admin use)
PUT	/experiences/:id	Update an experience (admin use)
DELETE	/experiences/:id	Delete an experience (admin use)

Example Response:

[
  {
    "id": 1,
    "title": "Sunset Kayaking in Bali",
    "location": "Bali, Indonesia",
    "price": 120,
    "image": "https://...",
    "description": "Paddle through calm waters..."
  }
]

Promo Routes
Method	Endpoint	Description
POST	/promo/validate	Validate a promo code

Example Request:

{
  "code": "SAVE10"
}


Example Response:

{
  "valid": true,
  "discountType": "PERCENT",
  "value": 10
}

Booking Routes
Method	Endpoint	Description
POST	/bookings	Create a new booking
GET	/bookings	Fetch all bookings (admin use)
GET	/bookings/:id	Fetch a specific booking by ID

Example Request:

{
  "name": "John Doe",
  "email": "john@example.com",
  "experienceId": 1,
  "slotId": 2,
  "promoCode": "SAVE10",
  "finalPrice": 108
}


Example Response:

{
  "id": 15,
  "name": "John Doe",
  "email": "john@example.com",
  "finalPrice": 108,
  "promoCode": "SAVE10",
  "createdAt": "2025-11-02T10:45:00.000Z"
}

### Author

Jhanvi N
Full-stack Developer | Passionate about building interactive and efficient web applications.
