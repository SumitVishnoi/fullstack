import { useContext } from "react";
import {
  currentUser,
  loginUser,
  logoutUser,
  registerUser,
} from "../service/auth.api";
import { AuthContext } from "../auth.context";

export const useAuth = () => {
  const { user, setUser, setLoading } = useContext(AuthContext);

  const handleRegisterUser = async ({ name, email, password }) => {
    const data = await registerUser({ name, email, password });
    setUser(data.user);
    return data.user;
  };

  const handleLoginUser = async ({ email, password }) => {
    const data = await loginUser({ email, password });
    setUser(data.user);
    return data.user;
  };

  const handleLogoutUser = async () => {
    const data = await logoutUser();
    setUser(null);
  };

  console.log(user);

  const handleCurrenttUser = async () => {
    try {
      setLoading(true);
      const data = await currentUser();
      console.log(data);
      setUser(data?.user || null);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    handleRegisterUser,
    handleLoginUser,
    handleLogoutUser,
    handleCurrenttUser,
  };
};
