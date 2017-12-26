/**
 * Story state.
 */
function Story() {
	Phaser.State.call(this);
}

/** @type Phaser.State */
var proto = Object.create(Phaser.State);
Story.prototype = proto;


Story.prototype.preload = function() {
	this.load.pack("start", "assets/assets-pack.json");
};

Story.prototype.create = function() {
	
	this.sprite = this.add.sprite(this.world.centerX, this.world.centerY,
			"s1540");
	this.music = this.add.sound("story") ;
    this.music.allowMultiple=true ;
    this.music.play() ;
	this.sprite.anchor.set(0.5, 0.5);
	
	this.time.events.add(7000,this.showS2,this);
	
	this.input.onDown.add(this.startGame,this);
};
Story.prototype.showS2 = function() {
	this.sprite.kill();
	this.sprite = this.add.sprite(this.world.centerX, this.world.centerY,
	"s2540");
    this.sprite.anchor.set(0.5, 0.5);	
    this.time.events.add(7000,this.showS3,this);
};

Story.prototype.showS3 = function() {
	this.sprite.kill();
	this.sprite = this.add.sprite(this.world.centerX, this.world.centerY,
	"s3540");
    this.sprite.anchor.set(0.5, 0.5);	
    this.time.events.add(7000,this.startGame,this);
};





Story.prototype.startGame = function() {
	this.game.sound.stopAll();
	this.game.state.start("Menu");
};