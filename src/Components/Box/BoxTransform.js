import * as THREE from "three"
import React, { useState, useEffect, useRef, useMemo } from "react"
import { Canvas, extend, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { TransformControls } from "three/examples/jsm/controls/TransformControls.js"

extend({ OrbitControls, TransformControls })
const BoxTransform = ({
  id, 
  position, 
  boxGeometryArgs, 
  scale, 
  rotation,  
  selectedBoxes,
  isVisible=true,
  isActive=false,
  useControl,
  transformationType
}) => {
  const meshRef = useRef()

  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(isActive);


  //Transform Control

  const { camera, gl } = useThree()
  const [result, set] = useState()
  const ref = useRef()
  const orbit = useRef()
  const transform = useRef()
  const mode = useControl("mode", { type: "select", items: ["translate", "rotate", "scale"] })

  
  useFrame(() => orbit.current && orbit.current.update())
  useEffect(() => {
    if (transform.current) {
      const controls = transform.current
      console.log("***********Viewing mesh position");
      console.log("postions");
      console.log(controls.children[2].position);
      console.log("scale");
      console.log(controls.children[2].scale);
      console.log("rotation");
      console.log(controls.children[2].rotation);
      controls.setMode(transformationType)
      const callback = event => (orbit.current.enabled = !event.value)
      controls.addEventListener("dragging-changed", callback)
      return () => controls.removeEventListener("dragging-changed", callback)
    }
  })
  return isVisible? (
      
    <>
        <transformControls ref={transform} args={[camera, gl.domElement]} onUpdate={self => self.attach(meshRef.current)}>
        <mesh
            position = {position}
            ref={meshRef}
            visible={isVisible}
            scale={scale}
            rotation={rotation}
            onClick={() => setActive(!active)}
            onPointerOver={(event) => setHover(true)}
            onPointerOut={(event) => setHover(false)}>
            <boxGeometry attach="geometry" args={boxGeometryArgs} />
            <meshStandardMaterial  attach="material" color={hovered ? 'hotpink' : active? 'hotpink': 'orange'} />
        </mesh>
        </transformControls>
        <orbitControls ref={orbit} args={[camera, gl.domElement]} enableDamping dampingFactor={0.1} rotateSpeed={0.001}/>
    </>
  ) : (
    <mesh
        position = {position}
        ref={meshRef}
        visible={isVisible}
        scale={scale}
        rotation={rotation}
        onClick={() => setActive(!active)}
        onPointerOver={(event) => setHover(true)}
        onPointerOut={(event) => setHover(false)}>
        <boxGeometry attach="geometry" args={boxGeometryArgs} />
        <meshStandardMaterial  attach="material" color={hovered ? 'hotpink' : active? 'hotpink': 'orange'} />
    </mesh>
  )
}

export default BoxTransform;
