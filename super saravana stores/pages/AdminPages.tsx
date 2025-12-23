import React, { useState, useEffect } from 'react';
import { adminService } from '../services/mockApi';
import { Product, Category, Branch, ContactSubmission, Banner } from '../types';
import { Plus, Edit2, Trash2, X, Check, Search, Upload, Eye, EyeOff } from 'lucide-react';

// --- Reusable Components ---
const Modal: React.FC<{ title: string; onClose: () => void; children: React.ReactNode }> = ({ title, onClose, children }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
    <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
      <div className="flex justify-between items-center p-6 border-b border-gray-100">
        <h3 className="text-xl font-bold text-brand-blue">{title}</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-red-500"><X className="w-6 h-6" /></button>
      </div>
      <div className="p-6">{children}</div>
    </div>
  </div>
);

const InputField: React.FC<any> = ({ label, ...props }) => (
  <div className="mb-4">
    <label className="block text-sm font-semibold text-gray-700 mb-1">{label}</label>
    <input className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue outline-none transition-all" {...props} />
  </div>
);

const LoadingSpinner = () => (
  <div className="flex justify-center items-center py-12">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-blue"></div>
  </div>
);

// --- Modules ---

// 1. Dashboard Home
export const AdminDashboardHome: React.FC = () => {
  const [stats, setStats] = useState({ products: 0, orders: 124, inquiries: 0, revenue: 1540000 });
  
  useEffect(() => {
    // Quick load of counts
    Promise.all([adminService.getProducts(), adminService.getSubmissions()]).then(([p, s]) => {
      setStats(prev => ({ ...prev, products: p.length, inquiries: s.filter(i => !i.isRead).length }));
    });
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
         <p className="text-sm text-gray-500 font-medium">Total Revenue (YTD)</p>
         <h3 className="text-2xl font-bold text-gray-900 mt-1">₹{stats.revenue.toLocaleString()}</h3>
         <span className="text-xs text-green-500 font-bold">+12% from last month</span>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
         <p className="text-sm text-gray-500 font-medium">Active Products</p>
         <h3 className="text-2xl font-bold text-gray-900 mt-1">{stats.products}</h3>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
         <p className="text-sm text-gray-500 font-medium">Total Orders</p>
         <h3 className="text-2xl font-bold text-gray-900 mt-1">{stats.orders}</h3>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
         <p className="text-sm text-gray-500 font-medium">New Inquiries</p>
         <h3 className="text-2xl font-bold text-brand-blue mt-1">{stats.inquiries}</h3>
      </div>
    </div>
  );
};

// 2. Product Management
export const ProductManager: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Partial<Product>>({});
  const [searchTerm, setSearchTerm] = useState('');

  const loadProducts = () => {
    setLoading(true);
    adminService.getProducts().then(data => {
        setProducts(data);
        setLoading(false);
    });
  };

  useEffect(loadProducts, []);

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
        await adminService.deleteProduct(id);
        loadProducts();
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await adminService.saveProduct(editingProduct as Product);
    setIsModalOpen(false);
    loadProducts();
  };

  const filteredProducts = products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-64">
           <input type="text" placeholder="Search products..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-blue/20 outline-none" />
           <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
        </div>
        <button onClick={() => { setEditingProduct({}); setIsModalOpen(true); }} className="bg-brand-blue text-white px-4 py-2 rounded-lg hover:bg-brand-dark flex items-center">
            <Plus className="w-4 h-4 mr-2" /> Add Product
        </button>
      </div>

      {loading ? <LoadingSpinner /> : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
           <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-200">
                 <tr>
                    <th className="px-6 py-4 font-semibold text-gray-700">Product</th>
                    <th className="px-6 py-4 font-semibold text-gray-700">Category</th>
                    <th className="px-6 py-4 font-semibold text-gray-700">Price</th>
                    <th className="px-6 py-4 font-semibold text-gray-700 text-right">Actions</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                 {filteredProducts.map(p => (
                    <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                       <td className="px-6 py-4 flex items-center">
                          <img src={p.image} className="w-10 h-10 rounded object-cover mr-3 bg-gray-100" alt="" />
                          <div>
                             <p className="font-semibold text-gray-900">{p.name}</p>
                             <p className="text-xs text-gray-500">SKU: {p.sku || 'N/A'}</p>
                          </div>
                       </td>
                       <td className="px-6 py-4 text-gray-600">{p.category}</td>
                       <td className="px-6 py-4 font-medium">₹{p.price.toLocaleString()}</td>
                       <td className="px-6 py-4 text-right space-x-2">
                          <button onClick={() => { setEditingProduct(p); setIsModalOpen(true); }} className="p-2 text-gray-400 hover:text-brand-blue hover:bg-blue-50 rounded"><Edit2 className="w-4 h-4" /></button>
                          <button onClick={() => handleDelete(p.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded"><Trash2 className="w-4 h-4" /></button>
                       </td>
                    </tr>
                 ))}
              </tbody>
           </table>
        </div>
      )}

      {isModalOpen && (
        <Modal title={editingProduct.id ? 'Edit Product' : 'Add New Product'} onClose={() => setIsModalOpen(false)}>
            <form onSubmit={handleSave} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <InputField label="Product Name" value={editingProduct.name || ''} onChange={(e: any) => setEditingProduct({...editingProduct, name: e.target.value})} required />
                    <InputField label="Category" value={editingProduct.category || ''} onChange={(e: any) => setEditingProduct({...editingProduct, category: e.target.value})} required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <InputField label="Price" type="number" value={editingProduct.price || ''} onChange={(e: any) => setEditingProduct({...editingProduct, price: parseInt(e.target.value)})} required />
                    <InputField label="SKU" value={editingProduct.sku || ''} onChange={(e: any) => setEditingProduct({...editingProduct, sku: e.target.value})} />
                </div>
                <InputField label="Image URL" value={editingProduct.image || ''} onChange={(e: any) => setEditingProduct({...editingProduct, image: e.target.value})} placeholder="https://..." required />
                
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
                    <textarea 
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue outline-none transition-all"
                        rows={4} 
                        value={editingProduct.description || ''} 
                        onChange={e => setEditingProduct({...editingProduct, description: e.target.value})}
                    ></textarea>
                </div>
                
                <div className="flex justify-end pt-4">
                    <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg mr-2">Cancel</button>
                    <button type="submit" className="px-6 py-2 bg-brand-blue text-white rounded-lg hover:bg-brand-dark">Save Product</button>
                </div>
            </form>
        </Modal>
      )}
    </div>
  );
};

