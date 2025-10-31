"use client";

import React from "react";
import "./Sidebar.css";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  activeTab: "products" | "applications" | "blogs";
  setActiveTab: React.Dispatch<
    React.SetStateAction<"products" | "applications" | "blogs">
  >;
}

export default function Sidebar({
  isOpen,
  onToggle,
  activeTab,
  setActiveTab,
}: SidebarProps) {
  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <button className="toggle-btn" onClick={onToggle}>
        {isOpen ? "❮" : "❯"}
      </button>

      {isOpen && (
        <div className="sidebar-inner">
       
          <ul className="sidebar-menu">
            <li
              className={activeTab === "products" ? "active" : ""}
              onClick={() => setActiveTab("products")}
            >
              Mahsulotlar
            </li>
            <li
              className={activeTab === "applications" ? "active" : ""}
              onClick={() => setActiveTab("applications")}
            >
              Arizalar
            </li>
            <li
              className={activeTab === "blogs" ? "active" : ""}
              onClick={() => setActiveTab("blogs")}
            >
              Bloglar
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
