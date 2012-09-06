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
			a : {x:0,y:13,w:9,h:12},
			b : {x:9,y:11,w:6,h:15},
			c : {x:17,y:7,w:6,h:20},
			d : {x:21,y:14,w:8,h:7},
			f : {x:25,y:25,w:6,h:1},
			e : {x:29,y:0,w:10,h:22},
			g : {x:33,y:13,w:15,h:14},
		},
		{
			a : {x:0,y:13,w:9,h:14},
			b : {x:12,y:0,w:4,h:24},
			c : {x:12,y:26,w:4,h:1},
			d : {x:20,y:13,w:10,h:1},
			e : {x:34,y:0,w:4,h:24},
			f : {x:34,y:26,w:4,h:1},
			g : {x:41,y:13,w:10,h:1},
		},
		{
			a : {x:0,y:13,w:10,h:1},
			b : {x:12,y:7,w:7,h:1},
			c : {x:12,y:19,w:7,h:1},
			d : {x:22,y:24,w:4,h:1},
			e : {x:28,y:13,w:7,h:1},
			f : {x:38,y:20,w:3,h:1},
			g : {x:44,y:13,w:7,h:1},
		}
	],
	back : ['f16529','F15129','E44C26','CA4422','A4371B','782611']
}