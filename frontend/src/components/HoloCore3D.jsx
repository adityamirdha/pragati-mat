import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function HoloCore3D() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // 1. SCENE & CAMERA
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 8.5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // 2. INDUSTRIAL TOKAMAK REACTOR CORE (Wireframe Multi-Polyhedron)
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // Outer Geodesic Cage
    const geoOuter = new THREE.IcosahedronGeometry(1.6, 2);
    const matOuter = new THREE.MeshBasicMaterial({
      color: 0x3b82f6,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const meshOuter = new THREE.Mesh(geoOuter, matOuter);
    coreGroup.add(meshOuter);

    // Mid Octahedron Energy Cell
    const geoMid = new THREE.OctahedronGeometry(1.1, 1);
    const matMid = new THREE.MeshBasicMaterial({
      color: 0x60a5fa,
      wireframe: true,
      transparent: true,
      opacity: 0.6,
    });
    const meshMid = new THREE.Mesh(geoMid, matMid);
    coreGroup.add(meshMid);

    // Inner Glowing Core
    const geoInner = new THREE.SphereGeometry(0.55, 16, 16);
    const matInner = new THREE.MeshBasicMaterial({
      color: 0x93c5fd,
      wireframe: true,
      transparent: true,
      opacity: 0.8,
    });
    const meshInner = new THREE.Mesh(geoInner, matInner);
    coreGroup.add(meshInner);

    // 3. SEGMENTED METALLIC GIMBAL RINGS
    const createSegmentedRing = (radius, tube, color, opacity) => {
      const geo = new THREE.TorusGeometry(radius, tube, 16, 120);
      const mat = new THREE.MeshBasicMaterial({
        color,
        wireframe: true,
        transparent: true,
        opacity,
      });
      return new THREE.Mesh(geo, mat);
    };

    const ringPrimary = createSegmentedRing(2.6, 0.02, 0x2563eb, 0.7);
    const ringSecondary = createSegmentedRing(2.2, 0.015, 0x38bdf8, 0.5);
    const ringTertiary = createSegmentedRing(1.8, 0.012, 0x60a5fa, 0.4);

    ringPrimary.rotation.x = Math.PI / 3;
    ringSecondary.rotation.y = Math.PI / 4;
    ringTertiary.rotation.z = Math.PI / 6;

    coreGroup.add(ringPrimary);
    coreGroup.add(ringSecondary);
    coreGroup.add(ringTertiary);

    // 4. HIGH-DENSITY PARTICLE ACCRETION DISK (1,800 Particles)
    const particleCount = 1800;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const colorBlue = new THREE.Color(0x3b82f6);
    const colorCyan = new THREE.Color(0x38bdf8);
    const colorWhite = new THREE.Color(0xffffff);

    for (let i = 0; i < particleCount * 3; i += 3) {
      const radius = 2.8 + Math.random() * 4.2;
      const angle = Math.random() * Math.PI * 2;
      const spreadY = (Math.random() - 0.5) * 2.2;

      positions[i] = Math.cos(angle) * radius;
      positions[i + 1] = spreadY;
      positions[i + 2] = Math.sin(angle) * radius;

      const mixed = Math.random() > 0.6 ? colorBlue : Math.random() > 0.3 ? colorCyan : colorWhite;
      colors[i] = mixed.r;
      colors[i + 1] = mixed.g;
      colors[i + 2] = mixed.b;
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.024,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 5. INTERACTIVE INERTIA PHYSICS & PARALLAX
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e) => {
      const rect = mount.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    };

    window.addEventListener("mousemove", handleMouseMove);

    const handleResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };

    window.addEventListener("resize", handleResize);

    // 6. RENDER LOOP
    let animId;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth mouse lerp
      targetX += (mouseX - targetX) * 0.04;
      targetY += (mouseY - targetY) * 0.04;

      // Gimbal rotations
      ringPrimary.rotation.x += 0.004;
      ringPrimary.rotation.y += 0.006;

      ringSecondary.rotation.y -= 0.007;
      ringSecondary.rotation.z += 0.003;

      ringTertiary.rotation.x += 0.005;
      ringTertiary.rotation.z -= 0.005;

      // Core pulsating breathing cycle
      meshOuter.rotation.y += 0.008;
      meshOuter.rotation.x += 0.004;
      const breath = 1.0 + Math.sin(elapsed * 2.0) * 0.04;
      meshOuter.scale.set(breath, breath, breath);

      meshMid.rotation.y -= 0.012;
      meshInner.rotation.x += 0.015;

      // Accretion disk vortex
      particles.rotation.y = elapsed * 0.025 + targetX * 0.3;
      particles.rotation.x = targetY * 0.2;

      // Parallax camera tilt
      camera.position.x = targetX * 0.7;
      camera.position.y = targetY * 0.7;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (mount && renderer.domElement) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full absolute inset-0 pointer-events-none" />;
}