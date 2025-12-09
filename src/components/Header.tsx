import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { LogOut, LayoutDashboard, FolderOpen } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <Link to={isAuthenticated ? '/dashboard' : '/'} className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <FolderOpen className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-display text-xl font-semibold text-foreground">ClientHub</span>
        </Link>

        {isAuthenticated && (
          <nav className="hidden md:flex items-center gap-1">
            <Link to="/dashboard">
              <Button 
                variant={location.pathname === '/dashboard' ? 'secondary' : 'ghost'}
                size="sm"
                className="gap-2"
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Button>
            </Link>
          </nav>
        )}

        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <div className="hidden sm:block text-right">
                <p className="text-sm font-medium text-foreground">{user?.contactName}</p>
                <p className="text-xs text-muted-foreground">{user?.companyName}</p>
              </div>
              <Button variant="outline" size="sm" onClick={handleLogout} className="gap-2">
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </>
          ) : (
            <Link to="/">
              <Button variant="hero" size="sm">
                Client Login
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
