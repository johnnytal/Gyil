function create(){
	this.cameras.main.setBackgroundColor(new Phaser.Display.Color(225, 255, 225));
    
    var gyil = this.add.sprite(400, 300, 'gyil');
    gyil.setScale(.8);
    //gyil.displayWidth=game.config.width*.5; gyil.scaleY=gyil.scaleX
    
    notes = ['a', 'b', 'c', 'd', 'e', 'f', 'g']; 
    colors = [0xFDEC9E, 0xE9A43C, 0xB77A29, 0xBEAF18, 0x799D31, 0x799D31, 0x118800];
    coords = [[168, 300], [259, 288], [345, 288], [427, 295], [508, 288], [580, 285], [648, 275]];

    for (x = 0; x < notes.length; x++){
	    var gyilNote = this.add.sprite(coords[x][0], coords[x][1], notes[x]).setInteractive();
	    gyilNote.setScale(0.85);
	    
	    gyilNote.on('pointerdown', function (pointer) {
	    	playNote(this);  
	    });
	    
	    gyilNote.on('pointerover', function (pointer) {
	    	playNote(this);  
	    });

	    gyilNote.on('pointerup', function (pointer) {
	        this.clearTint();
	    });
	    gyilNote.on('pointerout', function (pointer) {
	        this.clearTint();
	    });
    }
    
    plugIns();
    initAd();
}

function playNote(_note){
	var key = _note.texture.key;
	var keyPlace = notes.indexOf(key);
	
	_note.setTint(colors[keyPlace]);
	
	game.sound.playAudioSprite('gyilSprite', key);
}

function plugIns(){
	try{
		window.plugins.insomnia.keepAwake();
	} catch(e){}
	try{
	    StatusBar.hide();
	} catch(e){} 
}

function initAd(){
	admobid = {
    	banner: 'ca-app-pub-9795366520625065/6208375739'
    };
    
    if(AdMob) AdMob.createBanner({
	    adId: admobid.banner,
	    position: AdMob.AD_POSITION.TOP_BOTTOM,
    	autoShow: true
	});
}
