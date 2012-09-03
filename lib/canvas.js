Canvas = function(){
	this.W  = 0;
	this.H  = 0;

	this.elem = document.createElement('canvas');
	document.body.appendChild(this.elem);

	this.ctx = this.elem.getContext("2d");

	this.update = function(){
		// this.scale();
		this.render();
	}
	this.render = function(){
		var size = this.h/CONF.back.length;
		for(c in CONF.back)
			Rect({x:0, y:c*size, w:this.w, h:size, c:"#"+CONF.back[c]});
		
		// CANVAS.ctx.clearRect(0, 0, CANVAS.w, CANVAS.h);	
		// CANVAS.ctx.shadowBlur = 7;
		// CANVAS.ctx.shadowColor = "#FFF";
	}
	// this.scale = function(w, h){
		this.w = typeof w !== 'undefined' ? w : window.innerWidth ;
		this.h = typeof h !== 'undefined' ? h : window.innerHeight - 5;

		if(this.w > this.W) this.elem.width = this.W = this.w;
		if(this.h > this.H) this.elem.height = this.H = this.h;
	// }
}