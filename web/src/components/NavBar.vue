<template>
<nav class="navbar navbar-expand-lg  navbar-dark bg-dark">
  <div class="container-fluid">
    <a class="navbar-brand" href="/">King of bot</a>

    <div class="collapse navbar-collapse" id="navbarNavDropdown">
      <ul class="navbar-nav" >
        <li class="nav-item">
          <!-- <a class="nav-link active" aria-current="page" href="/pk/">对战</a> -->
          <router-link :class="route_name == 'pk_index_view' ? 'nav-link active' : 'nav-link'" :to="{name: 'pk_index_view'}">  对战</router-link>
        </li>
        <li class="nav-item">
          <!-- <a class="nav-link" href="/record/">对局列表</a> -->
          <router-link :class="route_name == 'record_index_view' ? 'nav-link active' : 'nav-link'" :to="{name: 'record_index_view'}"> 对局列表</router-link>
        </li>
        <li class="nav-item">
          <!-- <a class="nav-link" href="/ranklist/">排行榜</a> -->
          <router-link :class="route_name == 'ranklist_index_view' ? 'nav-link active' : 'nav-link'" :to="{name : 'ranklist_index_view'}">排行榜</router-link>
        </li>
      </ul>
      <ul class="navbar-nav" v-if = "$store.state.user.is_login">
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            {{ $store.state.user.username }}
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <li>
                <router-link class="dropdown-item" :to="{name: 'user_bot_index'}">我的Bot</router-link>
            </li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="#" @click="logout">退出</a></li>
          </ul>
        </li>
      </ul>
      <ul class="navbar-nav" v-else-if="!$store.state.user.pulling_info">
        <li class="nav-item">
          <router-link class="nav-link" :to="{name: 'user_account_login' }" role="button">
            登录
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" :to="{name: 'user_account_register'}" role="button">
            注册
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</nav>

</template>

<script>
import { useRoute } from 'vue-router' //vue提供的接口（我们在这里实现点击高亮）
import { computed } from 'vue'  //实时计算
import { useStore } from 'vuex/dist/vuex.cjs.js';

export default {
  setup() {
    const store = useStore();
    const route = useRoute();
    let route_name = computed(() => route.name)

    const logout = () => {
      store.dispatch("logout");
    }

    return {
      route_name,
      logout
    }
  }
}




</script>



<style>



</style>