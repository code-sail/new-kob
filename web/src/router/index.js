import { createRouter, createWebHistory } from 'vue-router'
import NotFound from "../views/error/NotFound.vue"
import PkIndexView from "../views/pk/PkIndexView.vue"
import RankListIndexView from "../views/ranklist/RankListIndexView.vue"
import RecordIndexView from "../views/record/RecordIndexView.vue"
import UserBotsIndexView from "../views/user/bots/UserBotsIndexView.vue"

const routes = [
  {
    path: "/",
    name: "home",
    redirect: "/pk/",

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
  },
  {
    path: "/record/",
    name: "record_index_view",
    component: RecordIndexView,
  },
  {
    path: "/ranklist/",
    name: "ranklist_index_view",
    component: RankListIndexView,
  },
  {
    path: "/user/bots",
    name: "user_bots_index_view",
    component: UserBotsIndexView,
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

export default router
