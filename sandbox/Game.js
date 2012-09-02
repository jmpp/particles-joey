function Game(options) {
	this.units = [];
	this.selectedUnits = [];
	this.blocs = [];
	this.time = 0;
	this.alive = true;
	this.map = new Map();
	this.map.init(options.w, options.h)

	Game.prototype.start = function() {
    	this.alive = true;
		
    	Game.addChild(new Unit('Tom'));
	}

	Game.prototype.stop = function() {
		this.alive = false;

		var str = "";
		str += "The game lasted " + this.time + " seconds.\n";
		str += "There is 39 deaths and the winner is ";
		for (var index in this.units) { if (this.units[index].alive) str += this.units[index].name + " with a score of " + this.units[index].xp + " points !"; }	
	}

	Game.prototype.addChild = function(child) {
		switch(child.getType()) {
			case "Unit" : 	child.init();
							this.units.push(child);
							break;

			case "Bloc" : 	child.init();
							this.blocs.push(child);
		}
	}

	Game.prototype.getInfo = function(mode) {
		var str = "";
		var unit = " unit";
		var second = " second";
		var aliveUnits = this.getAliveUnits();
		var deadUnits = this.getDeadUnits();

		if (this.units.length > 1) unit = " units : ";
		if (this.time > 1) second = " seconds";
		// Timer
		str += "The game start " + this.time + second + " ago\n";
		// Number of units & details
		str += "In this game, we have " + this.units.length + unit + "\n";
		str += aliveUnits.length + " are alive and " + deadUnits.length + " are dead.\n";
		for (var index in this.units) {
			str += "\t" + this.units[index].getInfo("string");
		}
		// Details of selected units
		str += "\nSelected units :";
		for (var index in this.selectedUnits) {
			str += "\t- " + this.selectedUnits[index].name;
		}
		
		mode = typeof mode !== 'undefined' ? mode : "log";

		switch (mode) {
			case "log" 		: 	log(str);
								break;

			case "string" 	: 	return str;
								break;
		}
	}

	Game.prototype.getAliveUnits = function() {
		var aliveUnits = [];
		for (var index in this.units) { if (this.units[index].alive) aliveUnits.push(this.units[index]); }

		return aliveUnits;
	}

	Game.prototype.getDeadUnits = function() {
		var deadUnits = [];
		for (var index in this.units) { if (!this.units[index].alive) deadUnits.push(this.units[index]); }

		return deadUnits;
	}

	Game.prototype.update = function() {
		if (this.alive) {
			this.time++;
			var alive = 0;
			for (var index in this.units) {
				this.units[index].update();
				if (!this.alive) {
					alive++;
				}
			}
			this.map.getInfo();
			if (alive == 40) {
				Game.stop();
			}
		}
	}

	Game.prototype.help = function() {
		var str = "";
		str += "In this game you can use these following commands : \n";
		str += "\tGame.getInfo() : Log informations about the game.\n";
		str += "\tUnit.getInfo() : Log informations about an unit.\n";
		str += "\tGame.addChild(child) : Where a child can be any object of the game. For the moment there is only unit ^^.\n";
		str += "\tUnit(name) : To create a new unit.\n";
		str += "\tUnit.kill(unit) : To ask to an unit to kill another.\n";
		str += "\tGame.select(PointToStart, PointToStop) : To select units in an area.\n";		

		str += "\nWhy not start by adding a new unit to the game ?\n";
		str += "Use the following command : Game.addChild(new Unit('Tom'));\n";

		log(str);
	}

	Game.prototype.select = function(ptA, ptB) {
		this.selectedUnits = [];
		for (var index in this.units) {
			var unit = this.units[index];
			if(unit.isHit(ptA, ptB)) {
				unit.select();
				this.selectedUnits.push(unit);
			}
			else
				unit.unselect();
		}
	}
}