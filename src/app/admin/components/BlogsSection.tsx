"use client";

import { useEffect, useState } from "react";
import { db } from "../../../lib/firebase";
import "./blogs.css";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import BlogModal from "./BlogModal";

interface Blog {
  sarlavxa: string;
  kontent: string;
  rasm?: string;
  muallif?: string;
  createdAt?: string;
}

interface BlogWithId extends Blog {
  id: string;
}

export default function BlogsSection() {
  const [blogs, setBlogs] = useState<BlogWithId[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editBlog, setEditBlog] = useState<BlogWithId | null>(null);

  // ✅ Ma'lumotlarni olish
  const fetchBlogs = async () => {
    const snap = await getDocs(collection(db, "bloglar"));
    const fetchedBlogs: BlogWithId[] = snap.docs.map((d) => ({
      id: d.id,
      ...(d.data() as Blog),
    }));
    setBlogs(fetchedBlogs);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // ✅ Qo‘shish va tahrirlash
  const handleSave = async (data: Blog) => {
    try {
      if (editBlog) {
        // Tahrirlash
        const blogRef = doc(db, "bloglar", editBlog.id);
        await updateDoc(blogRef, { ...data });
      } else {
        // Yangi qo‘shish
        await addDoc(collection(db, "bloglar"), {
          ...data,
          createdAt: new Date().toISOString(),
        });
      }
      setModalOpen(false);
      setEditBlog(null);
      fetchBlogs();
    } catch (error) {
      console.error("Saqlashda xatolik:", error);
    }
  };

  // ✅ O‘chirish
  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, "bloglar", id));
      fetchBlogs();
    } catch (error) {
      console.error("O‘chirishda xatolik:", error);
    }
  };

  return (
    <div className="section">
      <button
        onClick={() => {
          setEditBlog(null);
          setModalOpen(true);
        }}
        className="add-btn"
      >
        + Blog qo‘shish
      </button>

      <div className="grid">
        {blogs.map((b) => (
          <div key={b.id} className="card">
            {b.rasm && <img src={b.rasm} alt={b.sarlavxa} className="card-img" />}
            <h3>{b.sarlavxa}</h3>
            <p>{b.kontent}</p>
            {b.muallif && <p className="author">Muallif: {b.muallif}</p>}

            <div className="actions">
              <button
                onClick={() => {
                  setEditBlog(b);
                  setModalOpen(true);
                }}
              >
                ✏️ Edit
              </button>
              <button onClick={() => handleDelete(b.id)}>🗑 Delete</button>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <BlogModal
          onClose={() => setModalOpen(false)}
          onSave={handleSave}
          blog={editBlog}
        />
      )}
    </div>
  );
}
