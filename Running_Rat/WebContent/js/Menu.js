/**
 * Menu state.
 */
function Menu() {
	Phaser.State.call(this);
}

/** @type Phaser.State */
var proto = Object.create(Phaser.State);
Menu.prototype = proto;

Menu.prototype.preload = function() {
	this.load.pack("start", "assets/assets-pack.json");
};

Menu.prototype.create = function() {
	this.bg = this.game.add.sprite(3,10, "bgg540");
	this.bg.fixedToCamera = true;
	this.bg.width = this.game.width;
	this.bg.height = this.game.height;
	
	this.music = this.add.sound("music") ;
	this.music.loop =  true;
    this.music.allowMultiple=true ;
    this.music.play() 
	
	var cx=this.world.centerX;
	var mstart = this.add.sprite(cx,250,"mstart");
	var mstory = this.add.sprite(cx,350,"mstory");
	var mteam = this.add.sprite(cx,350+50*2,"mteam");

	mstart.scale.set(0.4);
	mstory.scale.set(0.5);
	mteam.scale.set(0.4);
	
	
	mstart.anchor.set(0.5, 0.5);
	mstory.anchor.set(0.5, 0.5);
	mteam.anchor.set(0.5, 0.5);
	
	
	mstart.inputEnabled = true;
	mstory.inputEnabled = true;
	mteam.inputEnabled = true;
	
	
	mstart.events.onInputDown.add(this.startLevel, this);
    mstory.events.onInputDown.add(this.startStory, this);
    mteam.events.onInputDown.add(this.startTeam, this); 
  
};

Menu.prototype.startLevel = function(){
	this.game.sound.stopAll();
	this.game.state.start("Level");
};
Menu.prototype.startStory = function(){
	this.game.sound.stopAll();
	this.game.state.start("Story");
};
Menu.prototype.startTeam = function(){
	this.game.sound.stopAll();
	this.game.state.start("Team");
};


