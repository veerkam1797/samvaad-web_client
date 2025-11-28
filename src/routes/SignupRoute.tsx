import { SignUp } from '@clerk/clerk-react';

export default function SignupRoute() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Animated background elements matching your dashboard */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
      <div className="absolute top-40 right-10 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-1000"></div>
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-500"></div>
      
      <div className="w-full max-w-md bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-800 p-8 relative z-10">
        {/* Custom header */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
              <img src="/src/assets/images/logo/icon.png" alt="Samvaad logo" className="h-6 w-6 object-contain" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Samvaad AI
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Join our Inclusive Communication Platform
          </p>
        </div>
        
        <SignUp 
          routing="path" 
          path="/signup" 
          signInUrl="/login"
          appearance={{
            variables: {
              colorPrimary: '#6366f1',
              colorTextOnPrimaryBackground: '#ffffff',
              colorBackground: 'transparent',
              colorText: 'inherit',
              colorInputText: 'inherit',
              colorInputBackground: 'transparent',
              borderRadius: '12px',
            },
            elements: {
              // Main continue button
              formButtonPrimary: {
                backgroundColor: '#6366f1',
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                border: 'none',
                borderRadius: '12px',
                fontSize: '14px',
                fontWeight: '600',
                padding: '12px 16px',
                height: '44px',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: '#5b5cd9',
                  background: 'linear-gradient(135deg, #5b5cd9, #7c4dff)',
                  transform: 'translateY(-1px)',
                  boxShadow: '0 10px 25px -5px rgba(99, 102, 241, 0.4)'
                }
              },

              // Sign in link styling
              footerActionLink: {
                color: '#6366f1',
                fontWeight: '600',
                fontSize: '14px',
                textDecoration: 'none',
                transition: 'all 0.2s ease',
                '&:hover': {
                  color: '#5b5cd9',
                  textDecoration: 'underline',
                }
              },

              footerActionText: {
                color: '#6b7280',
                fontSize: '14px',
              },

              // Form fields
              formFieldInput: {
                borderRadius: '12px',
                border: '1px solid #e5e7eb',
                padding: '12px 16px',
                fontSize: '14px',
                transition: 'all 0.3s ease',
                backgroundColor: 'transparent',
                '&:focus': {
                  borderColor: '#6366f1',
                  boxShadow: '0 0 0 3px rgba(99, 102, 241, 0.1)',
                  outline: 'none'
                }
              },

              formFieldLabel: {
                fontSize: '14px',
                fontWeight: '500',
                color: 'inherit',
                marginBottom: '6px'
              },

              // Card container
              card: {
                boxShadow: 'none',
                border: 'none',
                background: 'transparent',
                width: '100%'
              },

              // Header text
              headerTitle: {
                fontSize: '1.5rem',
                fontWeight: '700',
                color: 'inherit',
                textAlign: 'center',
                marginBottom: '8px'
              },

              headerSubtitle: {
                color: '#6b7280',
                textAlign: 'center',
                fontSize: '14px',
                marginBottom: '24px'
              },

              // Social buttons
              socialButtonsBlockButton: {
                borderRadius: '12px',
                border: '1px solid #e5e7eb',
                padding: '12px 16px',
                fontSize: '14px',
                fontWeight: '500',
                transition: 'all 0.3s ease',
                '&:hover': {
                  borderColor: '#6366f1',
                  transform: 'translateY(-1px)',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                }
              },

              socialButtonsBlockButtonText: {
                fontSize: '14px',
                fontWeight: '500'
              },

              // Divider
              dividerLine: {
                backgroundColor: '#e5e7eb'
              },

              dividerText: {
                color: '#6b7280',
                fontSize: '14px',
                backgroundColor: 'transparent'
              },

              // Development mode badge
              badge: {
                backgroundColor: '#fef3c7',
                color: '#92400e',
                border: '1px solid #fbbf24',
                borderRadius: '20px',
                padding: '6px 12px',
                fontSize: '12px',
                fontWeight: '600',
                marginTop: '16px'
              }
            }
          }}
        />

        {/* Custom Development Mode Indicator */}
        <div className="mt-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 text-xs font-medium rounded-full border border-amber-200 dark:border-amber-700">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Development Mode
          </div>
        </div>
      </div>
    </main>
  );
}