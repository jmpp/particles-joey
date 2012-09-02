function Bloc(x,y) {
	this.type = "Bloc";
	this.selected = false;
	this.alive = true;
	this.walkable = false;
	this.speed = 0;
	this.cell = {
		x : null,
		y : null
	}
	this.bounds = {
		x	: x,
		y	: y,
		dx 	: 0,
		dy 	: 0,
		w 	: 10,
		h 	: 10
	}
	this.hitBox = {
		center 	: {
			x	: null,
			y	: null			
		},
		r 		: (this.bounds.w / 2)
	}

	Bloc.prototype.init = function() {
		this.hitBox.center.x = this.bounds.x + this.bounds.w/2;
		this.hitBox.center.y = this.bounds.y + this.bounds.h/2;

		this.notifyMap();
	}

	Bloc.prototype.getInfo = function(mode) {
		var str = "";

		str += "I'm a bloc and I'm here : " + this.hitBox.center.x + ";" + this.hitBox.center.y + "]\n";

		mode = typeof mode !== 'undefined' ? mode : "log";

		switch (mode) {
			case "log" 		: 	log(str);
								break;

			case "string" 	: 	return str;
								break;
		}
	}

	Bloc.prototype.getType = function() {
		return this.type;
	}

	Bloc.prototype.notifyMap = function() {
		if (this.cell.x != null && this.cell.y !=null) Game.map.cells[this.cell.x][this.cell.y] = {type : "empty"};
		this.cell.x = Math.floor(this.hitBox.center.x / Game.map.sizeCell);
		this.cell.y = Math.floor(this.hitBox.center.y / Game.map.sizeCell); 
		Game.map.cells[this.cell.x][this.cell.y] = this;
		Game.map.getInfo();
	}

	// Bloc.prototype.update = function() {
	// 	this.notifyMap();
	// }	

	Bloc.prototype.die = function() {
		this.alive = false;
	}

	Bloc.prototype.kill = function(unit) {
		var str = "";
		str += "Oh god " + this.name + " killed " + unit.name + " !";
		unit.die();
		this.score++;
		log(str);
	}

	Bloc.prototype.select = function() { this.selected = true; }
	Bloc.prototype.unselect = function() { this.selected = false; }
}