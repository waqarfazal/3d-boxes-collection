import React, {useEffect, useRef, useState} from 'react';
import { useFormik  } from 'formik';
import { Canvas } from '@react-three/fiber';
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button"
import Box from "../../Components/Box/Box";
import Header from "../../Layout/Header/Header";
import Layout from "../../Layout/Layout"
import { Link } from "react-router-dom";
import { useToasts } from 'react-toast-notifications';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import {addBox, removeBox} from "../../State/actions/boxSelectionActions";
import {removeAllBoxes} from "../../State/actions/boxSelectionActions";
import {updateList} from "../../State/actions/listsActions";
import { useNavigate } from "react-router-dom";
import {RoutesNames} from '../../routes/RoutesNames';
import { FaArrowLeft  } from "react-icons/fa";
import Modal from "react-bootstrap/Modal"
const Update = ({lists, addBox, removeBox, selectedBoxes, updateList, removeAllBoxes}) => {
    const location = useLocation();
    const { addToast } = useToasts();
    let navigate = useNavigate();
    const list = lists.filter((item) => item.id === location.state.id);
    const boxes = []

    const randomValues = {
        position: [
            [-155.97665912308756, 101.05074175382754, -370.07437230499374],
            [-103.34951610706189, 201.37123312812642, -370.0743723049937],
            [37.38142339741242, 161.07857675648188, -370.07437230499386],
            [22.57881526061632, 26.210306747491728, -370.09312144929453],
            [202.6712247367509, -118.52150306304873, -370.0021025766351],
    
            [117.14788324017722, -120.98852254845559, -370.02679304249415],
            [-25.939279020870813, -121.80992660676417, -370.06527916770534],
            [-117.21810280178634, -123.45459011245786, -370.0918885115875],
            [-273.46113428178694, -123.45459011245765, -370.13816884058593],
            [-335.9583386311535, -16.55146224234072, -370.18450821831806]
        ],
        scale: [
            [2.059287845958539, 2.6857114924621075, 2.0249824108374974],
            [2.059287845958539, 2.6857114924621075, 2.0249824108374974],
            [2.848878556181318, 7.668274285405719, 2.8014194218652437],
            [2.848878556181318, 7.668274285405719, 2.8014194218652437],
            [2.3527566546065777, 0.4187115384559108, 1.008254821924569],
    
            [2.3527566546065777, 0.4187115384559108, 1.008254821924569],
            [2.3527566546065777, 1.9127923732000667, 1.008254821924569],
            [2.3527566546065777, 1.9127923732000667, 1.008254821924569],
            [2.3527566546065777, 1.9127923732000667, 1.008254821924569],
            [2.3527566546065777, 1.9127923732000667, 1.008254821924569]
            
        ],
        rotation: [
            [1.4632517164968903, 0.01291878427030502, 1.829136101425727],
            [1.4632517164968903, 0.01291878427030502, 1.829136101425727],
            [1.4632517164968903, 0.01291878427030502, 1.829136101425727],
            [1.3700068810343393, -0.9627226547765749, 1.5317076242037604],
            [3.0250522948637038, -0.9627226547765749, 1.5317076242037606],
    
            [3.0250522948637038, -0.9627226547765749, 1.5317076242037606],
            [-2.2344709475189077, -0.5268314997836343, 1.797140443469824],
            [-2.2344709475189077, -0.5268314997836343, 1.797140443469824],
            [-2.2344709475189077, -0.5268314997836343, 1.797140443469824],
            [-2.2344709475189077, -0.5268314997836343, 1.797140443469824]
    
        ],
    }

    const randomIds = ['doj', 'gxtcz', 'tidyi', 'vcis', 'hxsav', 'dmfhu', 'kpquy', 'ekebs', 'adxqi', 'inkjk', 'syree', 'oocpw', 'iivws', 'esmst', 'ehgbp', 'ozsf', 'stkmn', 'lpwtd', 'ziyyk', 'vyumr', 'dwtqv', 'sith', 'uljfm', 'lcwcg', 'bouys', 'mnvvm', 'isfbl', 'amlmc', 'duirg', 'brzrm', 'ffcjz', 'wwlvv', 'yrxhp', 'hxwgo', 'nwtnu', 'gajaw', 'riise', 'tocon', 'ybpyn', 'jclhf', 'zmzgq', 'isxtt', 'laxcn', 'kxngl', 'lvqpi', 'tcqbk', 'aqcbl', 'wbkox', 'yxlri', 'bhgnz', 'uezlj', 'xzvin', 'pbqai', 'fglvk', 'zjrce', 'dhpbo', 'rjlzq', 'augpu', 'ppazt', 'oatjx', 'jrocx', 'ouxhk', 'ologu', 'ldsiq', 'rpcru', 'yukpg', 'fsxpj', 'bhaee', 'sdjpd', 'niatx', 'lrveh', 'affku', 'mwawz', 'lpgfu', 'balpa', 'wtdgv', 'zfhyi', 'ekkcs', 'lfvkw', 'tznmz', 'xmkyl', 'dgbak', 'civzp', 'qvhka', 'drimx', 'ikrda', 'midbk', 'uxxom', 'zyuuy', 'fekaf', 'sapvi', 'xifzn', 'oibk', 'zeyji', 'nbpvu', 'lqzsq', 'ropat', 'wjyvq', 'cgpmb', 'kojro']
    
    const selectedBoxesIds = [];
    selectedBoxes.map((item) => selectedBoxesIds.push(item.id));
    for(let i = 0; i< 10; i++){ 
        let isActive = false;
        let currentBox;
        if(selectedBoxesIds.includes(randomIds[i])) {
            isActive = true;
            currentBox = selectedBoxes.filter((item) => item.id === randomIds[i]);
        }

        let position_x = 0;
        let position_y = 0;
        let position_z = 0;

        let scale_x = 0;
        let scale_y = 0;
        let scale_z = 0;

        let rotation_x = 0;
        let rotation_y = 0;
        let rotation_z = 0;
        if(isActive){
            position_x = currentBox[0].data.position.x
            position_y = currentBox[0].data.position.y
            position_z = currentBox[0].data.position.z

            scale_x = currentBox[0].data.scale.x
            scale_y = currentBox[0].data.scale.y
            scale_z = currentBox[0].data.scale.z

            rotation_x = currentBox[0].data.rotation.x
            rotation_y = currentBox[0].data.rotation.y
            rotation_z = currentBox[0].data.rotation.z
        } else {
            position_x = randomValues.position[i][0]
		    position_y = randomValues.position[i][1] 
	        position_z = randomValues.position[i][2] 

            scale_x =  randomValues.scale[i][0];
		    scale_y =  randomValues.scale[i][1]
		    scale_z =  randomValues.scale[i][2]

            rotation_x =  randomValues.rotation[i][0]
		    rotation_y =  randomValues.rotation[i][1]
		    rotation_z =  randomValues.rotation[i][2]
        }

        let geometryData = {
            position: {x: position_x, y: position_y, z: position_z},
            scale: {x: scale_x, y: scale_y, z: scale_z},
            rotation: {x: rotation_x, y: rotation_y, z: rotation_z}
        }
        boxes.push(<Box id={randomIds[i]} position={[position_x, position_y, position_z]} boxGeometryArgs={[20, 20, 20]} scale={[scale_x, scale_y, scale_z]} rotation={[rotation_x, rotation_y, rotation_z]} addBox={addBox} removeBox={removeBox} selectedBoxes={selectedBoxes} isActive={isActive} geometryData={geometryData}/>);
    }


    //modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    //formik
    const formik = useFormik({
        initialValues: {
            name: list[0].name,
        },
    });
    const handleDone = () => {
        const id = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
        if(formik.values.name !== '' && selectedBoxes.length >= 1){
            updateList({name: formik.values.name, id: list[0].id, boxes: selectedBoxes});
            setShow(false);
            removeAllBoxes();
            addToast("List is updated successfully", {appearance: "success"});
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
    const handleEmptyClicked = () => {
        addToast("Please select a box first", {appearance: "info"})
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
                                        <Button onClick={() => navigate(-1)} variant="dark"><FaArrowLeft/> Back </Button>
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
                                    {selectedBoxes && selectedBoxes.length >= 1 ? <Button onClick={handleShow} variant="secondary"> Update </Button> : <Button onClick={handleEmptyClicked} variant="secondary"> Update </Button>} &nbsp;&nbsp;&nbsp;&nbsp;
                                    {selectedBoxes && selectedBoxes.length >= 1 ? 
                                        <Link to={RoutesNames.transform.path} state={{isNew: false, isUpdate: true, id: list[0].id}}> <Button>Transform</Button></Link> : 
                                        <Button onClick={handleEmptyClicked}>Transform</Button> }
                                    </div> 
                                </div>
                            </Header> 
                        </div>
                        <div className="col-lg-12" style={{height: "700px"}}>
                            <Canvas
                            > 
                                <ambientLight />
                                <pointLight position={[10, 10, 10]} />
                                {boxes}
                            </Canvas>
                        </div>
                    </div>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Updating List</Modal.Title>
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
const mapStateToProps = (state) => {
    return {
      lists: state.listsData,
      selectedBoxes: state.boxSelectionData
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addBox: (id, data) => {
            dispatch(addBox(id, data))
        },
        removeBox: (id) => {
            dispatch(removeBox(id))
        },
        updateList: (id) => {
            dispatch(updateList(id))
        },
        removeAllBoxes: () => {
            dispatch(removeAllBoxes());
        } 
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Update);