import React from "react";
import NavLink from "./NavLink";
import { useUserStore } from "../stores/authStore";

export default function SideNav() {
  const unAuthLinks = { home: "/", signUp: "/signup", signIn: "/signin" };
  const { currentUser } = useUserStore();

  return (
    <div class="min-h-screen flex flex-row bg-gray-100">
      <div class="flex flex-col w-56 bg-white rounded-r-3xl overflow-hidden">
        <div class="flex items-center justify-center h-20 shadow-md">
          <h1 class="text-3xl uppercase text-indigo-500">Kontakt</h1>
        </div>
        <ul class="flex flex-col py-4">
          {!currentUser &&
            Object.keys(unAuthLinks).map((key) => (
              <NavLink name={key} link={unAuthLinks[key]} />
            ))}
        </ul>
      </div>
    </div>
  );
}
