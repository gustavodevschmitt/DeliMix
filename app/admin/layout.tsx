import Footer from "@/components/common/footer";
import Header from "@/components/common/header";
import AdminAuth from "@/components/admin/admin-auth";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <AdminAuth>
      <div className="flex min-h-screen w-full flex-col">
        <Header />
        <div className="flex-grow">{children}</div>
        <Footer />
      </div>
    </AdminAuth>
  );
}
