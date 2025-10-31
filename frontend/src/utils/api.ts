const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") || "http://localhost:5000";

export async function fetchExperiences() {
  try {
    const res = await fetch(`${BASE_URL}/experiences`, {
      cache: "no-store", // Ensures fresh data each time
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch experiences: ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching experiences:", error);
    return [];
  }
}
