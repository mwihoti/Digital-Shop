import ProductCard from './ProductCard';

interface Product {
  id: string;
  title: string;
  price: number;
  images: string[];
  rating?: number;
  seller: {
    name: string;
    whatsappNumber: string;
  };
}

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}