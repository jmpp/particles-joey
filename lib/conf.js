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
			a : {x:0,y:13,w:32,h:1},
			b : {x:34,y:13,w:10,h:1},
			c : {x:46,y:13,w:6,h:1},
		},
		{
			a : {x:0,y:13,w:9,h:1},
			b : {x:9,y:11,w:6,h:1},
			c : {x:16,y:7,w:7,h:20,b:2},
			d : {x:21,y:13,w:9,h:1},
			f : {x:25,y:25,w:7,h:1,b:3},
			e : {x:30,y:0,w:9,h:20},
			g : {x:34,y:13,w:5,h:14},
			h : {x:39,y:13,w:10,h:1,b:3},
		},
		{
			a : {x:0,y:13,w:9,h:14},
			b : {x:12,y:0,w:5,h:24},
			c : {x:12,y:26,w:5,h:1,b:2},
			d : {x:21,y:13,w:9,h:1,b:1},
			e : {x:34,y:0,w:5,h:24},
			f : {x:34,y:26,w:5,h:1,b:2},
			g : {x:42,y:13,w:9,h:1,b:3},
		},
		{
			a : {x:0,y:13,w:10,h:1},
			b : {x:12,y:7,w:7,h:1},
			c : {x:12,y:19,w:7,h:1},
			d : {x:22,y:24,w:5,h:1,b:3},
			e : {x:28,y:13,w:7,h:1},
			f : {x:38,y:20,w:3,h:1,b:5},
			g : {x:44,y:13,w:7,h:1},
		}
	],
	back : ['f16529','F15129','E44C26','CA4422','A4371B','782611']
}