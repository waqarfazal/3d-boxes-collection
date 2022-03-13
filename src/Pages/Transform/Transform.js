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
import { connect } from 'react-redux';
import { useFormik  } from 'formik';
import {addList, updateList} from "../../State/actions/listsActions";
import {removeAllBoxes} from "../../State/actions/boxSelectionActions";
import { useNavigate } from "react-router-dom";
import { RoutesNames } from "../../routes/RoutesNames"
import { useLocation } from 'react-router-dom';
const Transform = ({selectedBoxes, lists, addList, updateList, removeAllBoxes}) => {
    const location = useLocation();
    console.log("*********Checking the state data********8");
    console.log(location);
    const { addToast } = useToasts(); 
    let navigate = useNavigate();
    const list = lists.filter((item) => item.id === location.state.id);
    //addToast("some message", { appearance: 'error' });
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

    //Search
    const formik = useFormik({
        initialValues: {
            name: location.state.isUpdate ? list[0].name : '',
        },
    });
    const handleDone = () => {
        const id = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
        if(formik.values.name !== '' && selectedBoxes.length >= 1){
            location.state.isNew ? addList({name: formik.values.name, id: id, boxes: selectedBoxes}) : updateList({name: formik.values.name, id: list[0].id, boxes: selectedBoxes});
            setShow(false);
            removeAllBoxes();
            location.state.isNew ? addToast("List is added successfully", {appearance: "success"}): addToast("List is updated successfully", {appearance: "success"});
            const path = RoutesNames.main.path;
            navigate(path);
        } else {
            if(selectedBoxes.length < 1){
                addToast("There is no box in list, please add the box(s) first", {appearance: "error"});
            } else { 
                addToast("Please add the name of List", {appearance: "error"});
            }
        }
    }
    
    return (
        <>
            <Layout>
                <div>
                    <div className="row">
                    <div className="col-lg-12">
                            <Header>
                                <div style={{ paddingTop: "15px", display: "flex"}}>
                                    <div>
                                        <Button onClick={() => navigate(-1)}>Back</Button>
                                    </div>
                                    <div style={{marginLeft: "60px"}}>
                                        <span style={{background:"hotpink",
                                            borderRadius: "50%",
                                            height: "26px",
                                            width: "26px",
                                            lineHeight: "26px",
                                            display: "inline-block",
                                            textAlign: "center",
                                            marginRight: "6px"}}>&nbsp;</span> &nbsp;<b> {selectedBoxes ? selectedBoxes.length: 0} </b> &nbsp; Total selected Boxes
                                    </div> 
                                    <div style={{marginLeft: "auto", marginRight: "15px"}}>
                                        <Button onClick={handleShow}>{location.state.isNew ? "Add" : "Update"}</Button>
                                    </div> 
                                </div>
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
                            <Modal.Title>{location.state.isNew? "Adding List" : "Updating List"}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <input
                                id="name"
                                placeholder="List Name"
                                name="name"
                                type="text"
                                onChange={formik.handleChange}
                                value={formik.values.name}
                            />
                        </Modal.Body>
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

const mapStateToProps = state => {
    return {
      selectedBoxes: state.boxSelectionData,
      lists: state.listsData,
    };
  };
const mapDispatchToProps = dispatch => {
    return {
        addList: (data) => {
            dispatch(addList(data))
        },
        updateList: (data) => {
            dispatch(updateList(data))
        },
        removeAllBoxes: () => {
            dispatch(removeAllBoxes());
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Transform);