"use client";
import Link from "next/link";
import MobileMenu from "./mobile-menu";
import { Button } from "../ui/button";
import { Search as SearchIcon, Menu, X } from "lucide-react";
import { Input } from "../ui/input";
import {
  Sheet,
  SheetContent,
} from "../ui/sheet";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${searchQuery}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <header className="w-full bg-white shadow-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        {/* Menu Hamburguer */}
        <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-[#6b6b6b]"
            onClick={() => setMenuOpen(true)}
          >
            <Menu size={32} strokeWidth={2.5} />
          </Button>
          <SheetContent side="left">
            <MobileMenu onClose={() => setMenuOpen(false)} />
          </SheetContent>
        </Sheet>

        {/* Logo */}
        {!searchOpen && (
          <Link href="/" className="absolute left-1/2 -translate-x-1/2">
            <span className="text-3xl font-bold tracking-wider text-[#6b6b6b]">
              LOGO
            </span>
          </Link>
        )}

        {/* Busca */}
        <div className="ml-auto">
          {searchOpen ? (
            <form onSubmit={handleSearch} className="flex items-center gap-2">
              <Input
                type="text"
                placeholder="Buscar pratos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-48 sm:w-64"
                autoFocus
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="text-[#6b6b6b]"
                onClick={() => {
                  setSearchOpen(false);
                  setSearchQuery("");
                }}
              >
                <X size={28} strokeWidth={2.5} />
              </Button>
            </form>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              className="text-[#6b6b6b]"
              onClick={() => setSearchOpen(true)}
            >
              <SearchIcon size={28} strokeWidth={2.5} />
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
