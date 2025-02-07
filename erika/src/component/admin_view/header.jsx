import { Button } from '@/components/ui/button';
import React from 'react';
import { LogOut, Menu } from 'lucide-react';
import { Logout } from '@/store/auth-slice';
import { useDispatch } from 'react-redux';

const Header = ({ setOpen }) => {
  const dispatch = useDispatch(); // Get the dispatch function

  function handleLogout() {
    dispatch(Logout());
  }

  return (
    <header className="flex items-center justify-between px-4 bg-white py-5">
      <Button onClick={() => setOpen(true)} className="lg:hidden sm:block">
        <Menu />
        <span className='sr-only'>Toggle Menu</span>
      </Button>
      <div className='flex flex-1 justify-end'>
        <Button
          className="inline-flex gap-2 items-center rounded-md px-4 py-2 text-sm font-medium shadow bg-black text-white"
          onClick={handleLogout}
        >
          <LogOut />
          Logout
        </Button>
      </div>
    </header>
  );
}

export default Header;
