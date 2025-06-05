import React from 'react';
import { useProducts } from '@/hooks/useProducts';
import ProductCard, { Product } from './ProductCard';

interface ProductRecommendationsProps {
  excludeId: string;
  count?: number;
}

function getRandomProducts(products: Product[], excludeId: string, count: number): Product[] {
  const filtered = products.filter(p => p.id !== excludeId);
  const shuffled = filtered.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

const ProductRecommendations: React.FC<ProductRecommendationsProps> = ({ excludeId, count = 4 }) => {
  const { data: products = [], isLoading, error } = useProducts();
  if (isLoading || products.length === 0) return null;

  const recommendations = getRandomProducts(products, excludeId, count);
  if (recommendations.length === 0) return null;

  return (
    <section className="mt-16 mb-8 w-full flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-6 text-center w-full">You may also like</h2>
      <div className="w-full flex justify-center">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-2 md:px-8 w-full max-w-screen-xl">
          {recommendations.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductRecommendations;
