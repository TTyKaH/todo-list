import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import VueFeather from "vue-feather";
import CustomTextareaComponent from "@/components/UI/form/CustomTextareaComponent.vue";
import CustomInputComponent from "@/components/UI/form/CustomInputComponent.vue";
import ModalWindowComponent from "@/components/UI/modals/ModalWindowComponent.vue";
import TooltipWrapperComponent from "@/components/UI/TooltipWrapperComponent.vue";

import "./assets/styles/index.scss";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.component("VueFeather", VueFeather);
app.component("CustomTextarea", CustomTextareaComponent);
app.component("CustomInput", CustomInputComponent);
app.component("ModalWindow", ModalWindowComponent);
app.component("TooltipWrapper", TooltipWrapperComponent);

app.mount("#app");
