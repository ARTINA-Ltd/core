console.log('Three Object', THREE);

const scene = new THREE.Scene(); // create a new scene

// Create a camera, which defines where we're looking at.
const camera = new THREE.PerspectiveCamera(
    75, // Field of view
    window.innerWidth / window.innerHeight, // aspect ratio
    0.1, // near clipping plane
    1000 // far clipping plane
);
scene.add(camera); // add the camera to the scene
camera.position.z = 5; // move camera back 5 units

// Create a render and set the size and background color
const renderer = new THREE.WebGLRenderer({antialias: false}); // antialias means smooth edges
renderer.setSize(window.innerWidth, window.innerHeight); // set size of renderer
renderer.setClearColor(0xffffff, 1); //background color
document.body.appendChild(renderer.domElement); // add renderer to html

// Ambient light is a soft light that lights up all the objects in the scene equally
const ambientLight = new THREE.AmbientLight(0xffffff, 1.0); // color, intensity, distance, decay
ambientLight.position = camera.position; //light follows camera
scene.add(ambientLight);

// Directional light is a light source that acts like the sun, that illuminates all objects in the scene equally from a specific direction.
const sunLight = new THREE.DirectionalLight(0xdddddd, 1.0); // color, intensity, distance, decay
sunLight.position.y = 15;
scene.add(sunLight);

const geometry = new THREE.BoxGeometry(1, 1, 1); // BoxGeometry is the shape of the object
const material = new THREE.MeshBasicMaterial({color: 'blue'}); // MeshBasicMaterial is the look of the object (color or texture)
const cube = new THREE.Mesh(geometry, material); // create cube with geometry and material
scene.add(cube); // add cube to scene

// Controls
// Event Listenet for when we press the keys
document.addEventListener('keydown', onKeyDown, false);

// Texture of the floor
const floorTexture = new THREE.ImageUtils.loadTexture('img/Floor.jpg'); // ImageUtils is deprecated in the newer versions of THREE.js
floorTexture.wrapS = THREE.RepeatWrapping; // wrapS is horizonatl direction
floorTexture.wrapT = THREE.RepeatWrapping; // wrapT the vertical direction
floorTexture.repeat.set(20, 20); // how many times to repeat the texture

// let floorTexture = new THREE.TextureLoader().load('img/Floor.jpg');
// textureLoader.load('img/Floor.jpg');cds

// Create the floor plane.
const planeGeometry = new THREE.PlaneBufferGeometry(45, 45); // BoxGeometry is the shape of the object
const planeMaterial = new THREE.MeshBasicMaterial({ // MeshBasicMaterial is the look of the object (color or texture)
    map: floorTexture, // the texture
    side: THREE.DoubleSide,
});

const floorPlane = new THREE.Mesh(planeGeometry, planeMaterial); // create the floor with geometry and material

floorPlane.rotation.x = Math.PI / 2; // this is 90 degrees
floorPlane.position.y = -Math.PI; // this is -180 degrees

scene.add(floorPlane); // add the floor to the scene

// Create the walls
let wallGroup = new THREE.Group(); // create a group to hold the walls
scene.add(wallGroup); // add the group to the scene, then any child added to the group will display to the scene too

// Front Wall
const frontWall = new THREE.Mesh( // Mesh class that has geometry and material inside
    new THREE.BoxGeometry(50, 20, 0.001), // geometry
    new THREE.MeshLambertMaterial({ // Lambert material is for non-shiny surfaces
        color: 'gray',
    })
);

frontWall.position.z = -20; // push the wall forward in the Z axis

// Left Wall
const leftWall = new THREE.Mesh( // Mesh class that has geometry and material inside
    new THREE.BoxGeometry(50, 20, 0.001), // geometry
    new THREE.MeshLambertMaterial({ //  Lambert material is for non-shiny surfaces
        color: 'white',
    })
);

leftWall.rotation.y = Math.PI / 2; // this is 90 degrees
leftWall.position.x = -20; // -20 is for 20 units left

// Right Wall
const rightWall = new THREE.Mesh( // Mesh class that has geometry and material inside
    new THREE.BoxGeometry(50, 20, 0.001), // geometry
    new THREE.MeshLambertMaterial({ // Lambert material is for non-shiny surfaces
        color: 'white',
    })
);

rightWall.position.x = 20;
rightWall.rotation.y = Math.PI / 2; // this is 90 degrees

wallGroup.add(frontWall, leftWall, rightWall);

// Loop through each wall and create the bounding box
for (let i = 0; i < wallGroup.children.length; i++) {
    wallGroup.children[i].BBox = new THREE.Box3();
    wallGroup.children[i].BBox.setFromObject(wallGroup.children[i]);
}

// Create the ceiling
const ceilingGeometry = new THREE.PlaneBufferGeometry(50, 50); // BoxGeometry is the shape the object
const ceilingMaterial = new THREE.MeshLambertMaterial({ // Lambert material is for non-shiny surfaces
    color: "#7fc7ff",
});
const ceilingPlane = new THREE.Mesh(ceilingGeometry, ceilingMaterial); // create ceiling with geometry and material

ceilingPlane.rotation.x = Math.PI / 2; // this is 90 degrees
ceilingPlane.position.y = 12;

scene.add(ceilingPlane);

// function when a key is pressed, execute this function
function onKeyDown(event) {
    let keycode = event.which;

    // right arrow key
    if (keycode === 39) {
        camera.translateX(-0.1);
    }
    // left arrow key
    else if (keycode === 37) {
        camera.translateX(0.1);
    }
    // up arrow key
    else if (keycode === 38) {
        camera.translateY(-0.1);
    }
    // down arrow key
    else if (keycode === 40) {
        camera.translateY(0.1);
    }
    else if (keycode === 32) {
        console.log('spacebar');
        camera.translateZ(0.1);
    }
    // to move forward with W
    else if (keycode === 87) {
        camera.translateZ(-0.1);
    }
    // to jump up and get down with
    else if (keycode === 74) {
    camera.translateZ(0.1);
    }

}

const cursor = { x:0, y:0 }; // create a cursor object to hold the x and y coordinates of the mouse

window.addEventListener('mousemove', (e) => {
    // add event listener to the window to listen for mouse movement
    cursor.x = e.clientX / window.innerWidth - 0.5; // get the x coordinate of the mouse
    cursor.y = e.clientY / window.innerHeight - 0.5; // get the y coordinate of the mouse

});

let render = function () {
    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;

    const cameraX = cursor.x - 1
    const cameraY = - cursor.y

    camera.position.x += (cameraX - camera.position.x) * 0.1;
    camera.position.y += (cameraY - camera.position.y) * 0.1;

    renderer.render(scene, camera); //renders the scene

    requestAnimationFrame(render);
};

render();