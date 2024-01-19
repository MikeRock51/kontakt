import React, { useEffect, useState } from "react";
import GridContact from "./GridContact";
import { useUserStore } from "../stores/authStore";
import axios from "axios";
import toast from "react-hot-toast";
import { useContactStore } from "../stores/contactStore";
import ContactFormModal from "./modals/ContactFormModal";

export default function GridContactList() {
  const [ contacts, setContacts ] = useState([]);
  const { authToken } = useUserStore();
  const { showContactForm, setShowContactForm, updated } = useContactStore();
  const API_URL = process.env.REACT_APP_API_URL;

  async function fetchUserContacts() {
    try {
      const response = await axios.get(API_URL + "/users/contacts", { headers: {auth_token: authToken} });
      console.log(response);
      setContacts(response.data.data);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.error || "Network error");
      return false;
    }
  }

  useEffect(() => {
    fetchUserContacts();
  }, [updated]);

  return (
    <div className="px-8">
      <h2 className="mt-8 text-4xl mb-4">Contact List</h2>
      <button onClick={() => setShowContactForm(true)} className="bg-green-100 px-5 py-2 rounded-md text-green-800 mb-5">New Contact</button>
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {contacts.map((contact) => <GridContact contact={contact} />)}
      </ul>
      {showContactForm && <ContactFormModal />}
    </div>
  );
}
