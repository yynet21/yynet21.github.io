var canvas = $('#visualizer')[0];
 if (canvas.getContext){
    var ctx = canvas.getContext('2d');
	//console.log("gevse");
 }
var width=1280;
var height=800;
var centX =width/2;
var centY =height/2;

var fra =[];
var _maxLevels =4;
var nowLevel=3;
var _dmax =1;
var _numSides =3;
var mid_c=1.5;
var dmid_c=0.003;
var _l=[] ;
var frameCount=0;
var  offset=[Math.random(),Math.random()];
function draw(){
  //_l[0]=1.0/3;
  //_l[1]=1.0/3;

  //console.log(frameCount);
  if (frameCount%10===0){
  _numSides =random(3,14)|0;
  _numSides=$('#sides').val()|0;
  _l[0]=0.5+2*noise(frameCount*Math.sqrt(2)/1000+offset[0],0,0);
  _l[1]=0.5+2*noise(frameCount*Math.sqrt(2)/1000+offset[1],0,0);
  
//  _l[0]=$('#random-1').val()/100*3-1;
// _l[1]=$('#random-2').val()/100*3-1;
  console.log(_l[0],_l[1]);
  ctx.clearRect(0,0,canvas.width,canvas.height);
  fra[0] = new Fractal(frameCount/10000);
  fra[1] = new Fractal(frameCount/10000+0.5);
  fra[0].drawShape();
  fra[1].drawShape();
//console.log("draw");
  }
}




function  Fractal(startAngle) {
  this.pointArr = [];
  this.rootFractal;
//console.log("fractal");

    for (var i =0;i<2;i++){//ここは１っかいだけ適用される場所
      var x = centX+(height*0.5*cos(startAngle+i*0.5));
      var y = centY+(height*0.5*sin(startAngle+i*0.5));
      this.pointArr[i]=new Point2D(x,y);
    }
    this.rootFractal = new Koch(0,this.pointArr);
}
  Fractal.prototype.drawShape = function (){
    this.rootFractal.drawMe();
  }


function  Koch(lev,points){
  this.level; this.num;
  this.outerpoints = [];
  this.midpoints = [];
  this.myKoch = [];


      this.level =lev;
      //this.num =n;
      this.outerpoints =points;

      if ((this.level+1)<_maxLevels){
      this.midpoints = this.calcMidpoints();
		//console.log(this.midpoints.length);
       for (var i=0;i<_numSides+1;i++){
			var a =[];
           if (i===0)  {  a[0]=this.outerpoints[0];a[1]=this.midpoints[0];}
           else if (i===_numSides){ a[0]=this.midpoints[_numSides-1];a[1]=this.outerpoints[1];}
           else { a[0]=this.midpoints[i-1]; a[1]=this.midpoints[i];}

           this.myKoch.push(new Koch(this.level+1, a));
           //console.log(a[1]);
       }

    }
}



  Koch.prototype.calcMidpoints= function () {
     var mpArray =[];
     var mid1 =(this.outerpoints[1].sub(this.outerpoints[0])).mult(_l[0]);
     var mid2 =(this.outerpoints[1].sub(this.outerpoints[0])).mult(_l[1]);
     for (var i = 0; i < _numSides; i++) {
       if (i===0){mpArray[0]=this.outerpoints[0].add(mid1);}
       else if (i===1){mpArray[1]=mpArray[0].add(mid2.rotate((_numSides-2)*Math.PI/_numSides));}//
       else  {         mpArray[i]=mpArray[i-1].add(mid2.rotate((_numSides-2)*Math.PI/_numSides-(i-1)*2*Math.PI/_numSides));
      }
     }
		//console.dir(mpArray);
     return mpArray;
  }


 Koch.prototype.drawMe= function () {

    if (this.level==nowLevel){
		ctx.strokeStyle ="hsl("+(_numSides*40)%360+", 50%, 50%)";
		ctx.beginPath();
		ctx.moveTo(this.outerpoints[0].x,this.outerpoints[0].y);
		ctx.lineTo(this.outerpoints[1].x,this.outerpoints[1].y);
		ctx.closePath();
		ctx.stroke();
		//ctx.moveTo(-this.outerpoints[0].x,-this.outerpoints[0].y);
   }
   for (var k = 0; k < this.myKoch.length; k++) {
       this.myKoch[k].drawMe();

     }

}

//draw();
function render() {
draw();
frameCount++;
requestAnimationFrame(render);
//if (ks!=0 &&typeof obj !="undefined")console.log(ks);
}

render();


function random(v1,v2){
  if (arguments.length===1){
    return v1*Math.random();
  }
  else {
    return v1+(v2-v1)*Math.random();
  }
}
function sin(t){
  return Math.sin(t*Math.PI*2);
}

function cos(t){
  return Math.cos(t*Math.PI*2);
}
