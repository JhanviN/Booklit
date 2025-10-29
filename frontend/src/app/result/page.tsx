"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ExperienceCard from "@/components/ExperienceCard";
import Navbar from "@/components/Navbar";
import { Experience } from "@/types";

export default function SearchResultPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const [results, setResults] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query) return;

    const fetchResults = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/experiences?query=${encodeURIComponent(
            query
          )}`
        );
        if (!res.ok) throw new Error("Failed to fetch search results");
        const data = await res.json();
        setResults(data);
      } catch (err) {
        setError("Something went wrong while searching.");
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  return (
    <div>
      <Navbar />
      <main className="px-6 py-8">
        <h1 className="text-2xl font-semibold mb-6">
          Search results for “{query}”
        </h1>

        {loading ? (
          <p className="text-gray-500">Loading results...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : results.length === 0 ? (
          <p className="text-gray-500">No experiences found.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {results.map((exp) => (
              <ExperienceCard key={exp.id} {...exp} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
