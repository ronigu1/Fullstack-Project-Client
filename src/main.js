import Vue from "vue";
import App from "./App.vue";
import VueAxios from "vue-axios";
import axios from "axios";

import routes from "./routes";
import VueRouter from "vue-router";
Vue.use(VueRouter);
const router = new VueRouter({
  routes,
});

import Vuelidate from "vuelidate";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import {
  FormGroupPlugin,
  FormPlugin,
  FormInputPlugin,
  ButtonPlugin,
  CardPlugin,
  NavbarPlugin,
  FormSelectPlugin,
  AlertPlugin,
  ToastPlugin,
  LayoutPlugin,
} from "bootstrap-vue";
[
  FormGroupPlugin,
  FormPlugin,
  FormInputPlugin,
  ButtonPlugin,
  CardPlugin,
  NavbarPlugin,
  FormSelectPlugin,
  AlertPlugin,
  ToastPlugin,
  LayoutPlugin,
].forEach((x) => Vue.use(x));
Vue.use(Vuelidate);

axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    return response;
  },
  function(error) {
    // Do something with response error
    return Promise.reject(error);
  }
);
Vue.use(VueAxios, axios);

Vue.config.productionTip = false;

const apiInstance = axios.create({
  withCredentials: true,
  baseURL: "http://localhost:3000"
})

const shared_data = {
  server_domain: "http://localhost:3000",
  username: undefined,
  watchedRecipes: [],
  login(username) {
    this.watchedRecipes = [];
    localStorage.setItem("username", username);
    this.username = username;
    console.log("login", this.username);
    console.log("login localStorage", localStorage.username);
    console.log("localStorage", localStorage);


  },
  setWatchedRecipes(recipes){
    this.watchedRecipes.push(...recipes)
  },
  updateWatchedRecipes(recepie){
    if(this.watchedRecipes)
      this.watchedRecipes.shift();
      this.watchedRecipes.push(recepie);
  },
  getWatchedRecipesIds(){
    let watchedRecipesIds = [];
    this.watchedRecipes.map((recepie)=> {
      watchedRecipesIds.push((recepie.id).toString())
    });
    return watchedRecipesIds;
  },
  logout() {
    console.log("logout");
    localStorage.setItem("username", undefined);
    this.username = undefined;
    localStorage.setItem("watchedRecipes", null);
    localStorage.setItem("lastestSearch", null);
    localStorage.setItem("lastestDietFilter", null);
    localStorage.setItem("lastestCuisineFilter", null);
    localStorage.setItem("lastestIntoleranceFilter", null);
    localStorage.setItem("lastRecipesRestore", null);
  },
};
console.log("shared_data:",shared_data);
// Vue.prototype.$root.store = shared_data;

new Vue({
  router,
  data() {
    return {
      store: shared_data,
      apiRequest: apiInstance
    };
  },
  methods: {
    toast(title, content, variant = null, append = false) {
      this.$bvToast.toast(`${content}`, {
        title: `${title}`,
        toaster: "b-toaster-top-center",
        variant: variant,
        solid: true,
        appendToast: append,
        autoHideDelay: 3000,
      });
    },
  },
  render: (h) => h(App),
}).$mount("#app");
