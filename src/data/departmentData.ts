export interface FacultyMember {
  id: string;
  name: string;
  role: string;
  domain: string;
  category: "Computer Vision" | "LLMs & NLP" | "Robotics & RL" | "Edge AI & MLOps" | "Foundations";
  qualification: string;
  email: string;
  office: string;
  googleScholar: string;
  bio: string;
  citations: number;
  papersCount: number;
}

export interface ResearchPaper {
  id: string;
  title: string;
  authors: string[];
  venue: string;
  year: number;
  type: "Journal" | "Conference" | "Patent" | "Preprint";
  doi: string;
  abstract: string;
  citations: number;
  bibtex: string;
}

export interface DepartmentEvent {
  id: string;
  title: string;
  tagline: string;
  date: string;
  status: "upcoming" | "past";
  category: "Hackathon" | "Workshop" | "Symposium" | "Guest Lecture";
  venue: string;
  registrationOpen: boolean;
  prizePool?: string;
  attendees?: string;
  winners?: string;
  description: string;
}

export interface ProjectDetail {
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
}

export const FACULTY_DATA: FacultyMember[] = [
  {
    id: "dr-ananya-sharma",
    name: "Dr. Ananya Sharma",
    role: "Professor & Head of Department",
    domain: "Neural Representations & Generative AI",
    category: "LLMs & NLP",
    qualification: "Ph.D. in Computer Science (IISc Bangalore)",
    email: "hod.aiml@college.edu",
    office: "Room 401, Computing Science Block",
    googleScholar: "https://scholar.google.com",
    bio: "Pioneering research in parameter-efficient fine-tuning (PEFT) and multi-agent coordination frameworks with over 15 years of academic leadership.",
    citations: 1420,
    papersCount: 38,
  },
  {
    id: "dr-rajesh-menon",
    name: "Dr. Rajesh Menon",
    role: "Associate Professor",
    domain: "Spatial Intelligence & Real-time Vision",
    category: "Computer Vision",
    qualification: "Ph.D. in Signal Processing (IIT Madras)",
    email: "rajesh.menon@college.edu",
    office: "Room 405, AI Vision Lab",
    googleScholar: "https://scholar.google.com",
    bio: "Focusing on 3D Gaussian Splatting, NeRFs, and low-latency transformer architectures for edge cameras and autonomous navigation.",
    citations: 980,
    papersCount: 26,
  },
  {
    id: "dr-priya-nair",
    name: "Dr. Priya Nair",
    role: "Associate Professor",
    domain: "Knowledge Graphs & Retrieval-Augmented LLMs",
    category: "LLMs & NLP",
    qualification: "Ph.D. in Artificial Intelligence (IIIT Hyderabad)",
    email: "priya.nair@college.edu",
    office: "Room 408, NLP Research Facility",
    googleScholar: "https://scholar.google.com",
    bio: "Investigating hallucination mitigation in language models through structured ontological knowledge graphs and neurosymbolic reasoning.",
    citations: 740,
    papersCount: 21,
  },
  {
    id: "prof-arun-varma",
    name: "Prof. Arun Varma",
    role: "Assistant Professor & Robotics Lead",
    domain: "Autonomous Robotics & Reinforcement Learning",
    category: "Robotics & RL",
    qualification: "M.Tech in Robotics (IIT Bombay), Ph.D. Scholar",
    email: "arun.varma@college.edu",
    office: "Robotics & Autonomous Systems Lab (Ground Floor)",
    googleScholar: "https://scholar.google.com",
    bio: "Directs the quadruped locomotion initiative and sim-to-real policy transfers using NVIDIA Isaac Sim and ROS 2 hardware stacks.",
    citations: 510,
    papersCount: 14,
  },
  {
    id: "dr-sneha-paul",
    name: "Dr. Sneha Paul",
    role: "Assistant Professor",
    domain: "Embedded AI & Distributed MLOps",
    category: "Edge AI & MLOps",
    qualification: "Ph.D. in Embedded Systems (NIT Calicut)",
    email: "sneha.paul@college.edu",
    office: "Room 412, Edge Hardware Cluster",
    googleScholar: "https://scholar.google.com",
    bio: "Specializing in 4-bit INT4 quantization, TensorRT acceleration, and energy-efficient edge accelerators for industrial IoT.",
    citations: 430,
    papersCount: 17,
  },
];

