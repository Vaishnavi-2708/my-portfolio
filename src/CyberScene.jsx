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
