import { createApp } from "vue";
import { createPinia } from "pinia";
import { i18n } from "./utils/localization";

import App from "./App.vue";
import router from "./router";

import "./assets/styles/main.css";

const app = createApp(App);

app.use(i18n);
app.use(createPinia());
app.use(router);

app.mount("#app");
