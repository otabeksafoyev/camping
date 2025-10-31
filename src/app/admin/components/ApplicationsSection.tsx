"use client";

import { useEffect, useState } from "react";
import { db } from "../../../lib/firebase";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  DocumentData,
} from "firebase/firestore";
import "./applications.css";

interface Application {
  ism?: string;
  familiya?: string;
  email?: string;
  nomer?: string;
  ariza?: string;
}

interface ApplicationWithId extends Required<Application> {
  id: string;
}

export default function ApplicationsSection() {
  const [apps, setApps] = useState<ApplicationWithId[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 🔹 Ma’lumotlarni olish
  useEffect(() => {
    const fetchApps = async () => {
      try {
        setLoading(true);
        const snapshot = await getDocs(collection(db, "arizalar"));

        if (snapshot.empty) {
          setApps([]);
          setLoading(false);
          return;
        }

        const data: ApplicationWithId[] = snapshot.docs.map((d) => {
          const docData = d.data() as Application;
          return {
            id: d.id,
            ism: docData.ism ?? "",
            familiya: docData.familiya ?? "",
            email: docData.email ?? "",
            nomer: docData.nomer ?? "",
            ariza: docData.ariza ?? "",
          };
        });

        setApps(data);
      } catch (err) {
        console.error("❌ Xatolik:", err);
        setError("Ma’lumotlarni olishda xatolik yuz berdi.");
      } finally {
        setLoading(false);
      }
    };

    fetchApps();
  }, []);

  // 🔹 O‘chirish funksiyasi
  const handleDelete = async (id: string) => {
    if (!confirm("Bu arizani o‘chirmoqchimisiz?")) return;
    try {
      await deleteDoc(doc(db, "arizalar", id));
      setApps((prev) => prev.filter((app) => app.id !== id));
      alert("✅ Ariza o‘chirildi!");
    } catch (err) {
      console.error("❌ O‘chirishda xatolik:", err);
      alert("Xatolik yuz berdi!");
    }
  };

  return (
    <div className="section">
      <h2 className="apps-title">Yuborilgan arizalar</h2>

      {loading ? (
        <p className="loading">Yuklanmoqda...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : apps.length === 0 ? (
        <p className="no-data">Hozircha arizalar mavjud emas.</p>
      ) : (
        <div className="grid">
          {apps.map((a) => (
            <div key={a.id} className="app-card">
              <h3>
                {a.ism} {a.familiya}
              </h3>
              <p>
                <strong>Email:</strong> {a.email}
              </p>
              <p>
                <strong>Telefon:</strong> {a.nomer}
              </p>
              <p>
                <strong>Ariza:</strong> {a.ariza}
              </p>

              {/* 🔘 Delete tugmasi */}
              <button
                className="delete-btn"
                onClick={() => handleDelete(a.id)}
              >
                O‘chirish
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
