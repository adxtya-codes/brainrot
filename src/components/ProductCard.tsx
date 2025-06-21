
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useWishlist } from '@/contexts/WishlistContext';

export interface Product {
  real_price?: number | null;
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  onSale?: boolean;
  image: string;
  backImage?: string; // Optional back side image
  back_side?: string; // Optional back side image for consistency
  sizes: string[];
  category?: string;
  description?: string;
  images?: string[];
  bio?: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { isInWishlist, toggleItem } = useWishlist();

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    });
  };

  const [hovered, setHovered] = React.useState(false);

  return (
    <Link to={`/product/${product.id}`} className="group block"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="mb-4">
        <div className="relative overflow-hidden aspect-square" style={{ backgroundColor: '#8f8f8f' }}>
          <img
            src={
              hovered && product.backImage
                ? product.backImage
                : product.image || 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=400&fit=crop'
            }
            alt={product.name + (hovered && product.backImage ? ' back' : ' front')}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={e => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=400&fit=crop';
            }}
          />
          {/* Preload back image for instant hover */}
          {product.backImage && (
            <img
              src={product.backImage}
              alt="Preload back"
              style={{ display: 'none' }}
              aria-hidden="true"
            />
          )}
          {/* Sale Badge */}
          {typeof product.real_price === 'number' && product.real_price > product.price && (
            <div className="absolute top-2 left-2">
              <span className="bg-white text-black text-xs font-semibold px-3 py-1 rounded-full">Sale</span>
            </div>
          )}

          {/* Wishlist Button */}
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-background/80 hover:bg-background"
            onClick={handleWishlistClick}
          >
            <Heart
              className={`h-4 w-4 ${
                isInWishlist(product.id) ? 'fill-current text-red-500' : ''
              }`}
            />
          </Button>
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="font-medium text-sm group-hover:text-primary transition-colors line-clamp-2">
          {product.name}
        </h3>

        <div className="flex items-center gap-2 font-bold text-base">
        {typeof product.real_price === 'number' && product.real_price > product.price ? (
          <>
            <span className="text-gray-400 line-through text-sm">Rs.{product.real_price}</span>
            <span>Rs.{product.price}</span>
          </>
        ) : (
          <span>Rs.{product.price}</span>
        )}
      </div>
      </div>
    </Link>
  );
};

export default ProductCard;
