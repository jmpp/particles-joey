Game = function(){
	this.isInit = false;
	this.menu = {};
	this.map  = {};
	this.debug = false;
	this.time = 0;

	this.init = function(){
		this.isInit = true;
		
		this.menu = new Menu('game');
		
		this.map = new Map();
		this.map.init();

		this.player = new Player();
		this.player.init(30);
	}

	this.update = function(){
		if(!this.isInit) this.init();
		this.map.update();
		this.player.animate();
		this.render();

		this.menu.update();
	}

	this.render = function(){
		this.showScore();
		this.map.render();
		this.player.render();
		if(this.debug){
			this.map.renderDebug();
		}
	}

	this.toggleDebug = function(){
		this.debug = !this.debug;
	}

	this.toggleTime = function(){
		this.time = -this.time;
	}

	this.showScore = function(){
		var s = this.player.score;
		s = (s < 10) ? "000"+s : 
				(s < 100) ? "00"+s :
					(s < 1000) ? "0"+s : s;
		Txt({x:CANVAS.w/2, y:CANVAS.h/4, w:CANVAS.w, t:s, c:'rgba(255,255,255,.3)', fs:Locale.fontsize.h1});
	}

}