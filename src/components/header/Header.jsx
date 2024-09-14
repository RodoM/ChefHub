import { ChefHat, UserRound, LogOut } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="flex items-center justify-between gap-4 border-b border-input px-2 py-2 md:px-6">
      <Link to="/" className="flex items-center gap-2">
        <ChefHat size={32} />
        <span className="font-semibold text-2xl hidden md:block">ChefHub</span>
      </Link>

      <Input placeholder="Buscar receta..." className="max-w-80" />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="cursor-pointer">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" sideOffset={16}>
          <DropdownMenuItem>
            <Link to="/user-profile/:id" className='flex items-center'>
              <UserRound size={16} className="mr-2" />
              Mi perfil
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="text-red-600">
            <LogOut size={16} className="mr-2" />
            Cerrar sesión
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}

export default Header;
