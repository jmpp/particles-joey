function Unit(name) {
	this.type = "Unit";
	this.name = name;
	this.selected = false;
	this.xp = 0;
	this.alive = true;
	this.speed = 4;
	this.cell = {
		x : null,
		y : null
	}
	this.bounds = {
		x	: null,
		y	: null,
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

	Unit.prototype.init = function() {
		var x = getRandomInt(0,Game.map.width - this.bounds.w);
		var y = getRandomInt(0,Game.map.height - this.bounds.h);

		var cell = Game.map.getCell(x,y);

		if (cell.type != "empty") this.init();
		else {
			this.bounds.x = x;
			this.bounds.y = y;
			this.hitBox.center.x = this.bounds.x + this.bounds.w/2;
			this.hitBox.center.y = this.bounds.y + this.bounds.h/2;

			this.resetDirection();
			this.notifyMap();
		}
	}

	Unit.prototype.getInfo = function(mode) {
		var str = "";
		var alive = "alive";
		if (!this.alive) alive = "not alive";
		if (this.alive) {
			str += "My name is " + this.name + " and I'm " + alive + " !\n";
			str += "\tI'm here : [" + this.hitBox.center.x + ";" + this.hitBox.center.y + "]\n";
			str += "\tMy direction is : dx -> " + this.bounds.dx + " - dy -> " + this.bounds.dy + "\n";
		}

		mode = typeof mode !== 'undefined' ? mode : "log";

		switch (mode) {
			case "log" 		: 	log(str);
								break;

			case "string" 	: 	return str;
								break;
		}
	}

	Unit.prototype.getType = function() {
		return this.type;
	}

	Unit.prototype.isCollideBorder = function() {
		var distanceX = this.hitBox.center.x + (this.hitBox.r + this.speed) * this.bounds.dx;
		var distanceY = this.hitBox.center.y + (this.hitBox.r + this.speed) * this.bounds.dy;

		var hitX = true;
		var hitY = true;

		if (distanceX <= 0) this.hitBox.center.x = 0 + this.hitBox.r;
		else if (distanceX >= Game.map.width) this.hitBox.center.x = Game.map.width - this.hitBox.r;
		else hitX = false;


		if (distanceY <= 0) this.hitBox.center.y = 0 + this.hitBox.r;
		else if (distanceY >= Game.map.height) this.hitBox.center.y = Game.map.height - this.hitBox.r;
		else hitY = false;

		return (hitX || hitY);
	}

	Unit.prototype.isCollideSomebody = function() {
		var somebody = null;
		var index = 0;

		while (index < Game.units.length && somebody == null) {
			if (this.name != Game.units[index].name && Game.units[index].alive) {
				if (this.isHit(Game.units[index].hitBox)) somebody = Game.units[index];
			}
			index++;
		}

		return somebody;
	}

	Unit.prototype.isCollideSomething = function() {
		var something = null;
		var index = 0;

		while (index < Game.blocs.length && something == null) {
			if (!Game.blocs[index].walkable) {
				if (this.isHit(Game.blocs[index].hitBox)) something = Game.blocs[index];
			}
			index++;
		}

		return something;
	}

	Unit.prototype.isHit = function(hitBox) {
		var d = this.hitBox.r + hitBox.r + this.speed;
		var c = this.hitBox.center;

		return d > getDistance(c, hitBox.center);
	}

	Unit.prototype.move = function() {
		var somebody = this.isCollideSomebody();
		var something = this.isCollideSomething();
		var d = this.hitBox.r + this.speed;

		log("Before : [" + this.hitBox.center.x + "," + this.hitBox.center.y + "]");
		if (this.isCollideBorder()) {
			this.resetDirection();
		}
		else if (somebody != null) {
			d += somebody.hitBox.r;
			while (d < getDistance(this.hitBox.center, somebody.hitBox.center)) {
				this.hitBox.center.x += 1 * this.bounds.dx;
				this.hitBox.center.y += 1* this.bounds.dy;
			}
			this.resetDirection();
		}
		else if (something != null) {
			d += something.hitBox.r;
			while (d < getDistance(this.hitBox.center, somebody.hitBox.center)) {
				this.hitBox.center.x += 1 * this.bounds.dx;
				this.hitBox.center.y += 1* this.bounds.dy;
			}
			this.resetDirection();
		}
		else {			
			this.hitBox.center.x += this.speed * this.bounds.dx;
			this.hitBox.center.y += this.speed * this.bounds.dy;
		}
		log("After : [" + this.hitBox.center.x + "," + this.hitBox.center.y + "]");

		this.notifyMap();
	}

	Unit.prototype.notifyMap = function() {
		if (this.cell.x != null && this.cell.y !=null) Game.map.cells[this.cell.x][this.cell.y] = {type : "empty"};
		this.cell.x = Math.floor(this.hitBox.center.x / Game.map.sizeCell);
		this.cell.y = Math.floor(this.hitBox.center.y / Game.map.sizeCell);
		Game.map.cells[this.cell.x][this.cell.y] = this;
	}

	Unit.prototype.resetDirection = function() {
		var newDX = getRandomOne();
		var newDY = getRandomOne();

		if ((newDX == 0 && newDY == 0) || (newDX == this.bounds.dx && newDY == this.bounds.dy)) this.resetDirection();
		else {		
			this.bounds.dx = newDX;
			this.bounds.dy = newDY;

			log("Change direction : dx = " + this.bounds.dx + " | dy = " + this.bounds.dy);
		}
	}

	Unit.prototype.update = function() {
		if (this.alive) {
			this.move();
		}
	}	

	Unit.prototype.die = function() {
		this.alive = false;
	}

	Unit.prototype.kill = function(unit) {
		var str = "";
		str += "Oh god " + this.name + " killed " + unit.name + " !";
		unit.die();
		this.xp++;
		log(str);
	}

	Unit.prototype.select = function() { this.selected = true; }
	Unit.prototype.unselect = function() { this.selected = false; }
}