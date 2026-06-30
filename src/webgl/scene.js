import * as THREE from 'three';

/* Ashima / Stefan Gustavson 3D simplex noise — used for vertex displacement. */
const SIMPLEX = /* glsl */ `
vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x,289.0);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
float snoise(vec3 v){
  const vec2 C = vec2(1.0/6.0, 1.0/3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i  = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + 1.0 * C.xxx;
  vec3 x2 = x0 - i2 + 2.0 * C.xxx;
  vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;
  i = mod(i, 289.0);
  vec4 p = permute(permute(permute(
            i.z + vec4(0.0, i1.z, i2.z, 1.0))
          + i.y + vec4(0.0, i1.y, i2.y, 1.0))
          + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 1.0/7.0;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z *ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}
`;

const lerp = (a, b, t) => a + (b - a) * t;

export default class PortfolioScene {
  constructor(canvas, { reduced = false } = {}) {
    this.canvas = canvas;
    this.reduced = reduced;
    this.mouse = new THREE.Vector2(0, 0);
    this.targetMouse = new THREE.Vector2(0, 0);
    this.scroll = 0;
    this.targetScroll = 0;
    this.clock = new THREE.Clock();
    this.running = false;

    this._init();
    this._buildBlob();
    this._buildParticles();
    this._buildAccents();
    this.resize();
  }

  _init() {
    const renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.renderer = renderer;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    this.camera.position.set(0, 0, 7);

    this.root = new THREE.Group();
    this.scene.add(this.root);
  }

