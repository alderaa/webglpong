getBall = function(){	
	
    var ball = new Physijs.SphereMesh(
        new THREE.SphereGeometry(10, 30, 30),
        new THREE.MeshLambertMaterial({color:new THREE.Color( 0xff0000 )}),
        1
    );
    ball.position.y = 250;
	scene.add( ball );
	ball.castShadow = true;
	ball.receiveShadow = false;
	var vel = new THREE.Vector3(Math.random()*100+100,Math.random()*100+100,Math.random()*100+100);
	socket.emit('bounce',vel);
    ball.addEventListener( 'collision', function( other_object, relative_velocity, relative_rotation, contact_normal) {
	   	var audio = new Audio('pong.wav');
		audio.play();
	   	var incoming = new THREE.Vector3(1.02 * (-ball.getLinearVelocity().x), 1.02 * (-ball.getLinearVelocity().y), 1.02*(-ball.getLinearVelocity().z));
	   	var newVel = incoming.reflect(contact_normal);
	   	socket.emit('bounce', newVel);
	});
		
    return ball;
};

resetBall = function(ball, direction){
	ball.position.set(0,250,0);
	ball.__dirtyPosition = true;
	var newVel = new THREE.Vector3(Math.random()*100+100, Math.random()*100+100, direction*(Math.random()*100+100));
	socket.emit('bounce', newVel);
}