const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

const dotenv = require('dotenv');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 8000;
dotenv.config();
app.use('/api/v1/auth',require('./routes/authRoutes'))
app.use('/api/v1/inventory',require('./routes/inventoryRoutes'))
app.use('/api/v1/analytics',require('./routes/analyticsRoutes'))
app.use('/api/v1/consumer',require('./routes/conumerRoutes'))
app.use("/api/v1/admin", require("./routes/adminRoutes"));



app.listen(PORT, () => {
    connectDB()
  console.log(`Server is running on port ${PORT} and mode ${process.env.DEV_MODE}`);
});