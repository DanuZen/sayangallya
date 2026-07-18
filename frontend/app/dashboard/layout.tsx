"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Heart, LayoutDashboard, Clock, ListTodo, Mail, LogOut, Globe } from "lucide-react";
import { useEffect, useState } from "react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Simple client-side auth check
    if (!document.cookie.includes("is_admin=true")) {
      router.push("/login");
    }
  }, [router]);

  const handleLogout = () => {
    document.cookie = "is_admin=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    router.push("/login");
  };

  const navItems = [
    { name: "Hero & Timer", path: "/dashboard", icon: <LayoutDashboard size={20} /> },
    { name: "Love Timeline", path: "/dashboard/timeline", icon: <Clock size={20} /> },
    { name: "Bucket List", path: "/dashboard/bucket-list", icon: <ListTodo size={20} /> },
    { name: "Secret Messages", path: "/dashboard/messages", icon: <Mail size={20} /> },
  ];

  if (!isClient) return null; // Avoid hydration mismatch

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row font-poppins">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white border-r border-gray-100 flex flex-col md:min-h-screen p-6 shadow-sm z-10 sticky top-0 h-auto md:h-screen">
        <div className="flex items-center gap-2 mb-10">
          <div className="w-8 h-8 bg-rose text-white rounded-lg flex items-center justify-center shadow-md">
            <Heart size={16} fill="currentColor" />
          </div>
          <span className="font-playfair text-xl font-bold text-charcoal">Dashboard</span>
        </div>

        <nav className="flex-1 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link 
                key={item.path} 
                href={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive 
                    ? 'bg-rose/10 text-rose font-medium' 
                    : 'text-charcoal/60 hover:bg-gray-50 hover:text-charcoal'
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto pt-6 border-t border-gray-100 space-y-2">
          <Link 
            href="/"
            className="flex items-center gap-3 px-4 py-3 w-full text-left rounded-xl text-blue-500 hover:bg-blue-50 transition-colors"
          >
            <Globe size={20} />
            Lihat Website
          </Link>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full text-left rounded-xl text-red-500 hover:bg-red-50 transition-colors"
          >
            <LogOut size={20} />
            Keluar
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 md:h-screen md:overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
