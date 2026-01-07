import ProductItem from "@/components/product-item";
import { computeProductTotalPrice } from "@/helpers/product";
import { prismaClient } from "@/lib/prisma";
import type { Product } from "@prisma/client";

interface ProductsSectionProps {
  categoryName: string;
}

const ProductsSection = async ({ categoryName }: ProductsSectionProps) => {
  let products: Product[] = [];

  try {
    products = await prismaClient.product.findMany({
      where: {
        category: {
          name: categoryName,
        },
      },
    });
  } catch (error) {
    console.error(`Erro ao buscar produtos da categoria ${categoryName}`, error);
  }

  if (products.length === 0) {
    return (
      <p className="py-5 text-center text-sm font-light text-muted-foreground">
        Nenhum produto disponível nesta categoria neste momento.
      </p>
    );
  }

  return (
    <div className="py-5">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-5">
        {products.map((product) => (
          <ProductItem
            key={product.id}
            product={computeProductTotalPrice(product)}
            isAdminPage={false}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductsSection;
