const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export async function fetchExperiences() {
  const res = await fetch(`${BASE_URL}/experiences`);
  if (!res.ok) throw new Error("Failed to fetch experiences");
  return res.json();
}
