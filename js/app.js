'use strict';

    Physijs.scripts.worker = 'js/physijs_worker.js';
    Physijs.scripts.ammo = 'ammo.js';

    var initScene, render, renderer, scene, camera, box, balls, walls,camera2 ,ps1 = 0, ps2 = 0;
    var paddle1, paddle2, paddleType, paddleDist, keyboardControls, rotX, rotY;
    var paddleSpeed, rotateLimit, controllerThreshold;
    var MAX_SCORE = 7;
    paddleType = 1;
    function initScene() {
        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize( window.innerWidth, window.innerHeight );
        renderer.shadowMapEnabled = true;
    	renderer.shadowMapSoft = true;
		renderer.autoClear = false;
        rotX = 0;
        rotY = 0;
    	paddleDist = 480;
        keyboardControls = new THREEx.KeyboardState();
        paddleSpeed = 375;
        rotateLimit = .5;
        controllerThreshold = .2;

        document.getElementById( 'viewport' ).appendChild( renderer.domElement );

        scene = new Physijs.Scene;
        scene.setGravity(new THREE.Vector3( 0, 0, 0 ));
        camera = new THREE.PerspectiveCamera(
            45,
            window.innerWidth / window.innerHeight,
            1,
            10000
        );
        camera.position.set(0, 250, 1200);
        camera.lookAt(new THREE.Vector3(0,250,0));
        camera2 = new THREE.PerspectiveCamera(
            45,
            window.innerWidth / window.innerHeight,
            1,
            10000
        );
        camera2.position.set(0, 250, -1200);
        camera2.lookAt(new THREE.Vector3(0,250,0));
        scene.add(camera);
        scene.add(camera2);
        var light = new THREE.DirectionalLight(0xdfebff, .1);
	    light.position.set(0, 1000, 0);

	    light.castShadow = true;
	    //light.shadowCameraVisible = true;

	    light.shadowMapWidth = 500;
	    light.shadowMapHeight = 500;

	    var d = 500;

	    light.shadowCameraLeft = -d;
	    light.shadowCameraRight = d;
	    light.shadowCameraTop = d;
	    light.shadowCameraBottom = -d;

	    light.shadowCameraFar = 1000;
	    light.shadowDarkness = 0.5;

	    scene.add(light);
	    var light2 = new THREE.DirectionalLight(0xdfebff, .1);
	    light2.position.set(0, -1000, 0);
	    scene.add(light2);
		var p = new THREE.PointLight(0x005500,2.0);
		p.position = new THREE.Vector3(0,250,-700);
		scene.add(p);
		var p2 = new THREE.PointLight(0x005500,2.0);
		p.position = new THREE.Vector3(0,250,700);
		scene.add(p);
        walls = getWorld();

        for(var wall in walls){
        	scene.add(walls[wall]);
        }
        balls = getBalls(1);
        paddle1 = getPaddle(paddleDist, paddleType);
        paddle2 = getPaddle(-paddleDist, paddleType);
        requestAnimationFrame( render );
    };
    var count = 100;
    var degree = 1;
    render = function() {
        var x = 0;
        var y = 0;
        var rotX = 0;
        var rotY = 0;
        if(!Gamepad.getState(0))
        {
            //Update paddle position
            if(keyboardControls.pressed("a"))
                x = -paddleSpeed;
            else if(keyboardControls.pressed("d"))
                x = paddleSpeed;

            if(keyboardControls.pressed("s"))
                y = -paddleSpeed;
            else if(keyboardControls.pressed("w"))
                y = paddleSpeed;

            if(keyboardControls.pressed("left"))
                rotX += rotateLimit;
            else if(keyboardControls.pressed("right"))
                rotX += -rotateLimit;

            if(keyboardControls.pressed("up"))
                rotY += -rotateLimit;
            else if(keyboardControls.pressed("down"))
                rotY += rotateLimit;
        }
        else
        {
            var controller = Gamepad.getState(0);
            if(controller.start.pressed === true)
                window.location.reload();
            if(Math.abs(controller.leftStickX) >= controllerThreshold)
                x = controller.leftStickX*paddleSpeed;
            if(Math.abs(controller.leftStickY) >= controllerThreshold)
                y = controller.leftStickY*-paddleSpeed;
            if(Math.abs(controller.rightStickX) >= controllerThreshold)
                rotX = controller.rightStickX*-rotateLimit;
            if(Math.abs(controller.rightStickY) >= controllerThreshold)
            rotY = controller.rightStickY*rotateLimit;
        }

        updatePaddlePos(paddle1, x, y, paddleDist)
        updatePaddlePos(paddle2, -x, y, -paddleDist);
        rotatePaddle(paddle1, rotX, rotY);
        rotatePaddle(paddle2, rotX, -rotY);
        paddle2.setLinearVelocity(new THREE.Vector3(-x, y, 0));
        
        //Check end zone
    	checkEndZone();
        scene.simulate(); // run physics
        var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
		camera.aspect = 0.5 * SCREEN_WIDTH / SCREEN_HEIGHT;
		camera2.aspect = 0.5 * SCREEN_WIDTH / SCREEN_HEIGHT;
		camera.updateProjectionMatrix();
		camera2.updateProjectionMatrix();
		
		// setViewport parameters:
		//  lower_left_x, lower_left_y, viewport_width, viewport_height

		renderer.setViewport( 0, 0, SCREEN_WIDTH, SCREEN_HEIGHT );
        
		renderer.clear();
		
		// left side
		renderer.setViewport( 1, 1,   0.5 * SCREEN_WIDTH - 2, SCREEN_HEIGHT - 2 );
		renderer.render( scene, camera );
		
		// right side
		renderer.setViewport( 0.5 * SCREEN_WIDTH + 1, 1,   0.5 * SCREEN_WIDTH - 2, SCREEN_HEIGHT - 2 );
		renderer.render( scene, camera2 );
        if(ps1<MAX_SCORE&&ps2<MAX_SCORE){	
		  requestAnimationFrame( render );
        }
        else{
            if(ps1===MAX_SCORE){
                $("#win").html("One");
                $("#lose").html("Two");
            }
            else if(ps2===MAX_SCORE){
                $("#win").html("Two");
                $("#lose").html("One");
            }
            $("#gameover").show();
        }
        
    };

    var checkEndZone = function(){
        for(var i = 0; i < balls.length; i++){
            var ball = balls[i];
            if(ball.position.z > 505){
                resetBall(ball, -1);
                ps2++;
                $("#ps2").html(ps2);
            }else if(ball.position.z < -505){
                resetBall(ball, 1);
                ps1++;
                $("#ps1").html(ps1);
            }
        }
    }
    $(function(){
        $("#play").click(function(){
            $("#begin").hide();
            paddleType = parseInt($("input[type='radio'][name='paddle']:checked").val());
            MAX_SCORE  = parseInt($("#maxscore").val());
            $("#bestOf").html(MAX_SCORE);
            initScene();
        });
    });
