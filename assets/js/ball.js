getBalls = function(num){	
	for(var i=0;i<num;i++){
        var ball = new Physijs.SphereMesh(
	        new THREE.SphereGeometry(10, 30, 30),
	        new THREE.MeshLambertMaterial({color:new THREE.Color( 0xff0000 )}),
	        1
	    );
		ball.position.y =250;
		scene.add( ball );
		ball.castShadow = true;
		ball.receiveShadow = false;
        ball.setLinearVelocity(new THREE.Vector3(Math.random()*100+100,Math.random()*100+100,Math.random()*100+100));
        ball.addEventListener( 'collision', function( other_object, relative_velocity, relative_rotation, contact_normal) {
		   	var audio = new Audio('pong.wav');
			audio.play();
		   	var incoming = new THREE.Vector3(-ball.getLinearVelocity().x,-ball.getLinearVelocity().y,-ball.getLinearVelocity().z);
		   	var newVel = incoming.reflect(contact_normal);
		   	ball.setLinearVelocity(newVel);
		});
    }
};