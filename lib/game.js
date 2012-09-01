Game = function(){
	this.p = [];
	this.pc = {};
	this.o = 10; //Offset de déplacement des particules
	this.isInit = false;
	this.menu = {};
	// Create Particles
	this.cp = function(i) {
		while(i--) {
			this.p.push({
				x: CANVAS.w/2,
				y: CANVAS.h/2,
				w: Math.random() * 8 + 2,
				sx: Math.random() * 1,
				sy: Math.random() * 1
			});
		}
	}

	// Animate Particles
	this.ap = function() {
		// Particles Core
		// if (k.u)	this.pc.y -= this.pc.s;
		// if (k.r)	this.pc.x += this.pc.s;
		// if (k.d)	this.pc.y += this.pc.s;
		// if (k.l)	this.pc.x -= this.pc.s;

		// Particles
		for(var i in this.p)
		{
			this.p[i].x += this.p[i].sx;
			this.p[i].y += this.p[i].sy;
			
			var a = Math.atan2(this.pc.y+this.o - this.p[i].y, this.pc.x+this.o - this.p[i].x);
			this.p[i].sx += Math.cos(a);
			this.p[i].sy += Math.sin(a);

			if      (this.p[i].sx >= 0) this.p[i].sx = this.p[i].sx >  this.o/2 ?  this.o/2 : this.p[i].sx;
			else if (this.p[i].sx <  0) this.p[i].sx = this.p[i].sx < -this.o/2 ? -this.o/2 : this.p[i].sx;
			if      (this.p[i].sy >= 0) this.p[i].sy = this.p[i].sy >  this.o/2 ?  this.o/2 : this.p[i].sy;
			else if (this.p[i].sy <  0) this.p[i].sy = this.p[i].sy < -this.o/2 ? -this.o/2 : this.p[i].sy;
		}
	}

	// Render Particles
	this.rp = function() {
		
		
		// Particle core 'this.pc'
		// CANVAS.ctx.shadowColor = '#09f';
		// CANVAS.ctx.shadowBlur = 100;
		// Rect({x:this.pc.x, y:this.pc.y, w:50, h:50, c:'#046'});
		// Particles
		for(var i in this.p)
			Rect({x:this.p[i].x, y:this.p[i].y, w:this.p[i].w, h:this.p[i].w, c:'#fff'});
	}

	this.init = function(){
		this.pc = {x: CANVAS.w/2, y: CANVAS.h/2, s: 4};
		this.cp(30);
		this.isInit = true;
		this.menu = new Menu('game');
	}

	this.update = function(){
		if(!this.isInit) this.init();
		this.ap();
		this.render();
		this.menu.update();
	}

	this.render = function(){
		this.rp();
	}

	this.input = function(){

	}

}