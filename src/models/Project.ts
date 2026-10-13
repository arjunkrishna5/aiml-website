import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProject extends Document {
  slug: string;
  title: string;
  tagline: string;
  category: string;
  status: string;
  accentColor: string;
  stats: string;
  summary: string;
  problemStatement: string;
  architecture: string[];
  techStack: string[];
  hardwareSpecs: string[];
  teamMembers: { name: string; role: string }[];
  githubUrl: string;
  createdAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    tagline: { type: String, required: true },
    category: { type: String, required: true },
    status: { type: String, required: true },
    accentColor: { type: String, default: "#00F0FF" },
    stats: { type: String, required: true },
    summary: { type: String, required: true },
    problemStatement: { type: String, required: true },
    architecture: { type: [String], required: true },
    techStack: { type: [String], required: true },
    hardwareSpecs: { type: [String], required: true },
    teamMembers: [
      {
        name: { type: String, required: true },
        role: { type: String, required: true },
      },
    ],
    githubUrl: { type: String, default: "" },
  },
  { timestamps: true }
);

export const ProjectModel: Model<IProject> =
  mongoose.models.Project || mongoose.model<IProject>("Project", ProjectSchema);
