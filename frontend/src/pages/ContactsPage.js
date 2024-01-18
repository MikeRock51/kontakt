import React from "react";
import ContactList from "../components/ContactList";
import GridContactList from "../components/GridContactList";
import { useUserStore } from "../stores/authStore";

export default function ContactsPage() {
  const { authToken } = useUserStore()

  console.log(authToken)
  return (
    <GridContactList />
  );
}
