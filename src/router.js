import Vue from "vue";
import Router from "vue-router";
import nProgress from "nprogress";
import findLast from 'lodash/findLast';
import { notification } from 'ant-design-vue';
import "nprogress/nprogress.css";
import notFound from "./views/404.vue";
import forBidden from "./views/403.vue";
import { check, isLogin } from './utils/auth'
// import renderRouterView from "./components/renderRouterView.vue"; // 用来渲染 /user/.... 这里组件得


Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/user",
      hideInMenu: true,
      // component: { render: h => h("router-view") }, // 这是使用render函数得 方法 来渲染 /user 下面得 子组件
      component: () => 
        import(/* webpackChunkName: "layout" */ "./layouts/userLayout.vue"),
      children: [
        {
          path: "/user",
          redirect: "/user/login"
        },
        {
          path: "/user/login",
          name: "login",
          component: () => 
            import(/* webpackChunkName: "user" */ "./views/user/login.vue")
        },
        {
          path: "/user/register",
          name: "register",
          component: () => 
            import(/* webpackChunkName: "user" */ "./views/user/register.vue")
        }
      ]
    },
    {
      path: "/",
      meta: { authority: ["user", "admin"] },
      component: () => 
        import(/* webpackChunkName: "layout" */ "./layouts/basicLayout.vue"),
      children: [
        // dashboard
        {
          path: "/",
          redirect: "/dashboard/analysis"
        },
        {
          path: "/dashboard",
          name: "dashboard",
          meta: { icon: "dashboard", title: "仪表盘" },
          component: { render: h => h("router-view") },
          children: [
            {
              path: "/dashboard/analysis",
              name: "analysis",
              meta: { title: "分析页"},
              component: () => 
                import(/* webpackChunkName: "dashboard" */ "./views/dashBoard/analysis")
            }
          ]
        },
        // form
        {
          path: "/form",
          name: "form",
          meta: { icon: "form", title: "表单", authority: ["admin"] },
          component: { render: h => h("router-view") },
          children: [
            {
              path: "/form/basic-form",
              name: "basicform",
              meta: { title: "基础表单"},
              component: () => 
                import(/* webpackChunkName: "form" */ "./views/forms/basicForm")
            },
            {
              path: "/form/step-form",
              name: "stepform",
              hideChildrenInMenu: true,
              meta: { title: "分布表单"},
              component: () => 
                import(/* webpackChunkName: "form" */ "./views/forms/stepForm"),
              children: [
                {
                  path: "/form/step-form",
                  redirect: "/form/step-form/info"
                },
                {
                  path: "/form/step-form/info",
                  name: "info",
                  component: () => 
                    import(/* webpackChunkName: "form" */ "./views/forms/stepForm/step1")
                },
                {
                  path: "/form/step-form/confirm",
                  name: "confirm",
                  component: () => 
                    import(/* webpackChunkName: "form" */ "./views/forms/stepForm/step2")
                },
                {
                  path: "/form/step-form/result",
                  name: "result",
                  component: () => 
                    import(/* webpackChunkName: "form" */ "./views/forms/stepForm/step3")
                }
              ]
            }
          ]
        }
      ]
    },
    {
      path: "/403",
      name: "403",
      hideInMenu: true,
      component: forBidden
    },
    {
      path: "*",
      name: "404",
      hideInMenu: true,
      component: notFound
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.path !== from.path) {
    nProgress.start();
  }
  const record = findLast(to.matched, record => record.meta.authority)
  if (record && !check(record.meta.authority)) {
    if (!isLogin() && to.path !== "/user/login") {
      next({
        path: "/user/login"
      });
    } else if (to.path !== '/403') {
      notification.error({
        message: "403",
        description: "你没有权限访问，请联系管理员咨询。"
      })
      next({
        path: "/403"
      })
    }
    nProgress.done();
  }
  next();
})
router.afterEach(() => {
  nProgress.done();
})

export default router