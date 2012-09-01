Plane = function(o){
	this.bounds 	= {x:0,y:0,w:0,h:0};
	this.bgcolor	= (o.bc) ? o.bc : "rgba(0,0,0,0)";
	this.txt 		= o.txt;
	this.name		= o.name;
	this.color		= (o.c) ? o.c : "#FFF";
	this.placement  = {x : o.px, y : o.py}
	this.offset		= (o.offset) ? o.offset : 0;
	
	this.update = function(){
		this.render();
	}

	this.render = function(){
		var rect = this.bounds;
		rect.c = this.bgcolor;
		Rect(rect);

		var txt = {
			x	: rect.x + rect.w/2,
			y 	: rect.y + rect.h/2,
			w	: rect.w,
			c 	: this.color,
			t 	: this.txt
		};
		Txt(txt);
	}

	this.scale = function(){
		var W = CANVAS.w,
			H = CANVAS.h,
			w = W/8,
			h = H/8,
			marginTop = H/100;

		switch(this.placement.x){
			case 'left'		: 	x = 0; break;
			case 'right' 	: 	x = W - w; break;
			default			: 	x = W/2 - w/2;
		}

		switch(this.placement.y){
			case 'top'		: 	y = 0; break;
			case 'bottom' 	: 	y = H - h; break;
			default			: 	y = H/2 - h/2;
		}
		y += this.offset * (h + marginTop);

		this.bounds = {x:x, y:y, w:w, h:h};
	}
};