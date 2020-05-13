document.addEventListener("deviceready", start, false);
document.addEventListener("pause", onPause, false);
document.addEventListener("resume", onResume, false);

window.onload = start;

function start(){ 
    WIDTH = 800; 
    HEIGHT = 600; 

	var config = {
	    type: Phaser.WEBGL,
	    parent: 'game',
	    width: WIDTH,
	    height: HEIGHT,
	    scene: {
	        preload: preload,
	        create: create
	    },
	    scale: {
		    parent: 'game',
		    mode: Phaser.Scale.FIT,
		    width: WIDTH,
		    height: HEIGHT
		}
	};
	
	game = new Phaser.Game(config);
}

function onPause(){
    game.paused = true;
}

function onResume(){
    game.paused = false;
    setTimeout(function(){
        try{
            StatusBar.hide();
        }catch(e){}   
    }, 1000);
}