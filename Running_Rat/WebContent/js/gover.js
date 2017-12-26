function gover() {
	Phaser.State.call(this);
}

/** @type Phaser.State */
var proto = Object.create(Phaser.State);
gover.prototype = proto;


gover.prototype.preload = function() {
	this.load.pack("start", "assets/assets-pack.json");
};

gover.prototype.create = function() {
	
	this.music = this.add.sound("gover") ;
	this.music.loop =  true;
    this.music.allowMultiple=true ;
    this.music.play() 
	
	this.sprite = this.add.sprite(500,250,"g_over");
	this.sprite.anchor.set(0.5, 0.5);
	

	
	var re_re = this.add.sprite(600, 1000,"re");
	
	re_re.inputEnabled = true;
	
	re_re.events.onInputDown.add(this.backLevel, this);
	
	var twn = this.add.tween(re_re);
	twn.to({y:300}, 1000, "Power0", true,0);
	
	this.g_over = this.add.sound("gameover");
    this.g_over.play() ;
	
};


gover.prototype.backLevel = function(){
	this.game.sound.stopAll();
	this.game.state.start("Level");
};



