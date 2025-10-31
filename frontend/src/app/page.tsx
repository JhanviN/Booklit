

"use client";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import ExperienceCard from "@/components/ExperienceCard";
import { Experience } from "@/types";
import { fetchExperiences } from "@/utils/api";

export default function HomePage() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchExperiences();
        setExperiences(data);
      } catch (err) {
        setError("Failed to load experiences.");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  return (
    <div>
      <Navbar />
      <main className="px-6 py-8">
        {loading ? (
          <p className="text-center text-gray-500">Loading experiences...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          // <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          //   {experiences.map((exp) => (
          //     <ExperienceCard key={exp.id} {...exp} />
          //   ))}
          // </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5 lg:gap-6 px-2 sm:px-4">
  {experiences.map((exp) => (
    <ExperienceCard key={exp.id} {...exp} />
  ))}
</div>

        )}
      </main>
    </div>
  );
}
