"use client";
import Navbar from "@/components/Navbar"; 
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ExperienceDetails() {
  const { id } = useParams();
  const [experience, setExperience] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call (replace with real backend later)
    const fetchExperience = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/experiences/${id}`);
      const data = await res.json();
      setExperience(data);
      setLoading(false);
    };
    if (id) fetchExperience();
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-500">
        Loading...
      </div>
    );
  if (!experience) {
  return (
    <div className="flex justify-center items-center min-h-screen text-gray-500">
      Loading...
    </div>
  );
}

  return (
    <div>
      <Navbar />
    <div className="px-[124px] pt-6 pb-12 bg-[#F9F9F9] min-h-screen max-xl:px-[64px] max-lg:px-[32px] max-md:px-6">
      {/* Back button + Details */}
      <div className="flex items-center gap-2 mb-6">
        <Link href="/">
          <ArrowLeft className="w-5 h-5 text-black cursor-pointer" />
        </Link>
        <span className="text-[14px] font-medium text-black">Details</span>
      </div>

      {/* Top section */}
      <div className="flex justify-between gap-8 max-lg:flex-col max-lg:gap-6">
        {/* Left: Experience image */}
        <div className="w-[765px] h-[381px] rounded-[12px] overflow-hidden max-lg:w-full max-md:h-[280px]">
          <Image
            src={experience?.image || "/placeholder.jpg"}
            alt={experience?.title || "Experience"}
            width={765}
            height={381}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right: Price card */}
        <div
          className="w-[387px] h-[303px] bg-[#EFEFEF] rounded-[12px] p-6 flex flex-col justify-between
          max-lg:w-full max-md:h-auto max-md:gap-4"
        >
          {/* Price details */}
          <div className="grid grid-cols-2 gap-y-5 text-[16px] text-[#656565] max-md:text-[14px]">
            <span>Starts at</span>
            <span className="text-right text-[#161616] font-medium">
              ₹{experience?.price}
            </span>

            <span>Quantity</span>
            <div className="flex items-center justify-end gap-2">
              <button className="px-2 py-1 border rounded hover:bg-gray-200">−</button>
              <span>1</span>
              <button className="px-2 py-1 border rounded hover:bg-gray-200">+</button>
            </div>

            <span>Subtotal</span>
            <span className="text-right">₹{experience?.price}</span>

            <span>Taxes</span>
            <span className="text-right">₹59</span>
          </div>

          {/* Total */}
          <div className="flex justify-between font-medium text-[20px] text-[#161616] max-md:text-[18px]">
            <span>Total</span>
            <span>₹{experience?.price + 59}</span>
          </div>

          {/* Confirm button */}
          <button
            disabled
            className="mt-4 w-full h-[44px] rounded-[8px] bg-[#D7D7D7] text-[#161616] font-medium cursor-not-allowed"
          >
            Confirm
          </button>
        </div>
      </div>

      {/* Bottom section */}
      <div className="mt-12 w-[765px] flex flex-col gap-8 max-lg:w-full">
        {/* Title + Description */}
        <div>
          <h1 className="text-[24px] font-medium text-[#161616] mb-2 max-md:text-[20px]">
            {experience?.title}
          </h1>
          <p className="text-[16px] text-[#6C6C6C] leading-[24px] max-md:text-[14px]">
            {experience?.description}
          </p>
        </div>

        {/* Choose date */}
        <div>
          <p className="text-[18px] font-medium text-[#161616] mb-3 max-md:text-[16px]">
            Choose date
          </p>
          <div className="flex gap-2 flex-wrap">
            {["Oct 22", "Oct 23", "Oct 24", "Oct 25", "Oct 26"].map((d, i) => (
              <button
                key={i}
                className={`rounded-[4px] px-3 py-2 border border-[#BDBDBD] ${
                  i === 0 ? "bg-[#FFD643]" : "bg-white"
                } text-[#161616] text-[14px] max-md:text-[12px]`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* Choose time */}
        <div>
          <p className="text-[18px] font-medium text-[#161616] mb-3 max-md:text-[16px]">
            Choose time
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              { time: "07:00 am", left: 4 },
              { time: "09:00 am", left: 2 },
              { time: "11:00 am", left: 5 },
              { time: "01:00 pm", left: 0 },
            ].map((slot, i) =>
              slot.left > 0 ? (
                <div
                  key={i}
                  className="flex items-center gap-1 px-3 py-2 border border-[#BDBDBD] rounded-[4px] bg-white"
                >
                  <span className="text-[14px] text-[#838383]">{slot.time}</span>
                  <span className="text-[10px] text-[#FF4C0A] font-medium">
                    {slot.left} left
                  </span>
                </div>
              ) : (
                <div
                  key={i}
                  className="flex items-center gap-1 px-3 py-2 bg-[#CCCCCC] rounded-[4px]"
                >
                  <span className="text-[14px] text-[#838383]">{slot.time}</span>
                  <span className="text-[10px] text-[#6A6A6A] font-medium">Sold out</span>
                </div>
              )
            )}
          </div>
          <p className="text-[12px] text-[#838383] mt-2 r max-md:text-[11px]">
            All times are in IST (GMT +5:30)
          </p>
        </div>

        {/* About */}
        <div>
          <p className="text-[18px] font-medium text-[#161616] mb-3 max-md:text-[16px]">
            About
          </p>
          <div className="bg-[#EEEEEE] rounded-[4px] px-3 py-2">
            <p className="text-[12px] text-[#838383] leading-[18px]">
              Scenic routes, trained guides, and safety briefing. Minimum age 10.
            </p>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
