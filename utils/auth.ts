import axios from "axios";

const AUTH_HOOK_URL = `${process.env.GATEKEEPER_URL}/user`;

export const genGatekeeperUserInfo = (accessToken: string) =>
  axios.get(AUTH_HOOK_URL, {
    headers: {
      Cookie: `accessToken=${accessToken}`,
      Accept: "application/json",
    },
  });
