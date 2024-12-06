"use client";

import { useEffect, useState } from "react";
import { NAV_LINKS } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import Button from "./Button";

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true); // Tracks if Navbar is visible
  const [lastScrollY, setLastScrollY] = useState(0); // Tracks the last scroll position

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false); // Hide Navbar on scroll down
      } else {
        setIsVisible(true); // Show Navbar on scroll up
      }

      setLastScrollY(currentScrollY); // Update last scroll position
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-30 transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      } bg-white shadow-md`}
    >
      <div className="flexBetween max-container padding-container py-3">
        <Link href="/">
          <span className="text-black text-2xl font-bold">Trip</span>
          <span className="text-green-500 text-2xl font-bold">Trek.</span>
        </Link>

        <ul className="hidden h-full gap-12 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              href={link.href}
              key={link.key}
              className="regular-16 text-gray-50 flexCenter cursor-pointer pb-1.5 transition-all hover:font-bold"
            >
              {link.label}
            </Link>
          ))}
        </ul>

        <div className="lg:flexCenter hidden">
          <Button
            type="button"
            title="Login"
            icon="/user.svg"
            variant="btn_dark_green"
          />
        </div>

        <Image
          src="menu.svg"
          alt="menu"
          width={32}
          height={32}
          className="inline-block cursor-pointer lg:hidden"
        />
      </div>
    </nav>
  );
};

export default Navbar;
