import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Pane } from "tweakpane";

// initialize pane
const pane = new Pane();

// initialize the scene
const scene = new THREE.Scene();

// initialize the texture loader
const textureLoader = new THREE.TextureLoader();
const cubeTextureLoader = new THREE.CubeTextureLoader();
cubeTextureLoader.setPath(`threejs-solar-system/textures/cubeMap/`);
const backgroundCubeMap = cubeTextureLoader.load([
  'px.png',
  'nx.png',
  'py.png',
  'ny.png',
  'pz.png',
  'nz.png'
])

// add textures
const sunTexture = textureLoader.load(`threejs-solar-system/textures/2k_sun.jpg`);
const mercuryTexture = textureLoader.load(`threejs-solar-system/textures/2k_mercury.jpg`);
const venusTexture = textureLoader.load(`threejs-solar-system/textures/2k_venus_surface.jpg`);
const earthTexture = textureLoader.load(`threejs-solar-system/textures/2k_earth_daymap.jpg`);
const moonTexture = textureLoader.load(`threejs-solar-system/textures/2k_moon.jpg`);
const marsTexture = textureLoader.load(`threejs-solar-system/textures/2k_mars.jpg`);
const jupiterTexture = textureLoader.load(`threejs-solar-system/textures/2k_jupiter.jpg`);
const saturnTexture = textureLoader.load(`threejs-solar-system/textures/2k_saturn.jpg`);
const saturnRingTexture = textureLoader.load(`threejs-solar-system/textures/2k_saturn_ring_alpha.png`);
const uranusTexture = textureLoader.load(`threejs-solar-system/textures/uranusmap.jpg`);
const uranusRingTexture = textureLoader.load(`threejs-solar-system/textures/uranusringcolour.jpg`);
const neptuneTexture = textureLoader.load(`threejs-solar-system/textures/2k_neptune.jpg`);

scene.background = backgroundCubeMap;
// add stuff here
const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
const ringGeometry = new THREE.RingGeometry(1.5, 2.5, 30, 30)
const sunMaterial = new THREE.MeshBasicMaterial({
  map: sunTexture
});
const mercuryMaterial = new THREE.MeshStandardMaterial({
  map: mercuryTexture
});
const venusMaterial = new THREE.MeshStandardMaterial({
  map: venusTexture
});
const earthMaterial= new THREE.MeshStandardMaterial({
  map: earthTexture
});
const moonMaterial = new THREE.MeshStandardMaterial({
  map: moonTexture
});
const marsMaterial = new THREE.MeshStandardMaterial({
  map: marsTexture
});
const jupiterMaterial = new THREE.MeshStandardMaterial({
  map: jupiterTexture
});

const saturnMaterial = new THREE.MeshStandardMaterial({
  map: saturnTexture
});

const saturnRingMaterial = new THREE.MeshStandardMaterial({
  map: saturnRingTexture,
  side: THREE.DoubleSide
})
saturnRingMaterial.map.rotation = Math.PI / 5;

const uranusRingMaterial = new THREE.MeshStandardMaterial({
  map: uranusRingTexture,
  side: THREE.DoubleSide
});
uranusRingMaterial.map.rotation = Math.PI / 5;

const uranusMaterial = new THREE.MeshStandardMaterial({
  map: uranusTexture
});

const neptuneMaterial = new THREE.MeshStandardMaterial({
  map: neptuneTexture
});

const sun = new THREE.Mesh(sphereGeometry, sunMaterial);
sun.scale.setScalar(5);


const jupiterMoons = Array(95).fill(null).map((item, index) => {
  return {
    name: `JupiterMoon#${index}`,
    radius: Math.random() / 100,
    distance: 1 + (Math.random() * (2)),
    speed: Math.random() / 50,
    material: moonMaterial
  }
})

