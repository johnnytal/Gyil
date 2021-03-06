function create(){
    let image = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'bg');
	let scaleX = this.cameras.main.width / image.width;
	let scaleY = this.cameras.main.height / image.height;
	let scale = Math.max(scaleX, scaleY);
	image.setScale(scale).setScrollFactor(0);
    
    var gyil = this.add.sprite(WIDTH / 2 + 75, HEIGHT / 2, 'gyil');
    
    octave = '1';
    notes = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
    colors = [0xFEBCAD, 0xE9A43C, 0xB77A29, 0xBEAF18, 0x799D31, 0x799D31, 0x118800];
    coords = [[gyil.x - 232 - 170, gyil.y], [gyil.x - 141 - 99, gyil.y - 12], [gyil.x - 55 - 40, gyil.y - 12], 
    [gyil.x + 45, gyil.y - 20], [gyil.x + 185, gyil.y - 25], [gyil.x + 312, gyil.y - 28], [gyil.x + 423, gyil.y - 35]];

    for (x = 0; x < notes.length; x++){
	    var gyilNote = this.add.sprite(coords[x][0], coords[x][1], notes[x]).setInteractive();

        var BtnStick = this.add.sprite(80, 100, 'btn_stick').setInteractive();
        var BtnMallet = this.add.sprite(80, 265, 'btn_mallet').setInteractive();
        var BtnBoth = this.add.sprite(80, 430, 'btn_both').setInteractive();

        var BtnOct = this.add.sprite(this.cameras.main.width - 150, 560, 'octave_btn').setInteractive();
        
	 	BtnOct.on('pointerdown', function (pointer) {
	       	if (octave == '1'){
	       		this.tint = 0xf66fff;
	       		octave = '2';
	       	}
	       	else{
	       		octave = '1';
	       		this.tint = 0xffffff;
	       	}
	       	
	   	 	var rnd = Phaser.Math.Between(0, 15);
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
	
 	var rnd = Phaser.Math.Between(0, 15);
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
	    position: AdMob.AD_POSITION.BOTTOM_CENTER,
    	autoShow: true
	});
	
	if(AdMob) AdMob.prepareInterstitial( {adId:admobid.interstitial, autoShow:false} );
}
