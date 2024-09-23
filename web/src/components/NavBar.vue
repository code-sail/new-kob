<template>
<nav class="navbar navbar-expand-lg  navbar-dark bg-dark">
  <div class="container-fluid">
    <a class="navbar-brand" href="/">King of bot</a>

    <div class="collapse navbar-collapse" id="navbarNavDropdown">
      <ul class="navbar-nav">
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
        <li class="nav-item dropdown ">
          <a class="nav-link dropdown-toggle " href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            jmf
          </a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="/user/bots">我的bot</a></li>
            <li><a class="dropdown-item" href="#">Another action</a></li>
            <li><a class="dropdown-item" href="#">登出账号</a></li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</nav>
</template>

<script>
import { useRoute } from 'vue-router' //vue提供的接口（我们在这里实现点击高亮）
import { computed } from 'vue'  //实时计算

export default {
  setup() {
    const route  = useRoute();
    let route_name = computed(() => route.name)
    return {
      route_name
    }
  }
}




</script>



<style>



</style>