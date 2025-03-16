import router from "../components/Routes";
import client from "../constants/apollo-client";
import { authenticatedVar } from "../constants/authenticated";
import { clearToken } from "./token";

export const onLogout = async () => {
  authenticatedVar(false);
  clearToken();
  router.navigate("/login");
  try {
    await client.resetStore();
  } catch (error) {
    console.error('Error during resetStore:', error);
  }
}