"use client";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";

export default function ConfirmationPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div
        className="
          flex flex-col items-center justify-start flex-1
          px-4 sm:px-6 lg:px-8
          pt-4 sm:pt-6 md:pt-8
          text-center
        "
      >
        {/* ✅ Success Icon */}
        <div className="mb-4 sm:mb-5">
          <img
            src="/ep_success-filled.png"
            alt="check mark"
            width={80}
            height={80}
            className="mx-auto w-[70px] sm:w-[80px] md:w-[85px]"
          />
        </div>

        {/* ✅ Heading */}
        <h1
          className="text-[#161616] font-medium text-[28px] sm:text-[32px] leading-[36px] sm:leading-[40px] mb-1"
          style={{ fontFamily: "Inter" }}
        >
          Booking Confirmed
        </h1>

        {/* ✅ Reference ID */}
        <p
          className="text-[#656565] text-[18px] sm:text-[20px] leading-[24px] mb-6"
          style={{ fontFamily: "Inter" }}
        >
          Ref ID: <span className="font-medium">HUF56&SO</span>
        </p>

        {/* ✅ Button Frame */}
        <button
          onClick={() => router.push("/")}
          className="rounded-[4px] bg-[#E3E3E3] text-[#656565] px-6 sm:px-8 py-2 text-[15px] sm:text-[16px] leading-[20px] transition hover:bg-[#d9d9d9]"
          style={{ fontFamily: "Inter" }}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}
