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
	}
}