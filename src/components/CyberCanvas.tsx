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

    // Accessibility motion preference
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    let noMotion = mq.matches;
    const handleMotionChange = (e: MediaQueryListEvent) => {
      noMotion = e.matches;
    };
    mq.addEventListener('change', handleMotionChange);

    canvas.setAttribute('role', 'img');
    canvas.setAttribute('aria-label', 'Mesmerizing mathematical Aurora Borealis background animation.');

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      powerPreference: 'high-performance',
    });
    
    const getDpr = () => Math.min(window.devicePixelRatio, 1.5);
    renderer.setPixelRatio(getDpr());
    renderer.setSize(container.clientWidth, container.clientHeight);

    // Uniforms
    const uniforms = {
      iTime: { value: 0 },
      iResolution: { value: new THREE.Vector2(container.clientWidth, container.clientHeight) },
      uDarkTheme: { value: theme === 'dark' ? 1.0 : 0.0 }
    };

    // Vertex Shader
    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `;

    // Fragment Shader
    const fragmentShader = `
      uniform float iTime;
      uniform vec2 iResolution;
      uniform float uDarkTheme;
      varying vec2 vUv;

      #define NUM_OCTAVES 3

      float rand(vec2 n) {
        return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
      }

      float noise(vec2 p) {
        vec2 ip = floor(p);
        vec2 u = fract(p);
        u = u * u * (3.0 - 2.0 * u);

        float res = mix(
          mix(rand(ip), rand(ip + vec2(1.0, 0.0)), u.x),
          mix(rand(ip + vec2(0.0, 1.0)), rand(ip + vec2(1.0, 1.0)), u.x), u.y);
        return res * res;
      }

      float fbm(vec2 x) {
        float v = 0.0;
        float a = 0.3;
        vec2 shift = vec2(100.0);
        mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
        for (int i = 0; i < NUM_OCTAVES; ++i) {
          v += a * noise(x);
          x = rot * x * 2.0 + shift;
          a *= 0.4;
        }
        return v;
      }

      void main() {
        // Subtle screen shake for organic movement
        vec2 shake = vec2(sin(iTime * 0.3) * 0.003, cos(iTime * 0.5) * 0.003);
        vec2 p = ((gl_FragCoord.xy + shake * iResolution.xy) - iResolution.xy * 0.5) / iResolution.y;
        
        // Tilt coordinate space slightly for dynamic composition
        p = p * mat2(4.0, -2.5, 2.5, 4.0);
        
        vec2 v;
        vec4 o = vec4(0.0);

        float f = 1.8 + fbm(p + vec2(iTime * 0.4, 0.0)) * 0.4;

        for (float i = 0.0; i < 28.0; i++) {
          v = p + cos(i * i + (iTime * 0.15 + p.x * 0.06) * 0.1 + i * vec2(11.5, 9.5)) * 3.0 + vec2(sin(iTime * 0.25 + i) * 0.002, cos(iTime * 0.3 - i) * 0.002);
          float tailNoise = fbm(v + vec2(iTime * 0.05, i)) * 0.25 * (1.0 - (i / 28.0));
          
          // Organic evolving Aurora colors (Violet, Indigo, Deep Pink, Emerald)
          vec4 auroraColors = vec4(
            0.15 + 0.35 * sin(i * 0.15 + iTime * 0.1),
            0.25 + 0.45 * cos(i * 0.2 + iTime * 0.08),
            0.65 + 0.35 * sin(i * 0.25 + iTime * 0.12),
            1.0
          );
          
          vec4 currentContribution = auroraColors * exp(sin(i * i + iTime * 0.2)) / length(max(v, vec2(v.x * f * 0.015, v.y * 1.8)));
          float thinnessFactor = smoothstep(0.0, 1.0, i / 28.0) * 0.55;
          o += currentContribution * (1.0 + tailNoise * 0.75) * thinnessFactor;
        }

        o = tanh(pow(o / 70.0, vec4(1.5)));
        vec3 oColor = o.rgb;

        vec3 col;
        if (uDarkTheme > 0.5) {
          // Deep obsidian base color (#030712 is roughly vec3(0.012, 0.027, 0.07))
          vec3 darkBase = vec3(0.012, 0.027, 0.07);
          col = oColor * 1.45 + darkBase * (1.0 - clamp(length(oColor) * 1.5, 0.0, 1.0));
        } else {
          // Warm white base (#fafafa is roughly vec3(0.98)) with very soft pastel aurora
          vec3 lightBase = vec3(0.98, 0.98, 0.98);
          // Map dark aurora to beautiful soft pastel shades (lavender, soft blue, pale pink)
          vec3 pastelAurora = oColor * 0.32;
          col = mix(lightBase, vec3(0.6, 0.5, 0.9) * pastelAurora.r + vec3(0.4, 0.7, 0.95) * pastelAurora.g + vec3(0.5, 0.85, 0.75) * pastelAurora.b, clamp(length(pastelAurora) * 2.0, 0.0, 1.0));
        }

        gl_FragColor = vec4(col, 1.0);
      }
    `;

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
      depthWrite: false,
      depthTest: false
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const delta = clock.getDelta();
      if (!noMotion) {
        uniforms.iTime.value += delta;
      }
      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Resize observer
    const resizeObserver = new ResizeObserver((entries) => {
      if (!entries || entries.length === 0) return;
      const { width, height } = entries[0].contentRect;
      renderer.setSize(width, height);
      renderer.setPixelRatio(getDpr());
      uniforms.iResolution.value.set(width, height);
    });
    resizeObserver.observe(container);

    // Teardown
    return () => {
      cancelAnimationFrame(animationFrameId);
      mq.removeEventListener('change', handleMotionChange);
      resizeObserver.disconnect();
      geometry.dispose();
      material.dispose();
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
        className="w-full h-full block opacity-90 dark:opacity-[0.88] pointer-events-auto"
      />
    </div>
  );
}
