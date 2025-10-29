"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/result?query=${encodeURIComponent(query)}`);
    }
  };

  return (
    <header
      className="
        w-full
        bg-[#F9F9F9]
        shadow-[0px_2px_16px_0px_rgba(0,0,0,0.1)]
        flex items-center justify-between
        px-[124px] py-4
        max-md:px-6
        sticky top-0 z-50
      "
      style={{ height: "87px" }}
    >
      {/* --- Logo --- */}
      <div
        className="flex items-center cursor-pointer"
        onClick={() => router.push("/")}
      >
        <img
          src="/logo.png"
          alt="logo"
          className="w-[100px] h-[55px] object-contain"
        />
      </div>

      {/* --- Search Bar Frame --- */}
      <form
        onSubmit={handleSearch}
        className="
          flex items-center gap-4
          w-[443px] h-[42px]
          max-sm:w-full
        "
      >
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search experiences"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="
            w-[340px] h-[42px]
            max-sm:flex-1
            rounded-[4px]
            bg-[#EDEDED]
            px-4 py-[12px]
            text-[#727272]
            text-[14px] leading-[18px]
            font-inter
            outline-none
            placeholder:text-[#727272]
            placeholder:font-normal
            placeholder:text-[14px]
          "
        />

        {/* Search Button */}
        <button
          type="submit"
          className="
            w-[87px] h-[42px]
            rounded-[8px]
            bg-[#FFD643]
            text-[#161616]
            text-[14px] leading-[18px]
            font-medium
            font-inter
            hover:bg-[#ffcc00]
            transition-colors
          "
        >
          Search
        </button>
      </form>
    </header>
  );
}
