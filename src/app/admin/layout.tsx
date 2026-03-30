import { ReactNode } from "react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { Settings, Package, LayoutDashboard, LogOut } from "lucide-react";
import { logout } from "@/app/admin/login/actions";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // If we are on the login page itself, don't show the dashboard sidebar.
  // The middleware handles redirecting unathenticated users.
  // Let's use a quick check: if no user, render children (the login page handles its own layout).
  if (!user) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen bg-black text-white relative">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 bg-black/50 p-6 flex flex-col justify-between hidden md:flex">
        <div>
          <div className="mb-8">
            <h1 className="text-xl font-bold tracking-tight text-gradient">
              Psilocyber Admin
            </h1>
            <p className="text-xs text-muted-foreground mt-1">Hello, Owner</p>
          </div>
          
          <nav className="space-y-2">
            <Link 
              href="/admin" 
              className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-white/5 transition-colors text-sm font-medium"
            >
              <LayoutDashboard className="w-4 h-4" />
              Overview
            </Link>
            <Link 
              href="/admin/products" 
              className="flex items-center gap-3 px-3 py-2 rounded-md bg-white/5 hover:bg-white/10 transition-colors text-sm font-medium"
            >
              <Package className="w-4 h-4" />
              Products
            </Link>
          </nav>
        </div>

        <form action={logout}>
          <button 
            type="submit"
            className="flex w-full items-center gap-3 px-3 py-2 rounded-md hover:bg-destructive/10 hover:text-destructive transition-colors text-sm font-medium"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </form>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <header className="md:hidden border-b border-white/10 p-4 flex justify-between items-center glass">
           <h1 className="font-bold text-gradient">Admin</h1>
           <form action={logout}>
              <button type="submit" className="text-sm border border-white/10 px-3 py-1 rounded-md">Log out</button>
           </form>
        </header>
        <div className="p-4 md:p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
