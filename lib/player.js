var Player = function(){
	this.type = 'Player';
	this.p = [];
	this.pModel = [];
	this.teleporting = false;
	this.particlesDisappearing = false;
	this.cell = {
		x : 10,
		y : 10
	}
	this.x = null;
	this.y = null;
	this.r = game.map.sizeCell/2;
	this.isUpdate = false;

	// Create Particles
	this.init = function(i) {
		this.x = this.cell.x * game.map.sizeCell;
		this.y = this.cell.y * game.map.sizeCell;

		this.notifyMap();

		while(i--) {
			var obj = {
				x: this.x,
				y: this.y,
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
	this.animate = function() {
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
			
			var a = Math.atan2(this.y+(this.r/2) - this.p[i].y, this.x+(this.r/2) - this.p[i].x);
			this.p[i].sx += Math.cos(a);
			this.p[i].sy += Math.sin(a);

			if      (this.p[i].sx >= 0) this.p[i].sx = this.p[i].sx >  this.r/4 ?  this.r/4 : this.p[i].sx;
			else if (this.p[i].sx <  0) this.p[i].sx = this.p[i].sx < -this.r/4 ? -this.r/4 : this.p[i].sx;
			if      (this.p[i].sy >= 0) this.p[i].sy = this.p[i].sy >  this.r/4 ?  this.r/4 : this.p[i].sy;
			else if (this.p[i].sy <  0) this.p[i].sy = this.p[i].sy < -this.r/4 ? -this.r/4 : this.p[i].sy;
		}

		if (MOUSE.clic)
			this.teleporting = this.particlesDisappearing = true;

		if (this.teleporting)
			this.teleport();
	}

	this.update = function(){
		this.x -= game.map.sizeCell;
		this.isUpdate = true;
	}

	// Render Particles
	this.render = function() {
		// Particle core 'this.pc'
		// CANVAS.ctx.shadowColor = '#09f';
		// CANVAS.ctx.shadowBlur = 100;
		// Particles
		Rect({x:this.x, y:this.y, w:this.r*2, h:this.r*2, c:'#000'});
		Rect({x:this.x+this.r, y:this.y+this.r/2, w:2, h:2, c:'#fff'});
		Rect({x:this.x+this.r*1.5, y:this.y+this.r/2, w:2, h:2, c:'#fff'});

		if(this.teleporting)
			for(var i in this.p)
				Rect({x:this.p[i].x, y:this.p[i].y, w:this.p[i].w, h:this.p[i].w, c:'rgba(255,255,255,'+Math.random()+')'});
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
				var pos = game.map.getPos(MOUSE.lastPosX, MOUSE.lastPosY);
				// Changement du point d'origine au clic
				this.x = pos.x * (this.r*2);
				this.y = pos.y * (this.r*2);
				// Modification brute des x, y des particules à côté du nouveau point d'origine
				for (var i in this.p) {
					this.p[i].x = this.x + Math.random()*80-40;
					this.p[i].y = this.y + Math.random()*80-40;
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

	this.notifyMap = function() {
		if(game.map.cells[this.cell.y] && game.map.cells[this.cell.y][this.cell.x]){
			if (this.cell.x != null && this.cell.y !=null) game.map.cells[this.cell.y][this.cell.x] = {type : "empty"};
			var pos = game.map.getPos(this.x, this.y)
			this.cell.x = pos.x;
			this.cell.y = pos.y;
			if(game.map.cells[this.cell.y] && game.map.cells[this.cell.y][this.cell.x]){
				game.map.cells[this.cell.y][this.cell.x] = this;
			}
		}
	}
}