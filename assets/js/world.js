var World = Class.extend({
    // Class constructor
    init: function (args,render) {
        'use strict';
        
        var obstacles = [
            new THREE.CubeGeometry(64, 64, 64)
        ];
      
        // Set the material, the "skin"
        var material = new THREE.MeshLambertMaterial(args);
        var i;
        // Set the "world" modelisation object
        this.mesh = new THREE.Object3D();
        
        // Set and add the obstacles
        this.obstacles = [];
        for (i = 0; i < obstacles.length; i += 1) {
            this.obstacles.push(new THREE.Mesh(obstacles[i], material));
            //this.mesh.add(this.obstacles[i]);
        }
        var materials = [];
        
        var geometry = new THREE.TorusGeometry( 500, 100, 100, 100);
        this.torroid = new THREE.Mesh(geometry,material);
        this.torroid.material.side = THREE.BackSide;
        this.torroid.rotation.x = -Math.PI / 2;
       
        this.torroid.position.set(500,50,0);
        this.mesh.add(this.torroid);
       

        
    },
    getObstacles: function () {
        'use strict';
        return [this.torroid];
    }
});