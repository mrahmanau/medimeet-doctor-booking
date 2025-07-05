import mongoose, { Schema, Document, models } from "mongoose";

/**
 * Define the shape of a User document using a TypeScript interface.
 * This helps with autocompletion and type checking.
 */
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "patient" | "admin"; // Use string union for role safety
  createdAt: Date;
}

/**
 * Define the schema for the User collection.
 * This tells MongoDB how to structure documents in the 'users' collection.
 */
const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, minlength: 6, maxlength: 16 },
    role: {
      type: String,
      enum: ["patient", "admin"],
      default: "patient",
    },
    createdAt: { type: Date, default: Date.now },
  },
  {
    versionKey: false,
  }
);

/**
 * 3️⃣ Export the model.
 * Use `models.User || mongoose.model()` to avoid re-defining the model
 * during hot reload in development mode.
 */
const User = models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
