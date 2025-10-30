"use client";
import Navbar from "@/components/Navbar";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface Slot {
  id: number;
  date: string;
  time: string;
  capacity: number;
  bookedCount: number;
}

export default function ExperienceDetails() {
  const { id } = useParams();
  const router = useRouter();
  const [experience, setExperience] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // UI states
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchExperience = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/experiences/${id}`);
      const data = await res.json();
      setExperience(data);
      setLoading(false);
    };
    if (id) fetchExperience();
  }, [id]);

  const handleBooking = async () => {
    if (!selectedSlot) {
      alert("Please select a time slot first.");
      return;
    }

    const bookingData = {
      name: "John Doe", // temporary for testing
      email: "john@example.com",
      experienceId: experience.id,
      slotId: selectedSlot.id,
      promoCode: null,
      finalPrice: experience.price * quantity + 59,
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });

      const data = await res.json();
      if (res.ok) {
        router.push(`/result?success=true`);
      } else {
        router.push(`/result?success=false&error=${data.error}`);
      }
    } catch (err) {
      console.error(err);
      router.push(`/result?success=false`);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-500">
        Loading...
      </div>
    );

  if (!experience) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-500">
        Experience not found
      </div>
    );
  }

  return (
    <div className="bg-[#F9F9F9] min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 px-[124px] py-8 max-xl:px-[64px] max-lg:px-[32px] max-md:px-6 overflow-y-auto">
        {/* Back button + Title */}
        <div className="flex items-center gap-2 mb-6">
          <Link href="/">
            <ArrowLeft className="w-5 h-5 text-black cursor-pointer" />
          </Link>
          <span className="text-[14px] font-medium text-black">Details</span>
        </div>

        <div className="flex justify-between gap-8 max-lg:flex-col max-lg:gap-6">
          {/* Left side */}
          <div className="flex-1 flex flex-col gap-8">
            {/* Image */}
            <div className="w-full h-[380px] rounded-[12px] overflow-hidden max-md:h-[250px]">
              <img
                src={experience?.image || "/placeholder.jpg"}
                alt={experience?.title}
                width={800}
                height={380}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Description */}
            <div>
              <h1 className="text-[24px] font-medium text-[#161616] mb-2 max-md:text-[20px]">
                {experience.title}
              </h1>
              <p className="text-[16px] text-[#6C6C6C] leading-[24px] max-md:text-[14px]">
                {experience.description}
              </p>
            </div>

            {/* Date selection */}
            <div>
              <p className="text-[18px] font-medium text-[#161616] mb-3 max-md:text-[16px]">
                Choose date
              </p>
              <div className="flex gap-2 flex-wrap">
                {[...new Set(experience.slots.map((s: Slot) => s.date))].map((d, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedDate(d as string)}
                    className={`rounded-[6px] px-4 py-2 border border-[#BDBDBD] transition-colors ${
                      selectedDate === d
                        ? "bg-[#FFD643] hover:bg-[#f5cd3a]"
                        : "bg-white hover:bg-gray-100"
                    } text-[#161616] text-[14px] max-md:text-[12px]`}
                  >
                    {new Date(d as string).toDateString().slice(4, 10)}
                  </button>
                ))}
              </div>
            </div>

            {/* Time selection */}
            <div>
              <p className="text-[18px] font-medium text-[#161616] mb-3 max-md:text-[16px]">
                Choose time
              </p>
              <div className="flex flex-wrap gap-2">
                {experience.slots
                  .filter((s: Slot) => !selectedDate || s.date === selectedDate)
                  .map((slot: Slot) =>
                    slot.bookedCount < slot.capacity ? (
                      <button
                        key={slot.id}
                        onClick={() => setSelectedSlot(slot)}
                        className={`flex items-center gap-1 px-3 py-2 border border-[#BDBDBD] rounded-[6px] transition-colors ${
                          selectedSlot?.id === slot.id
                            ? "bg-[#FFD643]"
                            : "bg-white hover:bg-[#FFF5CC]"
                        }`}
                      >
                        <span className="text-[14px] text-[#161616]">{slot.time}</span>
                        <span className="text-[10px] text-[#FF4C0A] font-medium">
                          {slot.capacity - slot.bookedCount} left
                        </span>
                      </button>
                    ) : (
                      <button
                        key={slot.id}
                        disabled
                        className="flex items-center gap-1 px-3 py-2 bg-[#CCCCCC] rounded-[6px] text-[#838383]"
                      >
                        <span className="text-[14px]">{slot.time}</span>
                        <span className="text-[10px] text-[#6A6A6A] font-medium">
                          Sold out
                        </span>
                      </button>
                    )
                  )}
              </div>
              <p className="text-[12px] text-[#838383] mt-2 max-md:text-[11px]">
                All times are in IST (GMT +5:30)
              </p>
            </div>

            {/* About */}
            <div>
              <p className="text-[18px] font-medium text-[#161616] mb-3 max-md:text-[16px]">
                About
              </p>
              <div className="bg-[#EEEEEE] rounded-[6px] px-3 py-3">
                <p className="text-[13px] text-[#838383] leading-[20px]">
                  Scenic routes, trained guides, and safety briefing. Minimum age 10.
                </p>
              </div>
            </div>
          </div>

          {/* Price card */}
          <div className="w-[387px] h-[303px] bg-[#EFEFEF] rounded-[12px] p-6 flex flex-col justify-between max-lg:w-full">
            <div className="grid grid-cols-2 gap-y-4 text-[16px] text-[#656565] max-md:text-[14px]">
              <span>Price</span>
              <span className="text-right text-[#161616] font-medium">
                ₹{experience.price}
              </span>

              <span>Quantity</span>
              <div className="flex items-center justify-end gap-2">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-1 border rounded hover:bg-gray-200 text-lg"
                >
                  −
                </button>
                <span>{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3 py-1 border rounded hover:bg-gray-200 text-lg"
                >
                  +
                </button>
              </div>

              <span>Subtotal</span>
              <span className="text-right">₹{experience.price * quantity}</span>

              <span>Taxes</span>
              <span className="text-right">₹59</span>
            </div>

            <div className="flex justify-between mt-4 font-medium text-[20px] text-[#161616]">
              <span>Total</span>
              <span>₹{experience.price * quantity + 59}</span>
            </div>

            <button
  onClick={() => {
    if (!selectedSlot || !selectedDate) {
      alert("Please select a date and time first.");
      return;
    }

    const bookingData = {
      experience: experience.title,
      experienceId: experience.id,
      date: selectedDate,
      time: selectedSlot.time,
      qty: quantity,
      subtotal: experience.price * quantity,
      taxes: 59,
      total: experience.price * quantity + 59,
      slotId: selectedSlot.id,
    };

    // Save booking info in localStorage
    localStorage.setItem("selectedBooking", JSON.stringify(bookingData));

    // Give it a moment to persist, then navigate
    setTimeout(() => router.push("/checkout"), 100);
  }}
  className="mt-4 w-full h-[44px] rounded-[8px] bg-[#FFD643] hover:bg-[#ffcc00] text-[#161616] font-medium transition-colors"
>
  Confirm
</button>


          </div>
        </div>
      </main>
    </div>
  );
}
