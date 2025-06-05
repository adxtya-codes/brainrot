
import React, { useState } from 'react';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { useProducts } from '@/hooks/useProducts';

const categories = [
  { id: 'volume', name: 'Volume One', description: 'barely trying, still hits' },
  { id: 'rot', name: 'Rot Studio', description: 'in-house original designs' }
];

const Index = () => {
  const [sortBy, setSortBy] = useState<string>('name');
  const { data: products = [], isLoading, error } = useProducts();

  const handleSort = (value: string) => {
    setSortBy(value);
  };

  // Since we don't have categories in the database yet, we'll distribute products across categories
  const getProductsByCategory = (categoryId: string) => {
    return products.filter(product => product.category === categoryId);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-lg">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-lg text-red-500">Error loading products. Please try again.</p>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            brainrot
          </h1>
          <p className="text-xl md:text-2xl font-light text-muted-foreground">
          Internet made. IRL approved.
          </p>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
          </p>
        </div>

        <div className="text-center">
          <p className="text-lg">No products available at the moment.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-16 space-y-4">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
          brainrot
        </h1>
        <p className="text-xl md:text-2xl font-light text-muted-foreground">
          Internet made. IRL approved.
        </p>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
        </p>
      </div>

      {/* Category Sections */}
      {categories.map((category) => {
        const categoryProducts = getProductsByCategory(category.id);
        
        if (categoryProducts.length === 0) return null;
        
        return (
          <div key={category.id} className="mb-16">
            {/* Category Header */}
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-2">
                {category.name}
              </h2>
              <p className="text-muted-foreground">
                {category.description}
              </p>
            </div>

            {/* Category Products Grid */}
            <div className="category-grid mb-8">
              {categoryProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        );
      })}

      {/* CTA Section */}
      <div className="text-center bg-muted/30 rounded-lg py-16 px-8">
        <h3 className="text-3xl font-bold mb-4">
          Join the decay
        </h3>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          Subscribe to our newsletter for exclusive drops and existential content.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-2 max-w-md mx-auto">
          <input
            type="email"
            placeholder="your@email.com"
            className="flex-1 px-4 py-2 bg-background border rounded-md w-full sm:w-auto"
          />
          <Button className="w-full sm:w-auto">
            Subscribe
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
