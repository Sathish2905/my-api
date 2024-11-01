import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import routes from './routes';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:3000'
}));

// Your other middleware and routes go here

// app.listen(3002, () => {
//   console.log('Server running on http://localhost:3002');
// });

// Connect to MongoDB
mongoose.set('strictQuery', false);  // or true, depending on your needs

mongoose.connect('mongodb+srv://root:root@cluster0.mabez.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err))
  .then(() => {
    app.use('/api', routes);
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => console.error('MongoDB connection error:', err));



