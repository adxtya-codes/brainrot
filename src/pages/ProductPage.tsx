import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import StoreBenefits from '@/components/StoreBenefits';
import { ArrowDown, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { useToast } from '@/hooks/use-toast';
import { useProducts } from '@/hooks/useProducts';
import SizeGuide from '@/components/SizeGuide';
import ProductImageSwiper from '@/components/ProductImageSwiper';
import ProductRecommendations from '@/components/ProductRecommendations';

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [isZoomed, setIsZoomed] = useState(false);

  // Scroll to top on product/page change
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [id, location.pathname]);
  
  const { addItem } = useCart();
  const { isInWishlist, toggleItem } = useWishlist();
  const { toast } = useToast();
  const { data: products = [], isLoading, error } = useProducts();

  const product = products.find(p => p.id === id);

  const handleAddToCart = () => {
    if (!product) return;
    
    if (!selectedSize) {
      toast({
        title: "Select a size",
        description: "Please choose a size before adding to cart.",
        variant: "destructive"
      });
      return;
    }

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      size: selectedSize,
      image: product.image
    });

    toast({
      title: "Added to cart",
      description: `${product.name} (${selectedSize}) added to your cart.`
    });
  };

  const handleWishlistToggle = () => {
    if (!product) return;
    
    toggleItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    });

    toast({
      title: isInWishlist(product.id) ? "Removed from wishlist" : "Added to wishlist",
      description: `${product.name} ${isInWishlist(product.id) ? 'removed from' : 'added to'} your wishlist.`
    });
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-lg">Loading product...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          ← Back
        </Button>
        <div className="text-center">
          <p className="text-lg text-red-500">Product not found.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          ← Back
        </Button>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Product Images */}
          <div className="mb-8 lg:mb-0">
            <div
              className="relative overflow-hidden aspect-square"
              style={{
                backgroundColor: (() => {
                  const name = product.name.toLowerCase();
                  if (name.includes('white') && !name.includes('black')) return '#121212';
                  if (name.includes('black') && !name.includes('white')) return '#fcfcfc';
                  return '#f2f7f4';
                })()
              }}
            >
              <ProductImageSwiper
                images={[product.image, product.back_side || product.backImage].filter(Boolean)}
                name={product.name}
              />
            </div>
          </div>
          {/* Right: Product Details */}
          <div className="flex flex-col w-full max-w-xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-extrabold mb-2 leading-tight">{product.name}</h1>
            <div className="text-2xl font-light mb-4">
              {typeof product.real_price === 'number' && product.real_price > product.price && (
                <span className="line-through text-gray-400 mr-3">Rs.{product.real_price}</span>
              )}
              <span>Rs.{product.price}</span>
            </div>
            {product.bio && (
              <div className="text-base text-gray-300 mb-6 whitespace-pre-line">{product.bio}</div>
            )}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold">Size</span>
                <SizeGuide />
              </div>
              <div className="grid grid-cols-3 gap-3 mb-4">
                {product.sizes.map(size => (
                  <Button
                    key={size}
                    variant={selectedSize === size ? undefined : 'outline'}
                    className={`h-12 transition-colors ${selectedSize === size ? 'bg-white text-black border border-black' : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>
            <Button
              className="w-full h-12 text-lg mb-3"
              onClick={handleAddToCart}
              disabled={!selectedSize}
            >
              Add to Cart - Rs.{product.price}
            </Button>
            <Button
              variant="outline"
              onClick={handleWishlistToggle}
              className="w-full h-12 mb-6"
            >
              <Heart className={`h-4 w-4 mr-2 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
              {isInWishlist(product.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
            </Button>
            <div>
              <h3 className="font-semibold mb-2">Features</h3>
              {product.description ? (
                <ul className="space-y-1 text-base text-gray-300">
                  {product.description.split(/\n|,/).map((feature, idx) => (
                    <li key={idx}>• {feature.trim()}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-base text-gray-400">No features listed.</p>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Product Recommendations at very bottom */}
      <ProductRecommendations excludeId={product.id} />
      <StoreBenefits />
    </>
  );
};

export default ProductPage;
