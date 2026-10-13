import mongoose, { Schema, Document, Model } from "mongoose";

export interface IPublication extends Document {
  id: string;
  title: string;
  authors: string[];
  venue: string;
  year: number;
  type: string;
  doi: string;
  abstract: string;
  citations: number;
  bibtex: string;
  createdAt: Date;
}

const PublicationSchema = new Schema<IPublication>(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    authors: { type: [String], required: true },
    venue: { type: String, required: true },
    year: { type: Number, required: true },
    type: { type: String, required: true },
    doi: { type: String, required: true },
    abstract: { type: String, required: true },
    citations: { type: Number, default: 0 },
    bibtex: { type: String, required: true },
  },
  { timestamps: true }
);

export const PublicationModel: Model<IPublication> =
  mongoose.models.Publication ||
  mongoose.model<IPublication>("Publication", PublicationSchema);
