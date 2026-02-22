
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, UserRole } from '@/types';
import { useToast } from "@/hooks/use-toast";
import {loginUser} from "@/services/Service";
import { useAppDispatch, useAppSelector } from '@/redux-toolkit/hooks/hook';
import { getCompany, getRecentActivities } from '@/redux-toolkit/slice/allPage/companySlice';
import { getSetting } from '@/redux-toolkit/slice/allPage/settingSlice';
import { getAdminList } from '@/redux-toolkit/slice/allPage/userSlice';
import { getPayroll, getSinglePayroll } from '@/redux-toolkit/slice/allPage/payrollSlice';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role?: UserRole) => Promise<void>; // role optional
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();


  const login = async (email: string, password: string, role?: UserRole) => {
    // role parameter ko ignore karenge lekin signature match ho jaaye
    setLoading(true);
    try {
      const res = await loginUser(email, password);
      if (res.status === 200) {
        toast({
          title: "Login Successfully.",
          description: `${res?.data?.message}`,
        });
        localStorage.setItem('accessToken', res?.data?.accessToken);
        localStorage.setItem('user', JSON.stringify(res?.data?.user));
        setUser(res?.data?.user);
    }
    else{
      toast({
        title: "Error",
        description: res?.data?.message || "Something went wrong",
        variant: "destructive",
      });
    }
    } catch (error: any) {
      console.log(error);
      toast({
        title: "Error",
        description: error?.response?.data?.message || error?.message ||  String(error) || "Something went wrong",
        variant: "destructive",
      });
    }
    finally {
    setLoading(false); // stop loading
  }
  };

  const logout = () => {
    toast({
      title: "Logout Successfully.",
      description: `Logout Successfully.`,
    });
    setUser(null);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    dispatch(getCompany([]));
    dispatch(getRecentActivities([]));
    dispatch(getSetting(null));
    dispatch(getAdminList([]));
    dispatch(getPayroll([]));
    dispatch(getSinglePayroll([]));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
