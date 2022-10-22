import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as dat from "dat.gui";

// Renderer
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Scene + Camera + Orbit Controls
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.set(0, 0, 2);

const orbit = new OrbitControls(camera, canvas);
orbit.enableDamping = true;
orbit.update();

// Lights
const pointLight = new THREE.PointLight(0xffffff, 0.1);
pointLight.position.set(2, 3, 4);
scene.add(pointLight);

// GUI Controls
const gui = new dat.GUI();

// Add Objects
const torusGeo = new THREE.TorusGeometry(0.7, 0.2, 16, 100);
const torusMat = new THREE.PointsMaterial({
  size: 0.005,
});
const torusMesh = new THREE.Points(torusGeo, torusMat);
scene.add(torusMesh);

// Animate
const clock = new THREE.Clock();
(function tick() {
  const elapsedTime = clock.getElapsedTime();

  // Update objects
  torusMesh.rotation.y = 0.5 * elapsedTime;

  // Update Orbital Controls
  // orbit.update()

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
