// components/Header.tsx
import React from 'react';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

const Header: React.FC = () => {
  const currentTheme = useSelector((state: RootState) => state.theme.theme);

  // Define the theme text to display

  return (
    <header className="flex justify-between items-center bg-gray-800 text-white px-4 py-2">
      <div className="flex justify-between items-center">
        <Link href="/">
            <img  src="https://dev.peoplesol.solunxt.com/static/media/PeopleSolLogo.6d04b8532a446955ec87ff3cf1f15653.svg" alt="Logo" className="w-24 h-10" />
        </Link>
        
      </div>
      <ThemeToggle />

    </header>
  );
};

export default Header;
