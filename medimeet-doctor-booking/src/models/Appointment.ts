//src/models/Appointment.ts
import mongoose, { Schema, Model, Document } from "mongoose";

export interface IAppointment extends Document {
  doctorId: mongoose.Types.ObjectId;
  patientId: mongoose.Types.ObjectId;
  date: string; // or Date
  time: string;
  status?: "pending" | "confirmed" | "cancelled";
}

const appointmentSchema: Schema<IAppointment> = new Schema({
  doctorId: { type: Schema.Types.ObjectId, ref: "Doctor", required: true },
  patientId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  status: {
    type: String,
    enum: ["pending", "confirmed", "cancelled"],
    default: "pending",
  },
});

const Appointment: Model<IAppointment> =
  mongoose.models.Appointment ||
  mongoose.model<IAppointment>("Appointment", appointmentSchema);

export default Appointment;
