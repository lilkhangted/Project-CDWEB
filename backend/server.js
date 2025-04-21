const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const authRoutes = require('./Routes/AuthRoute');
const productRoutes = require('./Routes/ProductRoute'); 

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


dotenv.config();


//Kết nối MongoDB
mongoose.connect('mongodb://localhost:27017/Project-Khang', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Đã kết nối MongoDB')).catch(err => console.log(err));

app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
// app.use('/images', express.static(path.join(__dirname, 'uploads')));
app.use("/images", express.static("images"));

app.use('/images', express.static('public/images'));

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
