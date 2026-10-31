# DevJudge

An online judge platform where users can solve coding problems, submit solutions in multiple languages, and get instant verdicts. It is a full stack project with secure, sandboxed code execution.

## Features

- **User authentication**: register, login and logout with JWT-based sessions
- **Problem library**: browse problems with difficulty, tags and search
- **Code editor**: in-browser editor with syntax highlighting and language selection
- **Code execution**: run code against sample inputs or submit against hidden test cases
- **Verdicts**: Accepted, Wrong Answer, Time Limit Exceeded, Runtime Error, Compilation Error
- **Submission history**: view past submissions with code, verdict, runtime and memory
- **Leaderboard**: rankings based on problems solved
- **Admin panel**: add, edit and delete problems and test cases
- **Sandboxed execution**: user code runs in isolated Docker containers with time and memory limits

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React, React Router, Tailwind CSS, Monaco Editor |
| Backend | Node.js, Express.js |
| Database | MongoDB with Mongoose |
| Auth | JWT, bcrypt |
| Execution engine | Docker (C++, Java, Python, JavaScript) |
| Deployment | Docker Compose, Nginx |

## Project Structure

```
DdvJudge/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── services/
│   │   └── App.jsx
│   └── package.json
├── server/                 # Express backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── judge/              # Code execution logic
│   ├── config/
│   └── server.js
├── docker/                 # Language runner images
├── docker-compose.yml
└── README.md
```

## Getting Started

### Prerequisites

- Node.js v18+
- MongoDB (local or Atlas)
- Docker (required for code execution)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/<your-username>/DdvJudge.git
   cd DdvJudge
   ```

2. **Set up the backend**
   ```bash
   cd server
   npm install
   ```
   Create a `.env` file in `server/`:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/ddvjudge
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRES_IN=7d
   CLIENT_URL=http://localhost:5173
   ```

3. **Set up the frontend**
   ```bash
   cd ../client
   npm install
   ```
   Create a `.env` file in `client/`:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

4. **Build the language runner images**
   ```bash
   cd ../docker
   docker build -t ddv-cpp ./cpp
   docker build -t ddv-python ./python
   docker build -t ddv-java ./java
   ```

5. **Run the project**
   ```bash
   # Terminal 1 - backend
   cd server && npm run dev

   # Terminal 2 - frontend
   cd client && npm run dev
   ```
   Open `http://localhost:5173`.

### Run with Docker Compose

```bash
docker-compose up --build
```

## API Overview

| Method | Endpoint | Description | Access |
|---|---|---|---|
| POST | `/api/auth/register` | Register a new user | Public |
| POST | `/api/auth/login` | Login and receive JWT | Public |
| GET | `/api/problems` | List all problems | Public |
| GET | `/api/problems/:id` | Get problem details | Public |
| POST | `/api/problems` | Create a problem | Admin |
| PUT | `/api/problems/:id` | Update a problem | Admin |
| DELETE | `/api/problems/:id` | Delete a problem | Admin |
| POST | `/api/run` | Run code on sample input | User |
| POST | `/api/submit` | Submit code for judging | User |
| GET | `/api/submissions` | Get the user's submissions | User |
| GET | `/api/leaderboard` | Get rankings | Public |

## How the Judge Works

1. The user submits code, a language and a problem ID.
2. The backend saves the code to a temporary file.
3. A Docker container for that language compiles and runs the code.
4. The code is executed against each test case with time and memory limits.
5. The output is compared with the expected output.
6. A verdict is returned and the submission is stored in the database.
7. Temporary files and containers are cleaned up.

## Security

- Code runs in isolated containers with no network access
- CPU, memory and execution time limits
- Passwords hashed with bcrypt
- JWT authentication and role-based access control
- Input validation and rate limiting on submissions

## Screenshots

_Add screenshots of the home page, problem page, editor and leaderboard here._

## Future Improvements

- Contests with live scoreboards
- More languages
- Discussion forum and editorials
- Plagiarism detection
- Queue-based judging with Redis

## Contributing

1. Fork the repository
2. Create a branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "Add your feature"`
4. Push the branch: `git push origin feature/your-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Author

**Your Name**
GitHub: [@your-username](https://github.com/your-username)
