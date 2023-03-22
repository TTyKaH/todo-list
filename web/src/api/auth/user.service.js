import { request } from "@/utils/request";
import authHeader from './auth-header';

class UserService {
  getPublicContent() {
    return request({
      url: "test/all",
      method: "get",
      headers: authHeader()
    });
  }

  getUserBoard() {
    return request({
      url: "test/user",
      method: "get",
      headers: authHeader()
    });
  }

  // getModeratorBoard() {
  //   return request({
  //     url: "test/mod",
  //     method: "get"
  //   });
  // }

  // getAdminBoard() {
  //   return request({
  //     url: "test/admin",
  //     method: "get"
  //   });
  // }
}

export default new UserService();