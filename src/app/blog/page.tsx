"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import BlogCard from "@/components/BlogCard";

interface Article {
  id: string;
  sarlavxa: string;
  muallif: string;
  kontent?: string;
  rasm: string;
  createdAt: string;
}

export default function BlogPage() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "bloglar")); // collection nomi
        const data = querySnapshot.docs.map((doc) => {
          const docData = doc.data() as Omit<Article, "id">;
          return {
            id: doc.id,
            ...docData,
          };
        });

        setArticles(data);
      } catch (error) {
        console.error("Ma'lumotlarni olishda xatolik:", error);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div className="blog-container">
      <h1>Sayohat va Lager Blogi</h1>
      <div className="blog-grid">
        {articles.map((a) => (
          <BlogCard key={a.id} article={a} />
        ))}
      </div>
    </div>
  );
}
