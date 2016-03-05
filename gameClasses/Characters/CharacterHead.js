// Define our player character head container classes
var CharacterHead = IgeEntity.extend({
	classId: 'CharacterHead',

	init: function (container) {
		var self = this, fps;
		IgeEntity.prototype.init.call(this);
		
		//Set the container (body)
		self._container = container;

		//Create the entity
		self.isometric(true)
			.addComponent(AnimatorComponent)
			.depth(4)
			.bounds3d(45, 45, 45)
			.anchor(0, -45);

		var	start 		= 'h',
			action		= 'std',
			part 		= 'hd',
			style 		= container.data('style'),
			direction 	= '3',
			subsection  = '0';

		self.texture(ige.gameTexture.people)
			.cellById(start+'_'+action+'_'+part+'_'+style+'_'+direction+'_'+subsection+'.png.png')
			.dimensionsFromCell();

		//Spawn the hair
		self.hair = new CharacterHair(self);

		//Spawn the eyes
		self.eyes = new CharacterEyes(self);

		//Spawn the mouth
		self.mouth = new CharacterMouth(self);


		//Initilize the animations
		// fps = 5.5;
		// this.animation.define('NE', [1], fps, -1)
		// 	.animation.define('NW', [8], fps, -1)
		// 	.animation.define('W',  [7], fps, -1)
		// 	.animation.define('E',  [2], fps, -1)
		// 	.animation.define('SW', [6], fps, -1)
		// 	.animation.define('SE', [3], fps, -1)
		// 	.animation.define('S',  [4], fps, -1)
		// 	.animation.define('N',  [5], fps, -1);

		// //Listen for the changeDirection event so we can change
		// //the heads animation
		// container.on('onChangedDirection', function (ctn, dir) { self.changedDirection(ctn, dir); });
		// container.on('onRest', function() { self.rest(); });

		//Finally mount to the container (body)
		self.mount(container);
	},

	changedDirection: function(container, direction) {
		switch(direction) {
			case 'NE': 	this.anchor(-2, -45); 	break;
			case 'NW': 	this.anchor(0, -45); 	break;
			case 'W': 	this.anchor(2, -45); 	break;
			case 'E': 	this.anchor(-2, -45); 	break;
			case 'SW': 	this.anchor(2, -46); 	break;
			case 'SE': 	this.anchor(0, -47); 	break;
			case 'S': 	this.anchor(-2, -45); 	break;
			case 'N': 	this.anchor(0, -43); 	break;
			default:
		}

		this.animation.select(direction);
	},
	rest: function() {
		this.animation.stop();
	},
});