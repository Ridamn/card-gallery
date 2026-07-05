import {
  createContext,
  useEffect,
  useState,
} from "react";
import type { ReactNode } from "react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";
import { AuthError } from "@supabase/supabase-js";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (
    email: string,
    password: string
  ) => Promise<{ error: AuthError | null }>;
  register: (
    email: string,
    password: string
  ) => Promise<{ error: AuthError | null }>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
  setUser(session?.user ?? null);
  setLoading(false);
});

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  async function checkSession() {
    const { data } = await supabase.auth.getSession();

    setUser(data.session?.user ?? null);
    setLoading(false);
  }

  async function login(email: string, password: string) {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    return { error };
  }

  async function register(email: string, password: string) {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    return { error };
  }

  async function logout() {
    await supabase.auth.signOut();
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider };
export default AuthContext;
