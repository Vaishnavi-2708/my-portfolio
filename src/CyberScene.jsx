import { useEffect, useRef } from 'react'
import * as THREE from 'three'

function brainGeometry() {
  const points = []
  const lines = []
  const colors = []
  const cyan = new THREE.Color('#5df6ff')
  const violet = new THREE.Color('#b97aff')
  const rings = 25
  const columns = 44

  for (const side of [-1, 1]) {
    const offset = points.length
    for (let ring = 0; ring <= rings; ring++) {
      const latitude = Math.PI * ring / rings
      for (let column = 0; column < columns; column++) {
        const angle = 2 * Math.PI * column / columns
        const folds = 1 + .055 * Math.sin(11 * angle + 5 * latitude) + .035 * Math.cos(19 * latitude - 4 * angle)
        const radius = Math.sin(latitude) * folds
        const point = new THREE.Vector3(
          side * (.11 + .60 * (1 + Math.cos(angle)) * radius),
          .98 * Math.cos(latitude) * folds + .10 * Math.sin(angle),
          1.23 * radius * Math.sin(angle),
        )
        points.push(point)
        const color = cyan.clone().lerp(violet, .35 + .32 * Math.sin(angle * 2 + latitude * 3))
        colors.push(color.r, color.g, color.b)
        if (ring > 0) {
          const previous = points[offset + (ring - 1) * columns + column]
          lines.push(...previous.toArray(), ...point.toArray())
        }
        if (column > 0) lines.push(...points.at(-2).toArray(), ...point.toArray())
      }
      lines.push(...points.at(-1).toArray(), ...points[offset + ring * columns].toArray())
    }
  }

  const vertices = new THREE.BufferGeometry().setFromPoints(points)
  vertices.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))
  const connections = new THREE.BufferGeometry()
  connections.setAttribute('position', new THREE.Float32BufferAttribute(lines, 3))
  return { vertices, connections }
}

export default function CyberScene() {
  const host = useRef(null)

  useEffect(() => {
    const node = host.current
    const still = matchMedia('(prefers-reduced-motion: reduce)')
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('webgl2', { alpha: true, antialias: true })
    if (!context) return
    let renderer
    try {
      renderer = new THREE.WebGLRenderer({ canvas, context, alpha: true, antialias: true })
    } catch {
      return
    }

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(38, 1, .1, 30)
    camera.position.set(0, .12, 5.5)
    const brain = new THREE.Group()
    brain.rotation.set(.08, -.63, -.16)
    const { vertices, connections } = brainGeometry()
    const points = new THREE.PointsMaterial({ size: .039, vertexColors: true, transparent: true, opacity: .94, blending: THREE.AdditiveBlending, depthWrite: false })
    const wires = new THREE.LineBasicMaterial({ color: '#57bcef', transparent: true, opacity: .22, depthWrite: false, blending: THREE.AdditiveBlending })
    brain.add(new THREE.Points(vertices, points), new THREE.LineSegments(connections, wires))
    scene.add(brain)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.65))
    renderer.domElement.setAttribute('aria-hidden', 'true')
    node.append(renderer.domElement)
    node.dataset.rendered = 'true'

    let frame
    let visible = false
    let desiredX = 0
    let desiredY = 0
    function draw(time) {
      if (!still.matches) {
        brain.rotation.x += (.08 + desiredY * .23 - brain.rotation.x) * .055
        brain.rotation.y += (-.63 + Math.sin(time / 2100) * .34 + desiredX * .4 - brain.rotation.y) * .055
        brain.position.y = Math.sin(time / 1100) * .065
        wires.opacity = .22 + Math.sin(time / 500) * .065
      }
      renderer.render(scene, camera)
      if (visible && !still.matches) frame = requestAnimationFrame(draw)
    }
    function refresh() {
      cancelAnimationFrame(frame)
      draw(0)
    }
    function resize() {
      const { clientWidth, clientHeight } = node
      camera.aspect = clientWidth / Math.max(clientHeight, 1)
      camera.updateProjectionMatrix()
      renderer.setSize(clientWidth, clientHeight, false)
      refresh()
    }
    function move(event) {
      const bounds = node.getBoundingClientRect()
      desiredX = (event.clientX - bounds.left) / bounds.width - .5
      desiredY = (event.clientY - bounds.top) / bounds.height - .5
    }
    function reset() { desiredX = 0; desiredY = 0 }
    const visibility = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      refresh()
    })
    const size = new ResizeObserver(resize)
    visibility.observe(node)
    size.observe(node)
    node.addEventListener('pointermove', move)
    node.addEventListener('pointerleave', reset)
    still.addEventListener('change', refresh)
    resize()

    return () => {
      cancelAnimationFrame(frame)
      visibility.disconnect()
      size.disconnect()
      node.removeEventListener('pointermove', move)
      node.removeEventListener('pointerleave', reset)
      still.removeEventListener('change', refresh)
      vertices.dispose()
      connections.dispose()
      points.dispose()
      wires.dispose()
      renderer.dispose()
      renderer.domElement.remove()
      delete node.dataset.rendered
    }
  }, [])

  return <div className="brain-scene" ref={host} aria-hidden="true"><div className="brain-fallback" /></div>
}

