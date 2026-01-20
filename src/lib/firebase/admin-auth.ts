import { getAdminAuth } from "@/lib/firebase/admin";

function parseAdminEmails(): Set<string> {
  const raw = process.env.ADMIN_EMAILS || "";
  return new Set(
    raw
      .split(",")
      .map((email) => email.trim().toLowerCase())
      .filter(Boolean)
  );
}

export async function verifyAdmin(idToken: string) {
  const auth = getAdminAuth();
  const decoded = await auth.verifyIdToken(idToken);
  const admins = parseAdminEmails();

  if (!decoded.email) {
    throw new Error("Missing email on token.");
  }

  const isAdmin = admins.has(decoded.email.toLowerCase());
  if (!isAdmin) {
    throw new Error("Not authorized.");
  }

  return decoded;
}
