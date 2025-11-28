import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, Volume2, Hand, ArrowRight } from 'lucide-react';

const steps = [
  {
    image: '/src/assets/images/logo/icon.png',
    title: 'Samvaad',
    description: 'Transform digital media into braille and sign language for universal accessibility',
    button: 'Get Started',
    bg: 'bg-gradient-to-br from-gray-50 to-indigo-50/30',
    buttonColor: 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700',
    icon: Zap,
    iconColor: 'from-emerald-500 to-green-600'
  },
  {
    image: 'https://img.icons8.com/ios-filled/100/000000/microphone.png',
    title: 'Audio Transcription',
    description: 'Tap the microphone to record audio & transcribe in real-time. Our advanced speech recognition works in multiple languages and accents.',
    button: 'Continue',
    bg: 'bg-gradient-to-br from-blue-50 to-cyan-50/30',
    buttonColor: 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700',
    icon: Volume2,
    iconColor: 'from-blue-500 to-cyan-500'
  },
  {
    image: 'https://img.icons8.com/ios-filled/100/ff6600/hand.png',
    title: 'Sign Language Interpretation',
    description: 'Convert to visual language representations. Learn and communicate with comprehensive sign language translations.',
    button: 'Continue',
    bg: 'bg-gradient-to-br from-orange-50 to-red-50/30',
    buttonColor: 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600',
    icon: Hand,
    iconColor: 'from-orange-500 to-red-500'
  },
];

export default function OnboardingRoute() {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      navigate('/dashboard');
    }
  };

  const { image, title, description, button, bg, buttonColor, icon: Icon, iconColor } = steps[step];

  return (
    <main className={`min-h-screen relative overflow-hidden ${bg} animate-fadeIn`}>
      
      {/* Animated Background Elements */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
      <div className="absolute top-40 right-10 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-1000"></div>
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-500"></div>
      
      {/* Floating Icons */}
      <div className="absolute top-1/4 left-1/6 animate-float">
        <Icon className="w-8 h-8 text-indigo-400" />
      </div>
      <div className="absolute bottom-1/4 left-1/3 animate-float delay-500">
        <Volume2 className="w-7 h-7 text-blue-400" />
      </div>
      <div className="absolute bottom-1/3 right-1/6 animate-float delay-1500">
        <Hand className="w-8 h-8 text-green-400" />
      </div>

      {/* Progress Indicators */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
        {steps.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-500 ${
              index === step 
                ? 'bg-indigo-600 scale-125' 
                : index < step 
                  ? 'bg-green-500' 
                  : 'bg-gray-300'
            }`}
          />
        ))}
      </div>

      <div className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6">
        <div className="max-w-md w-full animate-slideUp">
          
          {/* Main Content Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 sm:p-10 shadow-2xl border border-gray-200 hover:shadow-3xl transition-all duration-500">
            
            {/* Icon Circle */}
            <div className="flex justify-center mb-6">
              <div className={`h-24 w-24 rounded-full bg-gradient-to-r ${iconColor} flex items-center justify-center shadow-lg animate-pulse`}>
                <Icon className="h-12 w-12 text-white" />
              </div>
            </div>

            {/* Image */}
            <div className="flex justify-center mb-6">
              <img 
                src={image} 
                alt={title} 
                className="h-32 w-32 object-contain rounded-2xl shadow-lg transition-all duration-300 hover:scale-105" 
              />
            </div>

            {/* Content */}
            <div className="text-center space-y-6">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
                {title}
              </h1>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                {description}
              </p>

              {/* Rounded Full Button with Icon */}
              <button
                className={`group w-full py-4 rounded-full text-white font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 ${buttonColor}`}
                onClick={handleNext}
              >
                <span className="flex items-center justify-center gap-3">
                  {button}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            </div>

            {/* Step Indicator */}
            <div className="flex justify-center mt-8">
              <div className="flex gap-1">
                {steps.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === step 
                        ? 'bg-indigo-600 w-6' 
                        : index < step 
                          ? 'bg-green-500' 
                          : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Skip Option for last step */}
          {step === steps.length - 1 && (
            <div className="text-center mt-6 animate-fadeIn">
              <button
                onClick={() => navigate('/dashboard')}
                className="text-gray-500 hover:text-gray-700 font-medium transition-colors duration-300"
              >
                Skip to dashboard
              </button>
            </div>
          )}
        </div>

        {/* Background Pattern */}
        <div className="absolute bottom-10 left-10 opacity-10 animate-float">
          <div className="grid grid-cols-3 gap-2">
            {Array.from({ length: 9 }).map((_, idx) => (
              <div key={idx} className="w-4 h-4 bg-indigo-600 rounded-full"></div>
            ))}
          </div>
        </div>
        
        <div className="absolute top-10 right-10 opacity-10 animate-float delay-1000">
          <div className="grid grid-cols-2 gap-1">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div key={idx} className="w-3 h-3 bg-purple-600 rounded-full"></div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}