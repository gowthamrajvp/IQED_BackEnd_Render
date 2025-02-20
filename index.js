// Import required modules
const express = require("express");

const cors = require("cors");
const http = require("http");

const app = express();
const server = http.createServer(app);


require("dotenv").config();
require("./app/config/mogodb.config");
const {
  sessionMiddleware,
  sessionwrap,
} = require("./app/config/session.config");
const { jwt_isVerify } = require("./app/config/jwt.config");
const { CheckEarnings } = require("./app/middleware/User.middleware");

const SocketConnection = require("./app/scokets/socket");

// Routers
const AppRoute = require("./app/routes/App.routes");
const AuthRoute = require("./app/routes/Auth.routes");
const UserRoute = require("./app/routes/User.routes");
const QuizRoute = require("./app/routes/Quiz.routes");
const IQRoute = require("./app/routes/IQ.routes");
const CourseRoute = require("./app/routes/Course.routes");
const GameRoute = require("./app/routes/Game.routes");
const AdminRoute = require("./app/routes/Admin.routes");

require("./app/Stream/User.Stream");


// app.use(cors({
//   origin: 'https://iqed-iq.vercel.app', // Replace with your frontend's URL
//   methods: 'GET,POST,OPTIONS',
//   allowedHeaders: 'Content-Type,Authorization'
// }));



// const corsOptions = {
//   origin: ["https://iqed-iq.vercel.app", "http://localhost:3000"], // Allow specific frontend URLs
//   methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
//   allowedHeaders: ["Content-Type", "Authorization"],
//   credentials: true, // Allow cookies or credentials
//   preflightContinue: false,
// };



// app.use(cors(corsOptions));
app.use(cors({
  origin: ["https://iqed-platform.vercel.app","http://localhost:5173","http://localhost:8000","https://iqed-new-admin.vercel.app","https://iqed-render.onrender.com"], 
  methods:  ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
  credentials: true,
}));


app.use(express.json({limit: '50mb'}));
// app.use(sessionMiddleware);


// Environment variables
const PORT = process.env.PORT || 5000;

// Route connections
app.use("/", AppRoute);
app.use("/auth", AuthRoute);
app.use("/career", CourseRoute);
app.use("/user", jwt_isVerify, CheckEarnings, UserRoute);
app.use("/quiz", jwt_isVerify, CheckEarnings, QuizRoute);
app.use("/game", GameRoute);
app.use("/IQ", IQRoute);
app.use("/admin", AdminRoute);


//sockets
SocketConnection(server)




// Start the server
server.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
