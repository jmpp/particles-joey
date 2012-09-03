var CONF = {
	/*MENU*/
	menu : {
		//HOME
		home : {
			play : {txt:'Play', action:'CurrentGameObject=game', bc:'#111'},
			howto : {txt:'How to', action:'log("Clic howto")', bc:'#222'},
			credits : {txt:'Credits', action:'log("Clic credits")', bc:'#333'}
		},
		//GAME
		game : {
			pause : {txt:'Pause', action:'CurrentGameObject=menu', bc:'#111', px : "right", py : "top"},
			debug : {txt:'Mode debug', action:'CurrentGameObject.toggleDebug()', bc:'#111', px:"right", py:"top"},
			revert : {txt:'Mode revert', action:'CurrentGameObject.toggleTime()', bc:'#111', px:"right", py:"top"}
		}
	},
	map : {
		p1 : {
			e1 : {x:10,y:22,w:10,h:1,sx:1,sy:0},
			e2 : {x:25,y:22,w:10,h:1,sx:1,sy:0},
			e3 : {x:40,y:22,w:10,h:1,sx:1,sy:0},
		},
	},
	back : ['f16529','F15129','E44C26','CA4422','A4371B','782611']
}