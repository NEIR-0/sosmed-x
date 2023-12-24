import { useContext } from "react";
import { LoginContext } from "../context/isLogin";
import MainTab from "./mainTab";
import MainAuth from "./mainAuth";

export default function MainViews() {
  const { isLogin } = useContext(LoginContext);
  return isLogin === false ? (
    <>
      <MainAuth />
    </>
  ) : (
    <>
      <MainTab />
    </>
  );
}
