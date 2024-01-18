import React from 'react'

export default function ContactList() {
  return (
    <div className="bg-gray-100">
    <div className="max-w-sm mx-auto my-10">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <ul className="divide-y divide-gray-200">
                <li className="p-3 flex justify-between items-center user-card">
                    <div className="flex items-center">
                        <img className="w-10 h-10 rounded-full" src="https://unsplash.com/photos/oh0DITWoHi4/download?force=true&w=640" alt="Christy"/>
                        <span className="ml-3 font-medium">Christy</span>
                    </div>
                    <div>
                        <button className="text-gray-500 hover:text-gray-700">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                            </svg>
                        </button>
                    </div>
                </li>
                
            </ul>
        </div>
    </div>
</div>
  )
}

