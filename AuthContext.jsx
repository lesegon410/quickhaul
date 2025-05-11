
import React, { createContext, useContext, useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const storedUser = localStorage.getItem("quickhaul_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    try {
      const users = JSON.parse(localStorage.getItem("quickhaul_users_db")) || [];
      const foundUser = users.find(u => u.email === email && u.password === password); // In a real app, password check would be hashed

      if (foundUser) {
        localStorage.setItem("quickhaul_user", JSON.stringify(foundUser));
        setUser(foundUser);
        toast({
          title: "Login successful",
          description: `Welcome back, ${foundUser.name}!`,
        });
        return true;
      } else {
        toast({
          title: "Login failed",
          description: "Invalid email or password.",
          variant: "destructive",
        });
        return false;
      }
    } catch (error) {
      toast({
        title: "Login failed",
        description: error.message || "Please check your credentials and try again",
        variant: "destructive",
      });
      return false;
    }
  };

  const register = (name, email, password, userType) => {
    try {
      let users = JSON.parse(localStorage.getItem("quickhaul_users_db")) || [];
      
      if (users.find(u => u.email === email)) {
        toast({
          title: "Registration failed",
          description: "An account with this email already exists.",
          variant: "destructive",
        });
        return false;
      }

      const newUser = {
        id: "user_" + Math.random().toString(36).substr(2, 9),
        name,
        email,
        password, // In a real app, hash the password before storing
        userType,
        phone: "",
        avatar: null,
        address: "",
        vehicleDetails: userType === "driver" ? { type: "", licensePlate: "", capacity: "" } : null,
        availability: userType === "driver" ? "available" : null,
      };
      
      users.push(newUser);
      localStorage.setItem("quickhaul_users_db", JSON.stringify(users));
      localStorage.setItem("quickhaul_user", JSON.stringify(newUser));
      setUser(newUser);
      
      toast({
        title: "Registration successful",
        description: `Welcome to QuickHaul, ${name}!`,
      });
      
      return true;
    } catch (error) {
      toast({
        title: "Registration failed",
        description: error.message || "Please try again",
        variant: "destructive",
      });
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("quickhaul_user");
    setUser(null);
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
  };

  const updateProfile = (userData) => {
    try {
      const updatedUser = { ...user, ...userData };
      
      let users = JSON.parse(localStorage.getItem("quickhaul_users_db")) || [];
      users = users.map(u => u.id === updatedUser.id ? updatedUser : u);
      
      localStorage.setItem("quickhaul_users_db", JSON.stringify(users));
      localStorage.setItem("quickhaul_user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated",
      });
      
      return true;
    } catch (error) {
      toast({
        title: "Update failed",
        description: error.message || "Please try again",
        variant: "destructive",
      });
      return false;
    }
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
