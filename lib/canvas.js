Canvas = function(){
	this.W  = 0;
	this.H  = 0;

	this.elem = document.createElement('canvas');
	document.body.appendChild(this.elem);

	this.ctx = this.elem.getContext("2d");

	this.update = function(){
		this.scale();
		this.render();
	}
	this.render = function(){
		// Rect({x:0, y:0, w:this.w, h:this.h, c:"#333"});
		CANVAS.ctx.clearRect(0, 0, CANVAS.w, CANVAS.h);	
		CANVAS.ctx.shadowBlur = 7;
		CANVAS.ctx.shadowColor = "#FFF";
	}
	this.scale = function(w, h){
		this.w = (w != null) ? w : window.innerWidth ;
		this.h = (h != null) ? h : window.innerHeight - 5;

		if(this.w > this.W) this.elem.width = this.W = this.w;
		if(this.h > this.H) this.elem.height = this.H = this.h;
	}
}