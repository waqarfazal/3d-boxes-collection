import React, { useState, Suspense, useEffect, useRef } from "react"
import { Canvas, useLoader } from "react-three-fiber"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { Controls, useControl } from "react-three-gui"
import { OrbitControls, TransformControls } from "@react-three/drei"
import Header from "../../Layout/Header/Header";
import Layout from "../../Layout/Layout"
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import { useToasts } from 'react-toast-notifications';
const Transform = () => {
    const { addToast } = useToasts();
    addToast("some message", { appearance: 'error' });
    //addToast("some message", { appearance: 'success' });

    // const orbit = useRef()
    // const transform = useRef()
    // const mode = useControl("mode", { type: "select", items: ["scale", "rotate", "translate"] })
    // const { nodes, materials } = useLoader(GLTFLoader, "/scene.gltf")
    // useEffect(() => {
    //   if (transform.current) {
    //     const controls = transform.current
    //     controls.setMode(mode)
    //     const callback = event => (orbit.current.enabled = !event.value)
    //     controls.addEventListener("dragging-changed", callback)
    //     return () => controls.removeEventListener("dragging-changed", callback)
    //   }
    // })

    //modal
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleDone = () => {
        
    }
    
    return (
        <>
            <Layout>
                <div>
                    <div className="row">
                        <div className="col-lg-12">
                            <Header> 
                                <Button onClick={handleShow}>Add</Button>
                            </Header>
                        </div>
                        {/* <div className="col-lg-12" style={{backgroundColor: "red", height: "700px"}}>
                            <Canvas shadowMap camera={{ position: [0, 0, 17], far: 50 }}>
                                <ambientLight />
                                <spotLight
                                intensity={2}
                                position={[40, 50, 50]}
                                shadow-bias={-0.00005}
                                penumbra={1}
                                angle={Math.PI / 6}
                                shadow-mapSize-width={2048}
                                shadow-mapSize-height={2048}
                                castShadow
                                />
                                <Suspense fallback={null}>
                                <TransformControls ref={transform}>
                                    <group position={[0, -7, 0]} rotation={[-Math.PI / 2, 0, 0]} dispose={null}>
                                        <mesh material={materials["Scene_-_Root"]} geometry={nodes.mesh_0.geometry} castShadow receiveShadow />
                                    </group>
                                </TransformControls>
                                <OrbitControls ref={orbit} />
                                </Suspense>
                            </Canvas>
                            <Controls />
                        </div> */}
                    </div>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                        <Modal.Title>Adding List</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Please enter the name of list</Modal.Body>
                        <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleDone}>
                            Done
                        </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </Layout>
        </>
    );
};

export default Transform;