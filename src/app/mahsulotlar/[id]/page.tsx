"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import "../single.css";

interface Product {
  id: string;
  name: string;
  price: number; // eski narx
  discount: number; // yangi narx (chegirma)
  description: string;
  img?: string[]; // 🔹 Firestore’da shu nomda
  category: string;
  rating?: number; // yulduz soni
}

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [mainImage, setMainImage] = useState<string>("");

  useEffect(() => {
    const fetchProduct = async () => {
      const docRef = doc(db, "products", id as string);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = { id: docSnap.id, ...docSnap.data() } as Product;
        setProduct(data);
        // 🔹 img massivdan asosiy rasmni olish
        setMainImage(data.img?.[0] || "/placeholder.png");
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) return <p>Yuklanmoqda...</p>;

  // ⭐ Yulduzlarni chizish
  const renderStars = (rating: number = 0) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++)
      stars.push(<FaStar key={i} className="star" />);
    if (hasHalfStar)
      stars.push(<FaStarHalfAlt key="half" className="star" />);
    while (stars.length < 5)
      stars.push(<FaRegStar key={`empty-${stars.length}`} className="star" />);
    return stars;
  };

  // 💰 Chegirma foizi
  const discountPercent = Math.round(
    ((product.price - product.discount) / product.price) * 100
  );

  return (
    <div className="product-detail">
      <div className="left-section">
        <div className="image-thumbnails">
          {product.img?.map((img, i) => (
            <img
              key={i}
              src={img}
              onClick={() => setMainImage(img)}
              className={`thumb ${img === mainImage ? "active" : ""}`}
              alt="preview"
            />
          ))}
        </div>
        <div className="main-image">
          <img src={mainImage} alt={product.name} />
        </div>
      </div>

      <div className="right-section">
        <h1>{product.name}</h1>

        <div className="rating">
          {renderStars(product.rating)}
          <span>{product.rating?.toFixed(1) || "0"}/5</span>
        </div>

        <div className="price-section">
          <span className="current">${product.discount}</span>
          <span className="old">${product.price}</span>
          <span className="discount">-{discountPercent}%</span>
        </div>

        <div className="desc">
          <p><strong>Tavsif:</strong> {product.description}</p>
          <p><strong>Kategoriya:</strong> {product.category}</p>
        </div>

        <div className="quantity">
          <button>-</button>
          <span>1</span>
          <button>+</button>
        </div>

        <button className="add-to-cart">Savatga qo‘shish</button>
      </div>
    </div>
  );
}
