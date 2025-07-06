import { Link } from "react-router-dom";

const Navbar = () => {
  const links = [
    { label: "Home", path: "/" },
    { label: "Courses", path: "/courses" },
    { label: "Department", path: "/department" },
    { label: "About us", path: "/about" },
    { label: "Gallery", path: "/gallery" },
    { label: "Notification", path: "/notification" },
    { label: "Contact", path: "/contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-red-600 text-white text-sm font-bold flex justify-center space-x-6 py-2">
      {links.map(({ label, path }) => (
        <Link
          to={path}
          key={label}
          className="hover:bg-red-700 hover:text-yellow-300 px-3 py-1 rounded transition duration-200"
        >
          {label}
        </Link>
      ))}
    </nav>
  );
};

export default Navbar;
