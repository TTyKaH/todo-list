import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import VueFeather from "vue-feather";
import CustomTextareaComponent from "@/components/UI/form/CustomTextareaComponent.vue";
import CustomSelectComponent from "@/components/UI/form/CustomSelectComponent.vue";
import CustomInputComponent from "@/components/UI/form/CustomInputComponent.vue";
import ModalWindowComponent from "@/components/UI/modals/ModalWindowComponent.vue";
import TooltipWrapperComponent from "@/components/UI/TooltipWrapperComponent.vue";
import CustomButtonComponent from "@/components/UI/CustomButtonComponent.vue";

import "./assets/styles/index.scss";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.component("VueFeather", VueFeather);
// UI
app.component("CustomTextarea", CustomTextareaComponent);
app.component("CustomSelect", CustomSelectComponent);
app.component("CustomInput", CustomInputComponent);
app.component("ModalWindow", ModalWindowComponent);
app.component("TooltipWrapper", TooltipWrapperComponent);
app.component("CustomButton", CustomButtonComponent);

app.mount("#app");
