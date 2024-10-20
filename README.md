
# TaskMaster API

Welcome to the **TaskMaster API**! This API allows users to efficiently manage their tasks, providing features for user registration, login, and task management.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- User registration and login
- Create, read, update, and delete tasks
- JWT-based authentication
- Email notifications for new registrations

## Technologies Used

- Node.js
- Express
- MongoDB
- Mongoose
- bcrypt
- jsonwebtoken
- nodemailer
- dotenv

## Getting Started

To get a local copy up and running, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/shubechavan/taskmaster.git
   cd taskmaster
   ```

2. **Install the dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables** in a `.env` file:
   ```plaintext
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_email_password_or_app_password
   JWT_SECRET=your_jwt_secret
   ```

4. **Start the server:**
   ```bash
   npm start
   ```

   The API will run on `http://localhost:3000`.

## API Endpoints

- **Register User:** `POST /api/users/register`
    ```json
    {
        "username": "your_username",
        "email": "your_email",
        "password": "your_password"
    }
    ```

- **Login User:** `POST /api/users/login`
    ```json
    {
        "username": "your_username",
        "password": "your_password"
    }
    ```

- **Manage Tasks:**
  - Create: `POST /api/tasks`
  - Read All: `GET /api/tasks`
  - Read One: `GET /api/tasks/:id`
  - Update: `PUT /api/tasks/:id`
  - Delete: `DELETE /api/tasks/:id`

## Usage

After starting the server, use Postman or cURL to test the API endpoints. Include the JWT token in the Authorization header for protected routes:

```
Authorization: Bearer YOUR_JWT_TOKEN
```

## Contributing

Contributions are welcome! If you have suggestions for improvements or new features, please create a pull request or open an issue.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

