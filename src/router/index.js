import Vue from "vue";
import VueRouter from "vue-router";
import Website from "../views/Website.vue";
import User from "../views/User.vue";
import Profile from "../views/Profile.vue";
import firebase from "firebase";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Website,
  },
  {
    path: "/:id",
    name: "User",
    component: User,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: {
      auth: true,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.auth)) {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        next();
      } else {
        next({
          path: "/",
        });
      }
    });
  } else {
    next();
  }
});
export default router;
