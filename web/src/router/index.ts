import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth.js";
import SignUp from "@/views/Auth/SignUp.vue";
import SignIn from "@/views/Auth/SignIn.vue";
import Main from "@/views/Main.vue";
import TodoList from "@/views/TodoList/TodoList.vue";
import Settings from "@/views/Settings/Settings.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/auth/sign-up",
      name: "sign-up",
      component: SignUp,
    },
    {
      path: "/auth/sign-in",
      name: "sign-in",
      component: SignIn,
    },
    {
      path: "/",
      name: "main",
      component: Main,
      redirect: "/todo-list",
      meta: { requiresAuth: true },
      children: [
        {
          path: "/todo-list",
          name: "todo-list",
          component: TodoList,
          meta: { requiresAuth: true },
        },
        {
          path: "/settings",
          name: "settings",
          component: Settings,
          meta: { requiresAuth: true },
        },
      ],
    },
  ],
});

router.beforeEach((to, from) => {
  const auth = useAuthStore();
  auth.checkLoggedInStatus();

  if (to.meta.requiresAuth && !auth.status.loggedIn) {
    return {
      path: "/auth/sign-in",
    };
  }
});

export default router;
