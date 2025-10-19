"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "./Navbar.css";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <div className="sec1">
      <div className="sec1-con">
        <Image src="/1-removebg 1.svg" alt="logo" width={80} height={60} />
        <ul className="nav-ul">
          <li className={pathname === "/" ? "active" : ""}>
            <Link href="/">Bosh sahifa</Link>
          </li>
          <li className={pathname === "/mahsulotlar" ? "active" : ""}>
            <Link href="/mahsulotlar">Mahsulotlar</Link>
          </li>
          <li className={pathname === "/aloqa" ? "active" : ""}>
            <Link href="/aloqa">Aloqa</Link>
          </li>
          <li className={pathname === "/blog" ? "active" : ""}>
            <Link href="/blog">Blog</Link>
          </li>
        </ul>

        <div className="serach-savat">
          <form className="form">
            <button type="button">
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
            <input className="input" placeholder="Search for products..." required type="text" />
            <button className="reset" type="reset">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </form>

          <Image className="savatismi" src="/basket.svg" alt="savat" width={35} height={36} />
        </div>
      </div>
    </div>
  );
}