  _buildBlob() {
    const geo = new THREE.IcosahedronGeometry(1.5, 64);

    this.blobUniforms = {
      uTime: { value: 0 },
      uDistort: { value: 0.55 },
      uScroll: { value: 0 },
      uColorA: { value: new THREE.Color('#3a0f08') },
      uColorB: { value: new THREE.Color('#2a1004') },
      uFresnel: { value: new THREE.Color('#ffd23f') },
      uFresnel2: { value: new THREE.Color('#ff6a2c') },
      uFresnelPow: { value: 2.4 },
    };

    const vertex = /* glsl */ `
      uniform float uTime; uniform float uDistort; uniform float uScroll;
      varying float vNoise; varying vec3 vNormal; varying vec3 vView;
      ${SIMPLEX}
      void main(){
        float t = uTime * 0.32;
        float n  = snoise(position * 0.9 + vec3(t));
        float n2 = snoise(position * 2.1 - vec3(t * 0.8));
        float disp = (n * 0.6 + n2 * 0.4) * uDistort * (0.75 + uScroll * 0.9);
        vec3 newPos = position + normal * disp;
        vNoise = n;
        vec4 mv = modelViewMatrix * vec4(newPos, 1.0);
        vNormal = normalize(normalMatrix * normal);
        vView = normalize(-mv.xyz);
        gl_Position = projectionMatrix * mv;
      }
    `;
    const fragment = /* glsl */ `
      uniform vec3 uColorA; uniform vec3 uColorB;
      uniform vec3 uFresnel; uniform vec3 uFresnel2; uniform float uFresnelPow; uniform float uScroll;
      varying float vNoise; varying vec3 vNormal; varying vec3 vView;
      void main(){
        float fres = pow(1.0 - max(dot(vView, vNormal), 0.0), uFresnelPow);
        vec3 base = mix(uColorA, uColorB, smoothstep(-1.0, 1.0, vNoise));
        vec3 rim = mix(uFresnel, uFresnel2, smoothstep(0.0, 1.0, vNoise * 0.5 + 0.5 + uScroll));
        vec3 col = base + rim * fres * 1.35;
        col += base * 0.2;
        gl_FragColor = vec4(col, 1.0);
      }
    `;

    this.blobMat = new THREE.ShaderMaterial({
      uniforms: this.blobUniforms,
      vertexShader: vertex,
      fragmentShader: fragment,
    });
    this.blob = new THREE.Mesh(geo, this.blobMat);
    this.root.add(this.blob);

    // Neon wireframe shell sharing the same displacement.
    const wireMat = new THREE.ShaderMaterial({
      uniforms: this.blobUniforms,
      vertexShader: vertex,
      fragmentShader: /* glsl */ `
        uniform vec3 uFresnel; uniform vec3 uFresnel2; uniform float uScroll;
        varying float vNoise; varying vec3 vNormal; varying vec3 vView;
        void main(){
          float fres = pow(1.0 - max(dot(vView, vNormal), 0.0), 1.5);
          vec3 c = mix(uFresnel, uFresnel2, smoothstep(-1.0, 1.0, vNoise));
          gl_FragColor = vec4(c * (0.35 + fres * 0.8), 1.0);
        }
      `,
      wireframe: true,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    this.wire = new THREE.Mesh(geo, wireMat);
    this.wire.scale.setScalar(1.06);
    this.root.add(this.wire);
  }

  _buildParticles() {
    const isMobile = window.innerWidth < 768;
    const count = this.reduced ? 400 : isMobile ? 1100 : 2600;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const scales = new Float32Array(count);

    const palette = [
      new THREE.Color('#ffd23f'),
      new THREE.Color('#ff8a3d'),
      new THREE.Color('#ff5147'),
      new THREE.Color('#ffb13d'),
    ];

    for (let i = 0; i < count; i++) {
      // Spherical shell so particles wrap the blob with depth.
      const r = 3.5 + Math.pow(Math.random(), 0.6) * 10;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      const c = palette[(Math.random() * palette.length) | 0];
      colors[i * 3] = c.r; colors[i * 3 + 1] = c.g; colors[i * 3 + 2] = c.b;
      scales[i] = Math.random() * 0.9 + 0.25;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('aColor', new THREE.BufferAttribute(colors, 3));
    geo.setAttribute('aScale', new THREE.BufferAttribute(scales, 1));

    this.particleUniforms = {
      uTime: { value: 0 },
      uScroll: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uSize: { value: isMobile ? 18 : 26 },
      uPix: { value: Math.min(window.devicePixelRatio || 1, 2) },
    };

    const mat = new THREE.ShaderMaterial({
      uniforms: this.particleUniforms,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexShader: /* glsl */ `
        uniform float uTime; uniform float uScroll; uniform vec2 uMouse; uniform float uSize; uniform float uPix;
        attribute float aScale; attribute vec3 aColor;
        varying vec3 vColor; varying float vFade;
        void main(){
          vec3 p = position;
          float a = uTime * 0.04;
          float s = sin(a), c = cos(a);
          p.xz = mat2(c, -s, s, c) * p.xz;
          p.xy += uMouse * 0.8 * (0.4 + 0.03 * abs(p.z));
          p *= 1.0 + uScroll * 0.35;
          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          gl_Position = projectionMatrix * mv;
          gl_PointSize = uSize * aScale * uPix * (1.0 / max(-mv.z, 0.1));
          vColor = aColor;
          vFade = smoothstep(16.0, 4.0, length(p));
        }
      `,
      fragmentShader: /* glsl */ `
        varying vec3 vColor; varying float vFade;
        void main(){
          float d = length(gl_PointCoord - 0.5);
          float alpha = smoothstep(0.5, 0.0, d) * vFade;
          gl_FragColor = vec4(vColor * 0.9, alpha);
        }
      `,
    });

    this.particles = new THREE.Points(geo, mat);
    this.scene.add(this.particles);
  }

  _buildAccents() {
    this.accents = new THREE.Group();
    const mk = (geo, color, pos, scale) => {
      const m = new THREE.Mesh(
        geo,
        new THREE.MeshBasicMaterial({
          color, wireframe: true, transparent: true, opacity: 0.4,
          blending: THREE.AdditiveBlending, depthWrite: false,
        })
      );
      m.position.set(...pos);
      m.scale.setScalar(scale);
      m.userData.spin = (Math.random() - 0.5) * 0.4;
      this.accents.add(m);
      return m;
    };
    if (!this.reduced) {
      mk(new THREE.TorusGeometry(1, 0.34, 12, 40), '#ffd23f', [-4.4, 2.1, -2], 0.85);
      mk(new THREE.OctahedronGeometry(1), '#ff5147', [4.6, -1.8, -1], 0.9);
      mk(new THREE.IcosahedronGeometry(1, 0), '#ff8a3d', [4.2, 2.6, -3], 0.7);
      mk(new THREE.TorusKnotGeometry(0.7, 0.22, 80, 12), '#ffb13d', [-4.8, -2.2, -2.5], 0.6);
    }
    this.scene.add(this.accents);
  }

  setMouse(x, y) { this.targetMouse.set(x, y); }
  setScroll(p) { this.targetScroll = p; }

  resize() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    if (this.particleUniforms) {
      this.particleUniforms.uPix.value = Math.min(window.devicePixelRatio || 1, 2);
    }
  }

  _frame() {
    const t = this.clock.getElapsedTime();
    this.mouse.lerp(this.targetMouse, 0.06);
    this.scroll = lerp(this.scroll, this.targetScroll, 0.07);

    // Blob
    this.blobUniforms.uTime.value = t;
    this.blobUniforms.uScroll.value = this.scroll;
    this.blob.rotation.y = t * 0.12 + this.scroll * Math.PI * 2;
    this.blob.rotation.x = this.scroll * Math.PI;
    this.wire.rotation.copy(this.blob.rotation);

    // Particles
    this.particleUniforms.uTime.value = t;
    this.particleUniforms.uScroll.value = this.scroll;
    this.particleUniforms.uMouse.value.copy(this.mouse);

    // Accents drift + spin + parallax
    this.accents.children.forEach((m, i) => {
      m.rotation.x += 0.003 + m.userData.spin * 0.01;
      m.rotation.y += 0.004;
      m.position.y += Math.sin(t * 0.6 + i) * 0.0025;
    });
    this.accents.position.x = this.mouse.x * 0.6;
    this.accents.position.y = this.mouse.y * 0.6;

    // Camera parallax + scroll dolly
    this.camera.position.x = lerp(this.camera.position.x, this.mouse.x * 0.9, 0.05);
    this.camera.position.y = lerp(this.camera.position.y, this.mouse.y * 0.9, 0.05);
    this.camera.position.z = lerp(this.camera.position.z, 7 + this.scroll * 3.2, 0.05);
    this.camera.lookAt(0, 0, 0);

    // Whole scene tilt toward mouse
    this.root.rotation.y = lerp(this.root.rotation.y, this.mouse.x * 0.3, 0.05);
    this.root.rotation.x = lerp(this.root.rotation.x, -this.mouse.y * 0.3, 0.05);

    this.renderer.render(this.scene, this.camera);
  }

  start() {
    if (this.running) return;
    this.running = true;
    const loop = () => {
      if (!this.running) return;
      this._frame();
      this._raf = requestAnimationFrame(loop);
    };
    if (this.reduced) { this._frame(); return; } // render once, no loop
    loop();
  }

  stop() {
    this.running = false;
    if (this._raf) cancelAnimationFrame(this._raf);
  }

  dispose() {
    this.stop();
    this.scene.traverse((o) => {
      if (o.geometry) o.geometry.dispose();
      if (o.material) {
        const mats = Array.isArray(o.material) ? o.material : [o.material];
        mats.forEach((m) => m.dispose());
      }
    });
    this.renderer.dispose();
  }
}
