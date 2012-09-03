Menu = function(config){
	this.items 	= [];
	this.layout = new Layout();

	this.update = function(){
		this.scale();

		for(var i in this.items)
			this.items[i].update();

		this.input();
	}

	this.create = function(config){
		var menu = CONF.menu[config];
		var j = 0;
		for(var i in menu){
			menu[i].name = i;
			menu[i].offset = j;
			this.items[i] = new Plane(menu[i]);

			this.layout.addLayer(menu[i]);

			++j;
		}
	}

	this.scale = function(){
		for(var i in this.items){
			this.items[i].scale();
			var b = this.items[i].bounds;
			var l = this.layout.lib[this.items[i].name];
			l.x = b.x; l.y = b.y; l.w = b.w; l.h = b.h;
		}
	}

	this.input = function(){
		if(MOUSE.clic) {
			log('menu input')
			eval(this.layout.input());
		}
	}

	this.create(config);
};