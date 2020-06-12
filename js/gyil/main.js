function create(){
    var gyil = this.add.sprite(WIDTH / 2, HEIGHT / 2, 'gyil');
    gyil.setScale(.8);
    
    octave = '1';
    notes = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
    colors = [0xFDEC9E, 0xE9A43C, 0xB77A29, 0xBEAF18, 0x799D31, 0x799D31, 0x118800];
    coords = [[gyil.x - 232, gyil.y], [gyil.x - 141, gyil.y - 12], [gyil.x - 55, gyil.y - 12], 
    [gyil.x + 27, gyil.y - 5], [gyil.x + 108, gyil.y - 12], [gyil.x + 180, gyil.y - 15], [gyil.x + 248, gyil.y - 25]];

    for (x = 0; x < notes.length; x++){
	    var gyilNote = this.add.sprite(coords[x][0], coords[x][1], notes[x]).setInteractive();
	    gyilNote.setScale(0.85);
	    
        var BtnStick = this.add.sprite(100, 100, 'btn_stick').setInteractive();
        var BtnMallet = this.add.sprite(100, 250, 'btn_mallet').setInteractive();
        var BtnBoth = this.add.sprite(100, 400, 'btn_both').setInteractive();
       
        var BtnOct = this.add.sprite(100, 570, 'octave_btn').setInteractive();
        
	 	BtnOct.on('pointerdown', function (pointer) {
	       	if (octave == '1'){
	       		this.tint = 0xfaafff;
	       		octave = '2';
	       	}
	       	else{
	       		octave = '1';
	       		this.tint = 0xffffff;
	       	}
	       	
	   	 	var rnd = game.rnd.integerInRange(0, 16);
	   	 	if (rnd == 2){ 	 	 	
				if(AdMob) AdMob.showInterstitial();
		  	}
	    });
        
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
	var key = _note.texture.key + octave;
	var keyPlace = notes.indexOf(_note.texture.key);
	
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
	
 	var rnd = game.rnd.integerInRange(0, 15);
 	if (rnd == 2){ 	 	 	
		if(AdMob) AdMob.showInterstitial();
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
    	banner: 'ca-app-pub-9795366520625065/6208375739',
    	interstitial: 'ca-app-pub-9795366520625065/5423874698'
    };
    
    if(AdMob) AdMob.createBanner({
	    adId: admobid.banner,
	    adSize: AdMob.AD_SIZE.FLUID,
	    position: AdMob.AD_POSITION.BOTTOM_CENTER,
    	autoShow: true
	});
	
	if(AdMob) AdMob.prepareInterstitial( {adId:admobid.interstitial, autoShow:false} );
}