export const RESEARCH_PAPERS: ResearchPaper[] = [
  {
    id: "paper-1",
    title: "Latent-LoRA: Parameter-Efficient SVD Adaptations for Low-Resource Edge LLMs",
    authors: ["Dr. Ananya Sharma", "Karthik R.", "Dr. Sneha Paul"],
    venue: "IEEE Transactions on Neural Networks & Learning Systems (TNNLS)",
    year: 2026,
    type: "Journal",
    doi: "10.1109/TNNLS.2026.1049281",
    citations: 42,
    abstract: "We introduce Latent-LoRA, a matrix decomposition technique that reduces KV-cache bandwidth requirements by 43% on edge GPUs while retaining 99.2% of full-rank generative benchmark performance.",
    bibtex: `@article{sharma2026latent,
  title={Latent-LoRA: Parameter-Efficient SVD Adaptations for Low-Resource Edge LLMs},
  author={Sharma, Ananya and Karthik, R. and Paul, Sneha},
  journal={IEEE TNNLS},
  year={2026},
  doi={10.1109/TNNLS.2026.1049281}
}`,
  },
  {
    id: "paper-2",
    title: "Real-Time 3D Gaussian Splatting for Quadruped Robot Navigation in Unstructured Environments",
    authors: ["Dr. Rajesh Menon", "Prof. Arun Varma", "Siddharth N."],
    venue: "IEEE/RSJ International Conference on Intelligent Robots and Systems (IROS)",
    year: 2025,
    type: "Conference",
    doi: "10.1109/IROS.2025.9928172",
    citations: 31,
    abstract: "This work demonstrates an onboard rasterization engine running on Jetson AGX Orin at 62 FPS, converting stereoscopic video into dense 3D radiance fields for collision-free path planning.",
    bibtex: `@inproceedings{menon2025splatting,
  title={Real-Time 3D Gaussian Splatting for Quadruped Robot Navigation},
  author={Menon, Rajesh and Varma, Arun and Siddharth, N.},
  booktitle={IEEE/RSJ IROS},
  year={2025},
  doi={10.1109/IROS.2025.9928172}
}`,
  },
  {
    id: "paper-3",
    title: "Neuro-Symbolic Fact Verification in Medical RAG Systems Using Epistemic Knowledge Graphs",
    authors: ["Dr. Priya Nair", "Meera Krishnan"],
    venue: "Springer Journal of Artificial Intelligence Research",
    year: 2025,
    type: "Journal",
    doi: "10.1007/s10462-025-08129-x",
    citations: 18,
    abstract: "A dual-stage verification framework that checks language model output logits against formalized ontologies, eliminating clinical hallucinations in automated diagnosis queries.",
    bibtex: `@article{nair2025neurosymbolic,
  title={Neuro-Symbolic Fact Verification in Medical RAG Systems},
  author={Nair, Priya and Krishnan, Meera},
  journal={Springer JAIR},
  year={2025},
  doi={10.1007/s10462-025-08129-x}
}`,
  },
  {
    id: "paper-4",
    title: "System and Method for Hardware-Level Dynamic Neural Quantization in Edge Sensors",
    authors: ["Dr. Sneha Paul", "Dr. Ananya Sharma"],
    venue: "Indian Patent Office (Granted)",
    year: 2024,
    type: "Patent",
    doi: "IN-PAT-2024-410928",
    citations: 8,
    abstract: "A patented circuit method dynamically switching between FP8 and INT4 precision based on thermal limits and input noise in battery-operated IoT vision modules.",
    bibtex: `@patent{paul2024dynamic,
  title={System and Method for Hardware-Level Dynamic Neural Quantization},
  author={Paul, Sneha and Sharma, Ananya},
  number={IN-PAT-2024-410928},
  year={2024}
}`,
  },
];

