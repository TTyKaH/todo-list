import { defineStore } from "pinia";
import authService from "@/api/auth/auth.service.ts";
import { useTodosListStore } from "@/stores/todos";
import type { User } from "@/types/user";
import { getUserFromLocalStore } from "@/utils";
import router from "@/router/index";

interface AuthState {
  status: {
    loggedIn: boolean;
  };
  user: User | null;
}

const user: User | null = getUserFromLocalStore();
const authState: AuthState = user
  ? { status: { loggedIn: true }, user }
  : { status: { loggedIn: false }, user: null };

export const useAuthStore = defineStore("auth", {
  state: () => authState,
  actions: {
    login(user: User) {
      return authService.signin(user).then(
        (user) => {
          this.loginSuccess(user);
          return Promise.resolve(user);
        },
        (error) => {
          this.loginFailure();
          return Promise.reject(error);
        }
      );
    },
    logout() {
      const { clearStore: clearTodosStore } = useTodosListStore();
      clearTodosStore();

      authService.logout();
      this.logoutFromState();
      router.replace({ name: "sign-in" });
    },
    register(user: User) {
      return authService.signup(user).then(
        (response) => {
          this.registerSuccess();
          return Promise.resolve(response);
        },
        (error) => {
          this.registerFailure();
          return Promise.reject(error);
        }
      );
    },
    // =====
    loginSuccess(user: User) {
      this.status.loggedIn = true;
      this.user = user;
    },
    loginFailure() {
      this.status.loggedIn = false;
      this.user = null;
    },
    logoutFromState() {
      this.status.loggedIn = false;
      this.user = null;
    },
    registerSuccess() {
      this.status.loggedIn = false;
    },
    registerFailure() {
      this.status.loggedIn = false;
    },
    // =====
    checkLoggedInStatus() {
      const user: User | null = getUserFromLocalStore();

      if (user) {
        this.status.loggedIn = true;
        this.user = user;
        return;
      }
      this.status.loggedIn = false;
      this.user = null;
    },
  },
});
