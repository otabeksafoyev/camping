"use client";

import { useEffect, useState } from "react";
import { db } from "../../../lib/firebase";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import ProductModal from "./ProductModal";

interface Product {
  name: string;
  category: string;
  price: number;
  description: string;
  discount: number;
  rating: number;
  img?: string[]; 
}

interface ProductWithId extends Product {
  id: string;
}

export default function ProductsSection() {
  const [products, setProducts] = useState<ProductWithId[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editProduct, setEditProduct] = useState<ProductWithId | null>(null);

 
  const fetchProducts = async () => {
    const snapshot = await getDocs(collection(db, "products"));
    const fetchedProducts: ProductWithId[] = snapshot.docs.map((docu) => ({
      id: docu.id,
      ...(docu.data() as Product),
    }));
    setProducts(fetchedProducts);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

 
  const handleSave = async (productData: Product) => {
    if (editProduct) {
      const productRef = doc(db, "products", editProduct.id);
      await updateDoc(productRef, { ...productData });
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editProduct.id ? { id: p.id, ...productData } : p
        )
      );
    } else {
      const docRef = await addDoc(collection(db, "products"), productData);
      setProducts((prev) => [...prev, { id: docRef.id, ...productData }]);
    }

    setModalOpen(false);
    setEditProduct(null);
  };

  
  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, "products", id));
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="section">
      <button
        onClick={() => {
          setEditProduct(null);
          setModalOpen(true);
        }}
        className="add-btn"
      >
        + Mahsulot qo‘shish
      </button>

      <div className="grid">
        {products.map((p) => (
          <div key={p.id} className="card">
            <img
              src={Array.isArray(p.img) && p.img.length > 0 ? p.img[0] : "/placeholder.png"}
              alt={p.name}
              className="card-img"
            />
            <h3>{p.name}</h3>
            <p><b>Kategoriya:</b> {p.category}</p>
            <p><b>Narx:</b> {p.price} so‘m</p>
            <p><b>Chegirma:</b> {p.discount}%</p>
            <p><b>Reyting:</b> ⭐ {p.rating}</p>

            <div className="actions">
              <button
                onClick={() => {
                  setEditProduct(p);
                  setModalOpen(true);
                }}
                className="edit-btn"
              >
                ✏️ Tahrirlash
              </button>

              <button
                onClick={() => handleDelete(p.id)}
                className="delete-btn"
              >
                🗑 O‘chirish
              </button>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <ProductModal
          onClose={() => setModalOpen(false)}
          onSave={handleSave}
          product={editProduct}
        />
      )}
    </div>
  );
}
