import { Outlet, Link, useLocation } from 'react-router-dom';
import { ListTodo } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export function Layout() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const isLoginPage = location.pathname === '/auth';
  const isLoggedIn = Boolean(user);

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0 flex items-center">
              <ListTodo className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">TaskMaster</span>
            </Link>

            {/* Conditional Navigation */}
            {!isLoginPage && !isLoggedIn && (
              <div className="flex items-center space-x-6">
                <ul className="flex space-x-4">
                  <li>
                    <a href="#features" className="hover:underline text-gray-700">Features</a>
                  </li>
                  <li>
                    <a href="#about-us" className="hover:underline text-gray-700">About</a>
                  </li>
                  <li>
                    <a href="#contact-us" className="hover:underline text-gray-700">Contact</a>
                  </li>
                </ul>
                <Link to="/auth">
                  <button className=" bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-3xl">
                    Login
                  </button>
                </Link>
              </div>
            )}

            {isLoggedIn && (
              <button
                onClick={logout}
                className="ml-auto bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>
        <Outlet />
      </main>
    </div>
  );
}
