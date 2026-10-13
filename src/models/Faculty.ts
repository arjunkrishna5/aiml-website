import mongoose, { Schema, Document, Model } from "mongoose";

export interface IFaculty extends Document {
  id: string;
  name: string;
  role: string;
  domain: string;
  category: string;
  qualification: string;
  email: string;
  office: string;
  googleScholar: string;
  bio: string;
  citations: number;
  papersCount: number;
  createdAt: Date;
}

const FacultySchema = new Schema<IFaculty>(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    role: { type: String, required: true },
    domain: { type: String, required: true },
    category: { type: String, required: true },
    qualification: { type: String, required: true },
    email: { type: String, required: true },
    office: { type: String, required: true },
    googleScholar: { type: String, default: "" },
    bio: { type: String, required: true },
    citations: { type: Number, default: 0 },
    papersCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const FacultyModel: Model<IFaculty> =
  mongoose.models.Faculty || mongoose.model<IFaculty>("Faculty", FacultySchema);
