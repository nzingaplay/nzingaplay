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
      setActiveSection('home');
    } catch (error) {
      console.error('Erro no login com Google:', error);
    }
  };

  const handleNav = (section: string) => {
    setActiveSection(section);
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
          <button className="hover:underline" onClick={() => handleNav('home')}>Página Inicial</button>
          <button className="hover:underline" onClick={() => handleNav('contactos')}>Contactos</button>
          <button className="hover:underline" onClick={() => handleNav('ajuda')}>Ajuda</button>
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

        {activeSection === 'home' && (
          <>
            <section className="text-center mb-8">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
                <h2 className="text-4xl font-bold mb-2">Filmes Originais de Angola e da Lusofonia</h2>
                <p className="text-yellow-300 text-lg">Assista grtuitamente até Dezembro de 2025</p>
                {!isLoggedIn ? (
                  <button className="mt-4 bg-yellow-400 text-black px-6 py-2 rounded hover:bg-yellow-300" onClick={() => setShowLogin(true)}>Assinar Agora</button>
                ) : (
                  <button className="mt-4 bg-yellow-400 text-black px-6 py-2 rounded hover:bg-yellow-300" onClick={() => setShowCheckout(true)}>Ir para Pagamento</button>
                )}
              </motion.div>
            </section>

            {showCheckout && (
              <div className="bg-yellow-900 p-6 rounded max-w-md mx-auto mb-6 text-center">
                <h2 className="text-2xl font-bold mb-4">Pagamento Multicaixa</h2>
                <p className="mb-2">Envia 1.500 Kz para o IBAN: <strong>AO06 0000 0000 0000 0000 0000</strong></p>
                <p className="mb-4">Ou usa a referência gerada no Multicaixa Express</p>
                <button className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-300" onClick={() => setShowCheckout(false)}>Já Paguei</button>
              </div>
            )}

            <div>
              <h3 className="text-2xl font-semibold mb-4">Filmes Angolanos</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="bg-yellow-900 rounded overflow-hidden cursor-pointer" onClick={handlePlayClick}>
                    <div className="aspect-video bg-black flex items-center justify-center">
                      <Play className="w-8 h-8 text-yellow-400" />
                    </div>
                    <p className="p-2 font-semibold text-yellow-300">Filme Angolano #{i}</p>
                  </div>
                ))}
              </div>
            </div>

            {showPlayer && (
              <div className="bg-yellow-900 p-6 rounded max-w-3xl mx-auto mt-10">
                <h2 className="text-2xl font-bold mb-4">Título do Filme</h2>
                <div className="aspect-video bg-black mb-4 flex items-center justify-center">
                  <video controls className="w-full h-full">
                    <source src="/filme.mp4" type="video/mp4" />
                    Seu navegador não suporta vídeo.
                  </video>
                </div>
                <p className="mb-4 text-yellow-300">Sinopse do filme: Um retrato intenso da juventude angolana em busca de identidade e mudança.</p>
                <button className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-300" onClick={() => setShowPlayer(false)}>Fechar</button>
              </div>
            )}
          </>
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
      </main>

      <footer className="p-4 border-t border-yellow-600 text-center text-sm">
        &copy; 2025 NZINGAPLAY - YANMATOS - COMÉRCIO E INDÚSTRIA (SU), LDA - NIF: 5002095882. Todos os direitos reservados.
      </footer>
    </div>
  );
}
