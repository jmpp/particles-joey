function Bloc(x,y,sx,sy) {
	this.type = "Bloc";
	this.selected = false;
	this.alive = true;
	this.walkable = false;
	this.speed = 0;
	this.cell = {
		x : x,
		y : y
	}
	this.hitBox = {
		center 	: {
			x	: null,
			y	: null
		},
		r 		: game.map.sizeCell/2
	}
	this.sx = sx;
	this.sy = sy;

	Bloc.prototype.init = function() {
		this.hitBox.center.x = this.cell.x * game.map.sizeCell;
		this.hitBox.center.y = this.cell.y * game.map.sizeCell;

		this.notifyMap();
	}

	Bloc.prototype.getType = function() {
		return this.type;
	}

	Bloc.prototype.update = function(){
		this.hitBox.center.x -= this.sx * game.map.sizeCell;
		this.hitBox.center.y -= this.sy * game.map.sizeCell;
		this.notifyMap();
	}

	Bloc.prototype.render = function(){
		var x = this.cell.x*game.map.sizeCell;
		var y = this.cell.y*game.map.sizeCell;
		var w = game.map.sizeCell;
		if(this.type == 'Bloc'){
			Rect({c:'rgba(0,0,0,.2)', x:x+w/8, y:y-w/8, w:w, h:w});
			Rect({c:"#111", x:x, y:y, w:w, h:w});
		}else if(this.type == 'Coin'){
			Rect({c:'rgba(120,214,194,.2)', x:x+w/3, y:y+w/8, w:w/2, h:w/2});
			Rect({c:"#fff", x:x+game.map.sizeCell/4, y:y+game.map.sizeCell/4, w:w/2, h:w/2});
		}
	}

	Bloc.prototype.notifyMap = function() {
		if(game.map.cells[this.cell.y] && game.map.cells[this.cell.y][this.cell.x]){
			if (this.cell.x != null && this.cell.y !=null) game.map.cells[this.cell.y][this.cell.x] = {type : "empty"};
			this.cell.x = Math.floor(this.hitBox.center.x / game.map.sizeCell);
			this.cell.y = Math.floor(this.hitBox.center.y / game.map.sizeCell);
			if(game.map.cells[this.cell.y] && game.map.cells[this.cell.y][this.cell.x]){
				game.map.cells[this.cell.y][this.cell.x] = this;
			}
		}
	}
}