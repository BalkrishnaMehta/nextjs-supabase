"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useRef, useEffect } from "react";

const SORT_OPTIONS = [
  { label: "Newest", value: "dateLTH" },
  { label: "Oldest", value: "dateHTL" },
  { label: "Best Rating", value: "rating" },
  { label: "Price: Low to High", value: "priceLTH" },
  { label: "Price: High to Low", value: "priceHTL" },
];

const SortDropdown = () => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        const toggleCheckbox = document.getElementById(
          "sort-toggle"
        ) as HTMLInputElement;
        if (toggleCheckbox) toggleCheckbox.checked = false;
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const currentSort = searchParams.get("sortby") || "dateLTH";

  const handleSortChange = (sortValue: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sortby", sortValue);
    router.push(`/products?${params.toString()}`);
  };

  return (
    <div
      className="dropdown-container flex justify-between relative"
      ref={dropdownRef}>
      <input type="checkbox" className="peer hidden" id="sort-toggle" />
      <label
        htmlFor="sort-toggle"
        className="dropdown flex justify-between w-32 items-center cursor-pointer">
        <div className="text-center w-full">
          <span className="text-sm peer-checked:font-medium transition-all duration-200">
            Sort
          </span>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="stroke-gray-400 transition-transform duration-300 ease-in-out peer-checked:rotate-180">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </label>

      <div
        className="absolute top-12 right-0 z-10 bg-white border-2 rounded-lg border-gray-200 w-44 
                    transform opacity-0 scale-95 invisible
                    peer-checked:opacity-100 peer-checked:scale-100 peer-checked:visible
                    transition-all duration-200 ease-out origin-top-right">
        <ul className="py-3 px-4 space-y-3">
          {SORT_OPTIONS.map(({ label, value }) => (
            <li
              key={value}
              onClick={() => handleSortChange(value)}
              className={`${
                currentSort === value ? "text-purple-800" : ""
              } cursor-pointer hover:text-purple-600 transition-colors duration-200`}>
              {label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SortDropdown;
