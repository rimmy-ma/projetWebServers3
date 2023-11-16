import mongoose from 'mongoose';

const connectionString = 'mongodb://localhost:27017/projetWebServer';

mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err));

export default mongoose;
