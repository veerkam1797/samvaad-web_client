import { Link } from 'react-router-dom'

export function Component() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-white rounded-xl shadow p-6">
        <h1 className="text-2xl font-bold text-gray-900">Forgot password</h1>
        <p className="mt-1 text-sm text-gray-600">Enter your email to receive a reset link</p>

        <form className="mt-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-600" placeholder="you@example.com" />
          </div>
          <button className="w-full rounded bg-indigo-600 text-white py-2.5 font-medium hover:bg-indigo-700">Send reset link</button>
        </form>

        <p className="mt-4 text-sm">
          <Link to="/login" className="text-gray-600 hover:underline">Back to login</Link>
        </p>
      </div>
    </main>
  )
}

export default Component



