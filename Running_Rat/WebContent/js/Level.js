/**
 * Level state.
 */

function Level() {
	Phaser.State.call(this);
}

/** @type Phaser.State */
var proto = Object.create(Phaser.State);
Level.prototype = proto;


Level.prototype.create = function() {
	this.game.physics.startSystem(Phaser.Physics.ARCADE);
	this.game.physics.arcade.gravity.y = 1000;
	
	
	this.bg = this.game.add.sprite(0, 0, "bg");
	this.bg.fixedToCamera = true;
	this.bg.width = this.game.width;
	this.bg.height = this.game.height;

	this.map = this.game.add.tilemap("pro_test");
	this.map.addTilesetImage('tile_set');

	this.maplayer1 = this.map.createLayer("Tile Layer 1");
	this.maplayer2 = this.map.createLayer("Tile Layer 2");
	//this.maplayer1 = this.map.createLayer("Tile Layer 1");
	

	this.maplayer1.resizeWorld();
	this.maplayer2.resizeWorld();



	this.map.setCollisionBetween(0,9999,true,this.maplayer1);
	this.map.setCollisionBetween(0,9999,true,this.maplayer2);
	
	
	this.music = this.add.sound("music") ;
	this.music.loop =  true;
    this.music.allowMultiple=true ;
    this.music.play() 


	this.enemies = this.add.group();
	this.cap1 = this.add.group();
	this.kabduk = this.add.group();
	
	for (x in this.map.objects.Object) {
		var obj = this.map.objects.Object[x];
		if (obj.type == "player") {
			console.log(this.player);
			this.player = this.addPlayer(obj.x, obj.y);
			this.game.camera.follow(this.player,
					Phaser.Camera.FOLLOW_PLATFORMER);
			this.player.play("idle");
		} else if (obj.type == "enemy1") {
			var c = this.addEnemy1(obj.x, obj.y);
			this.enemies.add(c);
		} else if (obj.type == "enemy2") {
			var c = this.addEnemy2(obj.x, obj.y);
			this.enemies.add(c);
		}else if (obj.type == "pri") {
			var c = this.addPrince(obj.x, obj.y);
			this.enemies.add(c);
		}else if (obj.type == "dead") {
			var c = this.addDead1(obj.x, obj.y);
			this.kabduk.add(c);
		}else if (obj.type == "dead1") {
			var c = this.addDead2(obj.x, obj.y);
			this.kabduk.add(c);
		}else if (obj.type == "dead2") {
			var c = this.addDead3(obj.x, obj.y);
			this.kabduk.add(c);
		}else if (obj.type == "goal") {
		}
	}
	
	this.cap1.count = 0;
	this.player.hp = 3;

	
	this.game.time.events.add(Phaser.Timer.MINUTE * 1.5, this.onPlayerKilled, this);
	this.player.events.onKilled.addOnce(this.onPlayerKilled,this);
	this.player.canhit = true;
	this.player.inputEnabled = true;
	this.physics.enable(this.player, Phaser.Physics.ARCADE);
	this.cursors = this.input.keyboard.createCursorKeys();
	this.player.inputEnabled = true;
	this.cap1.enableBody = true;
	
	
};


Level.prototype.update = function() {
	if(this.gameover) return;
	if(this.player == null) return;

	
	this.game.physics.arcade.collide(this.player, this.maplayer1);
	this.game.physics.arcade.collide(this.enemies, this.maplayer1);
	this.game.physics.arcade.collide(this.cap1, this.maplayer1);
	this.game.physics.arcade.collide(this.kabduk, this.maplayer1);
	
	this.physics.arcade.collide(this.player,this.enemies,this.onPlayerKilled,null,this);
	this.physics.arcade.collide(this.player,this.kabduk,this.onPlayerKilled,null,this);
	this.game.physics.arcade.overlap(this.player, this.cap1, this.collectCap, null, this);
	
	
	
	
	// ควบคุมการเคลื่อนที่ของ play โดยการกดที่หน้าจอ
	// อ่าน activePointer คือจุดที่ก าลังกด
	if(this.player.body.onFloor()){
		if (this.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
			this.player.body.velocity.x = 400;
			this.player.play("walk");
			this.player.scale.set(0.2);
			this.player.scale.x = 1;
			//this.player.body.drag.setTo(500, 0);
		} else if (this.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
			this.player.body.velocity.x = -400;
			this.player.play("walk");
			this.player.scale.set(0.2);
			this.player.scale.x = -1;
			
			//this.player.body.drag.setTo(500, 0);
		} else {
			this.player.body.velocity.x = 1;
			this.player.play("idle");
			this.player.scale.set(0.2);
			//this.player.scale.x = -1;
			
		}
		
		if (this.input.keyboard.isDown(Phaser.Keyboard.UP)) {
			this.player.body.velocity.y = -800;
			this.player.body.velocity.x = 400;
			this.player.play("jump");
			this.player.scale.set(0.2);
			//this.player.scale.x = -1;
			//this.player.body.drag.setTo(0, 0);
			if (this.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
				this.player.body.velocity.x = 150;
				this.player.play("walk");
				this.player.scale.set(0.2);
				this.player.scale.x = -1;
				
				
				
			} else if (this.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
				this.player.body.velocity.x = -150;
				this.player.play("walk");
				this.player.scale.set(0.2);
				this.player.scale.x = 1;
				//this.player.body.drag.setTo(0, 0);
			}
		}
		
	}
	
	
};

