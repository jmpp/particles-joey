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
	this.isUpdate = false;

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
		this.isUpdate = true;
	}

	Bloc.prototype.render = function(){
		Rect({c:"#111", x:this.cell.x*game.map.sizeCell, y:this.cell.y*game.map.sizeCell, w:game.map.sizeCell, h:game.map.sizeCell});
	}

	Bloc.prototype.notifyMap = function() {
		if(game.map.cells[this.cell.y] && game.map.cells[this.cell.y][this.cell.x]){
			if (this.cell.x != null && this.cell.y !=null) game.map.cells[this.cell.y][this.cell.x] = {type : "empty"};
			this.cell.x = Math.floor(this.hitBox.center.x / game.map.sizeCell);
			this.cell.y = Math.floor(this.hitBox.center.y / game.map.sizeCell);
			if(game.map.cells[this.cell.y] && game.map.cells[this.cell.y][this.cell.x]){
				log('x : ' + this.cell.x + ', y : ' + this.cell.y)
				game.map.cells[this.cell.y][this.cell.x] = this;
			}
		}
	}
}