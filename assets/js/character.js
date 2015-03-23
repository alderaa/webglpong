var Character = Class.extend({
    // Class constructor
    init: function (args) {
        'use strict';
        // Set the different geometries composing the humanoid
        var head = new THREE.SphereGeometry(10, 16, 16), 
        // Set the material, the "skin"
        material = new THREE.MeshLambertMaterial(args);
        // Set the character modelisation object
        this.mesh = new THREE.Object3D();
        this.mesh.position.y = 48;
        // Set and add its head
        this.head = new THREE.Mesh(head, material);
        this.head.position.y = 0;
        this.mesh.add(this.head);
        
        this.direction = new THREE.Vector3(.75, -.25, -.5).normalize();

        this.bounceCount = 0;

        // Set the rays : one vector for every potential direction
        this.rays = [
            new THREE.Vector3(0, 0, 1),
            new THREE.Vector3(1, 0, 0),
            new THREE.Vector3(0, 0, -1),
            new THREE.Vector3(-1, 0, 0),
            new THREE.Vector3(0, 1, 0),
            new THREE.Vector3(0,-1, 0)
        ];
        // And the "RayCaster", able to test for intersections
        this.caster = new THREE.Raycaster();
    },

    scalarCalc: function(){
        return 1 + this.bounceCount;
    },
    // Update the direction of the current motion
    setDirection: function (controls) {
        'use strict';
        // Either left or right, and either up or down (no jump or dive (on the Y axis), so far ...)
        // var x = controls.left ? -1 : controls.right ? 1 : 0,
        //     y = 0,
        //     z = controls.up ? -1 : controls.down ? 1 : 0;
        // this.direction.set(x, y, z);
    },
    // Process the character motions
    motion: function () {

        'use strict';
        // Update the directions if we intersect with an obstacle
        this.collision();
        // If we're not static
        if (this.direction.x !== 0 || this.direction.z !== 0) {
            // Rotate the character
            this.rotate();
            // Move the character
            this.move();
            return true;
        }
    },
    // Test and avoid collisions
    collision: function () {
        'use strict';
        var collisions, i, raysHit = 0,
            // Maximum distance from the origin before we consider collision
            distance = 32,
            // Get the obstacles array from our world
            obstacles = basicScene.world.getObstacles();
        // For each ray
        for (i = 0; i < this.rays.length; i += 1) {

            // We reset the raycaster to this direction
            this.caster.set(this.mesh.position, this.rays[i]);
            // Test if we intersect with any obstacle mesh
            collisions = this.caster.intersectObjects(obstacles);
            // And disable that direction if we do
            if (collisions.length > 0 && collisions[0].distance <= distance) {
                raysHit++;
                var face = collisions[0].face.normal.normalize();
                var cRay= this.rays[i].normalize();
                var reflect = cRay.reflect(face);
                this.direction.set(reflect.x, reflect.y, reflect.z);
                this.bounceCount++;
            }
            if(raysHit > 1){
                this.bounceCount--;
                this.presiceCollisions(this.direction.x,this.direction.y,this.direction.z);
                break;
            }
        }
    },
    // Rotate the character
    rotate: function () {
        'use strict';
        // Set the direction's angle, and the difference between it and our Object3D's current rotation
        var angle = Math.atan2(this.direction.x, this.direction.z),
            difference = angle - this.mesh.rotation.y;
        // If we're doing more than a 180°
        if (Math.abs(difference) > Math.PI) {
            // We proceed to a direct 360° rotation in the opposite way
            if (difference > 0) { this.mesh.rotation.y += 2 * Math.PI; } else { this.mesh.rotation.y -= 2 * Math.PI; }
            // And we set a new smarter (because shorter) difference
            difference = angle - this.mesh.rotation.y;
            // In short : we make sure not to turn "left" to go "right"
        }
        // Now if we haven't reach our target angle
        if (difference !== 0) {
            // We slightly get closer to it
            this.mesh.rotation.y += difference / 4;
        }
    },
    move: function () {
        'use strict';
        // We update our Object3D's position from our "direction"
        this.mesh.position.x += this.direction.x// * this.scalarCalc();
        this.mesh.position.y += this.direction.y// * this.scalarCalc();
        this.mesh.position.z += this.direction.z// * this.scalarCalc();
        // Now some trigonometry, using our "step" property ...
        
    },

    presiceCollisions: function(x,y,z) {
        console.log("called");
        var oldMeshPosition = this.mesh.clone();
        var delta = 2;
        oldMeshPosition.position.x -= x;
        oldMeshPosition.position.y -= y;
        oldMeshPosition.position.z -= z;
        var distance = 32;
        var obstacles = basicScene.world.getObstacles();
        for(var i = 0; i < delta; i++){
            oldMeshPosition.position.x += x/delta;
            oldMeshPosition.position.y += y/delta;
            oldMeshPosition.position.z += z/delta;
            var count = 0;
            for(var j = 0; j < this.rays.length; j++){
                this.caster.set(oldMeshPosition, this.rays[j]);
                var collisions = this.caster.intersectObjects(obstacles);
                if(collisions.length > 0 && collisions[0].distance <= distance){
                    count++;
                }
            }
            if(count === 1){
                console.log("here1");
                for(var j = 0; j < this.rays.length; j++){
                    this.caster.set(oldMeshPosition, this.rays[j]);
                    var collisions = this.caster.intersectObjects(basicScene.world.getObstacles);
                    if(collisions.length > 1 && collisions[0].distance <= distance){
                        var face = collisions[0].face.normal.normalize();
                        var cRay= this.rays[i].normalize();
                        var reflect = cRay.reflect(face);
                        this.direction.set(reflect.x, reflect.y, reflect.z);
                        return;
                    }
                }
                
            }else if(count > 1){
                console.log("here2");
                this.presiceCollisions(x/delta, y/delta, z/delta);
                return;
            }  
        }

    }
});