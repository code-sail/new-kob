import { createRouter, createWebHistory } from 'vue-router'
import NotFound from "../views/error/NotFound.vue"
import PkLinstIndexView from "../views/pk/PkIndexView.vue"
import RankListIndexView from "../views/ranklist/RankListIndexView.vue"
import RecordIndexView from "../views/record/RecordIndexView.vue"
import UserBotsIndexView from "../views/user/bots/UserBotsIndexView.vue"

const routes = [
  {
    path: "",
    name: "404",
    componet: NotFound,
  },

  
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
