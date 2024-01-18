import React from "react";
import GridContact from "./GridContact";

export default function GridContactList() {
  return (
    <div className="px-8">
      <h2 className="mt-8 text-3xl mb-4">Contact List</h2>
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <GridContact />
      </ul>
    </div>
  );
}
