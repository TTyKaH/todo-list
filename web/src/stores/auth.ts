import { defineStore } from 'pinia'
import authService from '@/api/auth/auth.service.ts';
import type { User } from "@/types/user"


interface State {
  status: {
    loggedIn: boolean;
  };
  user: User | null;
}
// TODO: оставить первичную проверку тут? 
const user: User = JSON.parse(localStorage.getItem("user") || '');
const initialState: State = user
  ? { status: { loggedIn: true }, user }
  : { status: { loggedIn: false }, user: null };

export const useAuthStore = defineStore('auth', {
  state: () => initialState,
  getters: {
  },
  actions: {
    login(user) {
      return authService.signin(user).then(
        user => {
          this.loginSuccess(user)
          return Promise.resolve(user);
        },
        error => {
          this.loginFailure()
          return Promise.reject(error);
        }
      );
    },
    logout() {
      console.log('test')
      authService.logout();
      this.logout()
    },
    register(user) {
      return authService.signup(user).then(
        response => {
          this.registerSuccess()
          return Promise.resolve(response.data);
        },
        error => {
          this.registerFailure()
          return Promise.reject(error);
        }
      );
    },
    // =====
    loginSuccess(user) {
      this.status.loggedIn = true;
      this.user = user;
    },
    loginFailure() {
      this.status.loggedIn = false;
      this.user = null;
    },
    // logout() {
    //   this.status.loggedIn = false;
    //   this.user = null;
    // },
    registerSuccess() {
      this.status.loggedIn = false;
    },
    registerFailure() {
      this.status.loggedIn = false;
    },
    // =====
    checkLoggedInStatus() {
      const user = JSON.parse(localStorage.getItem('user'));

      if (user) {
        this.status.loggedIn = true
        this.user = user
        return
      }
      this.status.loggedIn = false
      this.user = null
    }
  },
})