'use client'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function CraneScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Scene
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0xf5f2eb)
    scene.fog = new THREE.Fog(0xf5f2eb, 45, 80)

    // Renderer
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap

    const resize = () => {
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      renderer.setSize(w, h, false)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }

    // Camera
    const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 120)
    camera.position.set(10, 10, 24)
    camera.lookAt(0, 7, 0)
    resize()

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    // Lights
    scene.add(new THREE.AmbientLight(0xfaf7f0, 1.6))

    const sun = new THREE.DirectionalLight(0xfff9f0, 2.8)
    sun.position.set(14, 22, 12)
    sun.castShadow = true
    sun.shadow.mapSize.setScalar(2048)
    sun.shadow.camera.near = 1
    sun.shadow.camera.far = 80
    sun.shadow.camera.left = -20
    sun.shadow.camera.right = 20
    sun.shadow.camera.top = 20
    sun.shadow.camera.bottom = -20
    scene.add(sun)

    const tealGlow = new THREE.PointLight(0x1a7a8a, 5, 35)
    tealGlow.position.set(-6, 18, 8)
    scene.add(tealGlow)

    const fillLight = new THREE.DirectionalLight(0xddeef5, 0.9)
    fillLight.position.set(-10, 6, -8)
    scene.add(fillLight)

    // Materials
    const tealMat = new THREE.MeshPhongMaterial({ color: 0x1a7a8a, shininess: 160, specular: 0x33bbcc })
    const tealDarkMat = new THREE.MeshPhongMaterial({ color: 0x155f6d, shininess: 80 })
    const steelMat = new THREE.MeshPhongMaterial({ color: 0x8a9fb5, shininess: 220, specular: 0xbbddee })
    const concreteMat = new THREE.MeshPhongMaterial({ color: 0xa8a49c, shininess: 15 })
    const groundMat = new THREE.MeshPhongMaterial({ color: 0xc8c3bb })
    const cableMat = new THREE.LineBasicMaterial({ color: 0x777777 })
    const beaconMat = new THREE.MeshPhongMaterial({
      color: 0xff8800,
      emissive: 0xff8800,
      emissiveIntensity: 0.9,
      shininess: 120,
    })

    // ── Crane Group ──
    const craneGroup = new THREE.Group()

    // Foundation
    const base = new THREE.Mesh(new THREE.BoxGeometry(3.8, 0.7, 3.8), concreteMat)
    base.position.set(0, 0.35, 0)
    base.receiveShadow = true
    base.castShadow = true
    craneGroup.add(base)

    // Tower segments
    const towerCount = 8
    for (let i = 0; i < towerCount; i++) {
      const seg = new THREE.Mesh(new THREE.BoxGeometry(0.78, 2.1, 0.78), tealMat)
      seg.position.set(0, 1.4 + i * 2.1, 0)
      seg.castShadow = true
      craneGroup.add(seg)
    }

    // Cab (operator cabin)
    const cab = new THREE.Mesh(new THREE.BoxGeometry(1.5, 1.3, 1.5), tealDarkMat)
    cab.position.set(0, 17.7, 0)
    cab.castShadow = true
    craneGroup.add(cab)

    // Cab windows
    const windowMat = new THREE.MeshPhongMaterial({ color: 0xaaddee, opacity: 0.7, transparent: true, shininess: 200 })
    const cabWindow = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.7, 0.05), windowMat)
    cabWindow.position.set(0, 17.9, 0.78)
    craneGroup.add(cabWindow)

    // Main jib
    const jib = new THREE.Mesh(new THREE.BoxGeometry(14, 0.48, 0.58), tealMat)
    jib.position.set(6, 19.1, 0)
    jib.castShadow = true
    craneGroup.add(jib)

    // Jib tip
    const tip = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.9, 0.35), tealDarkMat)
    tip.position.set(12.8, 19.6, 0)
    craneGroup.add(tip)

    // Counter jib
    const cjib = new THREE.Mesh(new THREE.BoxGeometry(5.5, 0.42, 0.52), tealMat)
    cjib.position.set(-3.35, 18.85, 0)
    craneGroup.add(cjib)

    // Counter weight
    const cw = new THREE.Mesh(new THREE.BoxGeometry(2, 1.4, 2), concreteMat)
    cw.position.set(-6, 18.15, 0)
    cw.castShadow = true
    craneGroup.add(cw)

    // Apex pyramid
    const apexMat = new THREE.MeshPhongMaterial({ color: 0x1a7a8a, shininess: 100 })
    const apexGeom = new THREE.ConeGeometry(0.4, 1.2, 4)
    const apexMesh = new THREE.Mesh(apexGeom, apexMat)
    apexMesh.position.set(0, 20.1, 0)
    craneGroup.add(apexMesh)

    // Cables
    const addCable = (from: THREE.Vector3, to: THREE.Vector3) => {
      const geom = new THREE.BufferGeometry().setFromPoints([from, to])
      craneGroup.add(new THREE.Line(geom, cableMat))
    }
    const apex = new THREE.Vector3(0, 20.5, 0)
    addCable(apex, new THREE.Vector3(13, 18.8, 0))
    addCable(apex, new THREE.Vector3(-6.2, 18.5, 0))
    addCable(apex, new THREE.Vector3(7, 18.9, 0))
    addCable(apex, new THREE.Vector3(-2, 18.6, 0))

    // Trolley
    const trolley = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.65, 1.0), steelMat)
    trolley.position.set(7, 18.7, 0)
    craneGroup.add(trolley)

    // Hook cable + hook (will animate)
    const hookCableGeom = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(7, 18.35, 0),
      new THREE.Vector3(7, 10, 0),
    ])
    craneGroup.add(new THREE.Line(hookCableGeom, new THREE.LineBasicMaterial({ color: 0x888888 })))

    const hook = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.18, 0.8, 8), steelMat)
    hook.position.set(7, 9.55, 0)
    hook.castShadow = true
    craneGroup.add(hook)

    // Beacon
    const beacon = new THREE.Mesh(new THREE.SphereGeometry(0.28, 14, 14), beaconMat)
    beacon.position.set(0, 21, 0)
    craneGroup.add(beacon)

    craneGroup.position.set(3, 0, 0)
    craneGroup.rotation.y = -Math.PI / 5
    scene.add(craneGroup)

    // ── Building under construction ──
    const buildGroup = new THREE.Group()
    const floors = [
      { opacity: 0.75, color: 0x1a4a60 },
      { opacity: 0.6, color: 0x2c3e50 },
      { opacity: 0.42, color: 0x3d5a73 },
      { opacity: 0.22, color: 0x1a7a8a },
    ]

    floors.forEach(({ opacity, color }, i) => {
      const floorMesh = new THREE.Mesh(
        new THREE.BoxGeometry(6, 3.8, 5),
        new THREE.MeshPhongMaterial({ color, wireframe: true, opacity, transparent: true })
      )
      floorMesh.position.set(-6.5, i * 3.8 + 1.9, -2)
      buildGroup.add(floorMesh)
    })

    // Partial concrete slabs
    const slabMat = new THREE.MeshPhongMaterial({ color: 0xa8a49c, opacity: 0.35, transparent: true })
    for (let i = 0; i < 3; i++) {
      const slab = new THREE.Mesh(new THREE.BoxGeometry(6, 0.18, 5), slabMat)
      slab.position.set(-6.5, i * 3.8 + 3.72, -2)
      buildGroup.add(slab)
    }

    scene.add(buildGroup)

    // ── Ground ──
    const ground = new THREE.Mesh(new THREE.PlaneGeometry(60, 60), groundMat)
    ground.rotation.x = -Math.PI / 2
    ground.receiveShadow = true
    scene.add(ground)

    // Construction site debris (scattered boxes)
    const debrisMat = new THREE.MeshPhongMaterial({ color: 0x9a9590 })
    const debrisPositions = [
      [-9, 0.2, 3], [-8, 0.15, -4], [5, 0.15, -5], [-11, 0.25, 1],
      [-7, 0.18, 5], [4, 0.2, 4], [-10, 0.22, -2],
    ]
    debrisPositions.forEach(([x, y, z]) => {
      const b = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.4, 0.4), debrisMat)
      b.position.set(x, y, z)
      b.rotation.y = Math.random() * Math.PI
      scene.add(b)
    })

    // Grid
    const grid = new THREE.GridHelper(50, 30, 0xb0ab9e, 0xb0ab9e)
    ;(grid.material as THREE.Material).opacity = 0.2
    ;(grid.material as THREE.Material).transparent = true
    grid.position.y = 0.02
    scene.add(grid)

    // ── Animation ──
    let frameId: number
    const clock = new THREE.Clock()

    const animate = () => {
      frameId = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()

      // Idle crane rotation
      craneGroup.rotation.y += 0.0025

      // Beacon pulse
      beaconMat.emissiveIntensity = 0.5 + 0.5 * Math.sin(t * 2.2)

      // Hook gentle swing
      hook.position.x = 7 + Math.sin(t * 0.6) * 0.25
      hook.position.z = Math.cos(t * 0.4) * 0.15

      // Scroll-driven camera zoom
      const maxScroll = Math.max(document.body.scrollHeight - window.innerHeight, 1)
      const sf = Math.min(window.scrollY / maxScroll, 1)
      camera.position.z = 24 - sf * 7
      camera.position.y = 10 - sf * 2
      camera.lookAt(0, 7, 0)

      renderer.render(scene, camera)
    }

    animate()

    return () => {
      cancelAnimationFrame(frameId)
      ro.disconnect()
      renderer.dispose()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full block"
      style={{ width: '100%', height: '100%' }}
    />
  )
}
