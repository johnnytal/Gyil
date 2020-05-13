function create(){
    var gyil = this.add.sprite(WIDTH / 2, HEIGHT / 2, 'gyil');
    gyil.setScale(.8);
    
    notes = ['a', 'b', 'c', 'd', 'e', 'f', 'g']; 
    colors = [0xFDEC9E, 0xE9A43C, 0xB77A29, 0xBEAF18, 0x799D31, 0x799D31, 0x118800];
    coords = [[gyil.x - 232, gyil.y], [gyil.x - 141, gyil.y - 12], [gyil.x - 55, gyil.y - 12], 
    [gyil.x + 27, gyil.y - 5], [gyil.x + 108, gyil.y - 12], [gyil.x + 180, gyil.y - 15], [gyil.x + 248, gyil.y - 25]];

    for (x = 0; x < notes.length; x++){
	    var gyilNote = this.add.sprite(coords[x][0], coords[x][1], notes[x]).setInteractive();
	    gyilNote.setScale(0.85);

	 	gyilNote.on('pointerdown', function (pointer) {
	        playNote(this); 
	    });
	 	gyilNote.on('pointerover', function (pointer) {
	 		if (pointer.isDown){
	        	playNote(this); 
	        }
	    });

	    gyilNote.on('pointerup', function (pointer) {
	        this.clearTint();
	    });
	    gyilNote.on('pointerout', function (pointer) {
	        this.clearTint();
	    });
    }
    
    plugIns();
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
	
	initAd();
}

function initAd(){
	admobid = {
    	banner: 'ca-app-pub-9795366520625065/6208375739'
    };
    
    try{
	    if(AdMob) AdMob.createBanner({
		    adId: admobid.banner,
		    position: AdMob.AD_POSITION.TOP_BOTTOM,
	    	autoShow: true
		});
	} catch(e){}
}
