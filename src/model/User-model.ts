import mongoose from "mongoose";

export interface IUser extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  isVerified: boolean;
  verifyToken: string;
}

const userSchema: mongoose.Schema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  verifyToken: String,
});

export default mongoose.model<IUser>("User", userSchema);
