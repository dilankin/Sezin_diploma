import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from "./i18n";
import axios from "axios";
import scrollDirectives from './directives/scrollDirectives';
import { createToaster } from "@meforma/vue-toaster";
import vClickOutside from "click-outside-vue3"
import VueGoodTablePlugin from 'vue-good-table-next';

// import the styles 
import 'vue-good-table-next/dist/vue-good-table-next.css'

import './registerServiceWorker'

axios.defaults.baseURL="https://back-sezin.devup.kz/";
axios.defaults.params={
 lang: store.getters.getLang
};

const axiosInstance = axios.create({
 baseURL: 'https://back-sezin.devup.kz/',
 params: {
  lang: store.getters.getLang
 }
})

const app = createApp(App)
    .use(store)
    .use(i18n)
    .use(router)
    .use(vClickOutside)
    .use(VueGoodTablePlugin)
    .directive('scroll', scrollDirectives)

app.config.globalProperties.$axios = { ...axiosInstance }
app.config.globalProperties.$cdn = 'https://sezin.ams3.digitaloceanspaces.com/'
app.config.globalProperties.$toaster = createToaster({ position: "top-right" })
app.mount('#app')
