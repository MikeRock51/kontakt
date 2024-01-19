import React from "react";
import NavLink from "./NavLink";
import { useUserStore } from "../stores/authStore";
import { useNavigate } from 'react-router-dom';
import { LogoutUser } from "../utilities/Connector";

export default function SideNav() {
  const unAuthLinks = { register: "/signup", sign_In: "/signin" };
  const authLinks = { contacts: "/contacts" };
  const { currentUser, setCurrentUser, authToken, setAuthToken } = useUserStore();
  const navigate = useNavigate();


  async function handleClick(event) {
    event.preventDefault();
    await LogoutUser(authToken)
    setCurrentUser(null);
    setAuthToken(null);
    navigate('/signin');
  };


  return (
    <div class="min-h-screen flex flex-row bg-gray-100 justify-start">
      <div class="flex flex-col w-56 bg-white rounded-r-3xl overflow-hidden">
        <div class="flex items-center justify-center h-20 shadow-md">
          <h1 class="text-3xl uppercase text-green-500">Kontakt</h1>
        </div>
        <ul class="flex flex-col py-4">
          {Object.keys(currentUser ? authLinks : unAuthLinks).map((key) => (
              <NavLink name={key} link={currentUser ? authLinks[key] : unAuthLinks[key]} />
            ))}
        </ul>
        {currentUser && <button
        className='flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800'
        onClick={handleClick}
      >
        <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
          
        </span>
        <span className="text-sm font-medium">SIGN OUT</span>
      </button>}
      </div>
    </div>
  );
}
