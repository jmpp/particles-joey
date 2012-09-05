var CONF = {
	/*MENU*/
	menu : {
		//HOME
		home : {
			play : {txt:'Play', action:'CurrentGameObject=game', bc:'#111'},
		},
		//GAME
		game : {
			pause : {txt:'Pause', action:'CurrentGameObject=menu', bc:'#111', px : "right", py : "top"},
			debug : {txt:'Mode debug', action:'CurrentGameObject.toggleDebug()', bc:'#111', px:"right", py:"top"}
		}
	},
	map : [
		{
			e1 : {x:3,y:15,w:40,h:1,sx:1,sy:0},
		},
		{
			e1 : {x:10,y:22,w:13,h:1,sx:1,sy:0},
			e3 : {x:30,y:22,w:13,h:1,sx:1,sy:0},
		},
		{
			e1 : {x:10,y:22,w:4,h:5,sx:1,sy:0},
			e2 : {x:25,y:17,w:4,h:10,sx:1,sy:0},
			e3 : {x:40,y:12,w:4,h:15,sx:1,sy:0},
		},
		{
			e1 : {x:10,y:22,w:2,h:5,sx:1,sy:0},
			e2 : {x:25,y:17,w:2,h:10,sx:1,sy:0},
			e3 : {x:40,y:12,w:2,h:15,sx:1,sy:0},
		},
		{
			e1 : {x:10,y:22,w:5,h:1,sx:1,sy:0},
			e2 : {x:25,y:17,w:4,h:10,sx:1,sy:0},
			e3 : {x:40,y:22,w:5,h:1,sx:1,sy:0},
		},
	],
	back : ['f16529','F15129','E44C26','CA4422','A4371B','782611']
}