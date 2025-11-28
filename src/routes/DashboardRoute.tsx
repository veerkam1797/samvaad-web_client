import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Zap, Volume2, Hand, ArrowRight, MessageCircle, Smartphone, Users, Shield } from 'lucide-react'

type Message = {
  id: string
  role: 'user' | 'assistant'
  content: string
}

export default function DashboardRoute() {
  const navigate = useNavigate()
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm1',
      role: 'assistant',
      content: "Welcome to Samvaad! I'm here to help you with inclusive communication. You can upload documents, record voice messages, or type your questions.",
    },
  ])
  const [input, setInput] = useState('')
  const containerRef = useRef<HTMLDivElement | null>(null)
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)
  const [isPlusOpen, setIsPlusOpen] = useState(false)
  const [isMoreOpen, setIsMoreOpen] = useState(false)
  const plusButtonRef = useRef<HTMLButtonElement | null>(null)
  const plusMenuRef = useRef<HTMLDivElement | null>(null)
  const [isNewChatModalOpen, setIsNewChatModalOpen] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [recordedAudio, setRecordedAudio] = useState<Blob | null>(null)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [recordingTime, setRecordingTime] = useState(0)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const recordingIntervalRef = useRef<number | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const currentUser = {
    name: 'DIVYA SURVE'
  }

  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [isHighContrast, setIsHighContrast] = useState(false)
  const [isLargeText, setIsLargeText] = useState(false)
  const [isTextToSpeechEnabled, setIsTextToSpeechEnabled] = useState(() => {
    try {
      const saved = localStorage.getItem('textToSpeech')
      return saved === 'true'
    } catch {
      return false
    }
  })
  const [isDarkMode, setIsDarkMode] = useState(() => {
    try {
      const saved = localStorage.getItem('theme')
      if (saved === 'dark') return true
      if (saved === 'light') return false
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    } catch {
      return false
    }
  })

  useEffect(() => {
    const root = document.documentElement
    if (isDarkMode) {
      root.classList.add('dark')
      root.style.backgroundColor = '#131313'
      root.style.color = '#ffffff'
    } else {
      root.classList.remove('dark')
      root.style.backgroundColor = '#f9fafb'
      root.style.color = '#111827'
    }
    try {
      localStorage.setItem('theme', isDarkMode ? 'dark' : 'light')
    } catch {}
  }, [isDarkMode])

  useEffect(() => {
    try {
      localStorage.setItem('textToSpeech', String(isTextToSpeechEnabled))
    } catch {}
  }, [isTextToSpeechEnabled])

  useEffect(() => {
    containerRef.current?.scrollTo({ top: containerRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages.length])

  useEffect(() => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = '0px'
    const next = Math.min(el.scrollHeight, 160)
    el.style.height = next + 'px'
  }, [input])

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!isPlusOpen) return
      const target = e.target as Node
      if (plusButtonRef.current && plusButtonRef.current.contains(target)) return
      if (plusMenuRef.current && plusMenuRef.current.contains(target)) return
      setIsPlusOpen(false)
      setIsMoreOpen(false)
    }
    document.addEventListener('mousedown', onDocClick)
    return () => document.removeEventListener('mousedown', onDocClick)
  }, [isPlusOpen])

  useEffect(() => {
    return () => {
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current)
      }
      if (audioUrl) {
        try {
          URL.revokeObjectURL(audioUrl)
        } catch {}
      }
      if (streamRef.current) {
        try {
          streamRef.current.getTracks().forEach((t) => t.stop())
        } catch {}
        streamRef.current = null
      }
    }
  }, [])

  function handleSend() {
    const trimmed = input.trim()
    if (!trimmed) return
    const newUserMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: trimmed,
    }
    setMessages((prev) => [...prev, newUserMessage])
    setInput('')
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: 'I understand your message. In a full implementation, this would connect to our AI backend for Braille and sign language translation.',
        },
      ])
    }, 450)
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  async function startRecording() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      streamRef.current = stream

      let options: MediaRecorderOptions | undefined = undefined
      if (typeof MediaRecorder !== 'undefined') {
        if (MediaRecorder.isTypeSupported && MediaRecorder.isTypeSupported('audio/webm;codecs=opus')) {
          options = { mimeType: 'audio/webm;codecs=opus' }
        } else if (MediaRecorder.isTypeSupported && MediaRecorder.isTypeSupported('audio/ogg;codecs=opus')) {
          options = { mimeType: 'audio/ogg;codecs=opus' }
        }
      }

      const mediaRecorder = new MediaRecorder(stream, options as MediaRecorderOptions | undefined)
      mediaRecorderRef.current = mediaRecorder
      audioChunksRef.current = []
      setRecordingTime(0)

      mediaRecorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          audioChunksRef.current.push(event.data)
        }
      }

      mediaRecorder.onstop = () => {
        try {
          const type = audioChunksRef.current.length > 0 ? (options?.mimeType ?? 'audio/webm') : 'audio/webm'
          const audioBlob = new Blob(audioChunksRef.current, { type })
          setRecordedAudio(audioBlob)
        } catch (err) {
          console.error('Error creating audio blob:', err)
        }
      }

      mediaRecorder.start()
      setIsRecording(true)

      recordingIntervalRef.current = window.setInterval(() => {
        setRecordingTime((prev) => prev + 1)
      }, 1000)
    } catch (error) {
      console.error('Error accessing microphone:', error)
      alert('Unable to access microphone. Please check permissions.')
    }
  }

  function stopRecording() {
    if (mediaRecorderRef.current && isRecording) {
      try {
        mediaRecorderRef.current.stop()
      } catch (e) {
        console.error('Error stopping recorder:', e)
      }
    }

    if (streamRef.current) {
      try {
        streamRef.current.getTracks().forEach((track) => track.stop())
      } catch (e) {
        console.error('Error stopping stream tracks:', e)
      } finally {
        streamRef.current = null
      }
    }

    setIsRecording(false)
    if (recordingIntervalRef.current) {
      clearInterval(recordingIntervalRef.current)
      recordingIntervalRef.current = null
    }
  }

  function resetRecording() {
    if (audioUrl) {
      try {
        URL.revokeObjectURL(audioUrl)
      } catch {}
      setAudioUrl(null)
    }
    setRecordedAudio(null)
    setRecordingTime(0)
  }

  function uploadRecordedAudio() {
    if (recordedAudio) {
      const newUserMessage: Message = {
        id: crypto.randomUUID(),
        role: 'user',
        content: '[Voice message uploaded]',
      }
      setMessages((prev) => [...prev, newUserMessage])
      resetRecording()
      setIsNewChatModalOpen(false)
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            role: 'assistant',
            content: 'Voice message received and processed. Ready for Braille or sign language conversion.',
          },
        ])
      }, 450)
    }
  }

  function handleDocumentUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) {
      const newUserMessage: Message = {
        id: crypto.randomUUID(),
        role: 'user',
        content: `[Document uploaded: ${file.name}]`,
      }
      setMessages((prev) => [...prev, newUserMessage])
      setIsNewChatModalOpen(false)
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            role: 'assistant',
            content: `Document "${file.name}" received. Processing for accessibility conversion...`,
          },
        ])
      }, 450)
    }
  }

  const sidebarItems = useMemo(
    () => [
      { key: 'new-chat', label: 'New chat', icon: MessageCircle },
      { key: 'braille', label: 'Braille Mode', icon: Zap },
      { key: 'sign', label: 'Sign Language Mode', icon: Hand },
      { key: 'settings', label: 'Settings', icon: Smartphone },
    ],
    []
  )

  useEffect(() => {
    if (recordedAudio) {
      if (audioUrl) {
        try {
          URL.revokeObjectURL(audioUrl)
        } catch {}
      }
      const url = URL.createObjectURL(recordedAudio)
      setAudioUrl(url)

      try {
        const audio = new Audio(url)
        audio.play().catch((err) => {
          console.debug('Autoplay blocked or failed:', err)
        })
      } catch (err) {
        console.debug('Error trying to autoplay audio:', err)
      }
    } else {
      if (audioUrl) {
        try {
          URL.revokeObjectURL(audioUrl)
        } catch {}
        setAudioUrl(null)
      }
    }
  }, [recordedAudio])

  return (
    <div className={`min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50/30 dark:from-gray-900 dark:to-indigo-900/20 relative overflow-hidden`}>
      
      {/* Animated Background Elements */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
      <div className="absolute top-40 right-10 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-1000"></div>
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-500"></div>
      
      {/* Floating Icons */}
      <div className="absolute top-1/4 left-1/6 animate-float">
        <MessageCircle className="w-8 h-8 text-indigo-400" />
      </div>
      <div className="absolute bottom-1/4 left-1/3 animate-float delay-500">
        <Volume2 className="w-7 h-7 text-blue-400" />
      </div>
      <div className="absolute bottom-1/3 right-1/6 animate-float delay-1500">
        <Hand className="w-8 h-8 text-green-400" />
      </div>

      <div className={`flex h-screen w-screen overflow-x-hidden ${isDarkMode ? 'bg-transparent text-white' : 'bg-transparent text-gray-900'}`}>
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/30 z-20 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* New Chat Modal */}
        {isNewChatModalOpen && (
          <div className="fixed inset-0 z-50 animate-fadeIn">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => {
              if (isRecording) stopRecording()
              setIsNewChatModalOpen(false)
            }} />
            <div className="absolute inset-0 flex items-center justify-center p-4 overflow-auto">
             <div className={`w-full max-w-md backdrop-blur-sm rounded-3xl shadow-2xl border animate-slideUp ${
  isDarkMode 
    ? 'bg-[#1a1a1a]/90 border-gray-700' 
    : 'bg-white/90 border-gray-200'
}`}>
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Start New Chat</h3>
                  <button className="h-8 w-8 inline-flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-900 transition-all duration-300 hover:scale-110" onClick={() => {
                    if (isRecording) stopRecording()
                    resetRecording()
                    setIsNewChatModalOpen(false)
                  }} aria-label="Close">
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 6l12 12M18 6L6 18"/></svg>
                  </button>
                </div>

                <div className="p-6 space-y-4">
                  {!recordedAudio ? (
                    <>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 text-center">Choose how you'd like to start:</p>

                      {/* Upload Document Option */}
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full flex items-center gap-4 p-4 border-2 border-gray-200 dark:border-gray-800 rounded-2xl hover:border-indigo-500 dark:hover:border-indigo-500 transition-all duration-300 hover:scale-105 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm"
                      >
                        <div className="h-12 w-12 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                          <svg viewBox="0 0 24 24" className="h-6 w-6 text-white" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><path d="M7 10l5 5 5-5"/><path d="M12 15V3"/>
                          </svg>
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-gray-900 dark:text-gray-100">Upload Document</div>
                          <div className="text-xs text-gray-500">PDF, Word, TXT supported</div>
                        </div>
                        <ArrowRight className="h-5 w-5 text-gray-400" />
                      </button>

                      {/* Record Voice Option */}
                      <button
                        onClick={() => {
                          if (!isRecording) startRecording()
                          else stopRecording()
                        }}
                        className={`w-full flex items-center gap-4 p-4 border-2 rounded-2xl transition-all duration-300 hover:scale-105 backdrop-blur-sm ${
                          isRecording
                            ? 'border-red-500 dark:border-red-500 bg-red-50/50 dark:bg-red-950/30'
                            : 'border-gray-200 dark:border-gray-800 hover:border-indigo-500 dark:hover:border-indigo-500 bg-white/50 dark:bg-gray-900/50'
                        }`}
                      >
                        <div className={`h-12 w-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                          isRecording
                            ? 'bg-gradient-to-r from-red-500 to-pink-500'
                            : 'bg-gradient-to-r from-blue-500 to-cyan-500'
                        }`}>
                          <svg viewBox="0 0 24 24" className="h-6 w-6 text-white" fill={isRecording ? 'currentColor' : 'none'} stroke={isRecording ? 'none' : 'currentColor'} strokeWidth="2">
                            <path d="M12 3a3 3 0 00-3 3v6a3 3 0 006 0V6a3 3 0 00-3-3z" />
                            <path d="M19 11a7 7 0 01-14 0" />
                            <path d="M12 19v2" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-gray-900 dark:text-gray-100">
                            {isRecording ? 'Stop Recording' : 'Record Voice'}
                          </div>
                          <div className="text-xs text-gray-500">
                            {isRecording ? `Recording... ${recordingTime}s` : 'Speak your message'}
                          </div>
                        </div>
                        {!isRecording && (
                          <ArrowRight className="h-5 w-5 text-gray-400" />
                        )}
                      </button>
                    </>
                  ) : (
                    /* Playback Section */
                    <div className="space-y-4 animate-fadeIn">
                      <div>
                        <p className="text-sm font-medium mb-3 text-gray-900 dark:text-gray-100 text-center">Review your recording</p>
                        {audioUrl && (
                          <audio
                            controls
                            className="w-full rounded-2xl shadow-lg"
                            src={audioUrl}
                          />
                        )}
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            resetRecording()
                          }}
                          className="flex-1 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-gray-100 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-900 transition-all duration-300 hover:scale-105"
                        >
                          Re-record
                        </button>
                        <button
                          onClick={uploadRecordedAudio}
                          className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-sm font-medium transition-all duration-300 hover:scale-105 shadow-lg"
                        >
                          Upload
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Hidden file input */}
                  <input
                    ref={fileInputRef}
                    type="file"
                    onChange={handleDocumentUpload}
                    className="sr-only"
                    accept=".pdf,.doc,.docx,.txt,.jpg,.png"
                  />
                </div>
              </div>
            </div>
          </div>
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
                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
                  <img src="/src/assets/images/logo/icon.png" alt="Samvaad logo" className="h-6 w-6 object-contain" />
                </div>
                <span className={(isSidebarOpen ? '' : 'hidden md:inline-block md:opacity-0') + ' font-bold text-lg bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent'}>Samvaad</span>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto overflow-x-hidden p-3 space-y-2 text-sm">
              {sidebarItems.map((item) => (
                <button
                  key={item.key}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-900 transition-all duration-300 hover:scale-105 group"
                  title={item.label}
                  onClick={() => {
                    if (item.key === 'settings') setIsSettingsOpen(true)
                    if (item.key === 'braille') navigate('/braille')
                    if (item.key === 'sign') navigate('/sign')
                    if (item.key === 'new-chat') setIsNewChatModalOpen(true)
                  }}
                >
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
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
                    {/* <div className="text-xs text-gray-500 truncate">{currentUser.plan}</div> */}
                  </div>
                </div>
<div className="pt-4">
  <button 
    className="w-full py-3 rounded-xl bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
    onClick={() => navigate('/')}
  >
    Sign out
  </button>
</div>
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
      <div className={`w-full max-w-lg backdrop-blur-sm rounded-3xl shadow-2xl border animate-slideUp ${
        isDarkMode 
          ? 'bg-[#1a1a1a]/90 border-gray-700 text-white' 
          : 'bg-white/90 border-gray-200 text-gray-900'
      }`}>
        <div className={`sticky top-0 backdrop-blur rounded-t-3xl px-6 py-4 border-b flex items-center justify-between ${
          isDarkMode 
            ? 'bg-[#1a1a1a]/90 border-gray-700' 
            : 'bg-white/90 border-gray-200'
        }`}>
          <h3 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Settings
          </h3>
          <button className="h-10 w-10 inline-flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 hover:scale-110" onClick={() => setIsSettingsOpen(false)} aria-label="Close">
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
            <div key={index} className={`rounded-2xl border p-4 backdrop-blur-sm ${
              isDarkMode 
                ? 'border-gray-700 bg-[#1a1a1a]/70' 
                : 'border-gray-200 bg-white/70'
            }`}>
              <button className="w-full flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                    {setting.icon}
                  </div>
                  <div className="text-left">
                    <div className={`font-semibold ${
                      isDarkMode ? 'text-gray-100' : 'text-gray-900'
                    }`}>
                      {setting.title}
                    </div>
                    <div className={`text-sm ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      {setting.description}
                    </div>
                  </div>
                </div>
                <label className="inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only" checked={setting.state} onChange={(e) => setting.setState(e.target.checked)} />
                  <span className={(setting.state ? 'bg-gradient-to-r from-indigo-600 to-purple-600' : 'bg-gray-300 dark:bg-gray-600') + ' w-12 h-6 rounded-full relative transition-colors'}>
                    <span className={(setting.state ? 'translate-x-6' : 'translate-x-0') + ' absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white dark:bg-gray-200 transition-transform shadow-lg'} />
                  </span>
                </label>
              </button>
            </div>
          ))}

          <div className="pt-4">
            <button 
              className="w-full py-3 rounded-xl bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
              onClick={() => navigate('/')}
            >
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
            <div className="flex items-center gap-3">
              <button
                className="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-900 transition-all duration-300 hover:scale-105"
                aria-label="Toggle sidebar"
                onClick={() => setIsSidebarOpen((v) => !v)}
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 6h18M3 12h18M3 18h18" />
                </svg>
              </button>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Samvaad AI
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Inclusive Communication Platform
              </div>
            </div>
          </div>

          {/* Messages */}
          <div ref={containerRef} className="flex-1 overflow-y-auto animate-fadeIn">
            <div className="max-w-4xl mx-auto px-6 py-8">
              {!messages.some((m) => m.role === 'user') ? (
                <div className="min-h-[60vh] flex items-center justify-center">
                  <div className="text-center space-y-6">
                    <div className="h-20 w-20 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center mx-auto shadow-2xl">
                      <MessageCircle className="h-10 w-10 text-white" />
                    </div>
                    <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">Welcome to Samvaad AI!</p>
                    <p className="text-gray-600 dark:text-gray-400 max-w-md">
                      Start a conversation by typing a message, uploading a document, or recording voice.
                    </p>
                  </div>
                </div>
              ) : (
                messages.map((m) => (
                  <div key={m.id} className="py-6 animate-slideUp">
                    <div className="flex items-start gap-4">
                      <div className={
                        `h-12 w-12 rounded-2xl flex items-center justify-center text-sm font-bold shadow-lg ${
                          m.role === 'assistant' 
                            ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white' 
                            : 'bg-gradient-to-r from-gray-500 to-gray-700 text-white'
                        }`
                      }>
                        {m.role === 'assistant' ? 'AI' : 'You'}
                      </div>
                      <div className="flex-1">
                        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-800">
                          <p className="whitespace-pre-wrap leading-relaxed text-gray-900 dark:text-gray-100">{m.content}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

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
                    setIsPlusOpen((v) => !v)
                    setIsMoreOpen(false)
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
                        <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
                          <svg viewBox="0 0 24 24" className="h-4 w-4 text-white" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><path d="M7 10l5 5 5-5"/><path d="M12 15V3"/></svg>
                        </div>
                        <span>Add photos & files</span>
                      </button>
                      <div className="mx-4 my-1 h-px bg-gray-100 dark:bg-gray-800" />
                      <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-900 text-sm transition-all duration-200">
                        <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                          <svg viewBox="0 0 24 24" className="h-4 w-4 text-white" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="14" rx="2"/><path d="M3 13l4-4 4 3 3-3 7 7"/></svg>
                        </div>
                        <span>Create image</span>
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
                    placeholder="Ask anything about inclusive communication..."
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
                    title="Send"
                    className="h-12 w-12 rounded-2xl inline-flex items-center justify-center bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white transition-all duration-300 hover:scale-105 shadow-lg"
                  >
                    <ArrowRight className="h-6 w-6" />
                  </button>
                )}
              </div>
              <div className="text-sm text-gray-500 text-center mt-4">
                Press Enter to send • Shift+Enter for new line
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}