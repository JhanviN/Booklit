// import Navbar from "@/components/Navbar";
// import ExperienceCard from "@/components/ExperienceCard";
// import { Experience } from "@/types";

// const experiences: Experience[] = [
//   {
//     id: "1",
//     title: "Kayaking",
//     description:
//       "Curated small-group experience. Certified guide. Safety first with gear included.",
//     location: "Udupi",
//     image: "/images/kayak1.jpg",
//     price: 999,
//     availableDates: [],
//     slots: [],
//   },
//   {
//     id: "2",
//     title: "Nandi Hills Sunrise",
//     description: "Curated small-group experience. Certified guide. Safety first with gear included.",
//     location: "Bangalore",
//     image: "/images/nandi.jpg",
//     price: 899,
//     availableDates: [],
//     slots: [],
//   },
//   {
//     id: "3",
//     title: "Coffee Trail",
//     description: "Certified guide. Safety first with gear included.",
//     location: "Coorg",
//     image: "/images/coffee.jpg",
//     price: 1299,
//     availableDates: [],
//     slots: [],
//   },
//   // Add more as needed
// ];

// export default function HomePage() {
//   return (
//     <div>
//       <Navbar />

//       <main className="px-6 py-8">
//         <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//           {experiences.map((exp) => (
//             <ExperienceCard key={exp.id} {...exp} />
//           ))}
//         </div>
//       </main>
//     </div>
//   );
// }


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
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {experiences.map((exp) => (
              <ExperienceCard key={exp.id} {...exp} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
