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
        var first = resp[1];
        bot_name.value = first.name;
        bot_rating.value = first.rating;
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
