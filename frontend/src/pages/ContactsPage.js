import React from "react";
import GridContactList from "../components/GridContactList";
import { useUserStore } from "../stores/authStore";

export default function ContactsPage() {
  const { authToken, currentUser } = useUserStore()

  console.log(currentUser)
  console.log(authToken)
  return (
    <GridContactList />
  );
}
