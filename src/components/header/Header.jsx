import { ChefHat, UserRound, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthenticationContext } from "@/services/authentication/AuthenticationContext";
import { Button } from "../ui/button";

const Header = () => {
  const { token, logout, user } = useContext(AuthenticationContext);
  return (
    <header className="flex items-center justify-between gap-4 border-b border-input px-2 py-2 md:px-6">
      <Link to="/" className="flex items-center gap-2">
        <ChefHat size={32} />
        <span className="font-semibold text-2xl hidden md:block">ChefHub</span>
      </Link>

      {token ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer">
              <AvatarImage src={user?.photo} alt={user?.fullName} />
              <AvatarFallback>{user?.fullName.slice(0, 2)}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" sideOffset={16}>
            <DropdownMenuItem>
              <Link to={`/user-profile/${user?.id}`} className="flex items-center">
                <UserRound size={16} className="mr-2" />
                Mi perfil
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-600" onClick={logout}>
              <LogOut size={16} className="mr-2" />
              Cerrar sesión
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button>
          <Link to="/login">Iniciar sesión</Link>
        </Button>
      )}
    </header>
  );
};

export default Header;
