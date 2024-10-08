export class Cell {
    constructor(r,c){
        this.r = r;
        this.c = c;
        this.x = c + 0.5; //只是坐标，后面会乘L
        this.y = r + 0.5;
    }
}