const planets = [
  {
    name: 'Mercury',
    radius: 0.5,
    distance: 13,
    revSpeed: 4.17,
    rotSpeed: 0.02,
    material: mercuryMaterial,
    moons: []
  },
  {
    name: 'Venus',
    radius: 0.8,
    distance: 24,
    revSpeed: 1.61,
    rotSpeed: -0.004,
    material: venusMaterial,
    moons: []
  },
  {
    name: 'Earth',
    radius: 1,
    distance: 33.34,
    revSpeed: 1,
    rotSpeed: 1,
    material: earthMaterial,
    moons: [
      {
        name: 'Moon',
        radius: 0.3,
        distance: 3,
        speed: 0.015,
        material: moonMaterial
      }
    ] 
  },
  {
    name: 'Mars',
    radius: 0.7,
    distance: 50.67,
    revSpeed: 0.53,
    rotSpeed: 0.97,
    material: marsMaterial,

    moons: [
      {
        name: 'MarsMoonPhobos',
        radius: 0.1,
        distance: 2,
        speed: 0.02,
        material: moonMaterial
      },
      {
        name: 'MarsMoonDeimos',
        radius: 0.2,
        distance: 3,
        speed: 0.015,
        color: 0xffffff,
        material: moonMaterial
      }
    ]
  },
  {
    name: 'Jupiter',
    radius: 3,
    distance: 273.34,
    revSpeed: 0.08,
    rotSpeed: 2.44,
    material: jupiterMaterial,
    moons: jupiterMoons
  },
  {
    name: 'Saturn',
    radius: 2,
    distance: 318,
    revSpeed: 0.08,
    rotSpeed: 2.33,
    material: saturnMaterial,
    moons: Array(146).fill(null).map((item, index) => {
      return {
        name: `SaturnMoon#${index}`,
        radius: Math.random() / 70,
        distance: 1.25 + (Math.random() * (2)),
        speed: Math.random() / 50,
        material: moonMaterial
      }
    })
  },
  {
    name: 'Uranus',
    radius: 1.5,
    distance: 640.67,
    revSpeed: 0.01,
    rotSpeed: 1.39,
    material: uranusMaterial,
    moons: Array(28).fill(null).map((item, index) => {
      return {
        name: `UranusMoon#${index}`,
        radius: Math.random() / 80,
        distance: 1.25 + (Math.random() * (2)),
        speed: Math.random() / 50,
        material: moonMaterial
      }
    })
  },
  {
    name: 'Neptune',
    radius: 1.5,
    distance: 1002,
    revSpeed: 0.01,
    rotSpeed: 1.49, 
    material: neptuneMaterial,
    moons: Array(16).fill(null).map((item, index) => {
      return {
        name: `NeptuneMoon#${index}`,
        radius: Math.random() / 80,
        distance: 1.25 + (Math.random() * (2)),
        speed: Math.random() / 50,
        material: moonMaterial
      }
    })
  }
];

const createPlanet = (planet) => {
  const planetMesh = new THREE.Mesh(sphereGeometry, planet.material);

  planetMesh.scale.setScalar(planet.radius);
  planetMesh.position.x = planet.distance;
  if (planet.name == 'Saturn') {
    const ringMesh = new THREE.Mesh(ringGeometry, saturnRingMaterial);

    ringMesh.rotation.x = Math.PI / 3;
    planetMesh.add(ringMesh);
  }
  if (planet.name == 'Uranus') {
    const ringMesh = new THREE.Mesh(ringGeometry, uranusRingMaterial);

    ringMesh.rotation.x = Math.PI / 3;
    planetMesh.add(ringMesh);
  }
  return planetMesh;
}

const createMoon = (moon) => {
  const moonMesh = new THREE.Mesh(sphereGeometry, moon.material);

  moonMesh.moonName = moon.name;
  moonMesh.scale.setScalar(moon.radius);
  moonMesh.position.x = moon.distance;
  moonMesh.position.y = Math.random() / 5;
  moonMesh.rotSpeed = moon.speed;
  moonMesh.distance = moon.distance;

  return moonMesh
}

const planetMeshes = planets.map((planet) => {
  const planetMesh = createPlanet(planet);
  planet.moons.forEach((moon) => {
    const moonMesh = createMoon(moon);
    planetMesh.add(moonMesh);
  });
  planetMesh.counter = 0;
  scene.add(planetMesh);
  return planetMesh;
})

scene.add(sun);

// add lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 2);
scene.add(pointLight);
// initialize the camera
const camera = new THREE.PerspectiveCamera(
  35,
  window.innerWidth / window.innerHeight,
  0.1,
  40000
);
camera.position.z = 100;
camera.position.y = 5;

// initialize the renderer
const canvas = document.querySelector("canvas.threejs");
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// add controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.maxDistance = 200;
controls.minDistance = 0;

// add resize listener
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});


// render loop
const renderloop = () => {
  planetMeshes.forEach((planet, planetIndex) => {
    planet.counter += planets[planetIndex].revSpeed;
    planet.rotation.y += (planets[planetIndex].rotSpeed * 0.005);
    planet.position.x = Math.sin(planet.counter * 0.001) * planets[planetIndex].distance;
    planet.position.z = Math.cos(planet.counter * 0.001) * planets[planetIndex].distance;

    planet.children.forEach((moon) => {
      if (moon.moonName && moon.moonName.includes('Moon')) {
        moon.rotation.y += moon.rotSpeed;
        moon.position.x = Math.sin(moon.rotation.y) * moon.distance;
        moon.position.z = Math.cos(moon.rotation.y) * moon.distance;
      }
    })
  })

  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderloop);
};


renderloop();