// 3. Category Management
export const CategoryManager: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCat, setEditingCat] = useState<Partial<Category>>({});

    const load = () => adminService.getCategories().then(setCategories);
    useEffect(() => { load() }, []);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        await adminService.saveCategory(editingCat as Category);
        setIsModalOpen(false);
        load();
    };

    const handleDelete = async (id: string) => {
        try {
            await adminService.deleteCategory(id);
            load();
        } catch (error) {
            alert('Cannot delete this category because it has products linked to it.');
        }
    };

    return (
        <div>
            <div className="flex justify-end mb-6">
                 <button onClick={() => { setEditingCat({}); setIsModalOpen(true); }} className="bg-brand-blue text-white px-4 py-2 rounded-lg hover:bg-brand-dark flex items-center">
                    <Plus className="w-4 h-4 mr-2" /> Add Category
                 </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map(c => (
                    <div key={c.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center justify-between">
                        <div className="flex items-center">
                            <img src={c.image} className="w-12 h-12 rounded object-cover mr-4" alt="" />
                            <div>
                                <h4 className="font-bold text-gray-900">{c.name}</h4>
                                <p className="text-xs text-gray-500">{c.productCount || 0} Products</p>
                            </div>
                        </div>
                        <div className="flex space-x-1">
                             <button onClick={() => { setEditingCat(c); setIsModalOpen(true); }} className="p-2 text-gray-400 hover:text-brand-blue rounded"><Edit2 className="w-4 h-4" /></button>
                             <button onClick={() => handleDelete(c.id)} className="p-2 text-gray-400 hover:text-red-600 rounded"><Trash2 className="w-4 h-4" /></button>
                        </div>
                    </div>
                ))}
            </div>
            
            {isModalOpen && (
                <Modal title={editingCat.id ? 'Edit Category' : 'Add Category'} onClose={() => setIsModalOpen(false)}>
                    <form onSubmit={handleSave} className="space-y-4">
                        <InputField label="Category Name" value={editingCat.name || ''} onChange={(e: any) => setEditingCat({...editingCat, name: e.target.value})} required />
                        <InputField label="Slug" value={editingCat.slug || ''} onChange={(e: any) => setEditingCat({...editingCat, slug: e.target.value})} required />
                        <InputField label="Image URL" value={editingCat.image || ''} onChange={(e: any) => setEditingCat({...editingCat, image: e.target.value})} required />
                        <div className="flex justify-end pt-4">
                             <button type="submit" className="px-6 py-2 bg-brand-blue text-white rounded-lg">Save</button>
                        </div>
                    </form>
                </Modal>
            )}
        </div>
    );
};

