import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import Cart from '@components/Cart';

const Header = () => {
  const [user] = useAuthState(auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsMenuOpen(false);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsMenuOpen(false);
    }
  };

  return (
    <>
      <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#ededed] px-4 md:px-10 py-3 relative">
        <div className="flex items-center gap-4 md:gap-8">
          <Link to="/" className="flex items-center gap-2 md:gap-4 text-[#141414]">
            <div className="size-4">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M36.7273 44C33.9891 44 31.6043 39.8386 30.3636 33.69C29.123 39.8386 26.7382 44 24 44C21.2618 44 18.877 39.8386 17.6364 33.69C16.3957 39.8386 14.0109 44 11.2727 44C7.25611 44 4 35.0457 4 24C4 12.9543 7.25611 4 11.2727 4C14.0109 4 16.3957 8.16144 17.6364 14.31C18.877 8.16144 21.2618 4 24 4C26.7382 4 29.123 8.16144 30.3636 14.31C31.6043 8.16144 33.9891 4 36.7273 4C40.7439 4 44 12.9543 44 24C44 35.0457 40.7439 44 36.7273 44Z" fill="currentColor" />
              </svg>
            </div>
            <h2 className="text-[#141414] text-lg font-bold leading-tight tracking-[-0.015em]">Chantelle</h2>
          </Link>

          <div className="hidden md:flex items-center gap-5 lg:gap-9">
            <Link to="/" className="text-[#141414] text-sm font-medium hover:text-[#0c77f2] transition">Home</Link>
            <Link to="/products?category=Suits" className="text-[#141414] text-sm font-medium hover:text-[#0c77f2] transition">Suits</Link>
            <Link to="/products?category=Old Money" className="text-[#141414] text-sm font-medium hover:text-[#0c77f2] transition">Old Money</Link>
            <Link to="/products?category=Baggy" className="text-[#141414] text-sm font-medium hover:text-[#0c77f2] transition">Baggy</Link>
            {user?.email === "mueezimran1@gmail.com" && (
              <Link to="/admin" className="text-[#141414] text-sm font-medium hover:text-[#0c77f2] transition">Admin</Link>
            )}
          </div>
        </div>

        <div className="flex flex-1 justify-end gap-4 md:gap-8">
          {/* Desktop Search */}
          <label className="hidden md:flex flex-col min-w-40 !h-10 max-w-64">
            <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
              <div className="text-neutral-500 flex border-none bg-[#ededed] items-center justify-center pl-4 rounded-l-lg border-r-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z" />
                </svg>
              </div>
              <input
                placeholder="Search"
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#141414] focus:outline-0 focus:ring-0 border-none bg-[#ededed] focus:border-none h-full placeholder:text-neutral-500 px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearchSubmit()}
              />
            </div>
          </label>

          {/* Desktop Cart/Auth */}
          <div className="hidden md:flex gap-2 items-center">
            <button onClick={() => setIsCartOpen(true)} className="flex items-center justify-center px-4 h-10 rounded-lg bg-[#ededed] text-[#141414] hover:bg-[#e0e0e0] transition">🛒 Cart</button>
            {user ? (
              <>
                <button onClick={handleLogout} className="px-4 h-10 rounded-lg bg-[#ededed] text-[#141414] text-sm font-semibold hover:bg-[#e0e0e0] transition">Logout</button>
                <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-[#ededed]"
                  style={{
                    backgroundImage: user.photoURL
                      ? `url("${user.photoURL}")`
                      : 'url("https://www.gravatar.com/avatar/default?s=200&d=mp")'
                  }}
                />
              </>
            ) : (
              <Link to="/login" className="px-4 h-10 rounded-lg bg-[#141414] text-white text-sm font-semibold hover:opacity-90 transition">Login</Link>
            )}
          </div>

          {/* Mobile Icons */}
          <div className="md:hidden flex items-center gap-2">
            <button onClick={() => setIsCartOpen(true)} className="h-10 w-10 rounded-lg bg-[#ededed]">🛒</button>
            <button onClick={toggleMenu} className="h-10 w-10 rounded-lg bg-[#ededed]">
              {isMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg z-50 border-t border-[#ededed]">
            <div className="px-4 py-2 space-y-2">
              {/* Mobile Search */}
              <div className="flex items-center gap-2 rounded-lg bg-[#ededed] px-3 py-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#666" viewBox="0 0 256 256">
                  <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-transparent border-none focus:outline-none w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearchSubmit()}
                />
                <button onClick={handleSearchSubmit} className="text-[#141414] hover:text-[#0c77f2]" aria-label="Search">
                  🔍
                </button>
              </div>

              {/* Mobile Nav */}
              <Link to="/products?category=Suits" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 hover:bg-gray-100 rounded-lg transition">Suits</Link>
              <Link to="/products?category=Old Money" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 hover:bg-gray-100 rounded-lg transition">Old Money</Link>
              <Link to="/products?category=Baggy" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 hover:bg-gray-100 rounded-lg transition">Baggy</Link>

              {user?.email === "mueezimran1@gmail.com" && (
                <Link to="/admin" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 hover:bg-gray-100 rounded-lg transition">Admin</Link>
              )}

              <div className="pt-2 border-t border-gray-200">
                {user ? (
                  <>
                    <div className="flex items-center px-4 py-3 space-x-3">
                      <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-[#ededed]" style={{
                        backgroundImage: user.photoURL
                          ? `url("${user.photoURL}")`
                          : 'url("https://www.gravatar.com/avatar/default?s=200&d=mp")'
                      }}></div>
                      <div>
                        <p className="font-medium text-[#141414]">{user.displayName || user.email}</p>
                      </div>
                    </div>
                    <button onClick={handleLogout} className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition">Logout</button>
                  </>
                ) : (
                  <Link to="/login" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 text-[#141414] hover:bg-gray-100 rounded-lg transition font-medium">Login</Link>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Header;