const backdropNodes = [
  [-7, 3, -3], [-5, 6, -4], [-4, 1, -2], [-3, 4, -6], [-7, -1, -5],
  [7, 3, -4], [5, 6, -6], [4, 1, -3], [3, 4, -5], [7, -2, -4],
]
const connections = [[0, 1], [0, 2], [0, 3], [0, 4], [1, 3], [2, 3], [2, 4], [5, 6], [5, 7], [5, 9], [6, 8], [7, 8], [7, 9], [5, 8]]

export function SpaceField() {
  const host = useRef(null)

  useEffect(() => {
    const node = host.current
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('webgl2', { alpha: true, antialias: false })
    if (!context) return
    let renderer
    try {
      renderer = new THREE.WebGLRenderer({ canvas, context, alpha: true, antialias: false })
    } catch {
      return
    }

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(55, 1, .1, 80)
    camera.position.z = 13
    const world = new THREE.Group()
    scene.add(world)
    const random = THREE.MathUtils.seededRandom
    random(137)
    const stars = Array.from({ length: 520 }, () => new THREE.Vector3((random() - .5) * 55, (random() - .5) * 42, (random() - 1) * 44))
    const starGeometry = new THREE.BufferGeometry().setFromPoints(stars)
    const starMaterial = new THREE.PointsMaterial({ color: '#a6ddff', size: .055, transparent: true, opacity: .72 })
    world.add(new THREE.Points(starGeometry, starMaterial))

    const cyan = new THREE.Color('#65efff')
    const violet = new THREE.Color('#bb80ff')
    const colors = backdropNodes.flatMap((_, index) => (index < 5 ? cyan : violet).toArray())
    const points = new THREE.BufferGeometry()
    points.setAttribute('position', new THREE.Float32BufferAttribute(backdropNodes.flat(), 3))
    points.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))
    const nodeMaterial = new THREE.PointsMaterial({ vertexColors: true, size: .17, transparent: true, opacity: .85 })
    const wires = new THREE.BufferGeometry()
    wires.setAttribute('position', new THREE.Float32BufferAttribute(connections.flatMap(([a, b]) => [...backdropNodes[a], ...backdropNodes[b]]), 3))
    wires.setAttribute('color', new THREE.Float32BufferAttribute(connections.flatMap(([a, b]) => [...colors.slice(a * 3, a * 3 + 3), ...colors.slice(b * 3, b * 3 + 3)]), 3))
    const wireMaterial = new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, opacity: .48 })
    world.add(new THREE.Points(points, nodeMaterial), new THREE.LineSegments(wires, wireMaterial))

    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.25))
    node.append(canvas)
    const reduced = matchMedia('(prefers-reduced-motion: reduce)')
    let frame
    let last = 0
    let offsetX = 0
    let offsetY = 0
    function draw(time) {
      if (!reduced.matches && time - last < 32 && time !== 0) {
        frame = requestAnimationFrame(draw)
        return
      }
      last = time
      const progress = reduced.matches ? 0 : scrollY / Math.max(innerHeight, 1)
      world.rotation.y = reduced.matches ? 0 : offsetX * .055 + Math.sin(time / 6200) * .035
      world.rotation.x = reduced.matches ? 0 : offsetY * .045
      world.position.y = Math.sin(progress * .55) * .7
      nodeMaterial.opacity = .83 + Math.sin(time / 740) * .14
      renderer.render(scene, camera)
      if (!reduced.matches && !document.hidden) frame = requestAnimationFrame(draw)
    }
    function refresh() {
      cancelAnimationFrame(frame)
      draw(0)
    }
    function resize() {
      const { clientWidth, clientHeight } = node
      camera.aspect = clientWidth / Math.max(clientHeight, 1)
      camera.updateProjectionMatrix()
      renderer.setSize(clientWidth, clientHeight, false)
      refresh()
    }
    function move(event) {
      offsetX = event.clientX / innerWidth - .5
      offsetY = event.clientY / innerHeight - .5
    }
    const observer = new ResizeObserver(resize)
    observer.observe(node)
    window.addEventListener('pointermove', move, { passive: true })
    document.addEventListener('visibilitychange', refresh)
    reduced.addEventListener('change', refresh)
    resize()
    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      window.removeEventListener('pointermove', move)
      document.removeEventListener('visibilitychange', refresh)
      reduced.removeEventListener('change', refresh)
      for (const resource of [starGeometry, starMaterial, points, nodeMaterial, wires, wireMaterial]) resource.dispose()
      renderer.dispose()
      canvas.remove()
    }
  }, [])

  return <div className="space-webgl" ref={host} />
}
