"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  UtensilsCrossed,
  ConciergeBell,
  Wine,
  CupSoda,
  ChevronRight,
} from "lucide-react";

type MenuShortcut = {
  label: string;
  href: string;
  Icon: typeof UtensilsCrossed;
  options: string[];
  accentColor: string;
};

const menuShortcuts: MenuShortcut[] = [
  {
    label: "Menu Principal",
    href: "/products",
    Icon: UtensilsCrossed,
    options: [
      "Saladas",
      "Pratos Principais",
      "Especiais do Chef",
      "Menu Infantil",
    ],
    accentColor: "#354A46",
  },
  {
    label: "Room Service",
    href: "/products?search=room",
    Icon: ConciergeBell,
    options: ["Café da manhã", "Snacks", "Sopas", "Sobremesas"],
    accentColor: "#664d03",
  },
  {
    label: "Carta de Vinhos",
    href: "/products?search=vinho",
    Icon: Wine,
    options: ["Tintos", "Brancos", "Rosés", "Espumantes"],
    accentColor: "#8c1c13",
  },
  {
    label: "Carta de Bebidas",
    href: "/products?search=bebida",
    Icon: CupSoda,
    options: ["Drinks autorais", "Sem álcool", "Sucos", "Cervejas"],
    accentColor: "#0f4c75",
  },
];

const MenuShortcuts = () => {
  const [activeShortcut, setActiveShortcut] = useState<MenuShortcut>(
    menuShortcuts[0],
  );

  return (
    <section className="relative z-10 w-full px-5">
      <div className="mx-auto -mt-12 flex w-full max-w-6xl items-center gap-3 overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {menuShortcuts.map((item) => (
          <button
            key={item.label}
            onClick={() => setActiveShortcut(item)}
            type="button"
            className="relative min-w-[150px] flex-1 pb-4 sm:min-w-[180px]"
            aria-pressed={activeShortcut.label === item.label}
          >
            <Card
              className={`h-full rounded-3xl border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg ${
                activeShortcut.label === item.label
                  ? "border-primary shadow-primary/30"
                  : "border-muted"
              }`}
            >
              <CardContent className="flex h-28 flex-col items-center justify-center gap-3 text-center text-muted-foreground">
                <item.Icon className="text-primary" size={28} />
                <span className="text-xs font-semibold uppercase tracking-wide text-foreground">
                  {item.label}
                </span>
              </CardContent>
            </Card>
            <span
              aria-hidden
              className={`pointer-events-none absolute left-1/2 top-full h-0 w-0 -translate-x-1/2 border-x-6 border-t-8 border-x-transparent transition duration-200 ${
                activeShortcut.label === item.label
                  ? "opacity-100"
                  : "border-t-transparent opacity-0"
              }`}
              style={{
                borderTopColor:
                  activeShortcut.label === item.label
                    ? item.accentColor
                    : "transparent",
              }}
            />
          </button>
        ))}

        <Button
          variant="outline"
          size="icon"
          className="hidden shrink-0 rounded-full border-primary text-primary transition hover:bg-primary hover:text-primary-foreground md:inline-flex"
          aria-label="Ver mais opções"
        >
          <ChevronRight size={20} />
        </Button>
      </div>
      {activeShortcut && (
        <div className="mx-auto mt-3 flex w-full justify-center px-3">
          <div
            className="flex w-full max-w-6xl items-center justify-start gap-2 overflow-x-auto rounded-[30px] border bg-white px-4 py-2 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground shadow-sm [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:justify-center"
            style={{ borderColor: activeShortcut.accentColor }}
          >
            <span
              className="shrink-0 rounded-full px-3 py-1 text-[10px] font-black tracking-widest"
              style={{ color: activeShortcut.accentColor }}
            >
              {activeShortcut.label}
            </span>
            {activeShortcut.options.map((option) => (
              <Link
                key={option}
                href={activeShortcut.href}
                className="flex items-center whitespace-nowrap rounded-2xl px-3 py-1 transition hover:text-primary"
              >
                {option}
              </Link>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default MenuShortcuts;
