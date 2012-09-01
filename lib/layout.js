var Layout = function(){

	this.lib = {};

	this.input = function(){
		for(layer in this.lib){
			if(this.checkLayer(this.lib[layer])) {
				 return this.lib[layer]['action'];
			}
		}
	}

	this.checkLayer = function(layer){
		if(!layer) return false;
		return (MOUSE.x > layer.x &&
				MOUSE.y > layer.y &&
				MOUSE.x < layer.x + layer.w &&
				MOUSE.y < layer.y + layer.h
			) ? true : false;
	}

	this.addLayer = function(layer){
		if(layer.name){
			this.lib[layer.name] = layer;
		}
	}
}