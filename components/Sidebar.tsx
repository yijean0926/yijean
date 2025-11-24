import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
  return (
    <aside className="fixed top-0 left-0 h-full w-48 md:w-64 p-6 md:p-10 flex flex-col justify-between z-20 pointer-events-none md:pointer-events-auto mix-blend-multiply">
      <div>
        <h1 className="text-red-600 font-bold text-sm tracking-widest mb-6 font-['Inter'] pointer-events-auto cursor-pointer">
          <Link to="/">JONAS TYPE</Link>
        </h1>
        
        <nav className="space-y-1 font-['Space_Mono'] text-xs md:text-sm leading-relaxed pointer-events-auto">
          <div className="mb-6">
            <div className="block cursor-pointer hover:underline">SCOPE</div>
            <div className="block cursor-pointer hover:underline">FICTIONAL</div>
            <div className="block cursor-pointer hover:underline">INDICATE MONO</div>
          </div>

          <div className="space-y-1 text-gray-800">
            <div className="cursor-pointer hover:text-red-600 transition-colors">GALLERY</div>
            <div className="cursor-pointer hover:text-red-600 transition-colors">INFORMATION</div>
            <div className="cursor-pointer hover:text-red-600 transition-colors">LICENSING</div>
            <div className="cursor-pointer hover:text-red-600 transition-colors">STUDENTS</div>
            <div className="cursor-pointer hover:text-red-600 transition-colors">CONTACT</div>
          </div>
        </nav>
      </div>

      <div className="text-[10px] text-gray-400 font-['Inter'] hidden md:block">
        © 2024 JONAS TYPE FOUNDRY
      </div>
    </aside>
  );
};

export default Sidebar;