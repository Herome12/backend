// server.js (Main Entry Point)
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const employeeRoutes = require('./routes/employeeRoutes');
const attendanceRoutes = require("./routes/attendenceRoutes");
require('dotenv').config();
const leaveRoutes = require("./routes/leaveRoutes");
const payrollRoutes = require("./routes/payrollRoutes")
const cookieParser = require("cookie-parser");

const app = express();
      
// Middleware 
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: "https://frontend-alpha-ten-72.vercel.app",  // Remove trailing slash
    credentials: true,
    methods: "GET,POST,PUT,DELETE,OPTIONS",
    allowedHeaders: "Content-Type,Authorization"
}));

app.use(express.json());
app.use('/uploads', express.static('uploads')); // Serve profile pictures

// Database Connection 
mongoose.connect(process.env.MONGO_URI||'mongodb+srv://palujjwal1112:UJJWAL123@hrms.fhn5p.mongodb.net/?retryWrites=true&w=majority&appName=HRMS', {  
    useNewUrlParser: true,
    useUnifiedTopology: true, 
})    
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error(err)); 

// Routes  
app.use("/api/employees", employeeRoutes); 
app.use("/api/attendance", attendanceRoutes);
 
 
app.use("/api/leave", leaveRoutes);
app.use("/api/payroll",payrollRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
