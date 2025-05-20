import React from 'react';
import { UserButton, useUser } from '@clerk/clerk-react';
export default function Header() {
    const { user } = useUser();
    return (
        <header className="bg-white shadow-md p-4 flex items-center justify-between h-16 sticky top-0 z-10 w-full">
          <div className="flex items-center">
            <div className="bg-indigo-600 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-xl mr-3">
              SP
            </div>
            <h2 className="text-2xl font-semibold text-gray-800">Dashboard</h2>
          </div>
          <div className="flex items-center space-x-4">
            {/* User Name/Avatar (Optional with Clerk) */}
              <span className="text-gray-800 font-semibold">{user.firstName} {user.lastName}</span>
            <div className="flex items-center">
              <UserButton className="bg-gray-200 border-2 border-dashed rounded-full w-10 h-10 flex items-center justify-center text-gray-500 text-sm"/>
            </div>
          </div>
        </header>
    );
}