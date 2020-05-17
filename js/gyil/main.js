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
	    
        var BtnStick = this.add.sprite(100, 100, 'btn_stick').setInteractive().setScale(0.65);
        var BtnMallet = this.add.sprite(100, 250, 'btn_mallet').setInteractive().setScale(0.65);
        var BtnBoth = this.add.sprite(100, 400, 'btn_both').setInteractive().setScale(0.65);
        
	 	BtnStick.on('pointerdown', function (pointer) {
	        toggleStick(this); 
	    });
	 	BtnMallet.on('pointerdown', function (pointer) {
	        toggleStick(this); 
	    });
	 	BtnBoth.on('pointerdown', function (pointer) {
	        toggleStick(this); 
	    });
	    
    	stickStates = [BtnStick, BtnMallet, BtnBoth];
		stickState = stickStates[0].texture.key;
		BtnStick.setTint(colors[1]);

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
    initAd();
}

function playNote(_note){
	var key = _note.texture.key;
	var keyPlace = notes.indexOf(key);
	
	_note.setTint(colors[keyPlace]);
	
	if (stickState == 'btn_mallet') game.sound.playAudioSprite('gyilSpriteMallet', key);
	else if (stickState == 'btn_stick') game.sound.playAudioSprite('gyilSpriteStick', key);
	else if (stickState == 'btn_both') game.sound.playAudioSprite('gyilSpriteBoth', key);
}

function toggleStick(_this){
	for (k = 0; k < stickStates.length; k++){
		stickStates[k].clearTint();
		stickState = _this.texture.key;
		_this.setTint(colors[1]);
	}
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
	    position: AdMob.AD_POSITION.BOTTOM_CENTER,
    	autoShow: true
	});
}
