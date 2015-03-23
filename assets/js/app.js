var basicScene;
var BasicScene = Class.extend({
    // Class constructor
    init: function () {
        'use strict';
        // Create a scene, a camera, a light and a WebGL renderer with Three.JS
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(45, 1, 0.1, 10000);
        this.scene.add(this.camera);
        this.light = new THREE.PointLight();
        this.light.position.set(-300, 0, 500);
        this.scene.add(this.light);
        this.renderer = new THREE.WebGLRenderer({ antialiasing: true });
        // Define the container for the renderer
        this.container = $('#basic-scene');
        // Create the user's character
        this.user = new Character({
            color: 0x7A43B6
        });
        this.paddle = new Paddle({
            color: 0x00CC00
        });
        this.scene.add(this.user.mesh);
        this.scene.add(this.paddle.mesh);
        // Create the "world" : a 3D representation of the place we'll be putting our character in
        this.world = new World({
            color: 0xF5F5F5,
        },this.renderer);
        this.scene.add(this.world.mesh);
        // Define the size of the renderer
        this.setAspect();
        // Insert the renderer in the container
        this.container.prepend(this.renderer.domElement);
        // Set the camera to look at our user's character
        this.setFocus(this.user.mesh);
        // Start the events handlers
        this.setControls();
    },
    // Event handlers
    setControls: function () {
        'use strict';
        // Within $'s methods, we won't be able to access "this"
        var user = this.user,
            paddle = this.paddle,
            // State of the different controls
            controls = {
                left: false,
                up: false,
                right: false,
                down: false,
                paddleUp: false,
                paddleDown: false,
                paddleLeft: false,
                paddleRight: false
            };
        // When the user push a key down
        $(document).keydown(function (e) {
            var prevent = true;
            // Update the state of the attached control to "true"
            switch (e.keyCode) {
            case 37:
                controls.left = true;
                break;
            case 38:
                controls.up = true;
                break;
            case 39:
                controls.right = true;
                break;
            case 40:
                controls.down = true;
                break;
            case 87:
                //w
                controls.paddleUp = true;
                break;
            case 65:
                //a
                controls.paddleLeft = true;
                break;
            case 83:
                //s
                controls.paddleDown = true;
                break;
            case 68:
                //d
                controls.paddleRight = true;
                break;
            default:
                prevent = false;
            }
            // Avoid the browser to react unexpectedly
            if (prevent) {
                e.preventDefault();
            } else {
                return;
            }
            // Update the character's direction
            user.setDirection(controls);
            paddle.setRotation(controls);
        });
        // When the user release a key up
        $(document).keyup(function (e) {
            var prevent = true;
            // Update the state of the attached control to "false"
            switch (e.keyCode) {
            case 37:
                controls.left = false;
                break;
            case 38:
                controls.up = false;
                break;
            case 39:
                controls.right = false;
                break;
            case 40:
                controls.down = false;
                break;
            case 87:
                //w
                controls.paddleUp = false;
                break;
            case 65:
                //a
                controls.paddleLeft = false;
                break;
            case 83:
                //s
                controls.paddleDown = false;
                break;
            case 68:
                //d
                controls.paddleRight = false;
                break;
            default:
                prevent = false;
            }
            // Avoid the browser to react unexpectedly
            if (prevent) {
                e.preventDefault();
            } else {
                return;
            }
            // Update the character's direction
            user.setDirection(controls);
            paddle.setRotation(controls);
        });
        // On resize
        $(window).resize(function () {
            // Redefine the size of the renderer
            basicScene.setAspect();
        });
    },
    // Defining the renderer's size
    setAspect: function () {
        'use strict';
        // Fit the container's full width
        var w = this.container.width(),
            // Fit the initial visible area's height
            h = $(window).height();
        // Update the renderer and the camera
        this.renderer.setSize(w, h);
        this.camera.aspect = w / h;
        this.camera.updateProjectionMatrix();
    },
    // Updating the camera to follow and look at a given Object3D / Mesh
    setFocus: function (object) {
        'use strict';
        this.camera.position.set(0, 2000, 0);
        this.camera.lookAt(new THREE.Vector3(0,0,0));
    },
    // Update and draw the scene
    frame: function () {
        'use strict';
        // Run a new step of the user's motions
        this.user.motion();
        this.paddle.motion();
        // Set the camera to look at our user's character
        this.setFocus(this.user.mesh);
        // And draw !
        this.renderer.render(this.scene, this.camera);
        
    }
});
