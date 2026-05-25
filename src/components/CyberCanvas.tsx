import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useTheme } from '../lib/ThemeContext';

export default function CyberCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  
  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;

    // 1. Accessibility & Motion Preference Setup
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    let noMotion = mq.matches;
    const handleMotionChange = (e: MediaQueryListEvent) => {
      noMotion = e.matches;
    };
    mq.addEventListener('change', handleMotionChange);

    // Set canvas description for screen readers
    canvas.setAttribute('role', 'img');
    canvas.setAttribute('aria-label', 'Interactive 3D cybersecurity node network. Floating nodes tilt and rotate based on mouse movement.');

    // 2. Three.js Scene Setup
    const scene = new THREE.Scene();
    
    // Perspective Camera: FOV 60 (comfortable view), Aspect ratio dynamic
    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 15);

    // Renderer: alpha transparent so it overlays on the HTML CSS background
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);

    // 3. Generate Particle Texture (Soft glowing circular gradient)
    const createParticleTexture = () => {
      const pCanvas = document.createElement('canvas');
      pCanvas.width = 32;
      pCanvas.height = 32;
      const ctx = pCanvas.getContext('2d');
      if (ctx) {
        const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        gradient.addColorStop(0.2, 'rgba(255, 255, 255, 0.8)');
        gradient.addColorStop(0.5, 'rgba(6, 182, 212, 0.4)'); // cyan outer glow
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 32, 32);
      }
      const texture = new THREE.CanvasTexture(pCanvas);
      return texture;
    };

    const particleTexture = createParticleTexture();

    // 4. Create Node Points & Line Geometries
    const particleCount = 75;
    const positions = new Float32Array(particleCount * 3);
    const velocities: number[] = [];
    const targetPositions: number[] = [];

    const range = 12; // Spread coordinates inside a box

    for (let i = 0; i < particleCount; i++) {
      // Random coordinates inside range
      positions[i * 3] = (Math.random() - 0.5) * range;
      positions[i * 3 + 1] = (Math.random() - 0.5) * range;
      positions[i * 3 + 2] = (Math.random() - 0.5) * (range / 2);

      // Random velocities for continuous drift
      velocities.push(
        (Math.random() - 0.5) * 0.015,
        (Math.random() - 0.5) * 0.015,
        (Math.random() - 0.5) * 0.010
      );

      // Store initial targets
      targetPositions.push(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]);
    }

    const pointsGeometry = new THREE.BufferGeometry();
    pointsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Dynamic Theme Colors
    const isDark = theme === 'dark';
    const pointColor = isDark ? 0x06b6d4 : 0x3b82f6; // Cyan in dark, Blue in light
    const lineColor = isDark ? 0x00f0ff : 0x2563eb; 

    // Point Material
    const pointsMaterial = new THREE.PointsMaterial({
      color: pointColor,
      size: 0.5,
      map: particleTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const points = new THREE.Points(pointsGeometry, pointsMaterial);
    
    // Node Group
    const cyberGroup = new THREE.Group();
    cyberGroup.add(points);
    scene.add(cyberGroup);

    // Line Connections Setup
    // Maximum lines is determined by particle combinations, we limit to max connections
    const maxConnections = 180;
    const linePositions = new Float32Array(maxConnections * 2 * 3); // 2 points per line, 3 coords
    const lineColors = new Float32Array(maxConnections * 2 * 3);

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    lineGeometry.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));

    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: isDark ? 0.35 : 0.25,
      blending: THREE.AdditiveBlending,
      linewidth: 1
    });

    const connections = new THREE.LineSegments(lineGeometry, lineMaterial);
    cyberGroup.add(connections);

    // 5. Mouse Pointer Tracking Setup
    const mouse = new THREE.Vector2(0, 0);
    const targetMouse = new THREE.Vector2(0, 0);

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse coordinates: -1 to +1
      const rect = canvas.getBoundingClientRect();
      targetMouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      targetMouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        const touch = e.touches[0];
        targetMouse.x = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
        targetMouse.y = -((touch.clientY - rect.top) / rect.height) * 2 + 1;
      }
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('touchmove', handleTouchMove, { passive: true });

    // 6. Resize Observer Setup
    const resizeObserver = new ResizeObserver((entries) => {
      if (!entries || entries.length === 0) return;
      const { width, height } = entries[0].contentRect;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });
    
    resizeObserver.observe(container);

    // 7. Animation Loop
    const clock = new THREE.Clock();
    
    const animate = () => {
      const dt = clock.getDelta();
      
      // Update mouse lerping for smooth inertia response
      mouse.x += (targetMouse.x - mouse.x) * 0.05;
      mouse.y += (targetMouse.y - mouse.y) * 0.05;

      if (!noMotion) {
        // Subtle automatic rotation
        cyberGroup.rotation.y += dt * 0.05;
        
        // Tilt group based on mouse movement
        cyberGroup.rotation.x = -mouse.y * 0.25;
        cyberGroup.rotation.z = mouse.x * 0.15;

        // Animate individual node drift
        const positionsAttr = pointsGeometry.attributes.position;
        const arr = positionsAttr.array as Float32Array;

        for (let i = 0; i < particleCount; i++) {
          // Update positions using velocities
          arr[i * 3] += velocities[i * 3];
          arr[i * 3 + 1] += velocities[i * 3 + 1];
          arr[i * 3 + 2] += velocities[i * 3 + 2];

          // Bounce off boundary limits
          const limitX = range / 2;
          const limitY = range / 2;
          const limitZ = range / 4;

          if (Math.abs(arr[i * 3]) > limitX) velocities[i * 3] *= -1;
          if (Math.abs(arr[i * 3 + 1]) > limitY) velocities[i * 3 + 1] *= -1;
          if (Math.abs(arr[i * 3 + 2]) > limitZ) velocities[i * 3 + 2] *= -1;
        }

        positionsAttr.needsUpdate = true;
      }

      // Re-calculate connecting lines between nodes in 3D space
      const posAttr = pointsGeometry.attributes.position.array as Float32Array;
      const linePosAttr = lineGeometry.attributes.position.array as Float32Array;
      const lineColorAttr = lineGeometry.attributes.color.array as Float32Array;

      let connectionIndex = 0;
      const connectionThreshold = 3.5; // Max distance for nodes to connect

      const cColor = new THREE.Color(isDark ? '#06b6d4' : '#3b82f6'); // Base theme color
      const accentColor = new THREE.Color(isDark ? '#3b82f6' : '#0891b2');

      for (let i = 0; i < particleCount && connectionIndex < maxConnections; i++) {
        const x1 = posAttr[i * 3];
        const y1 = posAttr[i * 3 + 1];
        const z1 = posAttr[i * 3 + 2];

        for (let j = i + 1; j < particleCount && connectionIndex < maxConnections; j++) {
          const x2 = posAttr[j * 3];
          const y2 = posAttr[j * 3 + 1];
          const z2 = posAttr[j * 3 + 2];

          // Compute distance squared (faster than Math.sqrt)
          const dx = x1 - x2;
          const dy = y1 - y2;
          const dz = z1 - z2;
          const distSq = dx * dx + dy * dy + dz * dz;

          if (distSq < connectionThreshold * connectionThreshold) {
            const idx = connectionIndex * 6;
            
            // Set Start point of line segment
            linePosAttr[idx] = x1;
            linePosAttr[idx + 1] = y1;
            linePosAttr[idx + 2] = z1;

            // Set End point of line segment
            linePosAttr[idx + 3] = x2;
            linePosAttr[idx + 4] = y2;
            linePosAttr[idx + 5] = z2;

            // Compute line opacity / color mix based on distance
            const dist = Math.sqrt(distSq);
            const alphaRatio = 1 - (dist / connectionThreshold);
            
            // Mix starting/ending colors
            const mixColor = cColor.clone().lerp(accentColor, alphaRatio);

            // Assign color vertex values
            lineColorAttr[idx] = mixColor.r;
            lineColorAttr[idx + 1] = mixColor.g;
            lineColorAttr[idx + 2] = mixColor.b;

            lineColorAttr[idx + 3] = mixColor.r;
            lineColorAttr[idx + 4] = mixColor.g;
            lineColorAttr[idx + 5] = mixColor.b;

            connectionIndex++;
          }
        }
      }

      // Fill remaining points with zeros if connections are fewer than max
      for (let k = connectionIndex; k < maxConnections; k++) {
        const idx = k * 6;
        linePosAttr[idx] = 0;
        linePosAttr[idx + 1] = 0;
        linePosAttr[idx + 2] = 0;
        linePosAttr[idx + 3] = 0;
        linePosAttr[idx + 4] = 0;
        linePosAttr[idx + 5] = 0;
      }

      lineGeometry.attributes.position.needsUpdate = true;
      lineGeometry.attributes.color.needsUpdate = true;

      // Render the scene
      renderer.render(scene, camera);
    };

    renderer.setAnimationLoop(animate);

    // 8. Handle Theme Updates Dynamically
    const updateThemeColors = () => {
      const currentDark = theme === 'dark';
      const updatedPointColor = currentDark ? 0x06b6d4 : 0x3b82f6;
      pointsMaterial.color.setHex(updatedPointColor);
      lineMaterial.opacity = currentDark ? 0.35 : 0.25;
    };
    
    updateThemeColors();

    // 9. Teardown / Resource Disposal
    return () => {
      renderer.setAnimationLoop(null);
      mq.removeEventListener('change', handleMotionChange);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('touchmove', handleTouchMove);
      resizeObserver.disconnect();

      // Dispose buffers & objects
      pointsGeometry.dispose();
      pointsMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      particleTexture.dispose();
      renderer.dispose();
    };
  }, [theme]);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none select-none"
    >
      <canvas 
        ref={canvasRef} 
        className="w-full h-full block opacity-85 dark:opacity-95 pointer-events-auto"
      />
    </div>
  );
}
