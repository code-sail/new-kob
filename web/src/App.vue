<template>
 <div>
    <div>Bot昵称：{{ bot_name }}</div>
    <div>Bot战力：{{ bot_rating }}</div>
 </div>

</template>

<script>
import $ from 'jquery';
import {ref} from 'vue';

export default{
  name: "App",
  setup: () => { //setup 可以理解为整个函数的主入口
    let bot_name = ref("");
    let bot_rating = ref("");

    $.ajax({
      url: "http://localhost:3030/pk/getbotinfo/",
      type: "get",
      success: resp =>{
        bot_name.value = resp.list.bot1.name;
        bot_rating.value = resp.list.bot1.rating;
      }
    })

    return {
      bot_name,
      bot_rating
    }
  }
}




</script>

<style>

body {
  background-image: url("assets/background.png");
  background-size: cover;
 
}

</style>