export const DEPARTMENT_EVENTS: DepartmentEvent[] = [
  {
    id: "hack-ai-2026",
    title: "HACK-AI 2026: Autonomous Systems & Neural Agents",
    tagline: "36-Hour National Level AI Hackathon",
    date: "Nov 14–15, 2026",
    status: "upcoming",
    category: "Hackathon",
    venue: "Advanced Computing Lab, Block 4",
    registrationOpen: true,
    prizePool: "₹1,50,000+",
    description: "Build real autonomous perception pipelines, multi-agent frameworks, and robotic control systems with industry mentors from top tech companies.",
  },
  {
    id: "nvidia-dli-workshop",
    title: "Hands-on Accelerated Computing with NVIDIA TensorRT",
    tagline: "NVIDIA Deep Learning Institute Certified Workshop",
    date: "Dec 05, 2026",
    status: "upcoming",
    category: "Workshop",
    venue: "GPU High Performance Computing Cluster",
    registrationOpen: true,
    description: "Hands-on session covering model pruning, INT8 calibration, and kernel optimization directly on NVIDIA RTX workstations.",
  },
  {
    id: "ai-symposium-2025",
    title: "AI Horizon: National Symposium on Frontier Models",
    tagline: "Annual Academic Research & Industry Colloquium",
    date: "March 22, 2025",
    status: "past",
    category: "Symposium",
    venue: "Main College Auditorium",
    registrationOpen: false,
    attendees: "600+ Participants",
    description: "Featured keynote speakers from Google DeepMind, NVIDIA, and top AI research institutes discussing world models and robotics.",
  },
  {
    id: "yodha-hackathon-2024",
    title: "YODHA 2.0: National AI & Data Science Challenge",
    tagline: "48-Hour National AI Sprint",
    date: "October 18–19, 2024",
    status: "past",
    category: "Hackathon",
    venue: "Department Innovation Arena",
    registrationOpen: false,
    winners: "1st Prize: Team NeuroPulse (IIT Madras) • 2nd: Team CyberVision (JECC)",
    prizePool: "₹1,00,000",
    description: "Over 120 teams from across the country competed in autonomous navigation, medical imaging diagnosis, and financial forecasting tracks.",
  },
];

