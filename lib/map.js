function Map() {
	this.width = 0;
	this.height = 0;
	this.sizeCell = 25;
	this.cells = [];
	this.offset = 0;
	this.offsetSize = 0;
	this.nextUpdate = 2;
	this.tickUpdate = 0;

	this.init = function(w, h) {
		this.width = typeof w !== 'undefined' ? w : 0;
		this.height = typeof h !== 'undefined' ? h : 0;
		if (this.width == 0 || this.height == 0) this.setSizeToScreenSize();
		
		for (var y = 0; y < this.height/this.sizeCell; y++) {
			var newArray = [];
			for (var x = 0; x < (this.width/this.sizeCell)*2; x++) {
				newArray.push({type:"empty"});
			}
			this.cells.push(newArray);
		}
		this.refreshMap();
	}

	this.refreshMap = function(){
		log(this.offset);
		var index = 0;
		for(p in CONF.map){
			var pattern = CONF.map[p];
			if(index >= this.offset && index <= this.offset + 1){
				for(e in pattern){
					var elem = pattern[e];
					var w = elem.w;
					while(w --){
						var h = elem.h;
						while(h --){
							if(this.cells[elem.y+h] && this.cells[elem.y+h][elem.x+w]){
								var x = (elem.x+w) + Math.ceil(this.width/this.sizeCell) * (index-this.offset);
								var cell = new Bloc(x, elem.y+h, elem.sx, elem.sy);
								cell.init();
							}
						}
					}
				}
			}
			++index;
		}

		++this.offset;
	}

	this.update = function(){
		++this.tickUpdate;
		if(this.tickUpdate > this.nextUpdate){
			for(y in this.cells){
				for(x in this.cells[y]){
					var o = this.cells[y][x];
					if(o.type != 'empty')
						if(!o.isUpdate) o.update();
						else	o.isUpdate = false;
				}
			}

			this.offsetSize += this.sizeCell;
			if(this.offsetSize > (this.width*2)*this.offset)
				this.refreshMap();

			this.tickUpdate = 0;
		}
	}

	this.render = function(){
		for(y in this.cells){
			for(x in this.cells[y]){
				var o = this.cells[y][x];
				if(o.type != 'empty')
					o.render();
			}
		}
	}

	this.setSizeToScreenSize = function() {
		this.width = CANVAS.w;
		this.height = CANVAS.h;
	}

	this.getInfo = function() {
		var str = "";
		for (var y = 0; y < this.height/this.sizeCell; y++) {
			for (var x = 0; x < this.width/this.sizeCell; x++) {
				switch (this.cells[x][y].type) {
					case "Unit" : 	if (this.cells[x][y].alive)
										str += "\to";
									else 
										str += "\tx";
									break;

					case "Bloc" : 	str += "\t#";
									break;

					case "empty" :  str += "\t\t";
				}
			}
			str += "\n";
		}

		log(str);
	}

	this.getPos = function(x, y) {
		var cell = null;
		var cellX = Math.floor(x / this.sizeCell);
		var cellY = Math.floor(y / this.sizeCell);

		return {x:cellX, y:cellY};
	}

	this.getCell = function(x, y) {
		var pos = this.getPos(x, y);
		if (this.cells[pos.y] != undefined) {
			if (this.cells[pos.y][pos.x] != undefined){
				var cell = this.cells[pos.y][pos.x];
			}
		}
		return cell;
	} 

	this.renderDebug = function(){
		var grid = {
			c :  "#FFF",
			points : []
		}
		for(y in this.cells){
			grid.points.push({x:0, y:y*this.sizeCell, X:this.cells[y].length*this.sizeCell, Y:y*this.sizeCell})
			for(x in this.cells[y]){
				grid.points.push({x:x*this.sizeCell, y:y*this.sizeCell, X:x*this.sizeCell, Y:(y+1)*this.sizeCell})
			}
		}
		Line(grid);
	}

	
}