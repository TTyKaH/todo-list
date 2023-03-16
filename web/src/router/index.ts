import { createRouter, createWebHistory } from "vue-router";
import MainView from "@/views/MainView.vue";
import TodoFormView from "@/views/TodoForm/TodoFormView.vue";
import SettingsView from "@/views/Settings/SettingsView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "MainView",
      component: MainView,
    },
    {
      path: "/create-todo",
      name: "TodoFormView",
      component: TodoFormView,
    },
    {
      path: "/settings",
      name: "SettingsView",
      component: SettingsView,
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
