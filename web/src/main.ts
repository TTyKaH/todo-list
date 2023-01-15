import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import VueFeather from "vue-feather";

import "./assets/styles/index.scss";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.component("VueFeather", VueFeather);

app.mount("#app");
