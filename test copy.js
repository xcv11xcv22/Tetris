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
   
class state{
    constructor(){

    }
    action(){
        this.setState();
    }
    setState(){
        this.state = this;
        console.log(this.constructor.name)
    }
    toString(){

    }
}
class idle extends state{
    action(){
        super.action();
    }
}
class down extends state{
    constructor(){
        super();
        this.callBack = undefined;
    }
    action(){

        super.action();
        this.callBack();
    }
}
class right extends state{
    constructor(){
        super();
        this.callBack = undefined;
    }
    action(){

        super.action();
        this.callBack();
    }
}
class rotate extends state{
    constructor(){
        super();
        this.callBack = undefined;
    }
    action(){

        super.action();
        this.callBack();
    }
}
class left extends state{
    constructor(){
        super();
        this.callBack = undefined;
    }
    action(){

        super.action();
        this.callBack();
    }
}
class cubeState{


}
class cube{
    constructor(x, y, color, idle){
        this.uesd = false;
        this.x = x;
        this.y = y;
        
        this.dom = this.initCube(x, y, color);
    } 


    initCube(x, y, color){
        let idx = y*10+x;
        let div = $('#t').append('<div id=cube'+ idx +' class="'+color+'"></div>');
        let _top = START_Y+(y*CUBE_UNIT);
        let _left = START_X+(x*CUBE_UNIT);
        $('#cube'+ idx).offset({top:_top, left:_left});
        return div
    }
  
    down(idx) {
        this.y++;
        let _top = START_Y+(this.y*CUBE_UNIT);
        let _left = START_X+(this.x*CUBE_UNIT);
        $('#terist'+idx).offset({top:_top, left:_left});
        
    }
    right(idx) {
        let _top = START_Y+(this.y*CUBE_UNIT);
        let _left = START_X+(this.x*CUBE_UNIT);
        $('#terist'+idx).offset({top:_top, left:_left});
        this.x++;
    }
    left(idx){
        let _top = START_Y+(this.y*CUBE_UNIT);
        let _left = START_X+(this.x*CUBE_UNIT);
        $('#terist'+idx).offset({top:_top, left:_left});
        this.x--;
    }
    rotate(idx, pos){
        this.y += pos[1];
        this.x += pos[0];
        let _top = START_Y+(this.y*CUBE_UNIT);
        let _left = START_X+(this.x*CUBE_UNIT);
        $('#terist'+idx).offset({top:_top, left:_left});
    }
}
class terist{
    constructor(Iidle, Idown, Iright, Ileft, Irotate){
        this.z = [
        [[-1,1],[0,0],[1,1], [2,0]],
        [[1,-1],[0,0],[-1,-1],[-2,0]]
        ];
        this.shapeIdx = getRandom(0,1);
        this.originShapes=[
            [[-1,0],[0,0],[0,1],[1,1]],
            [[-1,0],[0,0],[-1,1],[0,1]]

        ];
        this.stateRotate = Irotate;
        this.rotateIdx = 0;
        
        this.stateIdle = Iidle;
        this.stateRight = Iright;
        this.stateDown = Idown;
        this.stateLeft = Ileft;
        this.currentState = Idown;
        this.stateRight.callBack = $.proxy(this.right, this);
        this.stateDown.callBack = $.proxy(this.down, this);
        this.stateLeft.callBack = $.proxy(this.left, this);
        this.stateRotate.callBack = $.proxy(this.rotate, this);
        let t = $('#t div');
        let tmp = this.originShapes[this.shapeIdx];
        this.cubes =[];
        for(let i=0; i< 4; i++){
            let _cube1 = new cube(1+tmp[i][0],1+tmp[i][1], "box2");
            $('#t div').eq(-1).attr('id', "terist"+(i+1)+"");
            this.cubes.push(_cube1);
        }
       
      
    }
    check(direct){
        switch (direct){
            case TERST_DOWN:
                for(let i=0; i< this.cubes.length;i++){
                    if (this.cubes[i].y + 1 > 20)
                        return false;
                }
                break;
            case TERST_RIGHT:
                for(let i=0; i< this.cubes.length;i++){
                        if (this.cubes[i].x + 1 >= 10)
                            return false;
                }
                break;
            case TERST_LEFT:
                for(let i=0; i< this.cubes.length;i++){
                    if (this.cubes[i].x - 1 < 0)
                        return false;
                }

                break;

        }

        return true
        
    }
    down(){
        if (this.currentState != this.stateDown)
            return
        for(let i= 0;i < this.cubes.length; i++){
            this.cubes[i].down(i+1);
        }
        if (!this.check(TERST_DOWN)){
            this.currentState = this.stateIdle;
        } 
    }
    right(){
        if (!this.check(TERST_RIGHT)){
            return
        } 
        if (this.currentState != this.stateDown)
            return
        for(let i= 0;i < this.cubes.length; i++){
            this.cubes[i].right(i+1);
        }
       
    }
    left(){
        if (!this.check(TERST_LEFT)){
            return
        } 
        if (this.currentState != this.stateDown)
            return
        for(let i= 0;i < this.cubes.length; i++){
            this.cubes[i].left(i+1);
        }
       
    }
    rotate(){
        this.rotateIdx++;
        if (this.rotateIdx > 1)
            this.rotateIdx = 0;
        for(let i= 0;i < this.cubes.length; i++){
            this.cubes[i].rotate(i+1, this.z[this.rotateIdx][i]);
        }
    }
}