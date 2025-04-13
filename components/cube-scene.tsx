"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import RubiksCube from "./rubiks-cube"
import { Suspense } from "react"

type CubeSceneProps = {
  onFaceClick: (face: string) => void
}

export default function CubeScene({ onFaceClick }: CubeSceneProps) {
  return (
    <Canvas camera={{ position: [0, 3, 8], fov: 40 }}>
      <Suspense fallback={null}>
        <ambientLight intensity={1.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <RubiksCube onFaceClick={onFaceClick} />
        <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 1.5} minPolarAngle={Math.PI / 3} />
      </Suspense>
    </Canvas>
  )
}
