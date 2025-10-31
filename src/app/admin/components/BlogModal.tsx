"use client";

import { useEffect, useState, ChangeEvent } from "react";
import "./BlogModal.css";

interface Blog {
  sarlavxa: string;
  kontent: string;
  rasm?: string;
  muallif?: string;
  createdAt?: string;
}

interface BlogModalProps {
  onClose: () => void;
  onSave: (data: Blog) => void;
  blog?: Blog | null;
}

export default function BlogModal({ onClose, onSave, blog }: BlogModalProps) {
  const [form, setForm] = useState<Blog>({
    sarlavxa: "",
    kontent: "",
    rasm: "",
    muallif: "",
    createdAt: new Date().toISOString(),
  });

  // Tahrir rejimida bo‘lsa — eski ma’lumotlarni yuklash
  useEffect(() => {
    if (blog) {
      setForm({
        ...blog,
        createdAt: blog.createdAt || new Date().toISOString(),
      });
    }
  }, [blog]);

  // Input o‘zgarishi
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Saqlash tugmasi
  const handleSave = () => {
    if (!form.sarlavxa.trim() || !form.kontent.trim()) {
      alert("Iltimos, sarlavha va kontentni kiriting!");
      return;
    }
    const updatedBlog: Blog = {
      ...form,
      createdAt: form.createdAt || new Date().toISOString(),
    };
    onSave(updatedBlog);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2>{blog ? "Blogni tahrirlash" : "Yangi blog qo‘shish"}</h2>

        <div className="form-group">
          <label>Sarlavha</label>
          <input
            name="sarlavxa"
            value={form.sarlavxa}
            onChange={handleChange}
            placeholder="Sarlavha kiriting"
          />
        </div>

        <div className="form-group">
          <label>Kontent</label>
          <textarea
            name="kontent"
            value={form.kontent}
            onChange={handleChange}
            placeholder="Kontent matnini yozing..."
            rows={4}
          />
        </div>

        <div className="form-group">
          <label>Rasm URL</label>
          <input
            name="rasm"
            value={form.rasm}
            onChange={handleChange}
            placeholder="Rasm URL manzilini kiriting (ixtiyoriy)"
          />
        </div>

        <div className="form-group">
          <label>Muallif</label>
          <input
            name="muallif"
            value={form.muallif}
            onChange={handleChange}
            placeholder="Muallif ismi (ixtiyoriy)"
          />
        </div>

        <div className="modal-actions">
          <button className="save-btn" onClick={handleSave}>
            Saqlash
          </button>
          <button className="cancel-btn" onClick={onClose}>
            Bekor qilish
          </button>
        </div>
      </div>
    </div>
  );
}
