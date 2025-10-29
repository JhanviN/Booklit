"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
interface Slot {
  id: number;
  date: string;
  time: string;
  capacity: number;
  bookedCount: number;
}

interface Experience {
  id: number;
  title: string;
  location: string;
  description: string;
  price: number;
  image: string;
  slots: Slot[];
}

export default function ExperienceDetails() {
  const { id } = useParams();
  const router = useRouter();
  const [experience, setExperience] = useState<Experience | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/experiences/${id}`);
        if (!res.ok) throw new Error("Failed to fetch experience details");
        const data = await res.json();
        setExperience(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchExperience();
  }, [id]);

  if (loading)
    return <p className="text-center text-gray-500 py-8">Loading experience...</p>;

  if (error)
    return <p className="text-center text-red-500 py-8">Error: {error}</p>;

  if (!experience)
    return <p className="text-center text-gray-600 py-8">Experience not found.</p>;

  return (
    <div>
      <Navbar />
    <main className="flex flex-col items-center px-[124px] py-8 max-md:px-6">
      {/* Header Image */}
      <img
        src={experience.image}
        alt={experience.title}
        className="w-full max-w-4xl h-80 object-cover rounded-xl shadow-md"
      />

      {/* Details Section */}
      <section className="max-w-4xl w-full mt-6 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">{experience.title}</h1>
          <span className="bg-gray-200 text-gray-700 text-sm font-medium px-3 py-1 rounded-md">
            {experience.location}
          </span>
        </div>

        <p className="text-gray-600 text-sm leading-relaxed">{experience.description}</p>

        <h2 className="text-lg font-medium mt-4 text-gray-800">Available Slots</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
          {experience.slots.map((slot) => (
            <div
              key={slot.id}
              className={`border rounded-lg p-3 text-center text-sm ${
                slot.capacity - slot.bookedCount > 0
                  ? "border-gray-300 hover:bg-yellow-100 cursor-pointer"
                  : "border-red-300 bg-red-50 text-red-500"
              }`}
            >
              <p>{new Date(slot.date).toLocaleDateString()}</p>
              <p>{slot.time}</p>
              <p>
                {slot.capacity - slot.bookedCount > 0
                  ? `${slot.capacity - slot.bookedCount} slots left`
                  : "Sold Out"}
              </p>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center mt-6">
          <p className="text-gray-800 text-lg font-semibold">
            ₹{experience.price.toFixed(0)}
          </p>
          <button
            onClick={() => router.push(`/checkout/${experience.id}`)}
            className="bg-[#FFD643] text-[#161616] font-medium text-sm px-4 py-2 rounded-md hover:bg-yellow-400 transition"
          >
            Continue to Checkout
          </button>
        </div>
      </section>
    </main>
    </div>
  );
}
