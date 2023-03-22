import { createRouter, createWebHistory } from "vue-router";
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
      children: [
        {
          path: "/todo-list",
          name: "todo-list",
          component: TodoList,
        },
        {
          path: "/settings",
          component: Settings,
        },
      ],
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ],
});

export default router;
