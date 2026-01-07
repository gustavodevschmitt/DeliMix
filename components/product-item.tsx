"use client";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";

import { Product } from "@prisma/client";
import Image from "next/image";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Separator } from "./ui/separator";
import { deleteProduct } from "@/actions/delete-product";
import { useState } from "react";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import { TbTrash } from "react-icons/tb";
import UpdateProductForm from "./admin/update-product-form";
import { ProductWithTotalPrice } from "@/helpers/product";
import { Tags, tagTranslation } from "@/helpers/tag-translation";

interface ProductItemProps {
  product: ProductWithTotalPrice;
  isAdminPage: boolean;
}

const ProductItem = ({ isAdminPage, product }: ProductItemProps) => {
  const [cancelIsLoading, setCancelIsLoading] = useState(false);

  const handleDeleteClick = async () => {
    try {
      setCancelIsLoading(true);
      await deleteProduct(product.id);
      toast.success("Produto removido com sucesso!");
    } catch (error) {
      return toast.error("Ocorreu um erro!");
    } finally {
      setCancelIsLoading(false);
    }
  };

  return (
    <>
      <Card className="w-full select-none rounded-[32px] border border-border/40 bg-white shadow-sm dark:border-white/10 dark:bg-neutral-900">
        <CardContent className="space-y-5 p-4 sm:p-6">
          <div className="flex gap-4 rounded-[32px] bg-white p-4 shadow-[0_8px_20px_rgba(0,0,0,0.05)] dark:bg-neutral-800 dark:shadow-none lg:flex-col">
            <div className="flex flex-1 flex-col justify-between text-left text-black dark:text-white">
              <div>
                <h2 className="text-lg font-black uppercase tracking-wide text-primary">
                  {product.name}
                </h2>
                <p className="mt-3 line-clamp-4 text-sm font-light text-muted-foreground dark:text-white/70">
                  {product.description}
                </p>
              </div>

              <div className="mt-4 flex flex-wrap items-baseline gap-2 text-base">
                <p
                  className={`font-semibold ${product.discountPercentage > 0 ? "text-muted-foreground line-through" : "text-primary"}`}
                >
                  {Number(product.basePrice).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </p>

                {product.discountPercentage > 0 && (
                  <p className="text-lg font-black text-primary">
                    {Number(product.totalPrice).toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </p>
                )}
              </div>
            </div>

            <div className="relative flex min-h-[140px] w-40 flex-shrink-0 items-center justify-center self-stretch overflow-hidden rounded-[28px] bg-muted/60 text-center text-xs font-semibold uppercase text-muted-foreground dark:bg-neutral-900 sm:w-44 lg:h-56 lg:w-full">
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                sizes="(max-width: 767px) 200px, (max-width: 1024px) 240px, 420px"
                className="rounded-[28px] object-cover"
                draggable={false}
              />

              {product.discountPercentage > 0 && (
                <p className="absolute -left-2 top-2 rounded-full bg-primary px-3 py-1 text-[10px] font-semibold text-white shadow">
                  -{product.discountPercentage}%
                </p>
              )}

              {product.specialTag !== "EMPTY" && (
                <p className="absolute -right-2 bottom-2 rounded-full bg-primary px-3 py-1 text-[10px] font-semibold text-white shadow">
                  {tagTranslation(product.specialTag as Tags)}
                </p>
              )}
            </div>
            </div>
          {isAdminPage && (
            <div className="flex flex-col gap-3">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="default" className="w-full">
                    Atualizar informações do produto
                  </Button>
                </DialogTrigger>
                <DialogContent className="border-none">
                  <DialogHeader>
                    <DialogTitle className="text-xl">
                      Atualizar informações do produto
                    </DialogTitle>
                    <DialogDescription>
                      <Separator className="mb-5 mt-3" />

                      <UpdateProductForm
                        product={product}
                        productId={product.id}
                      />
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter></DialogFooter>
                </DialogContent>
              </Dialog>

              <AlertDialog>
                <AlertDialogTrigger className="w-full">
                  <Button
                    className="flex w-full items-center gap-2"
                    variant={"outline"}
                  >
                    Remover produto do cardápio <TbTrash size={25} />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Você tem certeza disso?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Essa ação não pode ser revertida e este produto será
                      excluido permanentemente do cardápio.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDeleteClick}
                      disabled={cancelIsLoading}
                    >
                      {cancelIsLoading ? (
                        <span className="flex items-center gap-4">
                          <ClipLoader color="#fff" size={20} /> Removendo...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          Remover
                          <TbTrash size={25} />
                        </span>
                      )}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default ProductItem;
