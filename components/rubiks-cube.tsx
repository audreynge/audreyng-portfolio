"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import type { Group } from "three"
import { Text } from "@react-three/drei"

const COLORS = {
  front: "#ff6f00", // Orange
  back: "#c41e3a", // Red
  left: "#22c55e", // Green (brighter)
  right: "#0051ba", // Blue
  top: "#f8f8f8", // White
  bottom: "#ffd500", // Yellow
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
  onFaceClickAction: (face: string) => void
}

export default function RubiksCube({ onFaceClickAction }: RubiksCubeProps) {
  const groupRef = useRef<Group>(null)

  // rotate cube
  useFrame((state) => {
    if (groupRef.current) {
      const t = state.clock.getElapsedTime()
      groupRef.current.rotation.y = t * 0.16
      groupRef.current.rotation.x = Math.sin(t * 0.55) * 0.08
      groupRef.current.position.y = Math.sin(t * 0.9) * 0.06
    }
  })

  const handleClick = (face: string) => {
    console.log(`Clicked on face: ${face}`)
    if (onFaceClickAction) {
      onFaceClickAction(face)
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
    return "#0f1115" // Dark core color for inner faces
  }

  const getFaceFromNormal = (normal?: { x: number; y: number; z: number }) => {
    if (!normal) return null
    if (normal.z < -0.5) return "back"
    if (normal.z > 0.5) return "front"
    if (normal.x < -0.5) return "left"
    if (normal.x > 0.5) return "right"
    if (normal.y > 0.5) return "top"
    if (normal.y < -0.5) return "bottom"
    return null
  }

  const stickerSize = cubeSize * 0.84
  const stickerOffset = cubeSize / 2 + 0.009

  const renderSticker = (
    stickerFace: "right" | "left" | "top" | "bottom" | "front" | "back",
    color: string,
    key: string,
  ) => {
    const common = (
      <meshStandardMaterial color={color} roughness={0.34} metalness={0.03} />
    )

    if (stickerFace === "right") {
      return (
        <mesh
          key={key}
          position={[stickerOffset, 0, 0]}
          rotation={[0, Math.PI / 2, 0]}
          onClick={(e) => {
            e.stopPropagation()
            handleClick("right")
          }}
        >
          <planeGeometry args={[stickerSize, stickerSize]} />
          {common}
        </mesh>
      )
    }
    if (stickerFace === "left") {
      return (
        <mesh
          key={key}
          position={[-stickerOffset, 0, 0]}
          rotation={[0, -Math.PI / 2, 0]}
          onClick={(e) => {
            e.stopPropagation()
            handleClick("left")
          }}
        >
          <planeGeometry args={[stickerSize, stickerSize]} />
          {common}
        </mesh>
      )
    }
    if (stickerFace === "top") {
      return (
        <mesh
          key={key}
          position={[0, stickerOffset, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          onClick={(e) => {
            e.stopPropagation()
            handleClick("top")
          }}
        >
          <planeGeometry args={[stickerSize, stickerSize]} />
          {common}
        </mesh>
      )
    }
    if (stickerFace === "bottom") {
      return (
        <mesh
          key={key}
          position={[0, -stickerOffset, 0]}
          rotation={[Math.PI / 2, 0, 0]}
          onClick={(e) => {
            e.stopPropagation()
            handleClick("bottom")
          }}
        >
          <planeGeometry args={[stickerSize, stickerSize]} />
          {common}
        </mesh>
      )
    }
    if (stickerFace === "front") {
      return (
        <mesh
          key={key}
          position={[0, 0, stickerOffset]}
          onClick={(e) => {
            e.stopPropagation()
            handleClick("front")
          }}
        >
          <planeGeometry args={[stickerSize, stickerSize]} />
          {common}
        </mesh>
      )
    }
    return (
      <mesh
        key={key}
        position={[0, 0, -stickerOffset]}
        rotation={[0, Math.PI, 0]}
        onClick={(e) => {
          e.stopPropagation()
          handleClick("back")
        }}
      >
        <planeGeometry args={[stickerSize, stickerSize]} />
        {common}
      </mesh>
    )
  }

  const textOffset = 0.5

  return (
    <group ref={groupRef} scale={[0.76, 0.76, 0.76]}>
      {/* generate 3x3x3 grid of cubes */}
      {[0, 1, 2].map((x) =>
        [0, 1, 2].map((y) =>
          [0, 1, 2].map((z) => {
            if (isOnFace(x, y, z)) {
              return (
                <group key={`${x}-${y}-${z}`} position={getPosition(x, y, z)}>
                  <mesh
                    castShadow
                    receiveShadow
                    onClick={(e) => {
                      e.stopPropagation()
                      const face = getFaceFromNormal(e.face?.normal)
                      if (face) handleClick(face)
                    }}
                  >
                    <boxGeometry args={[cubeSize, cubeSize, cubeSize]} />
                    <meshPhysicalMaterial
                      color="#111315"
                      roughness={0.58}
                      metalness={0.08}
                      clearcoat={0.36}
                      clearcoatRoughness={0.46}
                    />
                  </mesh>

                  {x === 2 && renderSticker("right", getFaceColor(x, y, z, "right"), `r-${x}-${y}-${z}`)}
                  {x === 0 && renderSticker("left", getFaceColor(x, y, z, "left"), `l-${x}-${y}-${z}`)}
                  {y === 2 && renderSticker("top", getFaceColor(x, y, z, "top"), `t-${x}-${y}-${z}`)}
                  {y === 0 && renderSticker("bottom", getFaceColor(x, y, z, "bottom"), `b-${x}-${y}-${z}`)}
                  {z === 2 && renderSticker("front", getFaceColor(x, y, z, "front"), `f-${x}-${y}-${z}`)}
                  {z === 0 && renderSticker("back", getFaceColor(x, y, z, "back"), `bk-${x}-${y}-${z}`)}
                </group>
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
        outlineWidth={0.018}
        outlineColor="#0f1115"
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
        outlineWidth={0.018}
        outlineColor="#0f1115"
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
        outlineWidth={0.018}
        outlineColor="#0f1115"
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
        outlineWidth={0.018}
        outlineColor="#0f1115"
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
        outlineWidth={0.015}
        outlineColor="#f9fafb"
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
        outlineWidth={0.015}
        outlineColor="#f9fafb"
        anchorX="center"
        anchorY="middle"
      >
        {LABELS.bottom}
      </Text>
    </group>
  )
}
