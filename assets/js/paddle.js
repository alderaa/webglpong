getPaddle = function(pos, type){
    if(type === 0)
    {
        // Set the different geometries composing the humanoid
        var paddle = new Physijs.BoxMesh(
            new THREE.CubeGeometry(100, 50, 5),
            new THREE.MeshLambertMaterial({color:new THREE.Color( 0x00cc00 )}),
            1
        );
        paddle.position.y = 250;
        paddle.position.z = pos;
        scene.add( paddle );
        paddle.castShadow = true;
        paddle.receiveShadow = false;
        return paddle;
    }
    else if(type === 1)
    {

    }
    else
    {

    }
};


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
