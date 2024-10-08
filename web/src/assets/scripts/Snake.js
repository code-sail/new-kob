import { AcGameObject } from "./AcGameObject";
import { Cell } from "./Cell";

export class Snake extends AcGameObject{
    constructor(info, gamemap){
        super();

        this.id = info.id;
        this.color = info.color;
        this.gamemap = gamemap;

        this.cells = [new Cell(info.r, info.c)];  // 存放蛇的身体 cell[0] 存放蛇头
        this.next_cell = null; // 下一步的目标位置

        this.speed = 5;  // 每秒移动五格
        this.direction = -1; // -1 表示没有指令，0、1、2、3表示上右下左
        this.status = "idle"; // idle表示静止，move表示正在移动，die表示死亡

        this.dr = [-1, 0, 1, 0];  //上右下左四个方向的偏移量
        this.dc = [0, 1, 0, -1];

        this.step = 0;  //记录回合数
        this.eps = 1e-2; // 相差的误差

        this.eye_direction = 0; 
        if(this.id === 0) this.eye_direction = 0; //左下角的蛇初始朝上
        if(this.id === 1) this.eye_direction = 2; //右上角的蛇初始朝下

        this.eye_dx = [ // 蛇眼睛不同方向的x偏移量
            [-1, 1],
            [1, 1],
            [1, -1],
            [-1, -1],

        ];

        this.eye_dy = [ // y偏移量
            [-1, -1],
            [-1, 1],
            [1, 1],
            [-1, 1],
        ];
    }

    start() {

    }
    set_direction(d) {
        this.direction = d;
    }

    check_tail_increasing() {// 检测当前回合，蛇的长度是否增加
        if(this.step <= 10) return true; //前10回合都增加长度
        if(this.step % 3 === 1) return true; // 之后每三回合增加一次长度
        return false;
    }

    next_step() {  //将蛇的状态变为走下一步
        const d = this.direction;

        this.eye_direction = d;

        this.next_cell = new Cell(this.cells[0].r + this.dr[d], this.cells[0].c + this.dc[d]);
        this.direction = -1; // 清空做过的操作
        this.status = "move";
        this.step ++;

        const k = this.cells.length;
        for(let i = k; i > 0; i --){
            this.cells[i] = JSON.parse(JSON.stringify(this.cells[i - 1])); // 复制一个，不复制则是传的引用，可能会相互干扰
        } 

        if(!this.gamemap.check_valid(this.next_cell)){  // 下一步操作非法
            this.status = "die";
        }

    }

    update_move() { // 实现蛇的移动
        
        const dx = this.next_cell.x - this.cells[0].x;
        const dy = this.next_cell.y - this.cells[0].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if(distance < this.eps) { // 走完了，就停下来
            this.cells[0] = this.next_cell; // 将目标点作为我们新的头部（添加一个新蛇头）
            this.next_cell = null;
            this.status = "idle";

            if(!this.check_tail_increasing()) { // 不变长的话就把蛇尾删掉
                this.cells.pop();
            }
        } else { // 没走完，接着走
            const move_distance = this.speed * this.timedelta / 1000;// 每两帧之间走的距离   因为timedelta的单位是毫秒，所以除1000转化成秒 
            this.cells[0].x += move_distance * dx / distance;
            this.cells[0].y += move_distance * dy / distance;

            if(!this.check_tail_increasing()) {
                const k = this.cells.length;
                const tail = this.cells[k - 1], tail_target = this.cells[k - 2];
                const dx = tail_target.x - tail.x;
                const dy = tail_target.y - tail.y;
                tail.x += move_distance * dx / distance;
                tail.y += move_distance * dy / distance;
            }
        }
        
    }

    update() { // 每一帧执行一次
        if(this.status === 'move'){
            this.update_move();
        }
        this.render();
        
    }

    render() {
        const L = this.gamemap.L;
        const ctx = this.gamemap.ctx;

        ctx.fillStyle = this.color;

        if(this.status === "die")
            ctx.fillStyle = "white";

        for(const cell of this.cells) {
            ctx.beginPath(); //画一个圆
            ctx.arc(cell.x * L, cell.y * L, L / 2 * 0.9, 0, Math.PI * 2); // 圆的原点坐标， 半径，起始角度，终止角度
            ctx.fill();
        }

       for(let i = 1; i < this.cells.length; i ++){
        const a = this.cells[i], b = this.cells[i - 1];
        if(Math.abs(a.x - b.x) < this.eps && Math.abs(a.y - b.y) < this.eps)
            continue;
        if(Math.abs(a.x - b.x) < this.eps){
            ctx.fillRect((a.x - 0.5 + 0.05) * L, Math.min(a.y, b.y) * L, L * 0.9, L * 0.9);
        } else {
            ctx.fillRect(Math.min(a.x, b.x) * L, (a.y - 0.5 + 0.05) * L, L * 0.9, L * 0.9);
        }
       }

       ctx.fillStyle = "black";
       for(let i = 0; i < 2; i ++){
        const eye_x = (this.cells[0].x + this.eye_dx[this.eye_direction][i] * 0.2) * L;
        const eye_y = (this.cells[0].y + this.eye_dy[this.eye_direction][i] * 0.2) * L;
        console.log(eye_x,eye_y); // 调试
        ctx.beginPath();
        ctx.arc(eye_x, eye_y, L * 0.06, 0, Math.PI * 2 );
        ctx.fill();
       }
    }
}