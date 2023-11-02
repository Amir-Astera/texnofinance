import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import PrimeVue from "primevue/config";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Divider from "primevue/divider";
import Ripple from "primevue/ripple";
import StyleClass from "primevue/styleclass";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Dropdown from "primevue/dropdown";

import "primevue/resources/themes/lara-light-indigo/theme.css";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { createPinia } from "pinia";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDcgV6SP1rDnVgkcoxGCY5udlO1jCJOR-o",
  authDomain: "texno-finance.firebaseapp.com",
  projectId: "texno-finance",
  storageBucket: "texno-finance.appspot.com",
  messagingSenderId: "615939102596",
  appId: "1:615939102596:web:893cf8a0fd6d4b8a9d2fd1",
};

initializeApp(firebaseConfig);

const pinia = createPinia();

createApp(App)
  .use(router)
  .use(PrimeVue)
  .use(pinia)
  .component("InputText", InputText)
  .component("Button", Button)
  .component("Divider", Divider)
  .component("DataTable", DataTable)
  .component("Column", Column)
  .component("Dropdown", Dropdown)
  .directive("ripple", Ripple)
  .directive("styleclass", StyleClass)
  .mount("#app");
