<template>
  <NavBar />
  <router-view> </router-view>
</template>

<script>
import NavBar from './components/NavBar.vue'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap"
//import $ from "jquery"


export default{
  components:{
    NavBar
  },
  // setup() {
  //   $.ajax({
  //     url:"http://localhost:3030/user/account/token/",
  //     type:"post",
  //     data:{
  //       username: "jmf",
  //       password: "pjmf",
  //     },
  //     success(resp) {
  //       console.log(resp);
  //     },
  //     error(resp) {
  //       console.log(resp);
  //     }

  //   });

  //   $.ajax({
  //     url: "http://localhost:3030/user/account/info/",
  //     type: "get",
  //     headers: {
  //       Authorization: "Bearer " +"eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJkZTEzMGEzNjZmMWM0NGE4YWFmZDRkMDgxNzE3NGEzMyIsInN1YiI6IjEiLCJpc3MiOiJzZyIsImlhdCI6MTcyODcxMjYxNSwiZXhwIjoxNzI5OTIyMjE1fQ.j0u9eTayeoYM7cHwSh7cG87KoDqQ2ZtaIAwldAtw1aA"
  //     },
  //     success(resp){
  //       console.log(resp);
  //     }, 
  //     error(resp){
  //       console.log(resp);
  //     }
  //   });

  //   $.ajax({
  //     url: "http://localhost:3030/user/account/register/",
  //     type: "post",
  //     data: {
  //       username: "jmf2",
  //       password: "pjmf2",
  //       confirmedpassword: "pjmf2",
  //     },
  //       success(resp){
  //         console.log(resp);
  //       },
  //       error(resp) {
  //         console.log(resp);
  //       }
  //   })

  // }
}



</script>






<style>

body {
  background-image: url("assets/images/background.png");
  background-size: cover;
 
}

</style>
