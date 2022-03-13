import React, { useRef, useState } from 'react'
import {useFrame } from '@react-three/fiber'

const Box = ({id, position, boxGeometryArgs, scale, rotation}) => {
  // This reference will give us direct access to the mesh
  const mesh = useRef()
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => (mesh.current.rotation.x += 0.01))
  
  const [selectedBoxes, setSelectedBoxes] = useState([]);
  const handleOnSelect = () => {
    setActive(!active);
    const selectedBoxesDataInState = [...selectedBoxes];
    selectedBoxesDataInState.push(id);
    setSelectedBoxes(selectedBoxesDataInState);
  }
  //Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      position = {position}
      ref={mesh}
      scale={scale}
      rotation={rotation}
      onClick={handleOnSelect}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}>
      <boxGeometry args={boxGeometryArgs} />
      <meshStandardMaterial color={hovered ? 'hotpink' : active? 'hotpink': 'orange'} />
    </mesh>
  )
}

export default Box;
