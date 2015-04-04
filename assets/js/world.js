getWorld = function(scene){	
		var walls=[];
		var ground_material = new THREE.MeshLambertMaterial();
		
        var ground1 = new Physijs.BoxMesh(
			new THREE.BoxGeometry(500, 1, 1000),
			//new THREE.PlaneGeometry(500, 500),
			ground_material,
			0 // mass
		);
		ground1.receiveShadow = true;
		walls.push( ground1 );
		var ground2 = new Physijs.BoxMesh(
			new THREE.BoxGeometry(500, 1, 1000),
			//new THREE.PlaneGeometry(500, 500),
			ground_material,
			0 // mass
		);
		ground2.receiveShadow = true;
		ground2.position.x = -250;
		ground2.position.y = 250;
		ground2.rotation.z = Math.PI/2;
		walls.push( ground2 );
		var ground3 = new Physijs.BoxMesh(
			new THREE.BoxGeometry(500, 1, 1000),
			//new THREE.PlaneGeometry(500, 500),
			ground_material,
			0 // mass
		);
		ground3.position.x = 250;
		ground3.position.y = 250;
		ground3.rotation.z = -Math.PI/2;
		ground3.receiveShadow = true;
		walls.push( ground3 );
		var ground4 = new Physijs.BoxMesh(
			new THREE.BoxGeometry(500, 1, 1000),
			//new THREE.PlaneGeometry(500, 500),
			ground_material,
			0 // mass
		);
		ground4.position.y = 500;
		ground4.receiveShadow = true;
		walls.push( ground4 );
		var ground5 = new Physijs.BoxMesh(
			new THREE.BoxGeometry(500, 1, 500),
			//new THREE.PlaneGeometry(500, 500),
			ground_material,
			0 // mass
		);
		ground5.rotation.x = -Math.PI/2;
		ground5.position.y = 250;
		ground5.position.z = 500;
		ground5.receiveShadow = true;
		walls.push( ground5);
		
		var ground6 = new Physijs.BoxMesh(
			new THREE.BoxGeometry(500, 1, 500),
			//new THREE.PlaneGeometry(500, 500),
			ground_material,
			0 // mass
		);
		ground6.rotation.x = Math.PI/2;
		ground6.position.y = 250;
		ground6.position.z = -500;
		ground6.receiveShadow = true;
		walls.push( ground6 );

		return walls;
}