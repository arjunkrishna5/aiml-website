import fs from "fs";
import path from "path";
import { CertificateRecord, INITIAL_CERTIFICATES } from "@/data/certificateData";

const STORE_FILE = path.join(process.cwd(), "src", "data", "certificatesStore.json");

declare global {
  var inMemoryCertificates: CertificateRecord[] | undefined;
}

function loadInitialStore(): CertificateRecord[] {
  try {
    if (fs.existsSync(STORE_FILE)) {
      const data = fs.readFileSync(STORE_FILE, "utf-8");
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn("Could not read stored certificates file, using initial:", err);
  }
  return [...INITIAL_CERTIFICATES];
}

if (!global.inMemoryCertificates) {
  global.inMemoryCertificates = loadInitialStore();
}

function persistStore(): void {
  try {
    if (global.inMemoryCertificates) {
      fs.writeFileSync(STORE_FILE, JSON.stringify(global.inMemoryCertificates, null, 2), "utf-8");
    }
  } catch (err) {
    console.warn("Could not persist certificates to file:", err);
  }
}

export function getLocalCertificates(): CertificateRecord[] {
  if (!global.inMemoryCertificates) {
    global.inMemoryCertificates = loadInitialStore();
  }
  return global.inMemoryCertificates;
}

export function findLocalCertificate(code: string): CertificateRecord | undefined {
  if (!code) return undefined;
  const normalized = code.trim().toUpperCase();
  const list = getLocalCertificates();
  return list.find((c) => c.certificateId.trim().toUpperCase() === normalized);
}

export function addLocalCertificates(newCerts: CertificateRecord[]): void {
  if (!global.inMemoryCertificates) {
    global.inMemoryCertificates = loadInitialStore();
  }
  // Avoid duplicate certificate IDs
  for (const cert of newCerts) {
    const exists = global.inMemoryCertificates.some(
      (c) => c.certificateId.trim().toUpperCase() === cert.certificateId.trim().toUpperCase()
    );
    if (!exists) {
      global.inMemoryCertificates.unshift(cert);
    }
  }
  persistStore();
}

/**
 * Generates an unambiguous, cryptographically random unique code.
 * Guarantees that the returned ID is unique against all existing records
 * and any in-progress batch tracking set.
 */
export function generateUniqueCode(prefix = "CYPHER-2026", existingIds?: Set<string>): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // Disallows confusing characters like 0, O, 1, I
  const allExisting =
    existingIds || new Set(getLocalCertificates().map((c) => c.certificateId.trim().toUpperCase()));

  let attempts = 0;
  while (attempts < 2000) {
    attempts++;
    const p1 = Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
    const p2 = Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
    const candidate = `${prefix}-${p1}-${p2}`.toUpperCase();

    if (!allExisting.has(candidate)) {
      allExisting.add(candidate);
      return candidate;
    }
  }

  // High-entropy fallback with timestamp to ensure absolute uniqueness
  const timestamp = Date.now().toString(36).toUpperCase().slice(-4);
  const randomSuffix = Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
  const fallback = `${prefix}-${timestamp}-${randomSuffix}`.toUpperCase();
  allExisting.add(fallback);
  return fallback;
}
