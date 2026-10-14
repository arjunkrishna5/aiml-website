export interface CertificateRecord {
  certificateId: string;
  name: string;
  date: string;
  event: string;
  role?: string;
  issuer?: string;
  issuedAt?: string;
}

export const INITIAL_CERTIFICATES: CertificateRecord[] = [
  {
    certificateId: "CYPHER-2026-WIN-001",
    name: "Rahul V. Nair",
    date: "2026-03-22",
    event: "CYPHER 2.0 National Flagship Hackathon",
    role: "First Prize Winner — Computer Vision Track",
    issuer: "CYPHER — Department of AIML, NCERC",
    issuedAt: "2026-03-22T17:00:00Z",
  },
  {
    certificateId: "CYPHER-2026-MERIT-042",
    name: "Devika Krishna",
    date: "2026-02-14",
    event: "State-Level AI Symposium & Paper Presentation",
    role: "Best Research Paper Presentation",
    issuer: "CYPHER — Department of AIML, NCERC",
    issuedAt: "2026-02-14T16:30:00Z",
  },
  {
    certificateId: "CYPHER-2026-PART-108",
    name: "Mohammed Farhan",
    date: "2026-01-28",
    event: "Hands-on Edge AI & Deep Learning Masterclass",
    role: "Certificate of Active Participation",
    issuer: "CYPHER — Department of AIML, NCERC",
    issuedAt: "2026-01-28T18:00:00Z",
  },
  {
    certificateId: "CYPHER-2026-DEMO-777",
    name: "Anandakrishnan",
    date: "2026-04-10",
    event: "CYPHER Autonomous Systems & LLM Summit",
    role: "Outstanding Innovation & Technical Excellence",
    issuer: "CYPHER — Department of AIML, NCERC",
    issuedAt: "2026-04-10T15:00:00Z",
  },
];
