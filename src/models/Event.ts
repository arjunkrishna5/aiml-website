import mongoose, { Schema, Document, Model } from "mongoose";

export interface IEvent extends Document {
  id: string;
  title: string;
  tagline: string;
  date: string;
  status: "upcoming" | "past";
  category: string;
  venue: string;
  registrationOpen: boolean;
  prizePool?: string;
  attendees?: string;
  winners?: string;
  description: string;
  createdAt: Date;
}

const EventSchema = new Schema<IEvent>(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    tagline: { type: String, required: true },
    date: { type: String, required: true },
    status: { type: String, enum: ["upcoming", "past"], required: true },
    category: { type: String, required: true },
    venue: { type: String, required: true },
    registrationOpen: { type: Boolean, default: false },
    prizePool: { type: String },
    attendees: { type: String },
    winners: { type: String },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

export const EventModel: Model<IEvent> =
  mongoose.models.Event || mongoose.model<IEvent>("Event", EventSchema);
