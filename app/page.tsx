'use client';
import React, { useState } from 'react';
import { Play } from 'lucide-react';
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
  const [showCheckout, setShowCheckout] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [showAuthAlert, setShowAuthAlert] = useState(false);

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      setIsLoggedIn(true);
      setShowLogin(false);
    } catch (error) {
      console.error('Erro no login com Google:', error);
    }
  };

  const goToHome = () => {
    setActiveSection('home');
    setShowLogin(false);
    setShowPlayer(false);
    setShowCheckout(false);
    setShowAuthAlert(false);
  };

  const handlePlayClick = () => {
    if (!isLoggedIn) {
      setShowAuthAlert(true);
      setShowLogin(true);
    } else {
      setShowPlayer(true);
    }
  };

  return (
    <div className="min-h-screen bg-black text-yellow-400" style={{ fontFamily: 'Comic Sans MS, Comic Sans, cursive' }}>
      <header className="p-4 flex flex-col md:flex-row justify-between items-center border-b border-yellow-600">
        <h1 className="text-3xl font-bold mb-2 md:mb-0">NZINGAPLAY</h1>
        <nav className="space-x-4 mb-2 md:mb-0">
          <button className="hover:underline" onClick={goToHome}>Página Inicial</button>
          <button className="hover:underline" onClick={() => setActiveSection('contactos')}>Contactos</button>
          <button className="hover:underline" onClick={() => setActiveSection('ajuda')}>Ajuda</button>
        </nav>
        <div className="space-x-4">
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

      <main className="p-6">
        {showLogin && (
          <div className="bg-yellow-900 p-6 rounded max-w-md mx-auto mb-6">
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            {showAuthAlert && <p className="text-red-300 mb-2">Tens que criar uma conta ou fazer login para assistir ao filme.</p>}
            <div className="flex flex-col gap-2">
              <button onClick={handleGoogleLogin} className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200">Entrar com Google</button>
            </div>
          </div>
        )}

        {/* restante do conteúdo da página continua aqui... */}
      </main>

      <footer className="p-4 border-t border-yellow-600 text-center text-sm">
        &copy; 2025 NZINGAPLAY - YANMATOS - COMÉRCIO E INDÚSTRIA (SU), LDA - NIF: 5002095882. Todos os direitos reservados.
      </footer>
    </div>
  );
}
