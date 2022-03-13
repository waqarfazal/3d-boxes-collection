import React, { useRef, useState } from 'react'
import {useFrame } from '@react-three/fiber'
const Box = ({
  id, 
  position, 
  boxGeometryArgs, 
  scale, 
  rotation, 
  addBox, 
  removeBox, 
  selectedBoxes,
  isVisible=true,
  isActive=false,
}) => {
  // This reference will give us direct access to the mesh
  const mesh = useRef()
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false);

  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => (mesh.current.rotation.x += 0.01))
  
  const handleOnSelect = () => {
    if(active) {
      setActive(false);
      removeBox(id)
    } else {
      setActive(true);
      addBox(id);
    }
  }
  //Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      position = {position}
      ref={mesh}
      visible={isVisible}
      scale={scale}
      rotation={rotation}
      onClick={handleOnSelect}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}>
      <boxGeometry args={boxGeometryArgs} />
      <meshStandardMaterial color={hovered ? 'hotpink' : active? 'hotpink': isActive ? 'hotpink': 'orange'} />
    </mesh>
  )
}

export default Box;
