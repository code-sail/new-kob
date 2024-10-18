import { createRouter, createWebHistory } from 'vue-router'
import NotFound from "../views/error/NotFound.vue"
import PkIndexView from "../views/pk/PkIndexView.vue"
import RankListIndexView from "../views/ranklist/RankListIndexView.vue"
import RecordIndexView from "../views/record/RecordIndexView.vue"
import UserBotsIndexView from "../views/user/bots/UserBotsIndexView.vue"
import UserAccountLogin from '../views/user/account/UserAccountLogin.vue'
import UserAccountRegister from '../views/user/account/UserAccountRegister.vue'
import store from '../store/index'

const routes = [
  {
    path: "/",
    name: "home",
    redirect: "/pk/",
    meta: { // 用于记录该页面是否需要授权
      requestAuth: true, // 这个meta，和requestAuth 变量名都是自己随意定义的
    }

  },
  {
    path: "/404/",
    name: "404",
    component: NotFound,
  },
  {
    path: "/pk/",
    name: "pk_index_view",
    component: PkIndexView,
    meta: { // 用于记录该页面是否需要授权
      requestAuth: true,
    }
  },
  {
    path: "/record/",
    name: "record_index_view",
    component: RecordIndexView,
    meta: { // 用于记录该页面是否需要授权
      requestAuth: true,
    }
  },
  {
    path: "/ranklist/",
    name: "ranklist_index_view",
    component: RankListIndexView,
    meta: { // 用于记录该页面是否需要授权
      requestAuth: true,
    }
  },
  {
    path: "/user/bots/",
    name: "user_bots_index_view",
    component: UserBotsIndexView,
    meta: { // 用于记录该页面是否需要授权
      requestAuth: true,
    }
  },
  {
    path: "/user/account/login/",
    name: "user_account_login",
    component: UserAccountLogin
  },
  {
    path: "/user/account/register/",
    name: "user_account_register",
    component: UserAccountRegister
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/404/",
  }


  
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

//在执行以下需要授权的每一个页面之前，先判断用户有没有登录，如果没有，重定向到登录页面
router.beforeEach((to, from, next) => { // to表示要访问哪个页面，from表示由哪个页面跳转过来
  if(to.meta.requestAuth && !store.state.user.is_login) {
    next({name: "user_account_login"});
  } else {
    next();
  }
})

export default router
