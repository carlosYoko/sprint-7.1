import mongoose from 'mongoose';

const loginSchema = new mongoose.Schema({
  userName: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Login = mongoose.model('Users', loginSchema);

export default Login;
