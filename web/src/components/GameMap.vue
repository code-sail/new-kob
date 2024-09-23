<template> 
    <div  ref="parent" class="gamemap">
        <canvas ref="canvas" > </canvas>
    </div>

</template>

<script>
import { GameMap } from '../assets/scripts/GameMap';
import { ref } from 'vue'  // vue 里定义变量一定要用 ref
import { onMounted } from 'vue'

export default {
    setup() {
        let parent = ref(null); // ref 可以简单类比成一个指针，指向一个元素，当其的值发生变化时，ref返回的值也会发生变化
        let canvas = ref(null);
        
        onMounted(() => { // 在组件挂载之后执行
            new GameMap(canvas.value.getContext('2d'), parent.value)
        });
        
        
        
        return {
            parent,
            canvas
        }
    }
}


</script>

<style scoped>

div.gamemap {
    width: 100%; /* 跟他的父元素长宽一样 */
    height: 100%;
    display: flex;  /*将它定义为一个弹性元素，才能用下面两种对齐方式 */   /*magin 实现水平居中容易，实现竖直居中不易，所以这里用flex*/
    justify-content: center; /*水平居中 */
    align-items: center; /* 竖直居中 */
}
</style>