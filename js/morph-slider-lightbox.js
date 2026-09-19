/**
 * INDOFRENCH Sleep Products - MorphSlider Gallery Lightbox Engine
 * Powered by OGL + GSAP + WebGL GPU Displacement Shaders (Melt / Ripple / Shear / Swirl)
 */

(function () {
  const TRANSITIONS = { melt: 0, ripple: 1, shear: 2, swirl: 3 };

  const vertexShader = `
    attribute vec2 position;
    attribute vec2 uv;
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = vec4(position, 0.0, 1.0);
    }
  `;

  const fragmentShader = `
    precision highp float;

    uniform sampler2D tCurrent;
    uniform sampler2D tNext;
    uniform vec2 uResolution;
    uniform vec2 uCurrentSize;
    uniform vec2 uNextSize;
    uniform float uProgress;
    uniform float uDir;
    uniform int uMode;
    uniform float uIntensity;
    uniform float uScale;
    uniform float uAberration;
    uniform float uDrift;
    uniform float uTime;
    uniform float uReduce;
    uniform vec2 uPointer;
    uniform vec3 uOverlay;

    varying vec2 vUv;

    const float PI = 3.14159265359;

    float hash11(float p) {
      p = fract(p * 0.1031);
      p *= p + 33.33;
      p *= p + p;
      return fract(p);
    }

    float hash21(vec2 p) {
      vec3 p3 = fract(vec3(p.xyx) * 0.1031);
      p3 += dot(p3, p3.yzx + 33.33);
      return fract((p3.x + p3.y) * p3.z);
    }

    float noise(vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);
      vec2 u = f * f * (3.0 - 2.0 * f);
      float a = hash21(i);
      float b = hash21(i + vec2(1.0, 0.0));
      float c = hash21(i + vec2(0.0, 1.0));
      float d = hash21(i + vec2(1.0, 1.0));
      return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
    }

    float fbm(vec2 p) {
      float v = 0.0;
      float a = 0.5;
      for (int i = 0; i < 5; i++) {
        v += a * noise(p);
        p *= 2.0;
        a *= 0.5;
      }
      return v;
    }

    mat2 rot(float a) {
      float s = sin(a);
      float c = cos(a);
      return mat2(c, -s, s, c);
    }

    vec2 coverUV(vec2 uv, vec2 res, vec2 img) {
      float rA = res.x / max(res.y, 1.0);
      float iA = img.x / max(img.y, 1.0);
      vec2 s = vec2(1.0);
      float ratio = rA / max(iA, 0.0001);
      if (ratio > 1.0) {
        s.y = 1.0 / ratio;
      } else {
        s.x = ratio;
      }
      return (uv - 0.5) * s + 0.5;
    }

    void main() {
      float p = clamp(uProgress, 0.0, 1.0);
      float env = sin(p * PI);

      vec2 uv = vUv;

      uv += vec2(sin(uTime * 0.25 + uv.y * 4.0), cos(uTime * 0.22 + uv.x * 4.0)) * uDrift * 0.008;
      uv = (uv - 0.5) * (1.0 - uDrift * 0.02 * sin(uTime * 0.4)) + 0.5;

      vec2 uvC = uv;
      vec2 uvN = uv;
      float m = smoothstep(0.0, 1.0, p);

      if (uReduce < 0.5) {
        if (uMode == 3) {
          vec2 c = uv - 0.5;
          float r = length(c);
          float ang = env * uIntensity * 3.5 * (1.0 - r);
          uvC = rot(ang) * c + 0.5;
          uvN = rot(-ang) * c + 0.5;
          m = smoothstep(0.0, 1.0, p);
        } else if (uMode == 1) {
          float d = distance(uv, uPointer);
          float ring = p * 1.6;
          float wave = sin((d - ring) * 30.0) * env;
          vec2 dir = normalize(uv - uPointer + 1e-4);
          vec2 disp = dir * wave * uIntensity * 0.25;
          uvC = uv + disp;
          uvN = uv + disp * 0.6;
          m = 1.0 - smoothstep(ring - 0.03, ring + 0.03, d);
        } else if (uMode == 2) {
          float slices = 14.0;
          float row = floor(uv.y * slices);
          float rnd = hash11(row);
          vec2 disp = vec2((rnd - 0.5) * env * uIntensity * 0.6, 0.0);
          uvC = uv + disp;
          uvN = uv + disp;
          float localX = uDir > 0.0 ? uv.x : 1.0 - uv.x;
          float th = p * 1.5 - 0.25 + (rnd - 0.5) * 0.25;
          m = 1.0 - smoothstep(th - 0.06, th + 0.06, localX);
        } else {
          float nn = fbm(uv * uScale + uTime * 0.03);
          float warp = fbm(uv * uScale * 1.7 - uTime * 0.02);
          vec2 g = vec2(nn, warp) - 0.5;
          uvC = uv + g * uIntensity * 0.5 * p;
          uvN = uv - g * uIntensity * 0.5 * (1.0 - p);
          m = smoothstep(nn - 0.15, nn + 0.15, p);
        }
      }

      vec2 sC = coverUV(uvC, uResolution, uCurrentSize);
      vec2 sN = coverUV(uvN, uResolution, uNextSize);

      float ca = uReduce < 0.5 ? uAberration * env * 0.03 : 0.0;

      vec3 colC = vec3(
        texture2D(tCurrent, sC + vec2(ca, 0.0)).r,
        texture2D(tCurrent, sC).g,
        texture2D(tCurrent, sC - vec2(ca, 0.0)).b
      );
      vec3 colN = vec3(
        texture2D(tNext, sN + vec2(ca, 0.0)).r,
        texture2D(tNext, sN).g,
        texture2D(tNext, sN - vec2(ca, 0.0)).b
      );

      vec3 col = mix(colC, colN, m);

      float vig = smoothstep(1.25, 0.25, length(uv - 0.5));
      col = mix(col, uOverlay, (1.0 - vig) * 0.28);

      gl_FragColor = vec4(col, 1.0);
    }
  `;

  function makeFallbackTexture(gl) {
    const size = 4;
    const data = new Uint8Array(size * size * 4);
    for (let i = 0; i < size * size; i++) {
      data[i * 4] = 12;
      data[i * 4 + 1] = 12;
      data[i * 4 + 2] = 16;
      data[i * 4 + 3] = 255;
    }
    return new OGL.Texture(gl, { image: data, width: size, height: size, generateMipmaps: false });
  }

  function hexToRgb(hex) {
    let h = (hex || '#000000').replace('#', '');
    if (h.length === 3) {
      h = h.split('').map(c => c + c).join('');
    }
    const n = parseInt(h, 16);
    return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
  }

  class MorphEngine {
    constructor(container, { items, startIndex, reducedMotion, getOptions, onIndexChange }) {
      this.container = container;
      this.items = items;
      this.getOptions = getOptions;
      this.onIndexChange = onIndexChange;
      this.reducedMotion = reducedMotion;

      this.current = startIndex;
      this.animating = false;
      this.dragging = false;
      this.dragDir = 0;
      this.shownIndex = startIndex;
      this.tween = null;

      const { Renderer, Triangle, Program, Mesh, Texture } = window.OGL;

      this.renderer = new Renderer({
        alpha: false,
        antialias: true,
        dpr: Math.min(window.devicePixelRatio || 1, 2)
      });
      this.gl = this.renderer.gl;
      this.gl.clearColor(0.04, 0.04, 0.06, 1);

      this.canvas = this.gl.canvas;
      this.canvas.className = 'morph-slider-canvas';
      container.appendChild(this.canvas);

      this.geometry = new Triangle(this.gl);

      this.textures = this.items.map(() => makeFallbackTexture(this.gl));
      this.sizes = this.items.map(() => [1, 1]);

      const opts = this.getOptions();
      this.program = new Program(this.gl, {
        vertex: vertexShader,
        fragment: fragmentShader,
        uniforms: {
          tCurrent: { value: this.textures[this.current] },
          tNext: { value: this.textures[this.current] },
          uResolution: { value: [1, 1] },
          uCurrentSize: { value: this.sizes[this.current] },
          uNextSize: { value: this.sizes[this.current] },
          uProgress: { value: 0 },
          uDir: { value: 1 },
          uMode: { value: TRANSITIONS[opts.transition] ?? 0 },
          uIntensity: { value: opts.intensity },
          uScale: { value: opts.scale },
          uAberration: { value: opts.aberration },
          uDrift: { value: opts.drift },
          uTime: { value: 0 },
          uReduce: { value: reducedMotion ? 1 : 0 },
          uPointer: { value: [0.5, 0.5] },
          uOverlay: { value: hexToRgb(opts.overlayColor) }
        }
      });

      this.mesh = new Mesh(this.gl, { geometry: this.geometry, program: this.program });

      this.resizeObserver = new ResizeObserver(() => this.resize());
      this.resizeObserver.observe(container);
      this.resize();

      this.loadTextures();

      this.boundLoop = this.loop.bind(this);
      this.raf = requestAnimationFrame(this.boundLoop);
    }

    loadTextures() {
      const { Texture } = window.OGL;
      this.items.forEach((item, index) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.src = item.image;
        img.onload = () => {
          const texture = new Texture(this.gl, { generateMipmaps: false });
          texture.image = img;
          this.textures[index] = texture;
          this.sizes[index] = [img.naturalWidth || 1, img.naturalHeight || 1];
          if (index === this.current) {
            this.program.uniforms.tCurrent.value = texture;
            this.program.uniforms.uCurrentSize.value = this.sizes[index];
          }
        };
      });
    }

    resize() {
      const rect = this.container.getBoundingClientRect();
      const w = Math.max(rect.width, 1);
      const h = Math.max(rect.height, 1);
      this.renderer.setSize(w, h);
      this.program.uniforms.uResolution.value = [this.gl.canvas.width, this.gl.canvas.height];
    }

    syncOptions() {
      const opts = this.getOptions();
      this.program.uniforms.uMode.value = TRANSITIONS[opts.transition] ?? 0;
      this.program.uniforms.uIntensity.value = opts.intensity;
      this.program.uniforms.uScale.value = opts.scale;
      this.program.uniforms.uAberration.value = opts.aberration;
      this.program.uniforms.uDrift.value = opts.drift;
      this.program.uniforms.uOverlay.value = hexToRgb(opts.overlayColor);
    }

    loop(t) {
      this.program.uniforms.uTime.value = t * 0.001;
      if (!this.dragging && !this.animating) this.syncOptions();
      this.renderer.render({ scene: this.mesh });
      this.raf = requestAnimationFrame(this.boundLoop);
    }

    wrap(i) {
      const n = this.items.length;
      return ((i % n) + n) % n;
    }

    prepareNext(dir) {
      const target = this.wrap(this.current + dir);
      this.program.uniforms.tCurrent.value = this.textures[this.current];
      this.program.uniforms.uCurrentSize.value = this.sizes[this.current];
      this.program.uniforms.tNext.value = this.textures[target];
      this.program.uniforms.uNextSize.value = this.sizes[target];
      this.program.uniforms.uDir.value = dir;
      return target;
    }

    goTo(targetIndex) {
      if (this.animating || this.dragging || this.items.length < 2 || targetIndex === this.current) return;
      const dir = targetIndex > this.current ? 1 : -1;
      const opts = this.getOptions();
      this.syncOptions();

      this.program.uniforms.tCurrent.value = this.textures[this.current];
      this.program.uniforms.uCurrentSize.value = this.sizes[this.current];
      this.program.uniforms.tNext.value = this.textures[targetIndex];
      this.program.uniforms.uNextSize.value = this.sizes[targetIndex];
      this.program.uniforms.uDir.value = dir;

      this.animating = true;
      this.announce(targetIndex);
      const duration = opts.duration || 1.1;

      if (window.gsap) {
        this.tween = window.gsap.fromTo(
          this.program.uniforms.uProgress,
          { value: 0 },
          {
            value: 1,
            duration,
            ease: opts.ease || 'power2.inOut',
            onComplete: () => this.commit(targetIndex)
          }
        );
      } else {
        this.commit(targetIndex);
      }
    }

    step(dir) {
      const target = this.wrap(this.current + dir);
      this.goTo(target);
    }

    announce(index) {
      if (index === this.shownIndex) return;
      this.shownIndex = index;
      if (this.onIndexChange) this.onIndexChange(index);
    }

    commit(target) {
      this.current = target;
      this.program.uniforms.tCurrent.value = this.textures[target];
      this.program.uniforms.uCurrentSize.value = this.sizes[target];
      this.program.uniforms.uProgress.value = 0;
      this.animating = false;
      this.tween = null;
      this.announce(target);
    }

    destroy() {
      cancelAnimationFrame(this.raf);
      if (this.tween) this.tween.kill();
      this.resizeObserver.disconnect();
      if (this.canvas.parentNode) this.canvas.parentNode.removeChild(this.canvas);
    }
  }

  // Global MorphSlider Modal Controller
  window.initMorphGalleryModal = function () {
    const galleryItems = document.querySelectorAll('.gallery-item');
    if (galleryItems.length === 0) return;

    // Collect all gallery items
    const items = [];
    galleryItems.forEach((el, i) => {
      const img = el.querySelector('img');
      if (img) {
        items.push({
          image: img.src,
          caption: img.alt || `Indofrench Gallery Item ${i + 1}`
        });
      }
    });

    let activeModal = null;
    let engine = null;
    let activeIndex = 0;

    galleryItems.forEach((el, index) => {
      el.addEventListener('click', () => {
        openMorphModal(index);
      });
    });

    function openMorphModal(startIndex) {
      if (activeModal) closeMorphModal();

      activeIndex = startIndex;

      activeModal = document.createElement('div');
      activeModal.className = 'morph-modal-overlay active';
      activeModal.innerHTML = `
        <div class="morph-modal-container">
          <button class="morph-modal-close" id="morphCloseBtn" aria-label="Close Lightbox">&times;</button>
          
          <div class="morph-slider-wrapper" id="morphSliderStage"></div>

          <div class="morph-slider-caption-box">
            <span class="morph-caption-text" id="morphCaptionText"></span>
          </div>

          <div class="morph-slider-controls">
            <button class="morph-slider-btn" id="morphPrevBtn" aria-label="Previous">
              <i class="fa-solid fa-chevron-left"></i>
            </button>
            <button class="morph-slider-btn" id="morphNextBtn" aria-label="Next">
              <i class="fa-solid fa-chevron-right"></i>
            </button>
          </div>

          <div class="morph-slider-indicators" id="morphDots"></div>
        </div>
      `;

      document.body.appendChild(activeModal);
      document.body.style.overflow = 'hidden';

      const stage = activeModal.querySelector('#morphSliderStage');
      const captionText = activeModal.querySelector('#morphCaptionText');
      const dotsContainer = activeModal.querySelector('#morphDots');

      // Generate dot indicators
      dotsContainer.innerHTML = items.map((_, i) => `
        <button class="morph-slider-dot ${i === startIndex ? 'is-active' : ''}" data-index="${i}"></button>
      `).join('');

      function updateUI(idx) {
        activeIndex = idx;
        if (items[idx]) {
          captionText.textContent = items[idx].caption;
        }
        const dots = dotsContainer.querySelectorAll('.morph-slider-dot');
        dots.forEach((dot, i) => {
          dot.classList.toggle('is-active', i === idx);
        });
      }

      updateUI(startIndex);

      // Check if OGL and GSAP are loaded
      if (window.OGL && window.gsap) {
        engine = new MorphEngine(stage, {
          items,
          startIndex,
          reducedMotion: false,
          getOptions: () => ({
            transition: 'melt',
            duration: 1.1,
            ease: 'power2.inOut',
            intensity: 0.55,
            scale: 2.4,
            aberration: 0.35,
            drift: 0.4,
            overlayColor: '#000000',
            loop: true
          }),
          onIndexChange: updateUI
        });
      } else {
        // Fallback standard image display if WebGL not ready
        stage.innerHTML = `<img src="${items[startIndex].image}" style="max-width:100%; max-height:100%; border-radius:16px; object-fit:contain;">`;
      }

      // Event Listeners
      activeModal.querySelector('#morphCloseBtn').addEventListener('click', closeMorphModal);
      activeModal.querySelector('#morphPrevBtn').addEventListener('click', () => {
        if (engine) engine.step(-1);
        else updateFallback(-1);
      });
      activeModal.querySelector('#morphNextBtn').addEventListener('click', () => {
        if (engine) engine.step(1);
        else updateFallback(1);
      });

      dotsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('morph-slider-dot')) {
          const targetIndex = parseInt(e.target.getAttribute('data-index'), 10);
          if (engine) engine.goTo(targetIndex);
          else {
            activeIndex = targetIndex;
            stage.querySelector('img').src = items[targetIndex].image;
            updateUI(targetIndex);
          }
        }
      });

      function updateFallback(dir) {
        activeIndex = (activeIndex + dir + items.length) % items.length;
        stage.querySelector('img').src = items[activeIndex].image;
        updateUI(activeIndex);
      }

      activeModal.addEventListener('click', (e) => {
        if (e.target === activeModal) closeMorphModal();
      });

      document.addEventListener('keydown', handleKeyDown);

      function handleKeyDown(e) {
        if (e.key === 'Escape') closeMorphModal();
        if (e.key === 'ArrowLeft') {
          if (engine) engine.step(-1);
          else updateFallback(-1);
        }
        if (e.key === 'ArrowRight') {
          if (engine) engine.step(1);
          else updateFallback(1);
        }
      }

      function closeMorphModal() {
        document.removeEventListener('keydown', handleKeyDown);
        if (engine) {
          engine.destroy();
          engine = null;
        }
        if (activeModal) {
          activeModal.remove();
          activeModal = null;
        }
        document.body.style.overflow = '';
      }
    }
  };

  document.addEventListener('DOMContentLoaded', () => {
    window.initMorphGalleryModal();
  });
})();
