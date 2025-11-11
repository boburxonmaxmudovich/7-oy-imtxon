import React, {
  createContext,
  useState,
  useContext,
  type ReactNode,
} from "react";

export interface User {
  [key: string]: unknown;
}

export interface AuthResponse {
  success: boolean;
  token?: string;
  user?: User;
  error?: string;
  statusCode?: number;
}

export interface AuthContextType {
  token: string | null;
  user: User | null;
  login: (email: string, password: string) => Promise<AuthResponse>;
  logout: () => void;
  loading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() => {
    try {
      return localStorage.getItem("token");
    } catch (error) {
      console.error("Token o'qishda xato - borr", error);
      return null;
    }
  });

  const [user, setUser] = useState<User | null>(() => {
    try {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("User ma'lumotlani o'qishda xato bo", error);
      return null;
    }
  });

  const [loading, setLoading] = useState<boolean>(false);

  const login = async (
    email: string,
    password: string
  ): Promise<AuthResponse> => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://admin-crm.onrender.com/api/auth/sign-in",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        return {
          success: false,
          error:
            (data && (data.error || data.message)) ||
            `Login failed with status: ${response.status}`,
          statusCode: response.status,
        };
      }

      const receivedToken = data?.data?.token ?? data?.token ?? data?.body?.token;
      const receivedUserRaw = data?.data ?? data?.user ?? data?.body?.user;
      const receivedUser = receivedUserRaw && typeof receivedUserRaw === 'object'
        ? (() => { const { token: _omit, ...rest } = receivedUserRaw as Record<string, unknown>; return rest; })()
        : undefined;

      if (receivedToken) {
        setToken(receivedToken);
        if (receivedUser) setUser(receivedUser);
        try {
          localStorage.setItem("token", receivedToken);
          if (receivedUser)
            localStorage.setItem("user", JSON.stringify(receivedUser));
        } catch (storageError) {
          console.error("LocalStorage-ga saqlashda xato:", storageError);
        }
        return { success: true, token: receivedToken, user: receivedUser };
      }

      return { success: false, error: "Token olinmadi" };
    } catch (error) {
      console.error("Login error:", error);
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "Noma'lum xato yuz berdi",
      };
    } finally {
      setLoading(false);
    }
  };

  const logout = (): void => {
    setToken(null);
    setUser(null);
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    } catch (error) {
      console.error("LocalStorage-dan o'chirishda xato:", error);
    }
  };

  const value: AuthContextType = {
    token,
    user,
    login,
    logout,
    loading,
    isAuthenticated: !!token,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
