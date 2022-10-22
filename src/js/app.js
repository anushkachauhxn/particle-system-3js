import * as THREE from "three";
import sparkleTexture from "../assets/sparkler.png";

// Renderer
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor(new THREE.Color("#21282a"), 1);

// Scene + Camera + Orbit Controls
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.set(0, 0, 2);

// Lights
const pointLight = new THREE.PointLight(0xffffff, 0.1);
pointLight.position.set(2, 3, 4);
scene.add(pointLight);

// Texture Loader
const loader = new THREE.TextureLoader();

// Add Objects
// 1. Torus
const torusGeo = new THREE.TorusGeometry(0.7, 0.2, 16, 100);
const torusMat = new THREE.PointsMaterial({
  size: 0.005,
});
const torusMesh = new THREE.Points(torusGeo, torusMat);
scene.add(torusMesh);

// 2. Particles
const particlesGeo = new THREE.BufferGeometry();
const particlesMat = new THREE.PointsMaterial({
  size: 0.01,
  map: loader.load(sparkleTexture),
  transparent: true,
});

const particlesCount = 5000;
const posArray = new Float32Array(particlesCount * 3); // xyz, xyz, xyz
for (i = 0; i < particlesCount * 3; i++) {
  posArray[i] = (Math.random() - 0.5) * 5 * Math.random();
}
particlesGeo.setAttribute("position", new THREE.BufferAttribute(posArray, 3));

const particlesMesh = new THREE.Points(particlesGeo, particlesMat);
scene.add(particlesMesh);

// Mouse Values
let mouseX = 0,
  mouseY = 0;
document.addEventListener("mousemove", (event) => {
  mouseX = event.clientX;
  mouseY = event.clientY;
});

// Animate
const clock = new THREE.Clock();
(function tick() {
  const elapsedTime = clock.getElapsedTime();

  // Update objects
  torusMesh.rotation.y = 0.5 * elapsedTime;
  particlesMesh.rotation.y = -0.1 * elapsedTime;

  if (mouseX > 0) {
    particlesMesh.rotation.x = -mouseY * elapsedTime * 0.00008;
    particlesMesh.rotation.y = mouseX * elapsedTime * 0.00008;
  }

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
})();

// Responsive Window
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});
