"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import type { Group } from "three"
import { Text } from "@react-three/drei"

const COLORS = {
  front: "#ff5800", // Orange
  back: "#ff0000",  // Red
  left: "#00ff00",  // Green
  right: "#0000ff", // Blue
  top: "#ffffff",   // White
  bottom: "#ffff00",// Yellow
}

const LABELS = {
  front: "About",
  back: "Contact",
  left: "Home",
  right: "Projects",
  top: "Skills",
  bottom: "Home",
}

type RubiksCubeProps = {
  onFaceClick: (face: string) => void
}

export default function RubiksCube({ onFaceClick }: RubiksCubeProps) {
  const groupRef = useRef<Group>(null)

  // rotate cube
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.1
    }
  })

  const handleClick = (face: string) => {
    console.log(`Clicked on face: ${face}`)
    if (onFaceClick) {
      onFaceClick(face)
    }
  }

  // size of each small cube
  const cubeSize = 0.95
  // gap between cubes
  const gap = 0.045

  // pos for a cube in the grid, theres cubes at positions -1, 0, and 1
  const getPosition = (x: number, y: number, z: number): [number, number, number] => {
    return [
      (x - 1) * (cubeSize + gap),
      (y - 1) * (cubeSize + gap),
      (z - 1) * (cubeSize + gap)
    ]
  }

  // determine if a cube is on the face of the Rubik's Cube
  const isOnFace = (x: number, y: number, z: number) => {
    return x === 0 || x === 2 || y === 0 || y === 2 || z === 0 || z === 2
  }

  const getFaceColor = (x: number, y: number, z: number, face: string) => {
    if (face === "right" && x === 2) return COLORS.right
    if (face === "left" && x === 0) return COLORS.left
    if (face === "top" && y === 2) return COLORS.top
    if (face === "bottom" && y === 0) return COLORS.bottom
    if (face === "front" && z === 2) return COLORS.front
    if (face === "back" && z === 0) return COLORS.back
    return "#222222" // Dark color for inner faces
  }

  const textOffset = 0.5

  return (
    <group ref={groupRef} scale={[0.7, 0.7, 0.7]}>
      {/* generate 3x3x3 grid of cubes */}
      {[0, 1, 2].map((x) =>
        [0, 1, 2].map((y) =>
          [0, 1, 2].map((z) => {
            if (isOnFace(x, y, z)) {
              return (
                <mesh
                  key={`${x}-${y}-${z}`}
                  position={getPosition(x, y, z)}
                  onClick={(e) => {
                    e.stopPropagation()

                    const normal = e.face?.normal
                    if (!normal) return

                    let face = "front"
                    if (normal.z < -0.5) face = "back"
                    else if (normal.z > 0.5) face = "front"
                    else if (normal.x < -0.5) face = "left"
                    else if (normal.x > 0.5) face = "right"
                    else if (normal.y > 0.5) face = "top"
                    else if (normal.y < -0.5) face = "bottom"

                    handleClick(face)
                  }}
                >
                  <boxGeometry args={[cubeSize, cubeSize, cubeSize]} />
                  <meshStandardMaterial attach="material-0" color={getFaceColor(x, y, z, "right")} />
                  <meshStandardMaterial attach="material-1" color={getFaceColor(x, y, z, "left")} />
                  <meshStandardMaterial attach="material-2" color={getFaceColor(x, y, z, "top")} />
                  <meshStandardMaterial attach="material-3" color={getFaceColor(x, y, z, "bottom")} />
                  <meshStandardMaterial attach="material-4" color={getFaceColor(x, y, z, "front")} />
                  <meshStandardMaterial attach="material-5" color={getFaceColor(x, y, z, "back")} />
                </mesh>
              )
            }
            return null
          }),
        ),
      )}

      <Text
        position={[0, 0, 1 + textOffset]}
        rotation={[0, 0, 0]}
        font="/fonts/InterDisplay-Bold.ttf"
        fontSize={0.25}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        {LABELS.front}
      </Text>

      <Text
        position={[0, 0, -1 - textOffset]}
        rotation={[0, Math.PI, 0]}
        font="/fonts/InterDisplay-Bold.ttf"
        fontSize={0.25}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        {LABELS.back}
      </Text>

      <Text
        position={[1 + textOffset, 0, 0]}
        rotation={[0, Math.PI / 2, 0]}
        font="/fonts/InterDisplay-Bold.ttf"
        fontSize={0.25}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        {LABELS.right}
      </Text>

      <Text
        position={[-1 - textOffset, 0, 0]}
        rotation={[0, -Math.PI / 2, 0]}
        font="/fonts/InterDisplay-Bold.ttf"
        fontSize={0.25}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        {LABELS.left}
      </Text>

      <Text
        position={[0, 1 + textOffset, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        font="/fonts/InterDisplay-Bold.ttf"
        fontSize={0.25}
        color="#000000"
        anchorX="center"
        anchorY="middle"
      >
        {LABELS.top}
      </Text>

      <Text
        position={[0, -1 - textOffset, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        font="/fonts/InterDisplay-Bold.ttf"
        fontSize={0.25}
        color="#000000"
        anchorX="center"
        anchorY="middle"
      >
        {LABELS.bottom}
      </Text>
    </group>
  )
}
