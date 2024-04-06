import { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { OrbitControls } from 'three-stdlib';

const Generate = () => {
  const containerRef = useRef(null);
  const [content, setContent] = useState({});
  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('#threejs-canvas') });
    renderer.setPixelRatio(window.devicePixelRatio);

    if (containerRef.current) {
      renderer.setSize(
        containerRef.current.clientWidth - 30,
        containerRef.current.clientHeight - 30
      );
    }

    // Add OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    // Update the camera aspect ratio
    camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
    camera.updateProjectionMatrix();

    // Grid setup
    const gridSize = 20;
    const divisions = 5;
    const gridHelper = new THREE.GridHelper(gridSize, divisions);
    // Rotate the grid to represent the positive xz plane

    // Move the grid to cover only the positive axes
    gridHelper.position.set(gridSize / 2, 0, gridSize / 2);
    scene.add(gridHelper);

    // Create axes helper
    const axesHelper = new THREE.AxesHelper(gridSize);
    scene.add(axesHelper);

    camera.position.x = gridSize;
    camera.position.y = gridSize / 2 + gridSize;
    camera.position.z = gridSize / 2 + gridSize;

    // Calculate the size of each division
    const divisionSize = gridSize / divisions;
    // Create a plane geometry for the floor
    const floorGeometry = new THREE.PlaneGeometry(gridSize, gridSize, 10, 10);

    // Create a basic material for the floor
    const floorMaterial = new THREE.MeshBasicMaterial({ color: 0x808080, side: THREE.DoubleSide });

    // Create a mesh for the floor
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);

    // Rotate the floor 90 degrees around the x-axis
    floor.rotation.x = Math.PI / 2;
    floor.position.set(gridSize / 2, 0, gridSize / 2);

    // Add the floor to the scene
    scene.add(floor);


    // Create a material using a plane color
    const wallMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });

    // Create a plane for the x-axis
    const xAxisPlane = new THREE.Mesh(floorGeometry,wallMaterial );

    // Set the position of the x-axis plane to match the grid's position
    xAxisPlane.position.set(gridSize / 2, gridSize / 2, 0);

    // Add the x-axis plane to the scene
    scene.add(xAxisPlane);

    // Create a plane for the z-axis
    const zAxisPlane = new THREE.Mesh(floorGeometry, wallMaterial);

    // Rotate the z-axis plane 90 degrees around the y-axis
    zAxisPlane.rotation.y = Math.PI / 2;

    // Set the position of the z-axis plane to match the grid's position
    zAxisPlane.position.set(0, gridSize / 2, gridSize / 2);

    // Add the z-axis plane to the scene
    scene.add(zAxisPlane);
    
    function createCube(size, x, y) {
      // Create cube geometry
      const geometry = new THREE.BoxGeometry(size, size, size);

      // Create material
      const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 }); // Green color

      // Create mesh
      const cube = new THREE.Mesh(geometry, material);

      // Set position
      cube.position.set(x * divisionSize - size / 2, size / 2, +y * divisionSize - size / 2); // Adjust y-coordinate by half of the cube's size

      // Add cube to scene
      scene.add(cube);
    }

    function createCuboid(width, height, depth, x, y) {
      // Create cuboid geometry
      const geometry = new THREE.BoxGeometry(width, height, depth);

      // Create material
      const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 }); // Green color

      // Create mesh
      const cuboid = new THREE.Mesh(geometry, material);

      // Set position
      cuboid.position.set(x * divisionSize - width / 2, height / 2, y * divisionSize - depth / 2);

      // Add cuboid to scene
      scene.add(cuboid);
    }

    
    function createLabel(text, x, y, z) {
      const canvas = document.createElement('canvas');
      canvas.width = 64; // Increase the size of the canvas
      canvas.height = 64;
      const context = canvas.getContext('2d');
      context.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
      context.font = '48px Arial'; // Increase the font size
      context.fillStyle = 'white'; // Change the text color to white
      context.fillText(text, 0, canvas.height / 2); // Draw the text in the middle of the canvas

      const texture = new THREE.CanvasTexture(canvas);
      const material = new THREE.SpriteMaterial({ map: texture });
      const sprite = new THREE.Sprite(material);

      sprite.scale.set(2, 2, 1); // Increase the size of the sprite
      sprite.position.set(x, y, z);
      scene.add(sprite);
    }

    // Create labels for x, y, and z axes
    createLabel('X', gridSize + 1, 0, 0);
    createLabel('Z', 0, gridSize + 1, 0);
    createLabel('Y', 0, 0, gridSize + 1);

    // Make the camera look at the center of the grid
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    
    // place the cubes at the coordinates given in data
    // Assuming data is an object like {Table: [1, 1], Bed: [5, 5]}
    Object.entries(content).forEach(([objectName, coord]) => {
        createCube(divisionSize, coord[0], coord[1]);
    });
    const animate = function () {
        requestAnimationFrame(animate);
  
        renderer.render(scene, camera);
    };

    animate();
  }, [content]);

  const [prompt, setPrompt] = useState('Covert it into reality!');
  const [tempPrompt, setTempPrompt] = useState('Convert it into reality!');
  const [isLoading, setIsLoading] = useState(false); // new state variable for loading status
  const handleSubmit = () => {
    setPrompt(tempPrompt);
    setIsLoading(true);
    axios
      .get(`http://localhost:4000/generate?prompt=${tempPrompt}`)
      .then(response => {
        setContent(response.data);

      })
      .catch(error => {
        console.error('There was an error!', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
    setPrompt(tempPrompt);


    

  };

  return (
    <div className="h-screen bg-[url(/src/assets/herobg.png)] flex gap-20 justify-center items-center">
      <div className="bg-black text-white p-6 rounded-lg shadow-md w-1/4 h-1/2">
        <h1 className="text-3xl font-bold text-red-500 mb-4">Idea?</h1>
        <br />
        {isLoading ? (
          <p className="text-gray-400">Loading...</p>
        ) : (
          <p></p>
        )}
        <input
          type="text"
          value={tempPrompt}
          onChange={e => setTempPrompt(e.target.value)}
          className="mt-4 bg-gray-800 text-white border-none rounded-md p-2 w-full"
        />
        <br />
        <br />
        <button
          onClick={handleSubmit}
          className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded shadow"
        >
          Generate
        </button>
        <br />
        <br />
        <a href="/" className="text-red-500 hover:underline">
          Go to Home
        </a>
      </div>
      <div
        className="bg-black text-white p-6 rounded-lg shadow-md w-1/2 h-[70vh]"
        ref={containerRef}
        style={{ width: '60%', height: '60%' }}
      >
        <canvas id="threejs-canvas"></canvas>
      </div>
    </div>
  );
};

export default Generate;
