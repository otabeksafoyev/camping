import Image from "next/image";
import Link from "next/link";
import "./BlogCard.css";

interface Article {
  id: string;
  sarlavxa: string;
  muallif: string;
  kontent?: string;
  rasm?: string;
  createdAt: string;
}

export default function BlogCard({ article }: { article: Article }) {

  const desc = article.kontent
    ? article.kontent.slice(0, 80)
    : "Tavsif mavjud emas";

  return (
    <div className="blog-card">
      <Link href={`/blog/${article.id}`}>
        <Image
          src={article.rasm || "/no-image.jpg"} // fallback rasm
          alt={article.sarlavxa || "Blog rasmi"}
          width={400}
          height={250}
          className="blog-img"
          // blur effect uchun loading='lazy' yoki placeholder='blur' qo‘shish mumkin
        />
        <div className="blog-info">
          <h3>{article.sarlavxa || "Sarlavha mavjud emas"}</h3>
          <p>{desc}...</p>
          <span>{article.muallif || "Muallif noma'lum"}</span>
        </div>
      </Link>
    </div>
  );
}
