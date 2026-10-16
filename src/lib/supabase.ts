import { createClient } from "@supabase/supabase-js";
import ws from "ws";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || supabaseAnonKey;

// Realtime transport for Node.js runtime
const realtimeConfig = typeof window === "undefined" ? { realtime: { transport: ws as any } } : undefined;

// Client for public operations
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  ...realtimeConfig,
  auth: {
    persistSession: typeof window !== "undefined",
    autoRefreshToken: typeof window !== "undefined",
  },
});

// Admin client for backend operations (session storage disabled to eliminate multiple GoTrueClient warnings)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  ...realtimeConfig,
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});
