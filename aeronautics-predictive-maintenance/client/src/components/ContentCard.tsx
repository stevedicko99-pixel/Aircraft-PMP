import { ArrowRight, Bookmark, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * ContentCard Component
 * Design: Modern Technical Minimalism
 * - Asymmetric layout with diagonal accent
 * - Hover effects with scale and shadow
 * - Supports multiple content types (blog, news, resource)
 */

interface ContentCardProps {
  title: string;
  description: string;
  category: string;
  image?: string;
  date?: string;
  readTime?: string;
  author?: string;
  tags?: string[];
  href?: string;
  type?: "blog" | "news" | "resource";
}

export default function ContentCard({
  title,
  description,
  category,
  image,
  date,
  readTime,
  author,
  tags = [],
  href = "#",
  type = "blog",
}: ContentCardProps) {
  return (
    <div className="group relative bg-card hover:bg-white rounded-lg overflow-hidden border border-border hover:border-accent shadow-sm hover:shadow-lg transition-all duration-300 transform hover:scale-105">
      {/* Diagonal Accent Line */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-accent/10 to-transparent transform translate-x-16 -translate-y-16 group-hover:translate-x-12 group-hover:-translate-y-12 transition-transform duration-300"></div>

      {/* Image */}
      {image && (
        <div className="relative h-48 overflow-hidden bg-secondary">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>
      )}

      {/* Content */}
      <div className="p-6 relative z-10">
        {/* Category Badge */}
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
            {category}
          </span>
          {type === "news" && (
            <span className="inline-block px-3 py-1 bg-accent/10 text-accent text-xs font-semibold rounded-full">
              Latest
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {description}
        </p>

        {/* Metadata */}
        <div className="flex flex-wrap gap-2 mb-4 text-xs text-muted-foreground">
          {date && <span>{date}</span>}
          {readTime && (
            <>
              <span>•</span>
              <span>{readTime}</span>
            </>
          )}
          {author && (
            <>
              <span>•</span>
              <span>By {author}</span>
            </>
          )}
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-secondary text-foreground text-xs rounded border border-border"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <a
            href={href}
            className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:gap-3 transition-all group/link"
          >
            Read More
            <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
          </a>
          <div className="flex gap-2">
            <button className="p-2 hover:bg-secondary rounded-lg transition-colors text-muted-foreground hover:text-primary">
              <Bookmark className="w-4 h-4" />
            </button>
            <button className="p-2 hover:bg-secondary rounded-lg transition-colors text-muted-foreground hover:text-primary">
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
