import { AcGameObject } from "./AcGameObject";
import { Wall } from "./Wall";



export class GameMap extends AcGameObject{
    constructor(ctx,parent){ // 画布，画布的父元素（用于修改画布的长和宽）  constructor是构造函数
        super();
        this.ctx = ctx;  // ctx 是html5中的定义的一个对象，用于存储画布的上下文信息，以便未来调用一些画画布的接口
        this.parent = parent;
        this.L = 0;// 绝对距离

        this.rows = 13;//实际游戏地图所含的单位格子的行数和列数
        this.cols = 13;

        this.inner_walls_count = 20;
        this.walls = []; // 把墙画在gamemap里，用这个数组来存
    }

    check_conective(g, sx, sy, tx, ty){ //这里用的是Flood Fill算法来保证两个起点间连通
        if((sx == tx && sy == ty))  return true;
        g[sx][sy] = true;

        let dx = [-1, 0, 1, 0], dy = [0, 1, 0, -1];
        for(let i = 0; i < 4; i ++){
            let x = sx + dx[i], y = sy + dy[i];
            if(!g[x][y] && this.check_conective(g, x, y, tx, ty))
                return true;
        }
        return false;
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
        if(!this.check_conective(copy_g,this.rows - 2, 1, 1, this.cols - 2)) return false;

        for(let r = 0; r < this.rows; r ++){
            for(let c = 0; c < this.cols; c ++){
                if(g[r][c]){
                    this.walls.push(new Wall(r, c, this)); //用this是因为要传入一个GameMap对象，用this来指这个对象
                }
            }
        }

        return true;
    
    }
    
    
    start(){
      for(let i = 0; i < 1000; i ++){
        if(this.create_walls())
            break;
      }
    }

    

    update_size(){
        this.L = parseInt(Math.min(this.parent.clientWidth / this.cols, this.parent.clientHeight / this.rows)); 
        // .clientWidth是求这个元素的宽度，height是高度  用parseInt将长度从原本的浮点类型转换为整像素，这样画出来的块与块之间就没有缝隙了
        this.ctx.canvas.width = this.L * this.cols;
        this.ctx.canvas.height = this.L * this.rows;
    }

    update(){
        this.update_size(); //每一帧都更新下每个小真方形块的边长
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