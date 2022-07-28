function getRandom(min,max){
    return Math.floor(Math.random()*(max-min+1))+min;
};
    let backGDCube = []
    const CUBE_UNIT = 30;
    const START_Y = 300;
    const START_X = 500;
    const TERST_DOWN = 0;
    const TERST_RIGHT = 1;
    const TERST_LEFT = 2;
    const TERST_ROTATE = 3;
    const SHAPE_Z = 0;
    const SHAPE_O = 1;
   
class Context{
    constructor(){
        this.state = undefined;
    }
    setState(Istate){
        this.state = Istate; 
    }
    getState(){
        return this.state;
    } 
}
class State{
    constructor(Icontext, callBack){
        this.context = Icontext;
        this.callBack = callBack;
    }
    action(){
        this.context.setState(this);
        if (this.callBack)
            return this.callBack();
        else
            return false;
    }
    toString(){
    }
}
class Idle extends State{
    constructor(Icontext, callBack){
        super(Icontext, callBack);
    }
    action(){
        super.action();
    }
}
class Down extends State{
    constructor(Icontext, callBack, Idle){
        super(Icontext, callBack);
        this.idle = Idle;
    }
    action(){
        if (this.context.getState() == this.idle)
            return;
        if (!super.action()){
            this.idle.action();
            this.context.setState(undefined);
        }
    }
}
class Right extends State{
    constructor(Icontext, callBack, Idle){
        super(Icontext, callBack);
        this.idle = Idle;
    }
    action(){
        if (this.context.getState() == this.idle)
            return;
        super.action();
    }
}
class Rotate extends State{
    constructor(Icontext, callBack, Idle){
        super(Icontext, callBack);
        this.idle = Idle;
    }
    action(){
        if (this.context.getState() == this.idle)
            return;
        super.action();
    }
}
class Left extends State{
    constructor(Icontext, callBack, Idle){
        super(Icontext, callBack);
        this.idle = Idle;
    }
    action(){
        if (this.context.getState() == this.idle)
            return;
        super.action();
    }
}
class cube{
    constructor(x, y, color, idle){
        this.used = false;
        this.x = x;
        this.y = y;
        this.initCube(x, y, color);
    } 
    initCube(x, y, color){
        let idx = y*10+x;
        $('#t').append('<div id=cube'+ idx +' class="'+color+'"></div>');
        let _top = START_Y+(y*CUBE_UNIT);
        let _left = START_X+(x*CUBE_UNIT);
        $('#cube'+ idx).offset({top:_top, left:_left});
    }
    setPos(idx, x, y){
        let _top = START_Y+(y*CUBE_UNIT);
        let _left = START_X+(x*CUBE_UNIT);
        this.x = x;
        this.y = y;
        $('#terist'+ idx).offset({top:_top, left:_left});
    }
    down(idx) {
        this.y++;
        let _top = START_Y+(this.y*CUBE_UNIT);
        let _left = START_X+(this.x*CUBE_UNIT);
        $('#terist'+idx).offset({top:_top, left:_left});
    }
    right(idx) {
        this.x++;
        let _top = START_Y+(this.y*CUBE_UNIT);
        let _left = START_X+(this.x*CUBE_UNIT);
        $('#terist'+idx).offset({top:_top, left:_left});
    }
    left(idx){
        this.x--;
        let _top = START_Y+(this.y*CUBE_UNIT);
        let _left = START_X+(this.x*CUBE_UNIT);
        $('#terist'+idx).offset({top:_top, left:_left});
    }
    rotate(idx, pos, modifyX, modifyY){
        this.y += pos[1]+modifyY;
        this.x += pos[0]+modifyX;
        let _top = START_Y+(this.y*CUBE_UNIT);
        let _left = START_X+(this.x*CUBE_UNIT);
        $('#terist'+idx).offset({top:_top, left:_left});
    }
}
class terist{
    constructor(){
        this.backGDCube = [];
        for(let i = 0; i < 20; i++){
            let tmp = [];
            for(let j = 0; j < 10; j++){
                tmp.push(new cube(j, i, "box"));
            }
            this.backGDCube.push(tmp);
        }
        this.z1 = [
            [[-1,1],[0,0],[1,1], [2,0]],
            [[1,-1],[0,0],[-1,-1],[-2,0]]
        ];
        this.z2 = [
            [[1,1],[0,0],[-1,1], [-2,0]],
            [[-1,-1],[0,0],[1,-1],[2,0]]
        ];
        this.I = [
            [[1,-1],[0,0],[-1,1],[-2,2]],
            [[-1,1],[0,0],[1,-1],[2,-2]]
        ];
        this.L1 = [
            [[1,-1],[0,0],[-1,1],[0,2]],
            [[1,1],[0,0],[-1,-1],[-2,0]],
            [[-1,1],[0,0],[1,-1],[0,-2]],
            [[-1,-1],[0,0],[1,1],[2,0]]
        ];
        this.shapes = [
            this.z1,
            this.z2,
            false,
            this.I,
            this.L1
        ]; 
        this.shapeIdx = 4//getRandom(0,2);
        this.originShapes=[
            [[-1,0],[0,0],[0,1],[1,1]],
            [[1,0],[0,0],[0,1],[-1,1]],
            [[-1,0],[0,0],[-1,1],[0,1]],
            [[0,-1],[0,0],[0,1],[0,2]],
            [[0,-1],[0,0],[0,1],[1,1]]
        ];
        this.rotateIdx = 0;
        let tmp = this.originShapes[this.shapeIdx];
        this.cubes =[];
        for(let i=0; i< 4; i++){
            let _cube1 = new cube(4+tmp[i][0],-2+tmp[i][1], "box2");
            $('#t div').eq(-1).attr('id', "terist"+(i+1));
            this.cubes.push(_cube1);
        }
    }
    reborn(){
        this.checkDelete();
        a = 1;
        this.shapeIdx = getRandom(0, this.shapes.length);
        this.rotateIdx = 0;
        let tmp = this.originShapes[this.shapeIdx];
        for(let i=0; i< 4; i++){
            let y = this.cubes[i].y;
            let x = this.cubes[i].x;
            let idx = y*10+x;
            this.backGDCube[y][x].used = true;
            $('#cube'+idx).attr('class', 'box2');
            this.cubes[i].setPos(i+1, 4+tmp[i][0], -4+tmp[i][1]);
        }
    }
    checkDelete(){
        for(let i =0; i< this.cubes.length; i++){
            console.log('x:'+ this.cubes[i].x + ", y:"+this.cubes[i].y);
        }
    }
    check(direct ){
        this.modifyX = 0;
        this.modifyY = 0;
        switch (direct){
            case TERST_DOWN:
                for(let i=0; i< this.cubes.length;i++){
                    let x = this.cubes[i].x;
                    let y = this.cubes[i].y;
                    if (y + 1 >= 20 || ( y >=0 && this.backGDCube[y+1][x].used))
                       return false;
                }
                break;
            case TERST_RIGHT:
                for(let i=0; i< this.cubes.length;i++){
                    let x = this.cubes[i].x;
                    let y = this.cubes[i].y;
                    if (x + 1 >= 10 || ( y >=0 && this.backGDCube[y][x+1].used))
                        return false;
                }
                break;
            case TERST_LEFT:
                for(let i=0; i< this.cubes.length;i++){
                    let x = this.cubes[i].x;
                    let y = this.cubes[i].y;
                    if (x - 1 < 0 || ( y >=0 && this.backGDCube[y][x-1].used))
                        return false;
                }
                break;
            case TERST_ROTATE:
                let tmpX = 0;
                let tmpY = 0;
                for(let i= 0;i < this.cubes.length; i++){
                    let idx = this.rotateIdx+1;
                    if (idx >= this.shapes[this.shapeIdx].length)
                        idx = 0;
                    let newX = this.shapes[this.shapeIdx][idx][i][0] + 
                        this.cubes[i].x;
                    let newY = this.shapes[this.shapeIdx][idx][i][1] + 
                        this.cubes[i].y;
                    if (this.backGDCube[newY][newX].used)
                        return false;
                    else if (newX > 9)
                        tmpX = Math.max(newX, tmpX)  
                    else if(newX < 0)
                        tmpX = Math.min(newX, tmpX)  
                    else if (newY > 19)
                        tmpY = Math.max(newY, tmpY)
                }
                this.modifyY = tmpY > 19 ? 19-tmpY: tmpY;
                this.modifyX = tmpX > 9 ? 9-tmpX : 0-tmpX; 
                return true;
        }
       
        return true
    }

    down(){
        if (!this.check(TERST_DOWN))
            return false;
        for(let i= 0;i < this.cubes.length; i++)
            this.cubes[i].down(i+1);
        return true;
    }
    right(){
        if (!this.check(TERST_RIGHT))
            return;
        for(let i= 0;i < this.cubes.length; i++){
            this.cubes[i].right(i+1);
        }
    }
    left(){
        if (!this.check(TERST_LEFT))
            return
        for(let i= 0;i < this.cubes.length; i++){
            this.cubes[i].left(i+1);
        }
    }
    rotate(){
        if(!this.shapes[this.shapeIdx])
            return;
        if (!this.check(TERST_ROTATE))
            return;
            
        this.rotateIdx++;
        if (this.rotateIdx >= this.shapes[this.shapeIdx].length)
            this.rotateIdx = 0;
        for(let i= 0;i < this.cubes.length; i++){
            this.cubes[i].rotate(i+1, 
                this.shapes[this.shapeIdx][this.rotateIdx][i], this.modifyX, this.modifyY);
        }
    }
}

