## 🧠 FashionLoot Backend API

    This is the backend service for the FashionLoot application. It serves as the central API for managing 
    users, boxes, and items. This backend is connected to multiple front-end projects, 
    including the user-facing website and the admin dashboard.

## 🚀 Tech Stack

    Node.js
    Express.js
    MongoDB (via Mongoose)
    JWT (for authentication)
    bcrypt (for secure password hashing)
    dotenv (for environment management)
    CORS (with restricted origin access)

### ⚙️ Environment Setup

    1. Clone the Repository
       git clone https://github.com/IsmailBj/FashionLootBN.git
       cd backend
       
    2. Install Dependencies
        npm install or npm i
        
    3.Create a .env file with:
        PORT=                               # The port your backend server will run on
        MONGODB_URI=mongodb:                # Your MongoDB connection string
        JWT_SECRET=your_super_secret_key    # Secret key for signing JWTs
        BCRYPT_SALT_ROUNDS=                 # Number of salt rounds for bcrypt (e.g., 10)
        
    4. Start the Server
        npm run start
        npm run online { For production }

⚠️ Do not share your .env file publicly.

## 📂 Project Structure MVC

    /backend
    │
    ├── routes/              # Express route files (e.g., auth, boxes, items)
    ├── controllers/         # Business logic for each route
    ├── models/              # Mongoose schemas (User, Item, Box, etc.)
    ├── middleware/          # Auth, admin check, token verification
    ├── server.js            # Entry point of the app
    ├── .env                 # Environment variables (not committed)
    └── package.json

🔐 Authentication & Authorization

    • JWT is used to authenticate users.
    • Middleware like verifyToken and isAdmin protects private and admin-only routes.
    • Users have roles like user and admin stored in the DB.

🔌 API Routes
| Route | Method | Description | Access |
|-------|--------|-------------|--------|
| `/api/user/register` | POST | Register a new user | Public |
| `/api/user/login` | POST | Login & receive JWT | Public |
| `/api/user/user-data` | GET | Get current user data | Authenticated |
| `/api/user/allUs` | GET | Get all users | Admin only |
| `/api/boxes/` | GET | Fetch all boxes | Public |
| `/api/items/` | GET | Fetch items | Public/Admin |
| ... | ... | ... | ... |
Add or modify endpoints as needed.

🔄 Integration with Other Projects
This backend is used by multiple front-end applications, including:

    http://localhost:3000 – FashionLoot user interface
    http://localhost:3001 – FashionLoot admin dashboard

Each front-end sends authenticated requests using JWT tokens, and access is controlled based on roles (user, admin).
