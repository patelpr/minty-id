import Vue from "vue";
import VueRouter from "vue-router";
import Website from "../views/Website.vue";
import User from "../views/User.vue";
// import firebase from "firebase";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Website,
    meta: {
      guest: true,
    },
  },
  {
    path: "/:id",
    name: "User",
    component: User,
  },
];

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes,
});
// router.beforeEach((to, from, next) => {
//   if (to.matched.some((record) => record.meta.auth)) {
//     firebase.auth().onAuthStateChanged((user) => {
//       if (user) {
//         next();
//       } else {
//         next({
//           path: "/",
//         });
//       }
//     });
//   } else if (to.matched.some((record) => record.meta.guest)) {
//     firebase.auth().onAuthStateChanged((user) => {
//       if (user) {
//         next({
//           path: "/profile",
//         });
//       } else {
//         next();
//       }
//     });
//   } else {
//     next();
//   }
// });

export default router;
