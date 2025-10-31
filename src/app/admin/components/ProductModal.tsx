"use client";

import { useState, useEffect } from "react";
import "./ProductModal.css";

interface Product {
  name: string;
  category: string;
  price: number;
  discount: number;
  description: string;
  rating: number;
  img: string[];
}

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onSave: (data: Product) => void;
}

export default function ProductModal({
  product,
  onClose,
  onSave,
}: ProductModalProps) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [discount, setDiscount] = useState<number>(0);
  const [rating, setRating] = useState<number>(0);
  const [description, setDescription] = useState("");
  const [img, setImg] = useState<string[]>([""]);

  // 🔄 product tahrirlash rejimida formani to‘ldirish
  useEffect(() => {
    if (product) {
      setName(product.name || "");
      setCategory(product.category || "");
      setPrice(product.price || 0);
      setDiscount(product.discount || 0);
      setRating(product.rating || 0);
      setDescription(product.description || "");
      setImg(product.img?.length ? product.img : [""]);
    } else {
      // 🔁 Yangi mahsulot bo‘lsa formani tozalash
      setName("");
      setCategory("");
      setPrice(0);
      setDiscount(0);
      setRating(0);
      setDescription("");
      setImg([""]);
    }
  }, [product]);

  // 🖼️ Rasm inputlarini boshqarish
  const handleImageChange = (index: number, value: string) => {
    const updated = [...img];
    updated[index] = value;
    setImg(updated);
  };

  const addImageInput = () => setImg([...img, ""]);
  const removeImageInput = (index: number) =>
    setImg(img.filter((_, i) => i !== index));

  // 💾 Saqlash tugmasi
  const handleSubmit = () => {
    if (!name.trim() || price <= 0) {
      alert("Iltimos, mahsulot nomi va narxni to‘g‘ri kiriting!");
      return;
    }

    const cleanData: Product = {
      name: name.trim(),
      category: category.trim(),
      price,
      discount,
      description: description.trim(),
      rating,
      img: img.filter((url) => url.trim() !== ""), // bo‘sh URL’larni olib tashlaydi
    };

    onSave(cleanData);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>{product ? "Mahsulotni tahrirlash" : "Yangi mahsulot qo‘shish"}</h3>

        <label>Nom</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Mahsulot nomi"
        />

        <label>Kategoriya</label>
        <input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Kategoriya nomi"
        />

        <label>Narx ($)</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          placeholder="Narxni kiriting"
        />

        <label>Chegirma (%)</label>
        <input
          type="number"
          value={discount}
          onChange={(e) => setDiscount(Number(e.target.value))}
          placeholder="Chegirma foizi"
        />

        <label>Reyting (0–5)</label>
        <input
          type="number"
          min={0}
          max={5}
          step={0.1}
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          placeholder="Masalan: 4.5"
        />

        <label>Tavsif</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Mahsulot haqida qisqacha ma’lumot"
        />

        <label>Rasmlar (URL)</label>
        {img.map((url, i) => (
          <div className="image-input-group" key={i}>
            <input
              type="text"
              value={url}
              placeholder={`Rasm ${i + 1} URL manzili`}
              onChange={(e) => handleImageChange(i, e.target.value)}
            />
            {img.length > 1 && (
              <button
                type="button"
                className="remove-btn"
                onClick={() => removeImageInput(i)}
              >
                ❌
              </button>
            )}
          </div>
        ))}

        <button type="button" className="add-image-btn" onClick={addImageInput}>
          + Yangi rasm qo‘shish
        </button>

        <div className="modal-actions">
          <button className="save-btn" onClick={handleSubmit}>
            💾 Saqlash
          </button>
          <button className="cancel-btn" onClick={onClose}>
            ❌ Bekor qilish
          </button>
        </div>
      </div>
    </div>
  );
}
