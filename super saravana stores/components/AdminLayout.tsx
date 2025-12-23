import React from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, Layers, MapPin, MessageSquare, Image, LogOut, FileText, User } from 'lucide-react';
import { authService } from '../services/mockApi';

const SidebarItem: React.FC<{ to: string; icon: React.ReactNode; label: string }> = ({ to, icon, label }) => (
  <NavLink 
    to={to} 
    end={to === '/admin'}
    className={({ isActive }) => 
      `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${isActive ? 'bg-brand-blue text-white shadow-md' : 'text-gray-600 hover:bg-blue-50 hover:text-brand-blue'}`
    }
  >
    {icon}
    <span className="font-medium">{label}</span>
  </NavLink>
);

export const AdminLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = authService.getCurrentUser();

  const handleLogout = () => {
    authService.logout().then(() => navigate('/login'));
  };

  // Map route to title
  const getTitle = () => {
    const path = location.pathname;
    if (path.includes('products')) return 'Product Management';
    if (path.includes('categories')) return 'Categories';
    if (path.includes('branches')) return 'Branch Locations';
    if (path.includes('inquiries')) return 'Inbox';
    if (path.includes('banners')) return 'Banners & Offers';
    return 'Dashboard Overview';
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col fixed h-full z-10">
        <div className="p-6 border-b border-gray-100">
           <div className="flex flex-col">
              <span className="text-xl font-bold text-brand-gold uppercase tracking-wider">Super</span>
              <span className="text-lg font-bold text-brand-blue">Admin Panel</span>
           </div>
        </div>
        
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          <SidebarItem to="/admin" icon={<LayoutDashboard className="w-5 h-5" />} label="Dashboard" />
          <div className="pt-4 pb-2 text-xs font-bold text-gray-400 uppercase tracking-wider px-4">Catalog</div>
          <SidebarItem to="/admin/products" icon={<ShoppingBag className="w-5 h-5" />} label="Products" />
          <SidebarItem to="/admin/categories" icon={<Layers className="w-5 h-5" />} label="Categories" />
          <div className="pt-4 pb-2 text-xs font-bold text-gray-400 uppercase tracking-wider px-4">Locations</div>
          <SidebarItem to="/admin/branches" icon={<MapPin className="w-5 h-5" />} label="Branches" />
          <div className="pt-4 pb-2 text-xs font-bold text-gray-400 uppercase tracking-wider px-4">Content</div>
          <SidebarItem to="/admin/banners" icon={<Image className="w-5 h-5" />} label="Banners" />
          <SidebarItem to="/admin/inquiries" icon={<MessageSquare className="w-5 h-5" />} label="Inquiries" />
        </nav>

        <div className="p-4 border-t border-gray-100">
           <div className="flex items-center mb-4 px-2">
              <div className="w-8 h-8 rounded-full bg-brand-blue text-white flex items-center justify-center font-bold mr-3">
                 {user?.name.charAt(0)}
              </div>
              <div className="overflow-hidden">
                 <p className="text-sm font-bold text-gray-800 truncate">{user?.name}</p>
                 <p className="text-xs text-gray-500 truncate">{user?.email}</p>
              </div>
           </div>
           <button onClick={handleLogout} className="flex items-center w-full px-4 py-2 text-sm text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors">
              <LogOut className="w-4 h-4 mr-2" /> Logout
           </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 ml-64 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="bg-white shadow-sm border-b border-gray-200 py-4 px-8 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">{getTitle()}</h1>
            <div className="flex items-center space-x-4">
               <button className="p-2 text-gray-400 hover:text-brand-blue rounded-full hover:bg-gray-100 relative">
                  <MessageSquare className="w-5 h-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
               </button>
            </div>
        </header>

        <main className="flex-1 overflow-auto p-8">
            <Outlet />
        </main>
      </div>
    </div>
  );
};