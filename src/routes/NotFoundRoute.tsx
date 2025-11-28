import { Link } from 'react-router-dom'

export function Component() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-white px-6">
      <div className="text-center">
        <h1 className="text-6xl font-extrabold text-gray-900">404</h1>
        <p className="mt-2 text-gray-600">The page you are looking for does not exist.</p>
        <div className="mt-6">
          <Link to="/" className="px-5 py-2 rounded bg-indigo-600 text-white font-medium hover:bg-indigo-700">Back to home</Link>
        </div>
      </div>
    </main>
  )
}

export default Component


