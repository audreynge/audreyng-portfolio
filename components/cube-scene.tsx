"use client"

import { Canvas } from "@react-three/fiber"
import { ContactShadows, Environment, OrbitControls } from "@react-three/drei"
import RubiksCube from "./rubiks-cube"
import { Suspense } from "react"

type CubeSceneProps = {
  onFaceClickAction: (face: string) => void
}

export default function CubeScene({ onFaceClickAction }: CubeSceneProps) {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 2.6, 7.2], fov: 38 }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.45} />
        <hemisphereLight args={["#bcd4ff", "#1f2937", 0.6]} />
        <directionalLight
          castShadow
          position={[4, 7, 5]}
          intensity={1.35}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-bias={-0.0002}
        />
        <pointLight position={[-4, 2, -3]} intensity={0.45} color="#93c5fd" />

        <RubiksCube onFaceClickAction={onFaceClickAction} />
        <ContactShadows
          position={[0, -2.2, 0]}
          opacity={0.45}
          scale={9}
          blur={2.2}
          far={5}
          resolution={512}
          color="#111827"
        />
        <Environment preset="city" />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableDamping
          dampingFactor={0.08}
          rotateSpeed={0.75}
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 3}
        />
      </Suspense>
    </Canvas>
  )
}
