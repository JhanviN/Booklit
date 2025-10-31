"use client";
import Navbar from "@/components/Navbar";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", promo: "" });
  const [agree, setAgree] = useState(false);
  const [booking, setBooking] = useState<any>(null);
  const [promoMessage, setPromoMessage] = useState<string | null>(null);
  const [discount, setDiscount] = useState<number>(0);

  // Load booking data from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("selectedBooking");
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed.date) {
        const date = new Date(parsed.date);
        parsed.date = date.toISOString().split("T")[0];
      }
      setBooking(parsed);
    }
  }, []);

  // Email validation helper
  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Apply Promo
  const applyPromo = async () => {
    if (!form.promo) {
      setPromoMessage("Please enter a promo code.");
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/promo/validate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: form.promo }),
      });

      const data = await res.json();

      if (!res.ok || !data.valid) {
        setPromoMessage(data.message || "Invalid or expired promo code.");
        setDiscount(0);
        return;
      }

      let discountValue = 0;
      if (data.discountType === "PERCENT") {
        discountValue = (booking.total * data.value) / 100;
      } else if (data.discountType === "FLAT") {
        discountValue = data.value;
      }

      setDiscount(discountValue);
      setPromoMessage(`Promo applied! You saved ₹${discountValue}.`);
    } catch (err) {
      console.error(err);
      setPromoMessage("Error applying promo.");
    }
  };

  // Submit Booking
  const handleSubmit = async () => {
    if (!form.name.trim()) return alert("Please enter your name.");
    if (!isValidEmail(form.email)) return alert("Please enter a valid email.");
    if (!agree) return alert("Please agree to the terms first.");
    if (!booking) return alert("Booking data not found.");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          experienceId: booking.experienceId,
          slotId: booking.slotId || 1,
          promoCode: form.promo,
          finalPrice: booking.total - discount,
        }),
      });

      const data = await res.json();
      if (res.ok) router.push("/confirmation");
      else alert(data.error || "Booking failed");
    } catch (err) {
      console.error(err);
      alert("Error processing booking.");
    }
  };

  if (!booking)
    return (
      <div className="p-6 text-center">
        No booking data found. Please go back and select an experience.
      </div>
    );

  return (
    <div className="overflow-hidden bg-[#F9F9F9] min-h-screen">
      <Navbar />

      <div className="flex flex-col items-center px-6 md:px-10 lg:px-[150px] py-8 pt-[40px] w-full">
        {/* Header */}
        <div className="flex items-center w-full max-w-[1200px] gap-2 mb-6">
          <button onClick={() => router.back()} className="flex items-center justify-center">
            <ArrowLeft className="w-5 h-5 text-black cursor-pointer" />
          </button>
          <h2 className="text-[16px] font-medium text-[#161616]">Checkout</h2>
        </div>

        {/* Frames */}
        <div className="flex flex-col lg:flex-row justify-between items-start w-full max-w-[1200px] gap-[30px]">
          {/* Left Frame */}
          <div className="w-full lg:w-[739px] bg-[#EFEFEF] rounded-[12px] px-[24px] py-[20px] flex flex-col gap-[16px]">
            {/* Name + Email */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-[#5B5B5B] text-[14px] mb-1">Full name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your name"
                  className="w-full h-[42px] rounded-[6px] bg-[#DDDDDD] text-[#727272] px-4 text-[14px]"
                />
              </div>

              <div className="flex-1">
                <label className="block text-[#5B5B5B] text-[14px] mb-1">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="Your email"
                  className="w-full h-[42px] rounded-[6px] bg-[#DDDDDD] text-[#727272] px-4 text-[14px]"
                />
              </div>
            </div>

            {/* Promo */}
            <div className="flex flex-col sm:flex-row gap-2 w-full">
              <input
                type="text"
                value={form.promo}
                onChange={(e) => setForm({ ...form, promo: e.target.value })}
                placeholder="Promo code"
                className="flex-1 h-[42px] rounded-[6px] bg-[#DDDDDD] text-[#727272] px-4 text-[14px]"
              />
              <button
                type="button"
                onClick={applyPromo}
                className="w-full sm:w-[71px] h-[42px] rounded-[8px] bg-[#161616] text-white text-[14px]"
              >
                Apply
              </button>
            </div>

            {/* Promo Message */}
            {promoMessage && (
              <p className="text-sm mt-1 text-center text-[#5B5B5B]">{promoMessage}</p>
            )}

            {/* Checkbox */}
            <div className="flex items-center gap-2 mt-1">
              <input
                type="checkbox"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                className="h-4 w-4 accent-[#161616]"
              />
              <span className="text-[#5B5B5B] text-[14px]">
                I agree to the terms and safety policy
              </span>
            </div>
          </div>

          {/* Right Frame */}
          <div className="w-full lg:w-[387px] bg-[#EFEFEF] rounded-[12px] p-[24px] flex flex-col gap-[24px]">
            {/* Experience Details */}
            <div className="flex flex-col gap-[10px]">
              {[
                ["Experience", booking.experience],
                ["Date", booking.date],
                ["Time", booking.time],
                ["Qty", booking.qty],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between text-[14px] leading-[20px]">
                  <span className="text-[#656565] text-[16px]">{label}</span>
                  <span className="text-[#161616] text-[14px]">{value}</span>
                </div>
              ))}
            </div>

            {/* Price Details */}
            <div className="flex flex-col gap-[8px]">
              <div className="flex justify-between">
                <span className="text-[#656565] text-[16px]">Subtotal</span>
                <span className="text-[#161616] text-[16px]">₹{booking.subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#656565] text-[16px]">Taxes</span>
                <span className="text-[#161616] text-[16px]">₹{booking.taxes}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between">
                  <span className="text-[#656565] text-[16px]">Discount</span>
                  <span className="text-green-700 text-[16px]">-₹{discount}</span>
                </div>
              )}
            </div>

            <hr className="border-[#D8D8D8]" />

            {/* Total */}
            <div className="flex justify-between items-center">
              <span className="text-[#161616] font-medium text-[20px]">Total</span>
              <span className="text-[#161616] font-medium text-[20px]">
                ₹{booking.total - discount}
              </span>
            </div>

            {/* Button */}
            <button
              disabled={!form.name || !form.email || !agree}
              onClick={handleSubmit}
              className="bg-[#FFD643] text-[#161616] rounded-[8px] h-[44px] font-medium text-[16px] hover:bg-[#ffcf1f] transition-all disabled:opacity-50"
            >
              Pay and Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
