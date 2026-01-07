"use client";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const WelcomeMessage = () => {
  const currentHour = new Date().getHours();
  const greeting =
    currentHour < 12
      ? "Bom dia"
      : currentHour < 18
        ? "Boa tarde"
        : "Boa noite";

  return (
    <div className="flex flex-col dark:text-white">
      <h2 className="text-xl">
        {greeting}, <span className="font-bold">bem-vindo à DeliMix!</span>
      </h2>
      <p className="text-sm font-light dark:text-white/70">
        {`Hoje é ${format(new Date(), "EEEE', dia' dd 'de' MMMM", {
          locale: ptBR,
        })}`}
        .
      </p>
    </div>
  );
};

export default WelcomeMessage;
