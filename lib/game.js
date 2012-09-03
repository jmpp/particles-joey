Game = function(){
	this.p = [];
	this.pModel = [];
	this.pc = {};
	this.o = 10; //Offset de déplacement des particules
	this.isInit = false;
	this.menu = {};
	this.map  = {};
	this.debug = false;
	this.time = 0;
	this.teleporting = false;
	this.particlesDisappearing = false;

	// Create Particles
	this.cp = function(i) {
		while(i--) {
			var obj = {
				x: CANVAS.w/2,
				y: CANVAS.h/2,
				w: Math.random() * 8 + 2,
				sx: Math.random() * 1,
				sy: Math.random() * 1
			};
			this.p.push(obj);
			// Keep a model of our particles system in memory
			this.pModel.push(clone(obj));
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

		if (MOUSE.clic)
			this.teleporting = this.particlesDisappearing = true;

		if (this.teleporting)
			this.teleport();
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
		this.map = new Map();
		this.map.init();
	}

	this.update = function(){
		if(!this.isInit) this.init();
		this.map.update();
		this.menu.update();
		this.ap();
		this.render();
	}

	this.render = function(){
		this.map.render();
		this.rp();
		if(this.debug){
			this.map.renderDebug();
		}
	}

	// Téléportation du joueur vers les dernières coordonnées de la souris
	this.teleport = function() {
		if (this.particlesDisappearing) {
			var nbZeroParticles = 0;
			for (var i in this.p) {
				this.p[i].w -= 0.5;

				this.p[i].w = this.p[i].w < 0 ? 0 : this.p[i].w;

				if (this.p[i].w == 0) {
					nbZeroParticles++;
				}
			}
			// Toutes les particules sont à 0 ? On peut les faire réapparaître ailleurs alors.
			if (nbZeroParticles >= this.p.length) {
				// Changement du point d'origine au clic
				this.pc.x = MOUSE.lastPosX;
				this.pc.y = MOUSE.lastPosY;
				// Modification brute des x, y des particules à côté du nouveau point d'origine
				for (var i in this.p) {
					this.p[i].x = this.pc.x + Math.random()*80-40;
					this.p[i].y = this.pc.y + Math.random()*80-40;
				}
				// Passage à l'état 'réapparition'
				this.particlesDisappearing = false;
			}
		}
		else {
			var nbRestauredParticles = 0;
			for (var i in this.p) {
				this.p[i].w += 0.5;

				this.p[i].w = this.p[i].w > this.pModel[i].w ? this.pModel[i].w : this.p[i].w;

				if (this.p[i].w == this.pModel[i].w) {
					nbRestauredParticles++;
				}
			}
			// Toutes les particules sont restaurés à leur taille initiale ? On remet le flag de téléportation à 'false'
			if (nbRestauredParticles >= this.p.length) {
				this.teleporting = false;
			}
		}
	}

	this.toggleDebug = function(){
		this.debug = !this.debug;
	}

	this.toggleTime = function(){
		this.time = -this.time;
	}

}