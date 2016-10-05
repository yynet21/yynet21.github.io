var PI=Math.PI;
var PI_2=2*Math.PI;
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

function abs(t){
  return Math.abs(t);
}
