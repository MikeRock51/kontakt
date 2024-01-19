import { NavLink as RouterNavLink, useNavigate, useLocation } from 'react-router-dom';

export default function NavLink({ name, link }) {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = location.pathname === link;

  const handleClick = (event) => {
    event.preventDefault();
    navigate(link);
  };

  return (
    <li>
      <RouterNavLink
        to={link}
        className={`flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800 ${
          isActive ? 'text-indigo-500' : ''
        }`}
        onClick={handleClick}
      >
        <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
          <i className="bx bx-home"></i>
        </span>
        <span className="text-sm font-medium">{name.toUpperCase()}</span>
      </RouterNavLink>
    </li>
  );
}
