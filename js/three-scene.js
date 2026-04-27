/* ============================================
   ZEPTIVO Digital — Three.js 3D Scene
   Soft blobs using SphereGeometry
   ============================================ */

const ThreeScene = (() => {
  let scene, camera, renderer, blobs = [], clock;
  let mouseX = 0, mouseY = 0;
  let windowW = window.innerWidth, windowH = window.innerHeight;
  const canvas = document.getElementById('three-canvas');
  if (!canvas) return { init() {}, destroy() {} };

  function init() {
    clock = new THREE.Clock();
    scene = new THREE.Scene();
    
    // Transparent background for cream theme to show through
    camera = new THREE.PerspectiveCamera(60, windowW / windowH, 1, 2000);
    camera.position.z = 600;

    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(windowW, windowH);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0); // Transparent

    createBlobs();
    addLights();
    bindEvents();
    animate();
  }

  function createBlobs() {
    // We will create two soft blobs, one orange, one navy
    const geometry = new THREE.SphereGeometry(120, 64, 64);
    
    // Original positions for vertices to apply noise
    geometry.userData.originalPositions = [];
    const positions = geometry.attributes.position.array;
    for (let i = 0; i < positions.length; i += 3) {
      geometry.userData.originalPositions.push(new THREE.Vector3(positions[i], positions[i+1], positions[i+2]));
    }

    const material1 = new THREE.MeshPhysicalMaterial({
      color: 0xFF6B00, // Orange
      metalness: 0.1,
      roughness: 0.3,
      transmission: 0.2, // glass-like
      transparent: true,
      opacity: 0.8
    });

    const material2 = new THREE.MeshPhysicalMaterial({
      color: 0x1A1A2E, // Navy
      metalness: 0.2,
      roughness: 0.2,
      transmission: 0.2,
      transparent: true,
      opacity: 0.7
    });

    const blob1 = new THREE.Mesh(geometry.clone(), material1);
    blob1.position.set(200, 50, -100);
    scene.add(blob1);
    blobs.push(blob1);

    const blob2 = new THREE.Mesh(geometry.clone(), material2);
    blob2.position.set(-250, -100, -200);
    scene.add(blob2);
    blobs.push(blob2);

    createParticles();
  }

  function createParticles() {
    const particleGeometry = new THREE.BufferGeometry();
    const particleCount = 200;
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 1500;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMaterial = new THREE.PointsMaterial({
      color: 0xFF6B00,
      size: 3,
      transparent: true,
      opacity: 0.5,
      sizeAttenuation: true
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);
    scene.userData.particles = particles;
  }

  function addLights() {
    const ambient = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambient);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.6);
    dirLight.position.set(100, 200, 300);
    scene.add(dirLight);

    const point = new THREE.PointLight(0xFF6B00, 1, 600);
    point.position.set(200, 100, 100);
    scene.add(point);
  }

  function animate() {
    requestAnimationFrame(animate);
    const elapsed = clock.getElapsedTime();

    // Deform blobs using sine waves
    blobs.forEach((blob, idx) => {
      blob.rotation.y = elapsed * 0.2 * (idx === 0 ? 1 : -1);
      blob.rotation.z = elapsed * 0.1;
      
      // Floating
      blob.position.y += Math.sin(elapsed * 2 + idx) * 0.5;

      // Soft blobby deformation
      const positions = blob.geometry.attributes.position.array;
      const originals = blob.geometry.userData.originalPositions;
      if (originals) {
        for (let i = 0; i < originals.length; i++) {
          const v = originals[i];
          const offset = 10 * Math.sin(v.x * 0.02 + elapsed + idx) + 10 * Math.sin(v.y * 0.02 + elapsed);
          const nv = v.clone().normalize().multiplyScalar(120 + offset);
          positions[i*3] = nv.x;
          positions[i*3+1] = nv.y;
          positions[i*3+2] = nv.z;
        }
        blob.geometry.attributes.position.needsUpdate = true;
        blob.geometry.computeVertexNormals();
      }
    });
    
    // Animate particles
    const particles = scene.userData.particles;
    if (particles) {
      particles.rotation.y = elapsed * 0.05;
      particles.rotation.x = elapsed * 0.02;
    }

    // Camera follow mouse softly
    camera.position.x += (mouseX * 0.2 - camera.position.x) * 0.02;
    camera.position.y += (-mouseY * 0.2 - camera.position.y) * 0.02;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
  }

  function bindEvents() {
    window.addEventListener('mousemove', (e) => {
      mouseX = (e.clientX - windowW / 2);
      mouseY = (e.clientY - windowH / 2);
    });

    window.addEventListener('resize', () => {
      windowW = window.innerWidth;
      windowH = window.innerHeight;
      camera.aspect = windowW / windowH;
      camera.updateProjectionMatrix();
      renderer.setSize(windowW, windowH);
    });
  }

  return { init };
})();
