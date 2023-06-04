import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { createNoise2D } from 'simplex-noise';
import Form from "./Form";

const App = () => {
  const canvasRef = useRef();
  let camera, scene, material, group, lights = [], renderer, clock;
  let geometry, plane, noise2D;
  let factor = 300, speed = 5e-4, cycle = 0, scale = 30;

  useEffect(() => {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    init();
    render();

    function init() {
      camera = new THREE.PerspectiveCamera(60, windowWidth/windowHeight, 1, 1e4);
      camera.position.set(0,0,100);
      scene = new THREE.Scene();
      lights[0] = new THREE.PointLight(16711680,1,0);
      lights[1] = new THREE.PointLight(255,1,0);
      lights[2] = new THREE.PointLight(16777215,1,0);
      lights[0].position.set(0,200,0);
      lights[1].position.set(100,200,100);
      lights[2].position.set(-100,-200,-100);
      scene.add(lights[0]);
      scene.add(lights[1]);
      scene.add(lights[2]);

      renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current,
        alpha: true,
        antialias: true
      });
      renderer.setSize(windowWidth, windowHeight);

      group = new THREE.Object3D;
      group.position.set(0,-300,-1e3);
      group.rotation.set(29.8,0,0);

      geometry = new THREE.PlaneGeometry(4e3,2e3,128,64);
      material = new THREE.MeshLambertMaterial({
        color: 16777215,
        opacity: 1,
        blending: THREE.NoBlending,
        side: THREE.FrontSide,
        transparent: false,
        depthTest: false,
        wireframe: true
      });

      plane = new THREE.Mesh(geometry,material);
      plane.position.set(0,0,0);
      noise2D = createNoise2D(() => Math.random());
      moveNoise();

      group.add(plane);
      scene.add(group);
      window.addEventListener("resize", onWindowResize, false);

      clock = new THREE.Clock(); // Initialize the clock
    }

    function render() {
      requestAnimationFrame(render);
      const delta = clock.getDelta();
      renderer.setClearColor(0);
      moveNoise();
      cycle -= delta * .5;
      renderer.render(scene,camera);
    }

    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    function moveNoise() {
      const position = geometry.attributes.position;

      for(let i = 0; i < position.count; i++) {
        const xoff = position.getX(i) / factor;
        const yoff = position.getY(i) / factor + cycle;
        const rand = noise2D(xoff, yoff) * scale;
        position.setZ(i, rand);
      }

      position.needsUpdate = true;
      cycle += speed;
    }

    return () => {
      window.removeEventListener("resize", onWindowResize);
    };
  }, []);

  return <>
    <Form />
    <canvas id="3D-background-three-canvas5" ref={canvasRef}></canvas>
  </>;
};

export default App;
