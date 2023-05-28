import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import VueFeather from "vue-feather";
import CustomTextarea from "@/components/UI/form/CustomTextarea.vue";
import CustomSelect from "@/components/UI/form/CustomSelect.vue";
import CustomInput from "@/components/UI/form/CustomInput.vue";
import ModalWindow from "@/components/UI/modals/ModalWindow.vue";
import TooltipWrapper from "@/components/UI/TooltipWrapper.vue";
import CustomButton from "@/components/UI/CustomButton.vue";
import Dropdown from "@/components/UI/Dropdown.vue";

import "./assets/styles/index.scss";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.component("VueFeather", VueFeather);
// UI
app.component("CustomTextarea", CustomTextarea);
app.component("CustomSelect", CustomSelect);
app.component("CustomInput", CustomInput);
app.component("ModalWindow", ModalWindow);
app.component("TooltipWrapper", TooltipWrapper);
app.component("CustomButton", CustomButton);
app.component("Dropdown", Dropdown);

app.mount("#app");