// 4. Branch Management
export const BranchManager: React.FC = () => {
    const [branches, setBranches] = useState<Branch[]>([]);
    const [editing, setEditing] = useState<Partial<Branch>>({});
    const [isModalOpen, setIsModalOpen] = useState(false);

    const load = () => adminService.getBranches().then(setBranches);
    useEffect(() => { load() }, []);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        await adminService.saveBranch(editing as Branch);
        setIsModalOpen(false);
        load();
    };

    return (
        <div>
             <div className="flex justify-end mb-6">
                 <button onClick={() => { setEditing({}); setIsModalOpen(true); }} className="bg-brand-blue text-white px-4 py-2 rounded-lg hover:bg-brand-dark flex items-center">
                    <Plus className="w-4 h-4 mr-2" /> Add Branch
                 </button>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-4 font-semibold text-gray-700">Branch Name</th>
                            <th className="px-6 py-4 font-semibold text-gray-700">City</th>
                            <th className="px-6 py-4 font-semibold text-gray-700">Phone</th>
                            <th className="px-6 py-4 font-semibold text-gray-700 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {branches.map(b => (
                            <tr key={b.id}>
                                <td className="px-6 py-4 font-medium text-gray-900">{b.name}</td>
                                <td className="px-6 py-4 text-gray-600">{b.location}</td>
                                <td className="px-6 py-4 text-gray-600">{b.phone}</td>
                                <td className="px-6 py-4 text-right space-x-2">
                                    <button onClick={() => { setEditing(b); setIsModalOpen(true); }} className="p-2 text-gray-400 hover:text-brand-blue"><Edit2 className="w-4 h-4" /></button>
                                    <button onClick={async () => { if(confirm('Delete?')) { await adminService.deleteBranch(b.id); load(); } }} className="p-2 text-gray-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <Modal title={editing.id ? 'Edit Branch' : 'Add Branch'} onClose={() => setIsModalOpen(false)}>
                    <form onSubmit={handleSave} className="space-y-4">
                        <InputField label="Name" value={editing.name || ''} onChange={(e: any) => setEditing({...editing, name: e.target.value})} required />
                        <div className="grid grid-cols-2 gap-4">
                           <InputField label="Location (City)" value={editing.location || ''} onChange={(e: any) => setEditing({...editing, location: e.target.value})} required />
                           <InputField label="Phone" value={editing.phone || ''} onChange={(e: any) => setEditing({...editing, phone: e.target.value})} required />
                        </div>
                        <InputField label="Address" value={editing.address || ''} onChange={(e: any) => setEditing({...editing, address: e.target.value})} required />
                        <InputField label="Hours" value={editing.hours || ''} onChange={(e: any) => setEditing({...editing, hours: e.target.value})} placeholder="e.g. 9 AM - 10 PM" required />
                        <InputField label="Image URL" value={editing.image || ''} onChange={(e: any) => setEditing({...editing, image: e.target.value})} required />
                        <div className="flex justify-end pt-4">
                             <button type="submit" className="px-6 py-2 bg-brand-blue text-white rounded-lg">Save Branch</button>
                        </div>
                    </form>
                </Modal>
            )}
        </div>
    );
};

