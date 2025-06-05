
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Product } from '@/components/ProductCard';

export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: async (): Promise<Product[]> => {
      const { data, error } = await supabase
        .from('products')
        .select('*');

      if (error) {
        console.error('Error fetching products:', error);
        throw error;
      }

      // Transform Supabase data to match our Product interface
      return data.map(product => {
        // Gather all images: main, back, and any additional images
        let images: string[] = [];
        if (product.image_url) images.push(product.image_url);
        if (product.back_side) images.push(product.back_side);
        // Support for an 'images' field (comma-separated or JSON array)
        if (product.images) {
          try {
            if (typeof product.images === 'string') {
              if (product.images.trim().startsWith('[')) {
                images = images.concat(JSON.parse(product.images));
              } else {
                images = images.concat(product.images.split(',').map((url: string) => url.trim()));
              }
            } else if (Array.isArray(product.images)) {
              images = images.concat(product.images);
            }
          } catch {}
        }
        // Remove duplicates
        images = Array.from(new Set(images));
        return {
          id: product.id,
          name: product.name,
          price: product.price || 0,
          real_price: product.real_price || null,
          image: product.image_url || 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=400&fit=crop',
          backImage: product.back_side || undefined,
          sizes: product.sizes ? product.sizes.split(',') : ['S', 'M', 'L', 'XL'],
          description: product.description || '',
          images,
          category: product.category || 'featured'
        }
      });
    }
  });
};
