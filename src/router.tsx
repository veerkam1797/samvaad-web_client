import { createBrowserRouter, Navigate } from 'react-router-dom'
import { lazy, Suspense } from 'react'


import BrailleModeRoute from './routes/BrailleModeRoute'
const SignLanguageRoute = lazy(() => import('./routes/SignLanguageRoute'));

const LandingRoute = lazy(() => import('./routes/LandingRoute'))
const LoginRoute = lazy(() => import('./routes/LoginRoute'))
const SignupRoute = lazy(() => import('./routes/SignupRoute'))
const NotFoundRoute = lazy(() => import('./routes/NotFoundRoute'))
const ForgotPasswordRoute = lazy(() => import('./routes/ForgotPasswordRoute'))
const ResetPasswordRoute = lazy(() => import('./routes/ResetPasswordRoute'))
const DashboardRoute = lazy(() => import('./routes/DashboardRoute'))

const OnboardingRoute = lazy(() => import('./routes/OnboardingRoute'))

function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse text-gray-600">Loading…</div>
    </div>
  )
}

export const router = createBrowserRouter([
  {
    path: '/sign',
    element: (
      <Suspense fallback={<Loading />}>
        <SignLanguageRoute />
      </Suspense>
    ),
  },
  {
    path: '/onboarding',
    element: (
      <Suspense fallback={<Loading />}>
        <OnboardingRoute />
      </Suspense>
    ),
  },
  {
    path: '/',
    element: (
      <Suspense fallback={<Loading />}>
        <LandingRoute />
      </Suspense>
    ),
  },
  {
    path: '/login',
    element: (
      <Suspense fallback={<Loading />}>
        <LoginRoute />
      </Suspense>
    ),
  },
  {
    path: '/signup',
    element: (
      <Suspense fallback={<Loading />}>
        <SignupRoute />
      </Suspense>
    ),
  },
  {
    path: '/forgot-password',
    element: (
      <Suspense fallback={<Loading />}>
        <ForgotPasswordRoute />
      </Suspense>
    ),
  },
  {
    path: '/reset-password',
    element: (
      <Suspense fallback={<Loading />}>
        <ResetPasswordRoute />
      </Suspense>
    ),
  },
  { path: '/home', element: <Navigate to="/" replace /> },
  {
    path: '/dashboard',
    element: (
      <Suspense fallback={<Loading />}>
        <DashboardRoute />
      </Suspense>
    ),
  },
  {
    path: '/braille',
    element: (
      <Suspense fallback={<Loading />}>
        <BrailleModeRoute />
      </Suspense>
    ),
  },
  {
    path: '*',
    element: (
      <Suspense fallback={<Loading />}>
        <NotFoundRoute />
      </Suspense>
    ),
  },
])

export default router