// 5. Inquiries (Contact Submissions)
export const SubmissionManager: React.FC = () => {
    const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
    const [selected, setSelected] = useState<ContactSubmission | null>(null);

    const load = () => adminService.getSubmissions().then(setSubmissions);
    useEffect(() => { load() }, []);

    const handleView = async (msg: ContactSubmission) => {
        setSelected(msg);
        if (!msg.isRead) {
            await adminService.markAsRead(msg.id);
            load();
        }
    };

    return (
        <div className="flex h-[calc(100vh-140px)] bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {/* List */}
            <div className={`w-full md:w-1/3 border-r border-gray-200 overflow-y-auto ${selected ? 'hidden md:block' : 'block'}`}>
                {submissions.length === 0 && <div className="p-8 text-center text-gray-500">No messages.</div>}
                <ul className="divide-y divide-gray-100">
                    {submissions.map(s => (
                        <li key={s.id} onClick={() => handleView(s)} className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${selected?.id === s.id ? 'bg-blue-50' : ''} ${!s.isRead ? 'border-l-4 border-brand-blue' : ''}`}>
                            <div className="flex justify-between items-start mb-1">
                                <span className={`font-semibold text-sm ${!s.isRead ? 'text-gray-900' : 'text-gray-600'}`}>{s.name}</span>
                                <span className="text-xs text-gray-400">{s.date}</span>
                            </div>
                            <p className={`text-sm mb-1 truncate ${!s.isRead ? 'font-bold text-gray-900' : 'text-gray-600'}`}>{s.subject}</p>
                            <p className="text-xs text-gray-400 truncate">{s.message}</p>
                        </li>
                    ))}
                </ul>
            </div>
            
            {/* Detail */}
            <div className={`w-full md:w-2/3 flex flex-col ${!selected ? 'hidden md:flex' : 'flex'}`}>
                {selected ? (
                    <div className="flex-1 flex flex-col h-full">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-start">
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{selected.subject}</h3>
                                <div className="flex items-center text-sm text-gray-600">
                                    <span className="font-semibold mr-2">{selected.name}</span>
                                    <span>&lt;{selected.email}&gt;</span>
                                </div>
                                <p className="text-xs text-gray-400 mt-1">{selected.date}</p>
                            </div>
                            <button onClick={() => setSelected(null)} className="md:hidden text-gray-500">Close</button>
                        </div>
                        <div className="p-6 flex-1 overflow-y-auto bg-gray-50/50">
                            <p className="whitespace-pre-wrap text-gray-800 leading-relaxed">{selected.message}</p>
                        </div>
                    </div>
                ) : (
                    <div className="flex-1 flex items-center justify-center text-gray-400">
                        Select a message to view details
                    </div>
                )}
            </div>
        </div>
    );
};

// 6. Banners (CMS)
export const BannerManager: React.FC = () => {
    const [banners, setBanners] = useState<Banner[]>([]);
    const [editing, setEditing] = useState<Partial<Banner>>({});
    const [isModalOpen, setIsModalOpen] = useState(false);

    const load = () => adminService.getBanners().then(setBanners);
    useEffect(() => { load() }, []);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        await adminService.saveBanner(editing as Banner);
        setIsModalOpen(false);
        load();
    };

    return (
        <div>
             <div className="flex justify-end mb-6">
                 <button onClick={() => { setEditing({}); setIsModalOpen(true); }} className="bg-brand-blue text-white px-4 py-2 rounded-lg hover:bg-brand-dark flex items-center">
                    <Plus className="w-4 h-4 mr-2" /> Add Banner
                 </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {banners.map(b => (
                    <div key={b.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden group">
                        <div className="h-40 relative">
                             <img src={b.image} alt="" className="w-full h-full object-cover" />
                             <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity space-x-2">
                                <button onClick={() => { setEditing(b); setIsModalOpen(true); }} className="bg-white text-gray-900 px-3 py-1 rounded text-sm font-bold">Edit</button>
                                <button onClick={async () => { if(confirm('Delete?')) { await adminService.deleteBanner(b.id); load(); }}} className="bg-red-600 text-white px-3 py-1 rounded text-sm font-bold">Delete</button>
                             </div>
                        </div>
                        <div className="p-4">
                            <h4 className="font-bold text-gray-900">{b.title}</h4>
                            <p className="text-sm text-gray-600">{b.subtitle}</p>
                            <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
                                <span>Link: {b.link}</span>
                                <span>{b.startDate} - {b.endDate}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {isModalOpen && (
                <Modal title={editing.id ? 'Edit Banner' : 'Add Banner'} onClose={() => setIsModalOpen(false)}>
                    <form onSubmit={handleSave} className="space-y-4">
                        <InputField label="Title" value={editing.title || ''} onChange={(e: any) => setEditing({...editing, title: e.target.value})} required />
                        <InputField label="Subtitle" value={editing.subtitle || ''} onChange={(e: any) => setEditing({...editing, subtitle: e.target.value})} required />
                        <InputField label="Image URL" value={editing.image || ''} onChange={(e: any) => setEditing({...editing, image: e.target.value})} required />
                        <div className="grid grid-cols-2 gap-4">
                           <InputField label="CTA Text" value={editing.cta || ''} onChange={(e: any) => setEditing({...editing, cta: e.target.value})} required />
                           <InputField label="Link URL" value={editing.link || ''} onChange={(e: any) => setEditing({...editing, link: e.target.value})} required />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                           <InputField label="Start Date" type="date" value={editing.startDate || ''} onChange={(e: any) => setEditing({...editing, startDate: e.target.value})} />
                           <InputField label="End Date" type="date" value={editing.endDate || ''} onChange={(e: any) => setEditing({...editing, endDate: e.target.value})} />
                        </div>
                        <div className="flex justify-end pt-4">
                             <button type="submit" className="px-6 py-2 bg-brand-blue text-white rounded-lg">Save Banner</button>
                        </div>
                    </form>
                </Modal>
            )}
        </div>
    );
};
