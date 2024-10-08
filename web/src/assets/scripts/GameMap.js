import { AcGameObject } from "./AcGameObject";
import { Snake } from "./Snake";
import { Wall } from "./Wall";



export class GameMap extends AcGameObject{
    constructor(ctx,parent){ // 画布，画布的父元素（用于修改画布的长和宽）  constructor是构造函数
        super();
        this.ctx = ctx;  // ctx 是html5中的定义的一个对象，用于存储画布的上下文信息，以便未来调用一些画画布的接口
        this.parent = parent;
        this.L = 0;// 绝对距离

        this.rows = 13;//实际游戏地图所含的单位格子的行数和列数
        this.cols = 14;

        this.inner_walls_count = 20;
        this.walls = []; // 把墙画在gamemap里，用这个数组来存

        this.snakes = [
            new Snake({id : 0, color : "#003cab", r : this.rows - 2, c : 1},this),
            new Snake({id : 1, color : "#881f1c", r : 1, c : this.cols - 2},this),
        ];

        this.eye_direction = 0; 
        if(this.id === 0) this.eye_direction = 0; //左下角的蛇初始朝上
        if(this.id === 1) this.eye_direction = 2; //右上角的蛇初始朝下

    }

    check_connective(g, sx, sy, tx, ty){ //这里用的是Flood Fill算法来保证两个起点间连通
        if((sx == tx && sy == ty))  return true;
        g[sx][sy] = true;

        let dx = [-1, 0, 1, 0], dy = [0, 1, 0, -1];
        for(let i = 0; i < 4; i ++){
            let x = sx + dx[i], y = sy + dy[i];
            if(!g[x][y] && this.check_connective(g, x, y, tx, ty))
                return true;
        }
        return false;
    }

    check_valid(cell) { //判断下一步操作是否合法
        for(const wall of this.walls) {
            if(wall.r === cell.r && wall.c === cell.c)
                return false;
        }
        for(const snake of this.snakes){
            let k = snake.cells.length;
            if(!snake.check_tail_increasing()){
                k --; // 如果蛇不变长，就可以不用判断蛇尾，因为蛇尾会向前移动
            }
            for(let i = 0; i < k; i ++){
                if(snake.cells[i].r === cell.r && snake.cells[i].c === cell.c)
                    return false;
            }
        }
        return true;
        
    }

    create_walls(){
        const g = []; //开一个bool数组来存每一个位置是否有墙
        for(let r = 0; r < this.rows; r ++){
            g[r] = [];  //，给原数组的每一行赋一个数组，这样才成了一个二维数组
            for(let c = 0; c < this.cols; c ++){
                g[r][c] = false;
            }
        }

        // 给两侧加上墙
        for(let r = 0; r < this.rows; r ++){
            g[r][0] = g[r][this.cols - 1] = true;
        }

        // 给上下加上墙
        for(let c = 0; c < this.cols; c ++){
            g[0][c] = g[this.rows - 1][c] = true;
        }

        // 创建随机障碍物
        for(let i = 0; i < this.inner_walls_count / 2; i ++){
            for(let j = 0; j < 1000; j ++){
                let r = parseInt(Math.random() * this.rows); //Math.random()返回的是一个0-1之间随机的一个浮点值
                let c = parseInt(Math.random() * this.cols);
                if(g[r][c] || g[this.rows - r - 1][this.cols - c - 1]) continue;
                if(r == this.rows - 2 && c == 1|| r == 1 && c == this.cols - 2) continue; //保证左右下角不会被覆盖

                g[r][c] = g[this.rows - r - 1][this.cols - c - 1] = true;
                break;
            }
        }

        const copy_g = JSON.parse(JSON.stringify(g)); //如何复制（避免对原对象产生修改）？ 先转换为JSON，再把JSON解析
        if(!this.check_connective(copy_g,this.rows - 2, 1, 1, this.cols - 2)) return false;

        for(let r = 0; r < this.rows; r ++){
            for(let c = 0; c < this.cols; c ++){
                if(g[r][c]){
                    this.walls.push(new Wall(r, c, this)); //用this是因为要传入一个GameMap对象，用this来指这个对象
                }
            }
        }

        return true;
    
    }
    
    add_listening_events() { // 接收由前端canvas获得到的用户输入
        this.ctx.canvas.focus();

        const [snake0, snake1] = this.snakes;
        this.ctx.canvas.addEventListener("keydown", e => {
            if(e.key === 'w') snake0.set_direction(0);
            else if(e.key ==='d') snake0.set_direction(1);
            else if(e.key === 's') snake0.set_direction(2);
            else if(e.key === 'a') snake0.set_direction(3);
            else if(e.key === 'ArrowUp') snake1.set_direction(0);
            else if(e.key === 'ArrowRight') snake1.set_direction(1);
            else if(e.key === 'ArrowDown') snake1.set_direction(2);
            else if(e.key === 'ArrowLeft') snake1.set_direction(3);
        });
    }


    start(){
        for(let i = 0; i < 1000; i ++){
            if(this.create_walls())
            break;
        }
        this.add_listening_events();

    }

    

    update_size(){
        this.L = parseInt(Math.min(this.parent.clientWidth / this.cols, this.parent.clientHeight / this.rows)); 
        // .clientWidth是求这个元素的宽度，height是高度  用parseInt将长度从原本的浮点类型转换为整像素，这样画出来的块与块之间就没有缝隙了
        this.ctx.canvas.width = this.L * this.cols;
        this.ctx.canvas.height = this.L * this.rows;
    }

    check_ready() { // 判断两条蛇是否都准备好进入下一回合
        for(const snake of this.snakes) {
            if(snake.status !== "idle") return false;
            if(snake.direction === -1) return false;
        }
        return true;
    }

    next_step() { // 让两条蛇进入下一回合
        for(const snake of this.snakes) {
            snake.next_step();
        }
    }




    update(){
        this.update_size(); //每一帧都更新下每个小真方形块的边长
        if(this.check_ready()) {
            this.next_step();
        }
        this.render();
    }

    render(){
        const color_even = "#008858";// 设置偶数块的颜色
        const color_odd = "#2ba471"; // 设置奇数块的颜色

        for(let r = 0; r < this.rows; r ++){
            for(let c = 0; c < this.cols; c ++){
                if((r + c) % 2 == 0){
                    this.ctx.fillStyle = color_even;
                } else{
                    this.ctx.fillStyle = color_odd;
                }
                this.ctx.fillRect(c * this.L, r * this.L, this.L, this.L); // canvas的坐标系很特别，横着是x，竖直是y
            }
        }
        
        
        
        
        
        // this.ctx.fillStyle = 'green';
        // this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);  // 起点坐标  要画的宽度 高度

    }
}