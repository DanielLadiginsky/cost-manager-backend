# Cost Manager RESTful Web Services

## Project Overview

This project implements a RESTful web service backend for managing user expenses. It allows the addition of users, recording of cost items, and the generation of cost reports. The system is developed using **Node.js**, **Express.js**, **MongoDB Atlas**, and **Mongoose**.

---

## Team Members

* **Daniel Ladiginsky**
* **Orel Zakharov**

---

## Technologies Used

* Node.js
* Express.js
* MongoDB (MongoDB Atlas)
* Mongoose
* Jest + Supertest (for unit testing)

---

## Folder Structure

```
project-root/
├── controllers/       # Logic for routes
│   ├── userController.js
│   ├── costController.js
│   └── reportController.js
├── models/            # MongoDB models
│   ├── User.js
│   └── Cost.js
├── routes/            # Separated route definitions
│   ├── userRoutes.js
│   ├── costRoutes.js
│   └── reportRoutes.js
├── tests/             # Unit tests
│   └── demandstest.test.js
├── .env               # MongoDB Atlas connection string
├── index.js           # Main app entry point
└── README.md          # Project documentation
```

---

## API Endpoints

### User Endpoints

| Method | URL              | Description                     |
| ------ | ---------------- | ------------------------------- |
| POST   | `/api/users/add` | Add a new user                  |
| GET    | `/api/users/:id` | Get user details and total cost |
| GET    | `/api/about`     | Get hardcoded team member names |

### Cost Endpoints

| Method | URL        | Description         |
| ------ | ---------- | ------------------- |
| POST   | `/api/add` | Add a new cost item |

### Report Endpoints

| Method | URL                       | Description                        |
| ------ | ------------------------- | ---------------------------------- |
| GET    | `/api/report`             | Get user cost report by month/year |
| GET    | `/api/report/by-category` | Get total cost grouped by category |
| GET    | `/api/report/by-month`    | Get total cost grouped by month    |
| GET    | `/api/report/total`       | Get total annual cost for a user   |

---

## How to Run the Project

1. Clone the repository
2. Create a `.env` file:

   ```env
   MONGO_URL=mongodb+srv://<username>:<password>@<cluster>/<dbname>?retryWrites=true&w=majority
   ```
3. Install dependencies:

   ```bash
   npm install
   ```
4. Start the server:

   ```bash
   npm start
   ```

---

## Run Unit Tests

```bash
npm test
```

Or run specific test files:

```bash
npx jest tests/demandstest.test.js
```

---

## Code Style & Documentation

* JavaScript style follows [Abelski's guidelines](http://www.abelski.com/courses/stylejs/stylerules.pdf)
* All logic is documented using JSDoc comments

---

## License

This project is for educational purposes only.
