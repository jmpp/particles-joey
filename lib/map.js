function Map() {
	this.width = 0;
	this.height = 0;
	this.sizeCell = 100;
	this.cells = [];

	Map.prototype.init = function(w, h) {
		this.width = typeof w !== 'undefined' ? w : 0;
		this.height = typeof h !== 'undefined' ? h : 0;

		if (this.width == 0 || this.height == 0) this.setSizeToScreenSize();

		for (var y = 0; y < this.height/this.sizeCell; y++) {
			var newArray = [];
			for (var x = 0; x < this.width/this.sizeCell; x++) {
				newArray.push({type:"empty"});
			}
			this.cells.push(newArray);
		}
	}

	this.setSizeToScreenSize = function() {
		// if (document.body && document.body.offsetWidth) {
		// 	this.width = document.body.offsetWidth;
		// 	this.height = document.body.offsetHeight;
		// }
		// if (document.compatMode=='CSS1Compat' && document.documentElement && document.documentElement.offsetWidth ) {
		// 	this.width = document.documentElement.offsetWidth;
		// 	this.height = document.documentElement.offsetHeight;
		// }
		// if (window.innerWidth && window.innerHeight) {
		// 	this.width = window.innerWidth;
		// 	this.height = window.innerHeight;
		// }
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

	this.getCell = function(x, y) {
		var cell = null;
		var cellX = Math.floor(x / this.sizeCell);
		var cellY = Math.floor(y / this.sizeCell);
		if (this.cells[cellX] != undefined) {
			if (this.cells[cellX][cellY] != undefined) {
				cell =  this.cells[cellX][cellY];
			}
		}

		return cell;
	} 

	this.renderDebug = function(){
		var grid = {
			c :  "#F00",
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

	this.render = function(){
		for(y in this.cells){
			for(x in this.cells[y]){
				var o = this.getCell(x, y);
				if(o.type != 'empty')
					Rect({c:"#000", x:x*this.sizeCell, y:y*this.sizeCell, w:this.sizeCell, h:this.sizeCell});
			}
		}
	}
	
}