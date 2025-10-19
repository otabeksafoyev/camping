import Image from "next/image";
import Link from "next/link";
import "./BlogCard.css";

// TypeScript interfeys (any o‘rniga)
interface Article {
  id: string;
  title: string;
  author: string;
  description: string;
  rasm: string;
  thubnail?: string;
}

export default function BlogCard({ article }: { article: Article }) {
  return (
    <div className="blog-card">
      <Link href={`/blog/${article.id}`}>
        <Image
          src={article.rasm || "/no-image.jpg"}
          alt={article.title}
          width={400}
          height={250}
          className="blog-img"
        />
        <div className="blog-info">
          <h3>{article.title}</h3>
          <p>{article.description.slice(0, 80)}...</p>
          <span>{article.author}</span>
        </div>
      </Link>
    </div>
  );
}
