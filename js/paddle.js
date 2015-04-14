getPaddle = function(pos, type){
    var paddle;
    if(type === 0)
    {
        // Set the different geometries composing the humanoid
        paddle = new Physijs.BoxMesh(
            new THREE.CubeGeometry(100, 50, 5),
            new THREE.MeshLambertMaterial({color:new THREE.Color( 0x00cc00 )}),
            1
        );
        
    }
    else if(type === 1)
    {
        paddle = new Physijs.SphereMesh(
            new THREE.SphereGeometry(50, 16, 16),
            new THREE.MeshLambertMaterial({color:new THREE.Color( 0x00cc00 )}),
            1
        );

    }
    else
    {
        var geometry = new THREE.SphereGeometry( 50, 75, 12 );
        geometry.applyMatrix( new THREE.Matrix4().makeScale( 1.5, 1, 1.0 ) );
        paddle = new Physijs.SphereMesh(
            geometry,
            new THREE.MeshLambertMaterial({color:new THREE.Color( 0x00cc00 )}),
            1
        );


    }
    paddle.position.y = 250;
    paddle.position.z = pos;
    scene.add( paddle );
    paddle.castShadow = true;
    paddle.receiveShadow = false;
    return paddle;
};

updatePaddlePos = function(paddle, x, y, z) {
    paddle.__dirtyPosition = true;
    paddle.__dirtyRotation = true;
    paddle.position.z = z;
    paddle.rotation.x = 0;
    paddle.rotation.y = 0;
    paddle.rotation.z = 0;
    paddle.setLinearVelocity(new THREE.Vector3(x,y,0));
}

rotatePaddle = function(paddle, rotX, rotY) {
    var MOVEMENT_FACTOR = .05;
    // // Either left or right, and either up or down (no jump or dive (on the Y axis), so far ...)
    // if(rotX !== 0)
    // {
    //     if(rotX === -1 && angleX < Math.PI/2)
    //         angleX += MOVEMENT_FACTOR;
    //     else if(rotX === 1 && angleX > -Math.PI/2)
    //         angleX -= MOVEMENT_FACTOR;
    // }
    // else
    // {
    //     if(angleX < 0)
    //     {
    //          if(angleX > -MOVEMENT_FACTOR)
    //             angleX = 0;
    //         else
    //             angleX += MOVEMENT_FACTOR;
    //     }
    //     else if(angleX > 0)
    //     {
    //         if(angleX < MOVEMENT_FACTOR)
    //             angleX = 0;
    //         else
    //             angleX -= MOVEMENT_FACTOR;
    //     }
    // }

    // if(rotY !== 0)
    // {
    //     if(rotY === -1 && angleY < Math.PI/2)
    //         angleY += MOVEMENT_FACTOR;
    //     else if(rotY === 1 && angleY > -Math.PI/2)
    //         angleY -= MOVEMENT_dwFACTOR;
    // }
    // else
    // {
    //     if(angleY < 0)
    //     {
    //         if(angleY > -MOVEMENT_FACTOR)
    //             angleY = 0;
    //         else
    //             angleY += MOVEMENT_FACTOR;
    //     }
    //     else if(angleY > 0)
    //     {
    //         if(angleY < MOVEMENT_FACTOR)
    //             angleY = 0;
    //         else
    //             angleY -= MOVEMENT_FACTOR;
    //     }
    // }
    paddle.rotation.y = rotX;
    paddle.rotation.x = rotY;
    
}


// // Process the character motions
// motion: function () {
//     'use strict';
// 	this.rotate();
// 	return true;

// },
// // Update the direction of the current motion
// setRotation: function (controls) {
// 	'use strict';
//     // Either left or right, and either up or down (no jump or dive (on the Y axis), so far ...)
//     var x = controls.paddleLeft ? -1 : controls.paddleRight ? 1 : 0,
//         y = controls.paddleUp ? 1 : controls.paddleDown ? -1 : 0;
//     this.rotatingX = x;
//     this.rotatingY = y;

// },
// rotate: function (){
//     'use strict';
//     // Either left or right, and either up or down (no jump or dive (on the Y axis), so far ...)
//     if(this.rotatingX !== 0)
//     {
//         if(this.rotatingX === -1 && this.angleX < Math.PI/2)
//             this.angleX += this.MOVEMENT_FACTOR;
//         else if(this.rotatingX === 1 && this.angleX > -Math.PI/2)
//             this.angleX -= this.MOVEMENT_FACTOR;
//     }
//     else if(this.PADDLE_RESET)
//     {
//         if(this.angleX < 0)
//         {
//              if(this.angleX > -this.MOVEMENT_FACTOR)
//                 this.angleX = 0;
//             else
//                 this.angleX += this.MOVEMENT_FACTOR;
//         }
//         else if(this.angleX > 0)
//         {
//             if(this.angleX < this.MOVEMENT_FACTOR)
//                 this.angleX = 0;
//             else
//                 this.angleX -= this.MOVEMENT_FACTOR;
//         }
//     }

//     if(this.rotatingY !== 0)
//     {
//         if(this.rotatingY === -1 && this.angleY < Math.PI/2)
//             this.angleY += this.MOVEMENT_FACTOR;
//         else if(this.rotatingY === 1 && this.angleY > -Math.PI/2)
//             this.angleY -= this.MOVEMENT_FACTOR;
//     }
//     else if(this.PADDLE_RESET)
//     {
//         if(this.angleY < 0)
//         {
//             if(this.angleY > -this.MOVEMENT_FACTOR)
//                 this.angleY = 0;
//             else
//                 this.angleY += this.MOVEMENT_FACTOR;
//         }
//         else if(this.angleY > 0)
//         {
//             if(this.angleY < this.MOVEMENT_FACTOR)
//                 this.angleY = 0;
//             else
//                 this.angleY -= this.MOVEMENT_FACTOR;
//         }
//     }
// 	this.mesh.rotation.y = this.angleX;
//     this.mesh.rotation.x = this.angleY;
//     this.step += 1 / 4;
// }
