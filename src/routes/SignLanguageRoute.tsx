import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, Volume2, Hand, ArrowRight, MessageCircle, Smartphone, Users } from 'lucide-react';

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

export default function SignLanguageRoute() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeSidebarKey, setActiveSidebarKey] = useState<'dashboard'|'braille'|'sign'|'settings'>('sign');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm1',
      role: 'assistant',
      content: "Welcome to Sign Language Mode! I'm here to help you with sign language interpretation and translation. You can type text to convert to sign language videos or ask questions about sign language.",
    },
  ]);
  const [input, setInput] = useState('');
  const containerRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [isPlusOpen, setIsPlusOpen] = useState(false);
  const plusButtonRef = useRef<HTMLButtonElement | null>(null);
  const plusMenuRef = useRef<HTMLDivElement | null>(null);
  
  const currentUser = {
    name: 'DIVYA SURVE',
    plan: 'Pro Plan',
  };

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [isLargeText, setIsLargeText] = useState(false);
  const [isTextToSpeechEnabled, setIsTextToSpeechEnabled] = useState(() => {
    try {
      const saved = localStorage.getItem('textToSpeech');
      return saved === 'true';
    } catch {
      return false;
    }
  });
  const [isDarkMode, setIsDarkMode] = useState(() => {
    try {
      const saved = localStorage.getItem('theme');
      if (saved === 'dark') return true;
      if (saved === 'light') return false;
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  });

  // Sign Language Modes
  const modes = useMemo(
    () => [
      { key: 'isl', label: 'Indian Sign Language' },
      { key: 'asl', label: 'American Sign Language' },
      { key: 'gsl', label: 'German Sign Language' },
    ],
    []
  );
  const [selectedMode, setSelectedMode] = useState(modes[0].key);
  const [showModeToast, setShowModeToast] = useState(false);

  const selectMode = (modeKey: string) => {
    if (modeKey === selectedMode) return;
    setSelectedMode(modeKey);
    setShowModeToast(true);
    window.setTimeout(() => setShowModeToast(false), 4200);
  };

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      root.style.backgroundColor = '#131313';
      root.style.color = '#ffffff';
    } else {
      root.classList.remove('dark');
      root.style.backgroundColor = '#f9fafb';
      root.style.color = '#111827';
    }
    try {
      localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    } catch {}
  }, [isDarkMode]);

  useEffect(() => {
    try {
      localStorage.setItem('textToSpeech', String(isTextToSpeechEnabled));
    } catch {}
  }, [isTextToSpeechEnabled]);

  useEffect(() => {
    containerRef.current?.scrollTo({ top: containerRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages.length]);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = '0px';
    const next = Math.min(el.scrollHeight, 160);
    el.style.height = next + 'px';
  }, [input]);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!isPlusOpen) return;
      const target = e.target as Node;
      if (plusButtonRef.current && plusButtonRef.current.contains(target)) return;
      if (plusMenuRef.current && plusMenuRef.current.contains(target)) return;
      setIsPlusOpen(false);
    }
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, [isPlusOpen]);

  function handleSend() {
    const trimmed = input.trim();
    if (!trimmed) return;
    const newUserMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: trimmed,
    };
    setMessages((prev) => [...prev, newUserMessage]);
    setInput('');
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: `I've processed your text for ${modes.find(m => m.key === selectedMode)?.label} interpretation. In a full implementation, this would show sign language video output.`,
        },
      ]);
    }, 450);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  const sidebarItems = useMemo(
    () => [
      { key: 'dashboard', label: 'Dashboard', icon: MessageCircle },
      { key: 'braille', label: 'Braille Mode', icon: Zap },
      { key: 'sign', label: 'Sign Language Mode', icon: Hand },
      { key: 'settings', label: 'Settings', icon: Smartphone },
    ],
    []
  );

  return (
    <div className={`min-h-screen bg-gradient-to-br from-gray-50 to-orange-50/30 dark:from-gray-900 dark:to-orange-900/20 relative overflow-hidden`}>
      
      {/* Animated Background Elements */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
      <div className="absolute top-40 right-10 w-96 h-96 bg-amber-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-1000"></div>
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-red-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-500"></div>
      
      {/* Floating Icons */}
      <div className="absolute top-1/4 left-1/6 animate-float">
        <Hand className="w-8 h-8 text-orange-400" />
      </div>
      <div className="absolute bottom-1/4 left-1/3 animate-float delay-500">
        <Volume2 className="w-7 h-7 text-blue-400" />
      </div>
      <div className="absolute bottom-1/3 right-1/6 animate-float delay-1500">
        <MessageCircle className="w-8 h-8 text-green-400" />
      </div>

      <div className={`flex h-screen w-screen overflow-x-hidden ${isDarkMode ? 'bg-transparent text-white' : 'bg-transparent text-gray-900'}`}>
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/30 z-20 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div
          className={
            `border-r transition-all duration-300 ease-in-out flex flex-col overflow-hidden backdrop-blur-sm ${
              isDarkMode
                ? 'border-gray-800 bg-[#0a0a0a]/80 text-white'
                : 'border-gray-200 bg-white/80 text-gray-900'
            } ` +
            (isSidebarOpen
              ? 'fixed inset-y-0 left-0 z-30 w-64 translate-x-0 md:relative md:w-64 md:translate-x-0'
              : 'fixed inset-y-0 left-0 z-30 w-64 -translate-x-full md:relative md:w-16 md:translate-x-0')
          }
        >
          <div className={(isSidebarOpen ? 'opacity-100' : 'opacity-0 md:opacity-100') + ' transition-opacity duration-200 flex-1 overflow-hidden flex flex-col'}>
            <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-orange-500 to-red-600 flex items-center justify-center shadow-lg">
                  <img src="/src/assets/images/logo/icon.png" alt="Samvaad logo" className="h-6 w-6 object-contain" />
                </div>
                <span className={(isSidebarOpen ? '' : 'hidden md:inline-block md:opacity-0') + ' font-bold text-lg bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent'}>Samvaad</span>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto overflow-x-hidden p-3 space-y-2 text-sm">
              {sidebarItems.map((item) => (
                <button
                  key={item.key}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 hover:scale-105 group ${
                    item.key === 'sign' 
                      ? (isDarkMode ? 'bg-orange-600 text-white' : 'bg-orange-100 text-orange-700')
                      : (isDarkMode ? 'hover:bg-gray-900' : 'hover:bg-gray-100')
                  }`}
                  title={item.label}
                  onClick={() => {
                    setActiveSidebarKey(item.key as any);
                    if (item.key === 'settings') setIsSettingsOpen(true);
                    if (item.key === 'dashboard') navigate('/dashboard');
                    if (item.key === 'braille') navigate('/braille');
                  }}
                >
                  <div className={`h-10 w-10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ${
                    item.key === 'sign' 
                      ? 'bg-gradient-to-r from-orange-500 to-red-500' 
                      : 'bg-gradient-to-r from-indigo-500 to-purple-500'
                  }`}>
                    <item.icon className="h-5 w-5 text-white" />
                  </div>
                  <span className={isSidebarOpen ? 'truncate font-medium' : 'hidden md:inline-block md:opacity-0'}>{item.label}</span>
                </button>
              ))}
            </div>

            <div className="p-4 border-t border-gray-100 dark:border-gray-800">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white uppercase flex items-center justify-center text-sm font-bold shadow-lg">
                    {currentUser.name?.[0] ?? 'U'}
                  </div>
                  <div className={(isSidebarOpen ? '' : 'hidden md:block md:opacity-0') + ' leading-tight'}>
                    <div className="text-sm font-medium truncate">{currentUser.name}</div>
                    <div className="text-xs text-gray-500 truncate">{currentUser.plan}</div>
                  </div>
                </div>
                <button className={(isSidebarOpen ? '' : 'hidden md:inline-flex md:opacity-0') + ' shrink-0 px-4 py-2 rounded-full bg-gradient-to-r from-orange-600 to-red-600 text-white text-sm font-medium hover:from-orange-700 hover:to-red-700 transition-all duration-300 hover:scale-105 shadow-lg'}>
                  Upgrade
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className={`flex-1 flex flex-col backdrop-blur-sm ${isDarkMode ? 'bg-transparent text-white' : 'bg-transparent text-gray-900'}`}>
          {isSettingsOpen && (
            <div className="fixed inset-0 z-40 animate-fadeIn">
              <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsSettingsOpen(false)} />
              <div className="absolute inset-0 flex items-start justify-center p-4 md:p-8 overflow-auto">
                <div className="w-full max-w-lg bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-800 animate-slideUp">
                  <div className="sticky top-0 bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur rounded-t-3xl px-6 py-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
                    <h3 className="text-xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">Settings</h3>
                    <button className="h-10 w-10 inline-flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-900 transition-all duration-300 hover:scale-110" onClick={() => setIsSettingsOpen(false)} aria-label="Close">
                      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 6l12 12M18 6L6 18"/></svg>
                    </button>
                  </div>
                  <div className="p-6 space-y-4">
                    {[
                      { icon: '🌗', title: 'Dark mode', description: 'Toggle light/dark theme', state: isDarkMode, setState: setIsDarkMode },
                      { icon: '🔊', title: 'Text-to-Speech', description: 'Enable audio playback for all text', state: isTextToSpeechEnabled, setState: setIsTextToSpeechEnabled },
                      { icon: 'U', title: 'High Contrast', description: 'Improve visibility with higher contrast', state: isHighContrast, setState: setIsHighContrast },
                      { icon: 'Tt', title: 'Large Text', description: 'Increase text size for better readability', state: isLargeText, setState: setIsLargeText },
                    ].map((setting, index) => (
                      <div key={index} className="rounded-2xl border border-gray-200 dark:border-gray-800 p-4 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
                        <button className="w-full flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center text-white font-semibold">
                              {setting.icon}
                            </div>
                            <div className="text-left">
                              <div className="font-semibold text-gray-900 dark:text-gray-100">{setting.title}</div>
                              <div className="text-sm text-gray-500">{setting.description}</div>
                            </div>
                          </div>
                          <label className="inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only" checked={setting.state} onChange={(e) => setting.setState(e.target.checked)} />
                            <span className={(setting.state ? 'bg-gradient-to-r from-orange-600 to-red-600' : 'bg-gray-300') + ' w-12 h-6 rounded-full relative transition-colors'}>
                              <span className={(setting.state ? 'translate-x-6' : 'translate-x-0') + ' absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white dark:bg-gray-200 transition-transform shadow-lg'} />
                            </span>
                          </label>
                        </button>
                      </div>
                    ))}

                    <div className="pt-4">
                      <button className="w-full py-4 rounded-2xl bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                        Sign out
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Top bar */}
          <div className={`h-16 flex items-center justify-between px-6 border-b backdrop-blur-lg sticky top-0 z-10 ${
            isDarkMode
              ? 'border-gray-800 bg-[#0a0a0a]/80'
              : 'border-gray-200 bg-white/80'
          }`}>
            <div className="flex items-center gap-4">
              <button
                className="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-900 transition-all duration-300 hover:scale-105"
                aria-label="Toggle sidebar"
                onClick={() => setIsSidebarOpen((v) => !v)}
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 6h18M3 12h18M3 18h18" />
                </svg>
              </button>
              
              {/* Sign Language Header */}
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center shadow-lg">
                  <Hand className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                    Sign Language Mode
                  </h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Real-time sign language interpretation
                  </p>
                </div>
              </div>

              {/* Language Mode Toggle */}
              <div className="flex items-center gap-2 ml-6 bg-gray-200/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-1">
                {modes.map((mode) => (
                  <button
                    key={mode.key}
                    onClick={() => selectMode(mode.key)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105 ${
                      selectedMode === mode.key
                        ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-lg'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700'
                    }`}
                  >
                    {mode.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {modes.find(m => m.key === selectedMode)?.label}
              </div>
            </div>
          </div>

          {/* Messages */}
          <div ref={containerRef} className="flex-1 overflow-y-auto animate-fadeIn">
            <div className="max-w-4xl mx-auto px-6 py-8">
              {!messages.some((m) => m.role === 'user') ? (
                <div className="min-h-[60vh] flex items-center justify-center">
                  <div className="text-center space-y-6">
                    <div className="h-20 w-20 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center mx-auto shadow-2xl">
                      <Hand className="h-10 w-10 text-white" />
                    </div>
                    <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">Welcome to Sign Language Mode!</p>
                    <p className="text-gray-600 dark:text-gray-400 max-w-md">
                      Start typing text to convert to {modes.find(m => m.key === selectedMode)?.label} interpretation.
                    </p>
                    <div className="grid grid-cols-3 gap-4 max-w-sm mx-auto">
                      {Array.from({ length: 6 }).map((_, idx) => (
                        <div key={idx} className="aspect-square rounded-2xl bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-900/20 dark:to-red-900/20 flex items-center justify-center shadow-lg border border-orange-200 dark:border-orange-800">
                          <div className="text-2xl">
                            {['👋', '🤟', '✋', '🤲', '👐', '👍'][idx]}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                messages.map((m) => (
                  <div key={m.id} className="py-6 animate-slideUp">
                    <div className="flex items-start gap-4">
                      <div className={
                        `h-12 w-12 rounded-2xl flex items-center justify-center text-sm font-bold shadow-lg ${
                          m.role === 'assistant' 
                            ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white' 
                            : 'bg-gradient-to-r from-gray-500 to-gray-700 text-white'
                        }`
                      }>
                        {m.role === 'assistant' ? 'AI' : 'You'}
                      </div>
                      <div className="flex-1">
                        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-800">
                          <p className="whitespace-pre-wrap leading-relaxed text-gray-900 dark:text-gray-100">{m.content}</p>
                          {m.role === 'assistant' && (
                            <div className="mt-4 p-4 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl border border-orange-200 dark:border-orange-800">
                              <div className="flex items-center gap-2 mb-3">
                                <Hand className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                                <span className="text-sm font-medium text-orange-600 dark:text-orange-400">Sign Language Preview</span>
                              </div>
                              <div className="flex items-center justify-center gap-4 py-2">
                                {['👋', '🤟', '✋', '👍'].map((sign, idx) => (
                                  <div key={idx} className="text-3xl animate-pulse" style={{ animationDelay: `${idx * 0.2}s` }}>
                                    {sign}
                                  </div>
                                ))}
                              </div>
                              <div className="text-xs text-orange-600 dark:text-orange-400 text-center mt-2">
                                Video interpretation would play here
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Mode Switched Toast */}
          {showModeToast && (
            <div className="fixed inset-0 z-40 pointer-events-none flex items-start justify-center p-6 animate-fadeIn">
              <div className="pointer-events-auto w-full max-w-lg bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-800 px-6 py-6 animate-slideUp">
                <div className="flex flex-col items-center text-center gap-3">
                  <div className="h-12 w-12 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center">
                    <Hand className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold">You've switched sign language mode!</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-200">
                    Great! You've chosen <span className="font-medium">{modes.find(x => x.key === selectedMode)?.label}</span> — Samvaad will now show your interpretations in that sign language.
                  </p>
                  <div className="mt-2">
                    <button
                      onClick={() => setShowModeToast(false)}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white text-sm font-medium transition-all duration-300 hover:scale-105"
                    >
                      Got it!
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className={`border-t backdrop-blur-lg ${isDarkMode ? 'border-gray-800 bg-[#0a0a0a]/80' : 'border-gray-200 bg-white/80'}`}>
            <div className="max-w-4xl mx-auto p-6">
              <div className={`relative rounded-2xl border shadow-xl px-4 py-3 flex items-end gap-3 overflow-visible backdrop-blur-sm ${
                isDarkMode
                  ? 'border-gray-800 bg-[#0a0a0a]/80'
                  : 'border-gray-200 bg-white/80'
              }`}>
                <button
                  type="button"
                  title="New"
                  ref={plusButtonRef}
                  onClick={() => {
                    setIsPlusOpen((v) => !v);
                  }}
                  className="h-12 w-12 rounded-2xl inline-flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-600 dark:text-gray-300 transition-all duration-300 hover:scale-105"
                >
                  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </button>

                {isPlusOpen && (
                  <div
                    ref={plusMenuRef}
                    className="absolute left-0 bottom-16 z-20 w-80 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-sm shadow-2xl overflow-hidden animate-fadeIn"
                  >
                    <div className="py-2">
                      <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-900 text-sm transition-all duration-200">
                        <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center">
                          <svg viewBox="0 0 24 24" className="h-4 w-4 text-white" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><path d="M7 10l5 5 5-5"/><path d="M12 15V3"/></svg>
                        </div>
                        <span>Upload Document</span>
                      </button>
                      <div className="mx-4 my-1 h-px bg-gray-100 dark:bg-gray-800" />
                      <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-900 text-sm transition-all duration-200">
                        <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                          <Volume2 className="h-4 w-4 text-white" />
                        </div>
                        <span>Record Voice</span>
                      </button>
                    </div>
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <textarea
                    ref={textareaRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={`Type text to convert to ${modes.find(m => m.key === selectedMode)?.label}...`}
                    rows={1}
                    className="block w-full resize-none bg-transparent outline-none text-lg leading-6 placeholder:text-gray-400 px-1 max-h-40"
                  />
                </div>

                {input.trim().length === 0 ? (
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      title="Voice"
                      className="h-12 w-12 rounded-2xl inline-flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-600 dark:text-gray-300 transition-all duration-300 hover:scale-105"
                    >
                      <Volume2 className="h-6 w-6" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={handleSend}
                    title="Convert to Sign Language"
                    className="h-12 w-12 rounded-2xl inline-flex items-center justify-center bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white transition-all duration-300 hover:scale-105 shadow-lg"
                  >
                    <ArrowRight className="h-6 w-6" />
                  </button>
                )}
              </div>
              <div className="text-sm text-gray-500 text-center mt-4">
                Press Enter to convert to Sign Language • Shift+Enter for new line
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}