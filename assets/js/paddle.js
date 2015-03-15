var Paddle = Class.extend({
	// Class constructor
    init: function (args) {
        'use strict';
        //final variables
        this.MOVEMENT_FACTOR = .05;
        this.PADDLE_RESET = true;

        // Set the different geometries composing the humanoid
        var paddle = new THREE.CubeGeometry(100, 50, 5), 
        // Set the material, the "skin"
        material = new THREE.MeshLambertMaterial(args);
        // Set the character modelisation object
        this.mesh = new THREE.Object3D();
        // this.mesh.position.y = -200;
        // this.mesh.position.x = 350;
        // this.mesh.position.z = 300;
        // Set and add its paddle
        this.paddle = new THREE.Mesh(paddle, material);
        this.paddle.position.y = 0;
        this.mesh.add(this.paddle);
        
        this.direction = new THREE.Vector3(0, 0, 0);

        // Set the current animation step
        this.step = 0;
        // Set the rays : one vector for every potential direction
       
        this.angleX = 0;
        this.angleY = 0;
        this.rotatingX = 0;
        this.rotatingY = 0;
        console.log(this.paddle.position);
        // And the "RayCaster", able to test for intersections
        this.caster = new THREE.Raycaster();
    },
    // Process the character motions
    motion: function () {
        'use strict';
    	this.rotate();
    	return true;
 
    },
    // Update the direction of the current motion
    setRotation: function (controls) {
    	'use strict';
        // Either left or right, and either up or down (no jump or dive (on the Y axis), so far ...)
        var x = controls.paddleLeft ? -1 : controls.paddleRight ? 1 : 0,
            y = controls.paddleUp ? 1 : controls.paddleDown ? -1 : 0;
        this.rotatingX = x;
        this.rotatingY = y;

    },
    rotate: function (){
        'use strict';
        // Either left or right, and either up or down (no jump or dive (on the Y axis), so far ...)
        if(this.rotatingX !== 0)
        {
            if(this.rotatingX === -1 && this.angleX < Math.PI/2)
                this.angleX += this.MOVEMENT_FACTOR;
            else if(this.rotatingX === 1 && this.angleX > -Math.PI/2)
                this.angleX -= this.MOVEMENT_FACTOR;
        }
        else if(this.PADDLE_RESET)
        {
            if(this.angleX < 0)
            {
                 if(this.angleX > -this.MOVEMENT_FACTOR)
                    this.angleX = 0;
                else
                    this.angleX += this.MOVEMENT_FACTOR;
            }
            else if(this.angleX > 0)
            {
                if(this.angleX < this.MOVEMENT_FACTOR)
                    this.angleX = 0;
                else
                    this.angleX -= this.MOVEMENT_FACTOR;
            }
        }

        if(this.rotatingY !== 0)
        {
            if(this.rotatingY === -1 && this.angleY < Math.PI/2)
                this.angleY += this.MOVEMENT_FACTOR;
            else if(this.rotatingY === 1 && this.angleY > -Math.PI/2)
                this.angleY -= this.MOVEMENT_FACTOR;
        }
        else if(this.PADDLE_RESET)
        {
            if(this.angleY < 0)
            {
                if(this.angleY > -this.MOVEMENT_FACTOR)
                    this.angleY = 0;
                else
                    this.angleY += this.MOVEMENT_FACTOR;
            }
            else if(this.angleY > 0)
            {
                if(this.angleY < this.MOVEMENT_FACTOR)
                    this.angleY = 0;
                else
                    this.angleY -= this.MOVEMENT_FACTOR;
            }
        }
    	this.mesh.rotation.y = this.angleX;
        this.mesh.rotation.x = this.angleY;
        this.step += 1 / 4;
    }

});