import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center pb-10 bg-[url('/loading.png')] bg-cover bg-center bg-no-repeat">
      <Link href="/">
        <Image
          src="/Logo.png"
          alt="DeliMix"
          height={0}
          width={0}
          sizes="100vw"
          priority
          className="h-auto w-44 object-contain"
        />
      </Link>

      <div className="mt-10 max-w-md rounded-3xl bg-white/90 p-6 text-center shadow-xl backdrop-blur-lg dark:bg-black/40">
        <h1 className="text-2xl font-bold text-foreground">
          Cadastro desativado
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Não pedimos mais verificação para acessar o cardápio. Aproveite para
          explorar as novidades e peça direto pelo WhatsApp.
        </p>
      </div>
    </div>
  );
}
