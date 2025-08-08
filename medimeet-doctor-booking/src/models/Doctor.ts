import mongoose, { Model, Document, Schema } from "mongoose";

export interface IDoctor extends Document {
  userId: mongoose.Types.ObjectId;
  specialization: string;
  bio?: string;
  experienceYears?: number;
  availableDays?: string[];
  timeSlots?: {
    day: string;
    slots: { start: string; end: string }[];
  }[];
}

const doctorSchema: Schema<IDoctor> = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  specialization: { type: String, required: true },
  bio: String,
  experienceYears: Number,
  availableDays: [String],
  timeSlots: [
    {
      day: String,
      slots: [
        {
          start: String,
          end: String,
        },
      ],
    },
  ],
});

const Doctor: Model<IDoctor> =
  mongoose.models.Doctor || mongoose.model<IDoctor>("Doctor", doctorSchema);
export default Doctor;
