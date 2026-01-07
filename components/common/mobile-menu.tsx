"use client";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import ThemeSwitcher from "./theme-switcher";
import { navlinks } from "@/helpers/contants";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa6";

const tel = 12981847553;
var text =
  "*Seja muito bem-vindo ao WhatsApp da DeliMix! Estamos aqui para atendê-lo com todo o prazer.*\n";
text +=
  "Para realizar seu pedido, precisamos de algumas informações. Caso tenha alguma dúvida, fique à vontade para perguntar!\n\n";
text += "*Seu nome:*\n";
text += "*O que você gostaria de pedir hoje?*\n";
text += "*Endereço de entrega e ponto de referência:*\n";
text +=
  "*Qual será a forma de pagamento. (Dinheiro, PIX, Crédito, Débito, VA/VR)*\n\n";

text += "*Obrigado por escolher a Delimix!*";

let encode = encodeURIComponent(text);
let URL = `https://wa.me/${tel}?text=${encode}`;

interface MobileMenuProps {
  onClose?: () => void;
}

const MobileMenu = ({ onClose }: MobileMenuProps) => {
  const handleClick = () => {
    if (onClose) onClose();
  };

  return (
    <div className="flex flex-col items-center justify-center py-4">
      <h2 className="text-lg font-semibold">Menu</h2>
      <Separator className="my-2" />

      <Button variant={"default"} asChild className="w-full rounded-xl">
        <Link
          href={URL}
          target="_blank"
          className="flex items-center justify-center gap-2"
        >
          Faça seu pedido <FaWhatsapp size={20} />
        </Link>
      </Button>

      <div className="my-4 flex justify-center">
        <ThemeSwitcher size={"icon"} variant={"link"} />
      </div>

      <Separator className="my-5" />

      <div className="flex w-full flex-col gap-2">
        {navlinks.map((navlink) => (
          <Button
            key={navlink.text}
            variant={"outline"}
            className="rounded-xl"
            asChild
            onClick={handleClick}
          >
            <Link
              href={navlink.href}
              className="flex w-full items-center justify-center gap-2 dark:text-white/70"
            >
              {navlink.text}
            </Link>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default MobileMenu;
