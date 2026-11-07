import React, { Suspense, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { ContactShadows, Environment, OrbitControls, Html } from '@react-three/drei'
import * as THREE from 'three'

function CastingModel({ variant = 'housing', exploded = false }) {
  const group = useRef()
  const accent = useMemo(() => new THREE.MeshStandardMaterial({ color: '#c77d49', metalness: .82, roughness: .28 }), [])
  const body = useMemo(() => new THREE.MeshStandardMaterial({ color: '#8999a3', metalness: .86, roughness: .29 }), [])
  const dark = useMemo(() => new THREE.MeshStandardMaterial({ color: '#253b4a', metalness: .72, roughness: .34 }), [])
  useFrame((_, delta) => { if (group.current) group.current.rotation.y += delta * .13 })
  const ringRadius = variant === 'hub' ? .78 : variant === 'bracket' ? .54 : .7
  return <group ref={group} position={[0, exploded ? .12 : -.1, 0]}>
    <mesh material={body} castShadow receiveShadow position={[0, 0, 0]}>
      <cylinderGeometry args={[variant === 'pump' ? .86 : .96, 1.04, 1.05, 16, 1]} />
    </mesh>
    <mesh material={dark} position={[0, 0, .52]}>
      <cylinderGeometry args={[.65, .65, .11, 48]} />
    </mesh>
    <mesh material={body} position={[0, 0, .61]} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[ringRadius, .105, 16, 64]} />
    </mesh>
    <mesh material={dark} position={[0, 0, .66]}>
      <cylinderGeometry args={[.42, .42, .08, 48]} />
    </mesh>
    <mesh material={accent} position={[0, 0, .69]} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[.49, .018, 8, 64]} />
    </mesh>
    {Array.from({ length: 8 }).map((_, i) => {
      const a = i * Math.PI / 4
      return <mesh key={i} material={accent} castShadow position={[Math.cos(a) * .72, Math.sin(a) * .72, .68]}>
        <cylinderGeometry args={[.047, .047, .075, 12]} />
      </mesh>
    })}
    {[-.55, -.18, .18, .55].map((x, i) => <mesh key={i} material={dark} castShadow position={[x, .58, -.02]}>
      <boxGeometry args={[.085, .22, .85]} />
    </mesh>)}
    {[-.72, .72].map((x, i) => <mesh key={i} material={body} castShadow position={[x, -.72, -.02]}>
      <boxGeometry args={[.48, .18, .82]} />
    </mesh>)}
    {exploded && <mesh material={accent} position={[0, .88, 0]} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[.64, .035, 10, 48]} />
    </mesh>}
  </group>
}

export default function CastingViewer({ compact = false }) {
  const [exploded, setExploded] = useState(false)
  const [autoRotate, setAutoRotate] = useState(false)
  return <div className={`viewer ${compact ? 'viewer-compact' : ''}`}>
    <Canvas shadows camera={{ position: [3.2, 2.2, 4.1], fov: 38 }} dpr={[1, 1.6]}>
      <color attach="background" args={['#0c1b28']} />
      <ambientLight intensity={.85} />
      <directionalLight position={[4, 5, 5]} intensity={2.1} castShadow />
      <pointLight position={[-3, 1, -2]} color="#d58a55" intensity={24} distance={8} />
      <Suspense fallback={null}>
        <CastingModel exploded={exploded} />
        <Environment preset="warehouse" />
        <ContactShadows position={[0, -1.05, 0]} opacity={.42} scale={4.5} blur={2.4} far={3} />
        <Html position={[1.1, .85, 0]} distanceFactor={7} style={{ pointerEvents: 'none' }}>
          <div className="viewer-tag"><i /> CONCEPTUAL CASTING MODEL</div>
        </Html>
      </Suspense>
      <OrbitControls enablePan={false} autoRotate={autoRotate} autoRotateSpeed={1.25} minDistance={2.8} maxDistance={7} minPolarAngle={.45} maxPolarAngle={2.45} />
    </Canvas>
    <div className="viewer-controls">
      <button onClick={() => setAutoRotate(v => !v)} className={autoRotate ? 'selected' : ''}>{autoRotate ? 'Pause rotation' : 'Auto rotate'}</button>
      <button onClick={() => setExploded(v => !v)} className={exploded ? 'selected' : ''}>{exploded ? 'Assembled view' : 'Exploded detail'}</button>
      <span>DRAG TO ROTATE · SCROLL TO ZOOM</span>
    </div>
  </div>
}
