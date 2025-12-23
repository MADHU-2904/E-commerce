import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/mockApi';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('admin@supersaravana.com');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
        await authService.login(email, password);
        navigate('/admin');
    } catch (err) {
        setError('Invalid email or password.');
    } finally {
        setLoading(false);
    }
  };

  return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg border border-gray-100">
             <div className="text-center">
                <span className="text-3xl font-bold text-brand-gold uppercase tracking-wider block mb-2">Super</span>
                <h2 className="text-2xl font-bold text-brand-blue">Admin Portal</h2>
                <p className="mt-2 text-sm text-gray-600">Please sign in to continue</p>
             </div>
             
             {error && <div className="bg-red-50 text-red-600 p-3 rounded text-sm border border-red-100 text-center">{error}</div>}
             
             <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <input 
                            type="email" 
                            required 
                            value={email} 
                            onChange={e => setEmail(e.target.value)} 
                            className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-blue focus:border-brand-blue sm:text-sm transition-all" 
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input 
                            type="password" 
                            required 
                            value={password} 
                            onChange={e => setPassword(e.target.value)} 
                            className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-blue focus:border-brand-blue sm:text-sm transition-all" 
                        />
                    </div>
                </div>

                <button 
                    type="submit" 
                    disabled={loading}
                    className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-brand-blue hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue transition-colors disabled:opacity-70"
                >
                    {loading ? 'Authenticating...' : 'Sign In'}
                </button>
             </form>
             
             <div className="text-center border-t pt-6 mt-6">
               <p className="text-xs text-gray-500 font-semibold mb-2">Demo Credentials</p>
               <div className="bg-gray-50 py-2 px-4 rounded border border-gray-100 inline-block text-left">
                 <p className="text-xs text-gray-600 font-mono"><span className="text-gray-400 select-none">User: </span>admin@supersaravana.com</p>
                 <p className="text-xs text-gray-600 font-mono"><span className="text-gray-400 select-none">Pass: </span>admin123</p>
               </div>
             </div>
        </div>
      </div>
  );
};