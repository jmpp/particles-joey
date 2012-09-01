//Alias document.getElementById
var $ = function(id){
	return document.getElementById(id);
}

//Alias console.log
var log = function(msg){
	console.log(msg);
}

//Affichage du fps
var renderFPS = function(fps){
	//Dessine le fps sur le fond de couleur
	Txt({x:CANVAS.w - 40, y:15, w:CANVAS.w - 45, t:fps+' fps', c:'#DDD'});
}