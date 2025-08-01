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
    <div className="min-h-screen bg-black text-yellow-400" style={{ fontFamily: 'Times New Roman, serif' }}>
      <header className="p-4 flex flex-col md:flex-row md:justify-between md:items-center border-b border-yellow-600 space-y-2 md:space-y-0">
        <h1 className="text-3xl font-bold">NZINGAPLAY</h1>
        <nav className="flex space-x-4">
          <button className="hover:underline" onClick={() => handleNav('home')}>Página Inicial</button>
          <button className="hover:underline" onClick={() => handleNav('contactos')}>Contactos</button>
          <button className="hover:underline" onClick={() => handleNav('ajuda')}>Ajuda</button>
        </nav>
        <div className="flex space-x-4">
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

      <main className="p-6 flex flex-col md:flex-row">
        {isLoggedIn && (
          <aside className="md:w-48 md:mr-6 mb-6 md:mb-0">
            <button onClick={() => setShowCategories(!showCategories)} className="flex items-center justify-between w-full text-sm bg-yellow-700 px-2 py-1 rounded hover:bg-yellow-600">
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
          {showLogin && (
            <div className="bg-yellow-900 p-6 rounded max-w-md mx-auto mb-6">
              <h2 className="text-2xl font-bold mb-4">Login</h2>
              {showAuthAlert && <p className="text-red-300 mb-2">Tens que criar uma conta ou fazer login para assistir ao filme.</p>}
              <div className="flex flex-col gap-2">
                <button onClick={handleGoogleLogin} className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200">Entrar com Google</button>
              </div>
            </div>
          )}

          {activeSection === 'home' && (
            <>
              <section className="text-center mb-8">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
                  <h2 className="text-4xl font-bold mb-2">ORIGINAIS DA LUSOFONIA</h2>
                  <p className="text-yellow-300 text-lg">Plataforma gratuita até 25 de Dezembro de 2025</p>
                </motion.div>
              </section>

              <div>
                <h3 className="text-2xl font-semibold mb-4">Filmes Angolanos</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-yellow-900 rounded overflow-hidden cursor-pointer" onClick={handlePlayClick}>
                    <div className="aspect-video bg-black flex items-center justify-center">
                      <Play className="w-8 h-8 text-yellow-400" />
                    </div>
                    <p className="p-2 font-semibold text-yellow-300">A JAMAIKANA</p>
                  </div>
                </div>
              </div>

              {showPlayer && (
                <div className="bg-yellow-900 p-6 rounded max-w-3xl mx-auto mt-10">
                  <h2 className="text-2xl font-bold mb-4">A JAMAIKANA</h2>
                  <div className="aspect-video bg-black mb-4 flex items-center justify-center">
                    <iframe
                      className="w-full h-full"
                      src="https://www.youtube.com/embed/bbYewQX9kBE"
                      title="A JAMAIKANA"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <p className="mb-4 text-yellow-300">Realizado por Khristall Afrika. Produção de Yannick Matos e Leandro Priston. Técnica: Boy Gui. Ano 2021.</p>
                  <button className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-300" onClick={() => setShowPlayer(false)}>Fechar</button>
                </div>
              )}
            </>
          )}

          {activeSection === 'categoria' && selectedCategory && (
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">{selectedCategory}</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Array.from({ length: 8 }).map((_, idx) => (
                  <div key={idx} className="bg-yellow-900 rounded overflow-hidden cursor-pointer" onClick={handlePlayClick}>
                    <div className="aspect-video bg-black flex items-center justify-center">
                      <Play className="w-8 h-8 text-yellow-400" />
                    </div>
                    <p className="p-2 font-semibold text-yellow-300">{selectedCategory} #{idx + 1}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'contactos' && (
            <div className="bg-yellow-900 p-6 rounded max-w-md mx-auto text-center">
              <h2 className="text-2xl font-bold mb-4">Contactos</h2>
              <p className="mb-2">WhatsApp: <a href="https://wa.me/244931291602" className="underline text-yellow-300" target="_blank">+244 931 291 602</a></p>
              <p>Email: <a href="mailto:nzingaplay@gmail.com" className="underline text-yellow-300">nzingaplay@gmail.com</a></p>
            </div>
          )}

          {activeSection === 'ajuda' && (
            <div className="bg-yellow-900 p-6 rounded max-w-md mx-auto text-center">
              <h2 className="text-2xl font-bold mb-4">Ajuda</h2>
              <p className="text-yellow-300">Se estiveres com dúvidas, dificuldades ou precisares de suporte técnico, entra em contacto connosco pela nossa secção de <strong>Contactos</strong>. Estamos disponíveis para ajudar-te através do WhatsApp ou email.</p>
            </div>
          )}
        </div>
      </main>

      <footer className="p-4 border-t border-yellow-600 text-center text-sm">
        &copy; 2025 NZINGAPLAY - YANMATOS - COMÉRCIO E INDÚSTRIA (SU), LDA - NIF: 5002095882. Todos os direitos reservados.
      </footer>
    </div>
  );
}
