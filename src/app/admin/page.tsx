"use client";

import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import ProductsSection from "./components/ProductsSection";
import ApplicationsSection from "./components/ApplicationsSection";
import BlogsSection from "./components/BlogsSection";
import "./style.css";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<"products" | "applications" | "blogs">("products");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className={`admin-container ${isSidebarOpen ? "" : "sidebar-closed"}`}>
      <Sidebar
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <div className="admin-content">
        <Header />
        <div className="content-area">
          {activeTab === "products" && <ProductsSection />}
          {activeTab === "applications" && <ApplicationsSection />}
          {activeTab === "blogs" && <BlogsSection />}
        </div>
      </div>
    </div>
  );
}
