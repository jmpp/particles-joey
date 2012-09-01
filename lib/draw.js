var Rect = function(o){
	CANVAS.ctx.fillStyle = o.c;
	CANVAS.ctx.fillRect(o.x, o.y, o.w, o.h);
}

var Txt = function(o){
	var fontsize = (o.fs) ? o.fs : Locale.fontsize.p;
	var font = (o.f) ? o.f : Locale.font;
	var align = (o.a) ? o.a : "center";

	CANVAS.ctx.font = fontsize + " " + font;
	CANVAS.ctx.textAlign = align;
	CANVAS.ctx.fillStyle = o.c;
	CANVAS.ctx.fillText( o.t, o.x, o.y, o.w );
}

var Stroke = function(o){
	CANVAS.ctx.strokeStyle = o.c;
	CANVAS.ctx.stroke(o.x, o.y, o.w, o.h);
}