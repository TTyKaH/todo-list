import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import VueFeather from "vue-feather";
import FormTextareaComponent from "@/components/UI/FormTextareaComponent.vue";
import FormInputComponent from "@/components/UI/FormInputComponent.vue";
import ModalWindowComponent from "@/components/UI/modals/ModalWindowComponent.vue";
import TooltipWrapperComponent from "@/components/UI/TooltipWrapperComponent.vue";

import "./assets/styles/index.scss";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.component("VueFeather", VueFeather);
app.component("FormTextarea", FormTextareaComponent);
app.component("FormInput", FormInputComponent);
app.component("ModalWindow", ModalWindowComponent);
app.component("TooltipWrapper", TooltipWrapperComponent);

app.mount("#app");
