import React, { useState, Suspense, useEffect, useRef } from "react"
import { Canvas } from '@react-three/fiber';
import { Controls, useControl } from "react-three-gui" 
import Header from "../../Layout/Header/Header";
import Layout from "../../Layout/Layout"
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import { useToasts } from 'react-toast-notifications';
import { connect } from 'react-redux';
import { useFormik } from 'formik';
import { addList, updateList } from "../../State/actions/listsActions";
import { removeAllBoxes } from "../../State/actions/boxSelectionActions";
import { useNavigate } from "react-router-dom";
import { RoutesNames } from "../../routes/RoutesNames"
import { useLocation } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";
import Dummy1 from "../../assets/display/Dummy1.jpg";
import Dummy2 from "../../assets/display/Dummy2.jpg";
import Dummy3 from "../../assets/display/Dummy3.jpg";
import Dummy4 from "../../assets/display/Dummy4.jpg";
import Dummy5 from "../../assets/display/Dummy5.jpg";
import BoxTransform from "../../Components/Box/BoxTransform";
import './Transform.css';
const Transform = ({ selectedBoxes, lists, addList, updateList, removeAllBoxes }) => {
    const location = useLocation();
    const { addToast } = useToasts();
    let navigate = useNavigate();
    const list = lists.filter((item) => item.id === location.state.id);
    const images = [
        Dummy1,
        Dummy2,
        Dummy3,
        Dummy4,
        Dummy5,
    ];

     //transformation type
     const [transformationType, setTransformationType] = useState("translate")
     const handleTransformationTypeChange = (event) => {
         setTransformationType(event.target.value);
     }

    //Boxes
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

        let isVisible = false;
        let currentBox;
        if(selectedBoxesIds.includes(randomIds[i])) {
            isVisible = true;
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
        if(isVisible){
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
        boxes.push(<BoxTransform id={randomIds[i]} position={[position_x, position_y, position_z]} boxGeometryArgs={[20, 20, 20]} scale={[scale_x, scale_y, scale_z]} rotation={[rotation_x, rotation_y, rotation_z]} selectedBoxes={selectedBoxes} isVisible={isVisible} useControl={useControl} transformationType={transformationType}/>);
    }

    //modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const formik = useFormik({
        initialValues: {
            name: location.state.isUpdate ? list[0].name : '',
        },
    });

   

    //adding or updating the list
    const handleDone = () => {
        if (formik.values.name !== '' && selectedBoxes.length >= 1) {
            const id = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
            let image = images[Math.floor(Math.random() * images.length)];

            location.state.isNew ? addList({ name: formik.values.name, image: image, id: id, boxes: selectedBoxes }) : updateList({ name: formik.values.name, id: list[0].id, boxes: selectedBoxes });
            setShow(false);
            removeAllBoxes();
            location.state.isNew ? addToast("List is added successfully", { appearance: "success" }) : addToast("List is updated successfully", { appearance: "success" });
            const path = RoutesNames.main.path;
            navigate(path);
        } else {
            if (selectedBoxes.length < 1) {
                addToast("There is no box in list, please add the box(s) first", { appearance: "error" });
            } else {
                addToast("Please add the name of List", { appearance: "error" });
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
                                <div style={{ paddingTop: "15px", display: "flex" }}>
                                    <div>
                                        <Button onClick={() => navigate(-1)} variant="dark"><FaArrowLeft /> Back </Button>
                                    </div>
                                    <div style={{ marginLeft: "60px" }}>
                                        <span style={{
                                            background: "hotpink",
                                            borderRadius: "50%",
                                            height: "26px",
                                            width: "26px",
                                            lineHeight: "26px",
                                            display: "inline-block",
                                            textAlign: "center",
                                            marginRight: "6px"
                                        }}>&nbsp;</span> &nbsp;<b> {selectedBoxes ? selectedBoxes.length : 0} </b> &nbsp; Total selected Boxes
                                    </div>
                                    <div className="transformationtype" style={{width: "100px", marginLeft: "80px"}}>
                                        <select onClick={(event) => handleTransformationTypeChange(event)}>
                                            <option value="rotate">Rotate</option>
                                            <option value="translate">Translate</option>
                                            <option value="scale">Scale</option>
                                        </select>
                                        </div>
                                    <div style={{ marginLeft: "auto", marginRight: "15px" }}>
                                        <Button onClick={handleShow}>{location.state.isNew ? "Add" : "Update"}</Button>
                                    </div>
                                </div>
                            </Header>
                        </div>
                        <div className="col-lg-12" style={{height: "700px"}}>
                            <Canvas>
                                <ambientLight />
                                <pointLight position={[10, 10, 10]} />
                                {boxes}
                            </Canvas>
                            
                        </div>
                    </div>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>{location.state.isNew ? "Adding List" : "Updating List"}</Modal.Title>
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
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Transform);