"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import BlogCard from "@/components/BlogCard";

interface Article {
  id: string;
  title: string;
  author: string;
  description: string;
  rasm: string;
  thubnail?: string;
}

export default function BlogPage() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const querySnapshot = await getDocs(collection(db, "articles"));
      const data = querySnapshot.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() } as Article)
      );
      setArticles(data);
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
