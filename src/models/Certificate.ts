import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICertificate extends Document {
  certificateId: string;
  name: string;
  date: string;
  event: string;
  role?: string;
  issuer: string;
  issuedAt: Date;
  createdAt: Date;
}

const CertificateSchema = new Schema<ICertificate>(
  {
    certificateId: { type: String, required: true, unique: true, uppercase: true, trim: true },
    name: { type: String, required: true, trim: true },
    date: { type: String, required: true, trim: true },
    event: { type: String, required: true, trim: true },
    role: { type: String, default: "Certificate of Achievement" },
    issuer: { type: String, default: "CYPHER — Department of AIML, NCERC" },
    issuedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const CertificateModel: Model<ICertificate> =
  mongoose.models.Certificate || mongoose.model<ICertificate>("Certificate", CertificateSchema);
