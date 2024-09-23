const AC_GAME_OBJECT = [];

export class AcGameObject {
    constructor(){
        AC_GAME_OBJECT.push(this);
        this.timedelta = 0;  // 每一帧之间的时间差
        this.has_called_start = false;
    }

    start(){ // 只执行一次

    }
    
    update(){ // 除了第一帧，每一帧都执行一次
    
    }
    
    on_destroy(){ // 删除之前执行
    
    }
    
    destroy(){
        this.on_destroy();
    
        for(let i in AC_GAME_OBJECT){ // 在js中，用of遍历的是值，用in 遍历的是下标
            const obj = AC_GAME_OBJECT[i];
            if(obj == this){
                AC_GAME_OBJECT.splice(i);
                break;
            }
        }
    }
}



let last_timestamp; // 上次执行的时刻
const step = timestamp => {
    for(let obj of AC_GAME_OBJECT){
        if(!obj.has_called_start){
            obj.has_called_start = true;
            obj.start();
        }else{
            obj.timedelta = timestamp - last_timestamp; //当前时刻减去上次执行时刻
            obj.update();
        }
    }

    last_timestamp = timestamp;
    requestAnimationFrame(step)
}

requestAnimationFrame(step) //在下一帧执行一次step函数
//  requestAnimationFrame 会提供一个参数timestamp，为当前时间戳

