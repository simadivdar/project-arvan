import { createRouter, createWebHashHistory } from "vue-router";
import { checkAuth } from "@/services/Authservice.js";
import Login from "./pages/login.vue";
import Welcome from "./pages/welcome.vue";
import Register from "./pages/register.vue";
import Articels from "./pages/articels/dashboard.vue";
import Posts from "./pages/articels/show/allPosts.vue";
import EditPosts from "./pages/articels/create & edit/editPost.vue";
import CreateArticels from "./pages/articels/create & edit/createPost.vue";
import MyArticels from "./pages/articels/show/myPosts.vue";
import PagesPosts from "./pages/articels/show/pagingPosts.vue";
import NotFound from "@/components/notFound.vue";
const isGuest = (to, from, next) => {
  const userisAuthenticated = checkAuth();

  if (userisAuthenticated) {
    next("/articels");
    return;
  }
  next();
};
const isAuthenticated = (to, from, next) => {
  const userisAuthenticated = checkAuth();
  if (!userisAuthenticated) {
    next("/login");
    return;
  }
  next();
};
const routes = [
  { path: "/", name: "Welcome-", component: Welcome, beforeEnter: isGuest },
  { path: "/login", name: "login-", component: Login, beforeEnter: isGuest },
  {
    path: "/register",
    name: "register-",
    component: Register,
    beforeEnter: isGuest,
  },
  {
    path: "/articels",
    name: "articels-",
    component: Articels,
    beforeEnter: isAuthenticated,
    children: [
      {
        path: "",
        name: "posts-",
        component: Posts,
        beforeEnter: isAuthenticated,
      },
      {
        path: "edit/:slug",
        name: "EditPost-",
        component: EditPosts,
        beforeEnter: isAuthenticated,
      },
      {
        path: "create",
        name: "CreateArticels-",
        component: CreateArticels,
        beforeEnter: isAuthenticated,
      },
      {
        path: "myArticels",
        name: "MyArticels-",
        component: MyArticels,
        beforeEnter: isAuthenticated,
      },
      {
        path: "pages/:page",
        name: "PagesPosts-",
        component: PagesPosts,
        beforeEnter: isAuthenticated,
      },
    ],
  },
  { path: "/:pathMatch(.*)*", name: " NotFound-", component: NotFound },
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
export default router;
