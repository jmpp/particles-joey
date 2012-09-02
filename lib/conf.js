var CONF = {
	/*MENU*/
	menu : {
		//HOME
		home : {
			play : {txt:'Play', action:'CurrentGameObject=game', bc:'#00F'},
			howto : {txt:'How to', action:'log("Clic howto")', bc:'#0F0'},
			credits : {txt:'Credits', action:'log("Clic credits")', bc:'#F00'}
		},
		//GAME
		game : {
			pause : {txt:'Pause', action:'CurrentGameObject=menu', bc:'#000', px : "right", py : "top"}
		}
	},
	map : {
		p1 : {
			e1 : {x:1,y:0,w:10,h:1},
			e2 : {x:4,y:1,w:2,h:2},
			e3 : {x:7,y:4,w:1,h:7},
		}
	}
}