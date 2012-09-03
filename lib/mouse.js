document.oncontextmenu = getMouseDownRight;
document.onmousemove = getMousePosition;
document.onmousedown = getMouseDown;
document.onmouseup  = getMouseUp;
document.onload = getMousePosition;

var MOUSE = {
	x:0,
	y:0,
	cx:null,
	cy:null,
	lastPosX:null,
	lastPosY:null,
	clic:false,
	down:false,
	dbclic:false,
	obj:null
}

function getMousePosition(event) {
	MOUSE.x = MOUSE.lastPosX = mouseX(event);
	MOUSE.y = MOUSE.lastPosY = mouseY(event);
}

function getMouseDown(event) {
	getClicPosition();
	MOUSE.clic = true;
	
}
function getMouseUp(event) {
	releaseClicPosition();
	MOUSE.clic = false;
}
function getMouseDownRight(event) {
	event.preventDefault();
}

function getClicPosition(){
	MOUSE.down = true;
	if(!MOUSE.cx && !MOUSE.cy){
		MOUSE.cx = MOUSE.x;
		MOUSE.cy = MOUSE.y;
	}
}

function releaseClicPosition(){
	MOUSE.down = false;
	MOUSE.cx = null;
	MOUSE.cy = null;
}

function mouseX(event) {
	var offsetX = (CANVAS.elem.offsetLeft != undefined) ? CANVAS.elem.offsetLeft : 230;
	if(!CANVAS.w) return null;
	if (event.pageX) return event.pageX - offsetX;
	else if (event.clientX)
	   return event.clientX + (document.documentElement.scrollLeft ?
	   document.documentElement.scrollLeft :
	   document.body.scrollLeft) - CANVAS.elem.offsetLeft;
	else return null;
}

function mouseY(event) {
	var offsetY = (CANVAS.elem.offsetTop) ? CANVAS.elem.offsetTop : 0;
	if (event.pageY) return event.pageY - offsetY;
	else if (event.clientY)
	   return event.clientY + (document.documentElement.scrollTop ?
	   document.documentElement.scrollTop :
	   document.body.scrollTop) - CANVAS.elem.offsetTop;
	else return null;
}
