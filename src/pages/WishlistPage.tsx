
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useWishlist } from '@/contexts/WishlistContext';
import ProductCard from '@/components/ProductCard';

const WishlistPage = () => {
  const { items } = useWishlist();
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Wishlist ({items.length})</h1>

      {items.length === 0 ? (
        <div className="text-center space-y-6">
          <p className="text-muted-foreground">
            Your wishlist is empty. Save items you love for later.
          </p>
          <Button onClick={() => navigate('/')}>
            Continue Shopping
          </Button>
        </div>
      ) : (
        <div className="product-grid">
          {items.map((item) => (
            <ProductCard
              key={item.id}
              product={{
                id: item.id,
                name: item.name,
                price: item.price,
                image: item.image,
                sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL']
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
