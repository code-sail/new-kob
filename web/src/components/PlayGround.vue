<template>
    <div class = "PlayGround">
        <GameMap />
    </div>
</template>

<script>
import GameMap from './GameMap.vue'

export default{
    components: {
        GameMap,
    }
}



</script>

<style scoped>
    div.PlayGround{
        width : 60vw;
        height : 70vh;
        /* background : lightblue; */
        margin : 40px auto; /* 底部和顶部的外边距 左右两边的外边距 */
    }

</style>