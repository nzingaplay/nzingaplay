'use client';
import React, { useState, useEffect } from 'react';
import { Play, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAmPplbu9nMSPZF-RUORsRqvO1mEHdHInI',
  authDomain: 'nzingaplay-99449.firebaseapp.com',
  projectId: 'nzingaplay-99449',
  storageBucket: 'nzingaplay-99449.firebasestorage.app',
  messagingSenderId: '213413081820',
  appId: '1:213413081820:web:22382bf60b501539f93a19'
};

initializeApp(firebaseConfig);
const auth = getAuth();

export default function NzingaPlay() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [showAuthAlert, setShowAuthAlert] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      setIsLoggedIn(true);
      setShowLogin(false);
      setActiveSection('home');
    } catch (error) {
      console.error('Erro no login com Google:', error);
    }
  };

  const handleNav = (section: string) => {
    setActiveSection(section);
    setShowLogin(false);
    setShowPlayer(false);
    setShowAuthAlert(false);
    setSelectedCategory('');
  };

  const handlePlayClick = () => {
    if (!isLoggedIn) {
      setShowAuthAlert(true);
      setShowLogin(true);
    } else {
      setShowPlayer(true);
    }
  };

  const categories = [
    'Ação', 'Comédia', 'Romance', 'Biografia', 'Ficção Científica', 'Suspense', 'Terror', 'Documentários'
  ];

  if (showSplash) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-yellow-400" style={{ fontFamily: 'Times New Roman, serif' }}>
        <h1 className="text-5xl font-bold animate-pulse">NZINGAPLAY</h1>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-black text-yellow-400 bg-cover bg-center"
      style={{
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url("/playfundo.jpg")',
        fontFamily: 'Times New Roman, serif'
      }}
    >
      <header className="p-4 flex flex-col lg:flex-row lg:justify-between lg:items-center border-b border-yellow-600 space-y-2 lg:space-y-0">
        <h1 className="text-3xl font-bold text-center lg:text-left">NZINGAPLAY</h1>
        <nav className="flex flex-wrap justify-center gap-2">
          <button className="bg-yellow-500 hover:bg-yellow-400 text-black px-4 py-2 rounded-full shadow-md transition-transform active:scale-95" onClick={() => handleNav('home')}>Página Inicial</button>
          <button className="bg-yellow-500 hover:bg-yellow-400 text-black px-4 py-2 rounded-full shadow-md transition-transform active:scale-95" onClick={() => handleNav('contactos')}>Contactos</button>
          <button className="bg-yellow-500 hover:bg-yellow-400 text-black px-4 py-2 rounded-full shadow-md transition-transform active:scale-95" onClick={() => handleNav('ajuda')}>Ajuda</button>
        </nav>
        <div className="flex justify-center lg:justify-end gap-2">
          {!isLoggedIn ? (
            <>
              <button className="text-yellow-400" onClick={() => setShowLogin(true)}>Entrar</button>
              <button className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-300" onClick={() => setShowLogin(true)}>Criar Conta</button>
            </>
          ) : (
            <button className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-300" onClick={() => setIsLoggedIn(false)}>Sair</button>
          )}
        </div>
      </header>

      <main className="p-4 flex flex-col lg:flex-row">
        {isLoggedIn && (
          <aside className="lg:w-48 lg:mr-6 mb-4 lg:mb-0">
            <button onClick={() => setShowCategories(!showCategories)} className="flex items-center justify-between w-full text-sm bg-yellow-700 px-3 py-2 rounded hover:bg-yellow-600">
              Categorias <ChevronDown className="w-4 h-4 ml-1" />
            </button>
            {showCategories && (
              <ul className="space-y-2 mt-2 text-sm">
                {categories.map((cat, idx) => (
                  <li key={idx}>
                    <button onClick={() => { setSelectedCategory(cat); setActiveSection('categoria'); }} className="hover:underline text-left w-full text-sm">{cat}</button>
                  </li>
                ))}
              </ul>
            )}
          </aside>
        )}

        <div className="flex-1">
          {/* o conteúdo principal permanece igual */}
        </div>
      </main>

      <footer className="p-4 border-t border-yellow-600 text-center text-sm">
        &copy; 2025 NZINGAPLAY - YANMATOS - COMÉRCIO E INDÚSTRIA (SU), LDA - NIF: 5002095882. Todos os direitos reservados.
      </footer>
    </div>
  );
}
