import { request } from "@/utils/request";

async function signin(user) {
  return await request({
    url: "auth/signin",
    method: "post",
    data: user,
  })
    .then((response) => {
      if (response.accessToken) {
        localStorage.setItem('user', JSON.stringify(response));
      }

      return response;
    })
}

function logout() {
  localStorage.removeItem('user');
}

async function signup(user) {
  return await request({
    url: "auth/signup",
    method: "post",
    data: user,
  })
}

const authService = {
  signin,
  logout,
  signup
}

export default authService