Level.prototype.onPlayerKilled = function(){
	this.game.sound.stopAll();
	this.game.state.start("gover");

	};
	
	

  
  
Level.prototype.Next  = function () {
	 this.game.sound.stopAll();
	 this.game.state.start("Level2");
	 };
	  

Level.prototype.addPlayer = function(x, y) {
	j = this.add.sprite(x, y, "hero");
	j.anchor.set(0.5, 1);
	j.scale.set(1);
	j.animations.add('idle',genframes('Idle',9),12,true);
	j.animations.add('walk',genframes('Walk',9),12,true);
	
	this.game.physics.enable(j);
	j.play("idle");
	j.body.collideWorldBounds = true;
	return j;
};

Level.prototype.addEnemy1 = function(x, y) {
	c = this.add.sprite(x,y, "enemy1");
	//c.scale.set(0.4);
	c.animations.add("Idle", mframe("Idle",10), 10, true);
	c.animations.add("Jump", mframe("Jump",8), 8, true);
	c.animations.add("Run", mframe("Run",8), 8, true);
	c.play("Idle");
	c.anchor.set(0,0.9);
	c.scale.set(2);
	this.game.physics.enable(c);
	c.body.collideWorldBounds = true;
	return c;
	};
	
Level.prototype.addEnemy2 = function(x, y) {
	c = this.add.sprite(x, y, "enemy2");
	c.animations.add("Idle", genframes("Idle",12), 12, true);
	c.animations.add("Attack", genframes("Attack",12), 12, true);
	c.play("Idle");
	c.anchor.set(0,0.8);
	c.scale.set(1);
	this.game.physics.enable(c);
	c.body.collideWorldBounds = true;
	return c;
	};
	
Level.prototype.addPrince = function(x, y) {
		c = this.add.sprite(x, y, "pri");
		c.animations.add("Idle", genframes("Idle",12), 12, true);
		c.play("Idle");
		c.anchor.set(0,0.9);
		c.scale.set(1);
		this.game.physics.enable(c);
		c.body.collideWorldBounds = true;
		return c;
		};

Level.prototype.addCap1 = function(x, y) {
	c = this.add.sprite(x, y, "Cap");
	c.anchor.set(0,0.9);
	c.smoothed = false;
	this.game.physics.enable(c);
	return c;
};

Level.prototype.addDead1 = function(x, y) {
	c = this.add.sprite(x, y, "water");
	c.anchor.set(0,0.5);
	c.smoothed = false;
	this.game.physics.enable(c);
	return c;
};

Level.prototype.addDead2 = function(x, y) {
	c = this.add.sprite(x, y, "spike");
	c.anchor.set(0,0.9);
	c.smoothed = false;
	this.game.physics.enable(c);
	return c;
};

Level.prototype.addDead3 = function(x, y) {
	c = this.add.sprite(x, y, "water2");
	c.anchor.set(0,0.9);
	c.smoothed = false;
	this.game.physics.enable(c);
	return c;
};



function gframes(key, n) {
	var f = [];
	for (var i = 0; i <= n; i++) {
		var kf = key + "_" + (("00" + i).slice(-3));
		f.push(kf);
	}
	return f;

}

function genframes(key,n){
	var f=[ ];
	for(var i=0;i<=n;i++){
	var kf=key+"_"+(("00" + i).slice (-3));
	f.push(kf);
	}
	return f;
};
function mframe(key, n) {
	f = [];
	for (var i = 1; i < n; i++) {
		f.push(key + " (" + i + ")");
	}
	return f;
}

function zframe(key, n) {
	f = [];
	for (var i = 1; i < n; i++) {
		f.push(key +i);
	}
	return f;
}

Level.prototype.hitEnemy = function(p, x) {
	p.damage(1);
};

Level.prototype.quitGame = function() {
	this.game.state.start("Menu");
};

	
	