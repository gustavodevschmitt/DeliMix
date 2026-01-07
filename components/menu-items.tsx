import { prismaClient } from "@/lib/prisma";
import ProductsSection from "@/sections/products-section";
import type { Category } from "@prisma/client";

const MenuItems = async () => {
  let categories: Category[] = [];

  try {
    categories = await prismaClient.category.findMany({});
  } catch (error) {
    console.error("Erro ao buscar categorias", error);
  }

  if (categories.length === 0) {
    return (
      <p className="mt-4 text-center text-sm font-light text-muted-foreground">
        O cardápio está temporariamente indisponível.
      </p>
    );
  }

  return (
    <div className="my-8 flex flex-col items-center gap-10 px-5">
      {categories.map((category) => (
        <div key={category.id} className="w-full">
          <ProductsSection categoryName={category.name} />
        </div>
      ))}
    </div>
  );
};

export default MenuItems;