export const PROJECTS_DATA: Record<string, ProjectDetail> = {
  neurocampus: {
    slug: "neurocampus",
    title: "NeuroCampus: Multimodal Academic Copilot",
    tagline: "Fine-tuned LLaMA 3.3 model trained on department syllabus, research notes, and live campus schedules.",
    category: "LLMs & Agentic Systems",
    status: "Production",
    accentColor: "#00F0FF",
    stats: "2,400+ Active Students",
    summary: "NeuroCampus is the flagship student copilot developed in the AI Lab. It solves the fragmentation of college information by ingesting syllabi, lecture transcripts, timetable updates, and academic notices into a low-latency vector search engine paired with a localized LLaMA 3.3 instance.",
    problemStatement: "Traditional college websites and portals require students to dig through dozens of unstructured PDF documents and circulars to find exam dates, syllabus rubrics, or lab availability.",
    architecture: [
      "Document ingestion pipeline using Unstructured.io and chunking with semantic boundaries.",
      "Vector embeddings computed via BAAI/bge-m3 and indexed inside Qdrant Vector DB.",
      "vLLM inference server deployed on an in-house NVIDIA RTX 4090 workstation with INT4 AWQ quantization.",
      "Next.js App Router frontend with streaming SSE (Server-Sent Events) chat interface.",
    ],
    techStack: ["Next.js 16", "vLLM", "Qdrant", "Python FastAPI", "LangGraph", "Tailwind CSS"],
    hardwareSpecs: ["NVIDIA RTX 4090 24GB VRAM", "64GB DDR5 RAM", "Ubuntu Server 24.04 LTS"],
    teamMembers: [
      { name: "Aditya V.", role: "Lead Systems Architect & ML Engineer" },
      { name: "Sneha Nair", role: "Frontend & Streaming UX Engineer" },
      { name: "Rahul Joseph", role: "Data Pipeline & RAG Specialist" },
    ],
    githubUrl: "https://github.com",
  },
  visioneye: {
    slug: "visioneye",
    title: "VisionEye Edge Tracker",
    tagline: "Real-time edge computer vision model monitoring GPU cluster occupancy and lab workstation availability.",
    category: "Edge Computer Vision",
    status: "Live Beta",
    accentColor: "#00F0FF",
    stats: "98.4% Accuracy",
    summary: "VisionEye provides live telemetry on lab seating, GPU workstation usage, and hardware lab occupancy without infringing on privacy. It utilizes edge vision cameras connected directly to Jetson Orin microcomputers, running on-device object detection.",
    problemStatement: "Students often walked to the high-performance computing lab only to find every GPU workstation occupied, creating queues and inefficiency during project submission deadlines.",
    architecture: [
      "Custom-trained YOLOv11 nano model fine-tuned on lab seating ergonomics and workstation posture.",
      "TensorRT optimization for sub-12ms inference latency directly on Jetson Orin Nano hardware.",
      "Privacy-first edge pipeline: No video frames leave the device; only numerical occupancy matrices are published via WebSockets.",
      "Real-time WebSocket dashboard rendered with Tailwind and Canvas graphs.",
    ],
    techStack: ["YOLOv11", "TensorRT", "OpenCV", "Jetson Orin Nano", "FastAPI WebSockets"],
    hardwareSpecs: ["NVIDIA Jetson Orin Nano 8GB", "Sony IMX477 Wide Camera", "Gigabit PoE"],
    teamMembers: [
      { name: "Nikhil K.", role: "Computer Vision & Edge Optimization Lead" },
      { name: "Deepak S.", role: "IoT Hardware & Network Engineer" },
    ],
    githubUrl: "https://github.com",
  },
  paperpulse: {
    slug: "paperpulse",
    title: "PaperPulse Research Hub",
    tagline: "Automated arXiv and IEEE ingestion pipeline tracking department research citations, h-index, and author metrics.",
    category: "Academic Analytics",
    status: "Production",
    accentColor: "#8B5CF6",
    stats: "65+ Indexed Papers",
    summary: "PaperPulse automated the tedious manual process of tracking faculty publications. By querying arXiv, CrossRef, and OpenAlex APIs nightly, it computes accurate citation statistics, author graphs, and automatically extracts standardized BibTeX entries.",
    problemStatement: "Accreditation audits and annual faculty appraisals relied on manually compiled Word documents and spreadsheets, which were prone to outdated citation metrics and missing DOIs.",
    architecture: [
      "Daily automated cron workers querying OpenAlex and CrossRef APIs for department author ORCIDs.",
      "BibTeX parser generating clean, copy-pasteable citation snippets with zero syntax errors.",
      "PostgreSQL database with Prisma ORM indexing publication categories, impact factors, and citations.",
      "Interactive analytics dashboard visualizing department publication velocity over 5 years.",
    ],
    techStack: ["Node.js", "Prisma", "PostgreSQL", "OpenAlex API", "Next.js"],
    hardwareSpecs: ["Cloud Hosted Vercel + Neon Serverless Postgres"],
    teamMembers: [
      { name: "Rohan Thomas", role: "Full-Stack Engineer & Database Architect" },
      { name: "Anjali Menon", role: "API Integration & Analytics Specialist" },
    ],
    githubUrl: "https://github.com",
  },
  "simrl-quad": {
    slug: "simrl-quad",
    title: "SimRL: Autonomous Robotics Sandbox",
    tagline: "Reinforcement learning environment for quadruped robot locomotion, obstacle avoidance, and Sim-to-Real hardware transfer.",
    category: "Robotics & RL",
    status: "Hardware Lab",
    accentColor: "#EC4899",
    stats: "ROS 2 Verified",
    summary: "SimRL bridges virtual simulation and physical hardware for four-legged quadruped robots. Using NVIDIA Isaac Sim and Proximal Policy Optimization (PPO), robotic policies learn to walk across uneven terrain in simulation before zero-shot deployment onto physical quadruped actuators.",
    problemStatement: "Training reinforcement learning models directly on physical robots causes hardware wear, motor burnout, and slow training iterations.",
    architecture: [
      "High-fidelity physics simulation in NVIDIA Isaac Sim running thousands of parallel environments.",
      "PPO policy network trained in PyTorch with domain randomization for friction and motor delays.",
      "ROS 2 micro-agent communicating commands to STM32 brushless motor controllers over CAN bus.",
      "Real-time sensor telemetry and joint angle logging via Foxglove Studio.",
    ],
    techStack: ["NVIDIA Isaac Sim", "PyTorch", "ROS 2 Humble", "C++", "CAN Bus Protocol"],
    hardwareSpecs: ["Custom 12-DOF Quadruped Frame", "Unitree A1 Actuators", "Jetson Orin NX 16GB"],
    teamMembers: [
      { name: "Kiran Pillai", role: "Robotics Systems & Kinematics Lead" },
      { name: "Suraj Roy", role: "Reinforcement Learning & Sim-to-Real Engineer" },
    ],
    githubUrl: "https://github.com",
  },
};
