import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Switch } from '@nextui-org/react';
import { useTheme } from 'next-themes';
import { FaSun, FaMoon } from 'react-icons/fa';
import { Outlet } from 'react-router-dom';

export const Layout: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const handleSwitchTheme = () => {
    if (theme === 'dark') {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  };

  return (
    <div className={`${theme === 'dark' ? '' : 'bg-slate-50'} min-h-screen`}>
      <Navbar data-testid="navbar">
        <NavbarBrand className="font-bold text-black dark:text-white">
          <NavbarItem>Journey to MARS</NavbarItem>
        </NavbarBrand>
        <NavbarContent justify="end">
          <NavbarItem className="lg:flex">
            <Switch
              data-testid="themeSwitch"
              isSelected={theme === 'light'}
              size="lg"
              color="default"
              startContent={<FaSun />}
              endContent={<FaMoon />}
              onValueChange={handleSwitchTheme}
            />
          </NavbarItem>
        </NavbarContent>
      </Navbar>
      <main>
        <Outlet />
      </main>
    </div>
  );
};
