"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation"; // useRouter qo'shildi
import "./Navbar.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const pathname = usePathname();
  const router = useRouter();

  // Qidiruv form submit handleri
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // Mahsulotlar sahifasiga search query bilan yo'naltirish
      router.push(`/mahsulotlar?search=${encodeURIComponent(searchTerm.trim())}`);
      setMenuOpen(false);
      setSearchTerm("");
    }
  };

  return (
    <header className="sec1">
      <div className="sec1-con">
        <div className="logo">
          <Image src="/1-removebg 1.svg" alt="logo" width={80} height={60} />
        </div>

        <ul className={`nav-ul ${menuOpen ? "open" : ""}`}>
          <li className={pathname === "/" ? "active" : ""}>
            <Link href="/">Bosh sahifa</Link>
          </li>
          <li className={pathname === "/mahsulotlar" ? "active" : ""}>
            <Link href="/mahsulotlar">Mahsulotlar</Link>
          </li>
          <li className={pathname === "/blog" ? "active" : ""}>
            <Link href="/blog">Blog</Link>
          </li>
          <li className={pathname === "/aloqa" ? "active" : ""}>
            <Link href="/aloqa">Aloqa</Link>
          </li>
        </ul>

        <div className="serach-savat">
          <form className="form" onSubmit={handleSearch}>
            <input
              className="input"
              placeholder="Qidirish..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit">
              <svg width="17" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9"
                  stroke="currentColor"
                  strokeWidth="1.333"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </button>
          </form>

          <Link href="/basket">
            <Image className="savatismi" src="/basket.svg" alt="savat" width={35} height={36} />
          </Link>

          <div className={`burger ${menuOpen ? "active" : ""}`} onClick={() => setMenuOpen(!menuOpen)}>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    </header>
  );
}
