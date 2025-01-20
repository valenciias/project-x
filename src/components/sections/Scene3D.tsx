import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader, GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";

export default function Scene3D() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x001133, 0.015);

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x001133);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    containerRef.current.appendChild(renderer.domElement);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxDistance = 200;
    controls.minDistance = 80;
    controls.maxPolarAngle = Math.PI / 2;
    controls.minPolarAngle = Math.PI / 4;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.3;

    // Enhanced Lighting for dramatic effect
    const ambientLight = new THREE.AmbientLight(0x112244, 0.5);
    scene.add(ambientLight);

    const moonLight = new THREE.DirectionalLight(0x557799, 3);
    moonLight.position.set(15, 30, 15);
    moonLight.castShadow = true;
    moonLight.shadow.mapSize.width = 2048;
    moonLight.shadow.mapSize.height = 2048;
    moonLight.shadow.camera.far = 100;
    scene.add(moonLight);

    // Add evil red rim lights
    const evilLight1 = new THREE.PointLight(0xff0000, 2, 50);
    evilLight1.position.set(-15, 10, -15);
    scene.add(evilLight1);

    const evilLight2 = new THREE.PointLight(0xff2200, 2, 50);
    evilLight2.position.set(15, 10, 15);
    scene.add(evilLight2);

    // Create environment map for reflections
    const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(256);
    const cubeCamera = new THREE.CubeCamera(0.1, 1000, cubeRenderTarget);
    scene.background = new THREE.Color(0x001133);

    // Load GLB models
    const loader = new GLTFLoader();
    let cube: THREE.Group | null = null;
    let pyramid: THREE.Group | null = null;
    const evilAgents: THREE.Group[] = [];

    // Helper function to handle model loading errors
    const handleLoadError = (err: unknown) => {
      console.error("Error loading model:", err);
    };

    // Load evil agent models
    for (let i = 0; i < 5; i++) {
      loader.load(
        "/public/cube1218.glb",
        (gltf: GLTF) => {
          const agent = gltf.scene.clone();
          agent.scale.set(20, 20, 20);
          const angle = (i / 5) * Math.PI * 2;
          const radius = 100;
          agent.position.set(
            Math.cos(angle) * radius,
            30,
            Math.sin(angle) * radius
          );
          agent.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
              const mesh = child as THREE.Mesh;
              mesh.castShadow = true;
              mesh.receiveShadow = true;
              if (mesh.material) {
                mesh.material = new THREE.MeshStandardMaterial({
                  color: 0xff0000,
                  metalness: 1,
                  roughness: 0,
                  emissive: 0xff0000,
                  emissiveIntensity: 0.5,
                });
              }
            }
          });
          evilAgents.push(agent);
          scene.add(agent);
        },
        undefined,
        handleLoadError
      );
    }

    // Load original models
    loader.load(
      "/public/cube1218.glb",
      (gltf: GLTF) => {
        cube = gltf.scene;
        if (cube) {
          cube.scale.set(200, 200, 200);
          cube.position.set(-25, 60, -25);
          cube.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
              const mesh = child as THREE.Mesh;
              mesh.castShadow = true;
              mesh.receiveShadow = true;
              if (mesh.material) {
                mesh.material = new THREE.MeshStandardMaterial({
                  color: 0x000000,
                  metalness: 1,
                  roughness: 0,
                  envMapIntensity: 1,
                });
                if (mesh.material instanceof THREE.MeshStandardMaterial) {
                  mesh.material.envMap = cubeRenderTarget.texture;
                }
              }
            }
          });
          scene.add(cube);
        }
      },
      undefined,
      handleLoadError
    );

    loader.load(
      "/public/pyramid1217 (2).glb",
      (gltf: GLTF) => {
        pyramid = gltf.scene;
        if (pyramid) {
          pyramid.scale.set(200, 200, 200);
          pyramid.position.set(25, 50, -10);
          pyramid.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
              const mesh = child as THREE.Mesh;
              mesh.castShadow = true;
              mesh.receiveShadow = true;
              if (mesh.material) {
                mesh.material = new THREE.MeshStandardMaterial({
                  color: 0x000000,
                  metalness: 1,
                  roughness: 0,
                  envMapIntensity: 1,
                });
                if (mesh.material instanceof THREE.MeshStandardMaterial) {
                  mesh.material.envMap = cubeRenderTarget.texture;
                }
              }
            }
          });
          scene.add(pyramid);
        }
      },
      undefined,
      handleLoadError
    );

    // Enhanced ice ground plane
    const planeGeometry = new THREE.PlaneGeometry(2000, 2000, 200, 200);
    const iceMaterial = new THREE.MeshStandardMaterial({
      color: 0xaaddff,
      metalness: 0.9,
      roughness: 0.1,
      transparent: true,
      opacity: 0.8,
    });

    const vertices = planeGeometry.attributes.position.array;
    for (let i = 0; i < vertices.length; i += 3) {
      if (i > 9) {
        vertices[i + 2] = (Math.random() - 0.5) * 4;
      }
    }

    const plane = new THREE.Mesh(planeGeometry, iceMaterial);
    plane.rotation.x = -Math.PI / 2;
    plane.position.y = -2;
    plane.receiveShadow = true;
    scene.add(plane);

    // Snow particle system with optimized count and better texture handling
    const snowGeometry = new THREE.BufferGeometry();
    const snowCount = 10000;
    const snowPositions = new Float32Array(snowCount * 3);
    const snowVelocities = new Float32Array(snowCount);

    for (let i = 0; i < snowCount * 3; i += 3) {
      snowPositions[i] = (Math.random() - 0.5) * 500;
      snowPositions[i + 1] = Math.random() * 200;
      snowPositions[i + 2] = (Math.random() - 0.5) * 500;
      snowVelocities[i / 3] = Math.random() * 0.2 + 0.1;
    }

    snowGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(snowPositions, 3)
    );

    // Create a simple circular texture for snow particles
    function generateSnowflakeTexture() {
      const canvas = document.createElement('canvas');
      canvas.width = 32;
      canvas.height = 32;
      const ctx = canvas.getContext('2d');
      if (!ctx) return canvas;

      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(16, 16, 8, 0, Math.PI * 2);
      ctx.fill();

      return canvas;
    }

    const snowTexture = new THREE.Texture(generateSnowflakeTexture());
    snowTexture.needsUpdate = true;

    const snowMaterial = new THREE.PointsMaterial({
      size: 0.5,
      color: 0xffffff,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      map: snowTexture,
      depthWrite: false,
    });

    const snow = new THREE.Points(snowGeometry, snowMaterial);
    scene.add(snow);

    // Fog particles with optimized count
    const fogGeometry = new THREE.BufferGeometry();
    const fogParticlesCnt = 5000;
    const fogPosArray = new Float32Array(fogParticlesCnt * 3);

    for (let i = 0; i < fogParticlesCnt * 3; i += 3) {
      fogPosArray[i] = (Math.random() - 0.5) * 200;
      fogPosArray[i + 1] = Math.random() * 30;
      fogPosArray[i + 2] = (Math.random() - 0.5) * 200;
    }

    fogGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(fogPosArray, 3)
    );

    const fogParticlesMaterial = new THREE.PointsMaterial({
      size: 0.2,
      color: 0xaaddff,
      transparent: true,
      opacity: 0.3,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const fogParticles = new THREE.Points(fogGeometry, fogParticlesMaterial);
    scene.add(fogParticles);

    camera.position.set(0, 40, 200);
    controls.update();

    // Raycaster setup for hover effects
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let hoveredObject: THREE.Object3D | null = null;
    let originalMaterial: THREE.Material | null = null;

    const onMouseMove = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(scene.children);

      if (
        hoveredObject &&
        (!intersects.length || intersects[0].object !== hoveredObject)
      ) {
        if (originalMaterial) {
          hoveredObject.traverse((child) => {
            if (originalMaterial && (child as THREE.Mesh).isMesh) {
              (child as THREE.Mesh).material = originalMaterial;
            }
          });
        }
        hoveredObject = null;
        originalMaterial = null;
        document.body.style.cursor = "default";
      }

      if (intersects.length && intersects[0].object !== hoveredObject) {
        hoveredObject = intersects[0].object;
        originalMaterial = null;
        hoveredObject.traverse((child) => {
          if ((child as THREE.Mesh).isMesh && (child as THREE.Mesh).material) {
            const meshMaterial = (child as THREE.Mesh).material;
            if (!Array.isArray(meshMaterial)) {
              originalMaterial = meshMaterial;
            }
            (child as THREE.Mesh).material = new THREE.MeshStandardMaterial({
              color: 0x00ffff,
              metalness: 1,
              roughness: 0,
              emissive: 0x00ffff,
              emissiveIntensity: 0.5,
              transparent: true,
              opacity: 0.8,
            });
          }
        });
        document.body.style.cursor = "pointer";
      }
    };

    window.addEventListener("mousemove", onMouseMove);

    // Animation loop with performance optimizations
    let lastTime = 0;
    const animate = (currentTime: number) => {
      requestAnimationFrame(animate);

      // Limit updates to 60fps
      if (currentTime - lastTime < 16) return;
      lastTime = currentTime;

      const time = currentTime * 0.001;

      // Animate snow with improved performance
      const positions = snow.geometry.attributes.position.array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] -= snowVelocities[i / 3];
        positions[i] += Math.sin(time + i) * 0.02;
        if (positions[i + 1] < -2) {
          positions[i + 1] = 200;
        }
      }
      snow.geometry.attributes.position.needsUpdate = true;

      // Animate evil agents
      evilAgents.forEach((agent, index) => {
        const angle = time + (index * Math.PI * 2) / 5;
        const radius = 100 + Math.sin(time * 0.5) * 20;
        agent.position.x = Math.cos(angle) * radius;
        agent.position.z = Math.sin(angle) * radius;
        agent.position.y = 30 + Math.sin(time * 2 + index) * 5;
        agent.rotation.y = angle + Math.PI;
      });

      // Animate original objects
      if (cube) {
        cube.rotation.y += 0.001;
        cube.position.y = 60 + Math.sin(time * 0.5) * 1;
      }

      if (pyramid) {
        pyramid.rotation.y -= 0.001;
        pyramid.position.y = 50 + Math.sin(time * 0.5 + Math.PI) * 1;
      }

      fogParticles.rotation.y += 0.0002;
      fogParticles.position.y = Math.sin(time * 0.2) * 1;

      // Update environment map (less frequently for performance)
      if (Math.floor(time) % 2 === 0) {
        cubeCamera.update(renderer, scene);
      }

      controls.update();
      renderer.render(scene, camera);
    };

    animate(0);

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", onMouseMove);
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 -z-10" />;
}