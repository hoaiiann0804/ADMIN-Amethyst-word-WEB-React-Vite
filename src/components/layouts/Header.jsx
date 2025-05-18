import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { ShoppingBag, User, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <header className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
      <div className="flex items-center w-full max-w-md">
        {/* Logo hoặc thanh tìm kiếm (nếu có) */}
      </div>

      <div className="flex items-center gap-4">

        {user ? (
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">xin chào {user.name}</span>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              onClick={handleLogout}
              title="Đăng xuất"
            >
              <LogOut size={20} />
            </Button>
          </div>
        ) : (
          <Link to="/login">
            <Button variant="outline" size="icon" className="rounded-full" title="Đăng nhập">
              <User size={20} />
            </Button>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
