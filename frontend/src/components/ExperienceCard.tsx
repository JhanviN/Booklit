import Link from "next/link";

interface ExperienceCardProps {
  image: string;
  title: string;
  location: string;
  description: string;
  price: number;
  id: string;
}

export default function ExperienceCard({
  image,
  title,
  location,
  description,
  price,
  id,
}: ExperienceCardProps) {
  return (
    <div
      className="
        w-[280px] h-[312px]
        bg-white rounded-[12px]
        shadow-[0px_2px_8px_0px_rgba(0,0,0,0.1)]
        overflow-hidden
        flex flex-col
        hover:shadow-[0px_4px_16px_0px_rgba(0,0,0,0.1)]
        transition-shadow
        max-sm:w-full
      "
    >
      {/* --- Image --- */}
      <img
        src={image}
        alt={title}
        className="w-[280px] h-[170px] object-cover"
      />

      {/* --- Content Below Image --- */}
      <div className="flex flex-col px-4 pt-3 pb-3 gap-3">
        {/* Top Frame (Title + Location Tag) */}
        <div className="flex justify-between items-center w-[248px]">
          <h3
            className="
              text-[#161616]
              font-inter font-medium text-[16px] leading-[20px]
            "
          >
            {title}
          </h3>

          <div
            className="
              bg-[#D6D6D6]
              rounded-[4px]
              px-2 py-1
              text-[#161616]
              font-inter font-medium text-[11px] leading-[16px]
            "
          >
            {location}
          </div>
        </div>

        {/* Description */}
        <p
          className="
            text-[#6C6C6C]
            font-inter font-normal text-[12px] leading-[16px]
            w-[248px]
          "
        >
          {description}
        </p>

        {/* Bottom Frame (Price + Button) */}
        <div className="flex justify-between items-center w-[248px]">
          <div className="flex items-end gap-1">
            <span
              className="
                text-[#161616]
                font-inter font-normal text-[12px] leading-[16px]
              "
            >
              From
            </span>
            <span
              className="
                text-[#161616]
                font-inter font-medium text-[20px] leading-[24px]
              "
            >
              ₹{price}
            </span>
          </div>

          <Link
            href={`/experience/${id}`}
            className="
              bg-[#FFD643]
              rounded-[4px]
              px-2 py-[6px]
              text-[#161616]
              font-inter font-medium text-[14px] leading-[18px]
              hover:bg-[#ffcc00]
              transition-colors
              w-[99px] h-[30px]
              text-center
            "
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
