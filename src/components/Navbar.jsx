import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../store/AuthStore";
import useMovieStore from "../store/movieStore";

const Navbar = () => {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const {setKey} = useMovieStore()

  const handleLogout = () => {
    logout();           // Zustand logout: clear token & email
    navigate("/");      // Back to login
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-black bg-opacity-80 flex justify-between items-center px-6 py-4 z-20 shadow-md">
      <Link to="/home">
        <img src="/netflix-logo.png" alt="Netflix" className="h-8 sm:h-10" />
      </Link>

      <div className="flex gap-6 text-sm sm:text-base items-center">
        <Link to="/home" className="hover:text-red-600 transition">Home</Link>
        <Link className="hover:text-red-600 transition" onClick={()=>setKey('movie')}>Movies</Link>
        <Link className="hover:text-red-600 transition" onClick={()=>setKey('tv')}>TV Shows</Link>
        <Link to="/popular" className="hover:text-red-600 transition">New & Popular</Link>

        <button
          onClick={handleLogout}
          className="ml-4 py-1 px-3 bg-red-600 rounded-md hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
