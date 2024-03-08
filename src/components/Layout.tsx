// Layout.tsx

import React from 'react';
import { Link } from 'react-router-dom';

const Layout: React.FC = ({ children }) => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="flex-none w-64 bg-gray-800">
        <div className="h-full flex flex-col justify-between py-4">
          <div>
            <div className="text-white text-lg font-bold px-4">Flight Status Board</div>
            <ul className="mt-4">
              <li>
                <Link to="/" className="block text-white px-4 py-2 hover:bg-gray-700">Flight Board</Link>
              </li>
              {/* Add more links as needed */}
            </ul>
          </div>
          {/* Footer or additional sidebar content */}
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-grow bg-gray-100">
        {children}
      </div>
    </div>
  );
};

export default Layout;
