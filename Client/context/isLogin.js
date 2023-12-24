// context
import { createContext, useEffect, useState } from "react";
// secure storage
import * as SecureStore from "expo-secure-store";

// context
export const LoginContext = createContext();

// secure storage
// get
async function getValueFor(key) {
  let result = await SecureStore.getItemAsync(key);
  return result;
}

// colab
export const LoginProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  // set storage
  async function loginAction(key, value) {
    // console.log(key, value, "<<<<<<<<<<<");
    try {
      await SecureStore.setItemAsync(key, value);
      setIsLogin(true);
    } catch (error) {
      console.log(error);
    }
  }

  async function LogoutActions(key, value) {
    try {
      await SecureStore.deleteItemAsync(key);
      setIsLogin(false);
    } catch (error) {
      console.log(error);
    }
  }

  // secure storage
  useEffect(() => {
    getValueFor("token")
      .then((data) => {
        console.log(data);
        if (data) {
          setIsLogin(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <LoginContext.Provider
      value={{ isLogin, setIsLogin, loginAction, LogoutActions }}
    >
      {children}
    </LoginContext.Provider>
  );
};
