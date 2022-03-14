import React, { useRef, useState } from 'react'
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
  isView = false,
  geometryData
}) => {
  // This reference will give us direct access to the mesh
  const meshRef = useRef()

  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(isActive);

  const handleOnSelect = () => {
    if(!isView){
      if(active) {
        setActive(false);
        removeBox(id)
      } else {
        setActive(true);
        let data = geometryData;
        addBox(id, data);
      }
    }
  }
  return (
    <>
      <mesh
        position = {position}
        ref={meshRef}
        visible={isVisible}
        scale={scale}
        rotation={rotation}
        onClick={handleOnSelect}
        onPointerOver={(event) => setHover(true)}
        onPointerOut={(event) => setHover(false)}>
        <boxGeometry attach="geometry" args={boxGeometryArgs} />
        <meshStandardMaterial  attach="material" color={isView ? 'orange' : hovered ? 'hotpink' : active? 'hotpink': 'orange'} />
      </mesh>
    </>
  )
}

export default Box;
