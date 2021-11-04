import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  scrollBehavior: () => ({ x: 0, y: 0 }),
  mode: "history",
  routes: [
    {
      path: "/",
      redirect: "dashboard",
      component: () => import("@/view/Layout/DashboardLayout"),
      children: [
        {
          name: "dashboard",
          path: "/dashboard",
          component: () => import("@/view/pages/Dashboard"),
          meta: { auth: true }
        },
        {
          name: "application",
          path: "/application/:id",
          component: () => import("@/view/pages/Application"),
          meta: { auth: true }
        }
      ]
    },
    {
      name: "login",
      path: "/login",
      component: () => import("@/view/pages/auth/Login"),
      meta: { auth: false }
    },
    {
      name: "register",
      path: "/register",
      component: () => import("@/view/pages/auth/Register"),
      meta: { auth: false }
    },
    {
      name: "password-change",
      path: "/password/change",
      component: () => import("@/view/pages/auth/ChangePassword"),
      meta: { auth: true }
    },
    {
      name: "passwordReset",
      path: "/password-reset",
      component: () => import("@/view/pages/auth/ResetPassword"),
      meta: { auth: false }
    }
  ]
});
