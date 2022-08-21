import Main from "./pages/MainPage";
import NotFound from "./pages/NotFoundPage";

const routes = [
  {
    path: "/",
    name: "mainpage",
    component: Main,
  },
  {
    path: "/register",
    name: "register",
    component: () => import("./pages/RegisterPage"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("./pages/LoginPage"),
  },
  {
    path: "/search",
    name: "search",
    component: () => import("./pages/SearchPage"),
  },
  {
    path: "/recipe/:recipeId",
    name: "recipe",
    component: () => import("./pages/RecipeViewPage"),
  },
  {
    path: "/user/myrecepies",
    name: "userrecepies",
    component: () => import("./pages/UserRecepiesPage"),
  },

  {
    path: "/user/familyrecepies",
    name: "familyrecepies",
    component: () => import("./pages/FamilyRecepiesPage"),
  },
  {
    path: "/user/favorites",
    name: "favoritesrecepies",
    component: () => import("./pages/FavoritesRecepiesPage"),
  },
  {
    path: "/about",
    name: "about",
    component: () => import("./pages/AboutPage"),
  },
  {
    path: "*",
    name: "notFound",
    component: NotFound,
  },
];

export default routes;
