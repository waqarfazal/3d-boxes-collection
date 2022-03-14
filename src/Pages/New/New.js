import React, {useState} from 'react';
import { useFormik  } from 'formik';
import { Canvas } from '@react-three/fiber';
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button"
import Box from "../../Components/Box/Box";
import Header from "../../Layout/Header/Header";
import Layout from "../../Layout/Layout"
import { Link } from "react-router-dom";
import { useToasts } from 'react-toast-notifications';
import {RoutesNames} from '../../routes/RoutesNames';
import {addBox, removeBox} from "../../State/actions/boxSelectionActions";
import {addList} from "../../State/actions/listsActions";
import {removeAllBoxes} from "../../State/actions/boxSelectionActions";
import { connect } from 'react-redux';
import { useNavigate } from "react-router-dom"
import { FaArrowLeft  } from "react-icons/fa";
import Modal from "react-bootstrap/Modal"
import Dummy1 from "../../assets/display/Dummy1.jpg";
import Dummy2 from "../../assets/display/Dummy2.jpg";
import Dummy3 from "../../assets/display/Dummy3.jpg";
import Dummy4 from "../../assets/display/Dummy4.jpg";
import Dummy5 from "../../assets/display/Dummy5.jpg";
import useMeasure from 'react-use-measure'
import {useDevicePixelRatio, getDevicePixelRatio} from 'use-device-pixel-ratio'
 
const New = ({selectedBoxes, addBox, removeBox, addList, removeAllBoxes}) => {
    const { addToast } = useToasts();
    let navigate = useNavigate();
    const [ref, bounds] = useMeasure();
    const dpr = useDevicePixelRatio()
    console.log("*********checking the DPR******");
    console.log(dpr);
    const images = [
        Dummy1,
        Dummy2,
        Dummy3,
        Dummy4,
        Dummy5,
    ];
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
            [-335.9583386311535, -16.55146224234072, -370.18450821831806],
    
            [185.78523155448673, 63.55062329757843, -375.62551942943935],
            [235.030559996087, 154.60584904199504, -373.8764721919731]
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
            [2.3527566546065777, 1.9127923732000667, 1.008254821924569],
    
            [2.059287845958539, 2.6857114924621075, 2.0249824108374974],
            [2.059287845958539, 2.6857114924621075, 2.0249824108374974]
            
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
            [-2.2344709475189077, -0.5268314997836343, 1.797140443469824],
    
            [1.4632517164968903, 0.01291878427030502, 1.829136101425727],
            [1.4632517164968903, 0.01291878427030502, 1.829136101425727]
    
    
        ],
    }
    const randomIds = ['doj', 'gxtcz', 'tidyi', 'vcis', 'hxsav', 'dmfhu', 'kpquy', 'ekebs', 'adxqi', 'inkjk', 'syree', 'oocpw', 'iivws', 'esmst', 'ehgbp', 'ozsf', 'stkmn', 'lpwtd', 'ziyyk', 'vyumr', 'dwtqv', 'sith', 'uljfm', 'lcwcg', 'bouys', 'mnvvm', 'isfbl', 'amlmc', 'duirg', 'brzrm', 'ffcjz', 'wwlvv', 'yrxhp', 'hxwgo', 'nwtnu', 'gajaw', 'riise', 'tocon', 'ybpyn', 'jclhf', 'zmzgq', 'isxtt', 'laxcn', 'kxngl', 'lvqpi', 'tcqbk', 'aqcbl', 'wbkox', 'yxlri', 'bhgnz', 'uezlj', 'xzvin', 'pbqai', 'fglvk', 'zjrce', 'dhpbo', 'rjlzq', 'augpu', 'ppazt', 'oatjx', 'jrocx', 'ouxhk', 'ologu', 'ldsiq', 'rpcru', 'yukpg', 'fsxpj', 'bhaee', 'sdjpd', 'niatx', 'lrveh', 'affku', 'mwawz', 'lpgfu', 'balpa', 'wtdgv', 'zfhyi', 'ekkcs', 'lfvkw', 'tznmz', 'xmkyl', 'dgbak', 'civzp', 'qvhka', 'drimx', 'ikrda', 'midbk', 'uxxom', 'zyuuy', 'fekaf', 'sapvi', 'xifzn', 'oibk', 'zeyji', 'nbpvu', 'lqzsq', 'ropat', 'wjyvq', 'cgpmb', 'kojro']
    
    for(let i = 0; i< 12; i++){
        const position_x = randomValues.position[i][0]
		const position_y = randomValues.position[i][1] 
	    const position_z = randomValues.position[i][2] 

        const scale_x =  randomValues.scale[i][0];
		const scale_y =  randomValues.scale[i][1]
		const scale_z =  randomValues.scale[i][2]

        const rotation_x =  randomValues.rotation[i][0]
		const rotation_y =  randomValues.rotation[i][1]
		const rotation_z =  randomValues.rotation[i][2]

        let geometryData = {
            position: {x: position_x, y: position_y, z: position_z},
            scale: {x: scale_x, y: scale_y, z: scale_z},
            rotation: {x: rotation_x, y: rotation_y, z: rotation_z}
        }
        boxes.push(<Box id={randomIds[i]} position={[position_x, position_y, position_z]} boxGeometryArgs={[20, 20, 20]} scale={[scale_x, scale_y, scale_z]} rotation={[rotation_x, rotation_y, rotation_z]} addBox={addBox} removeBox={removeBox} selectedBoxes={selectedBoxes} geometryData={geometryData}/>);
    }
    // for (let i = 0; i < 100; i++) {
    //     const id = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
    //     randomIds.push(id);

    //     let randomValue = Math.random();
    //     randomPositionX.push(randomValue);
    //     const position_x = randomValue * 1600 - 400
        
    //     randomValue = Math.random();
    //     randomPositionY.push(randomValue);
	// 	const position_y = randomValue * 900 - 450

    //     randomValue = Math.random();
    //     randomPositionZ.push(randomValue);
	//     const position_z = randomValue * 900 - 500

    //     randomValue = Math.random();
    //     randomScaleX.push(randomValue);
    //     const scale_x = randomValue * 2 + 1;

    //     randomValue = Math.random();
    //     randomScaleY.push(randomValue);
	// 	const scale_y = randomValue * 2 + 1;

    //     randomValue = Math.random();
    //     randomScaleZ.push(randomValue);
	// 	const scale_z = randomValue * 2 + 1;
        
    //     randomValue = Math.random();
    //     randomRotationX.push(randomValue);
    //     const rotation_x = randomValue * 2 * Math.PI;

    //     randomValue = Math.random();
    //     randomRotationY.push(randomValue);
	// 	const rotation_y = randomValue * 2 * Math.PI;

    //     randomValue = Math.random();
    //     randomRotationZ.push(randomValue);
	// 	const rotation_z = randomValue * 2 * Math.PI;

    //     boxes.push(<Box id={id} position={[position_x, position_y, position_z]} boxGeometryArgs={[20, 20, 20]} scale={[scale_x, scale_y, scale_z]} rotation={[rotation_x, rotation_y, rotation_z]} addBox={addBox} removeBox={removeBox}/>);
    // }
    // console.log("************Random Number***********")
    // console.log("PositionX");
    // console.log(randomPositionX);

    // console.log("PositionY");
    // console.log(randomPositionY);

    // console.log("PositionZ");
    // console.log(randomPositionZ);

    // console.log("ScaleX");
    // console.log(randomScaleX);

    // console.log("ScaleY");
    // console.log(randomScaleY);

    // console.log("ScaleZ");
    // console.log(randomScaleZ);

    // console.log("RotationX");
    // console.log(randomRotationX);

    // console.log("RotationY");
    // console.log(randomRotationY);

    // console.log("RotationZ");
    // console.log(randomRotationZ);

    // console.log("*******random ids*********");
    // console.log(randomIds);


    //modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    //formik
    const formik = useFormik({
        initialValues: {
            name: '',
        },
    });

    const handleDone = () => {
        if(formik.values.name !== '' && selectedBoxes.length >= 1){
            const id = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
            let image = images[Math.floor(Math.random()*images.length)];
             
            addList({name: formik.values.name, image: image, id: id, boxes: selectedBoxes});
            setShow(false);
            removeAllBoxes();
            addToast("List is added successfully", {appearance: "success"});
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
                                        {selectedBoxes && selectedBoxes.length >= 1 ? <Button onClick={handleShow} variant="secondary"> Add </Button> : <Button onClick={handleEmptyClicked} variant="secondary"> Add </Button>} &nbsp;&nbsp;&nbsp;&nbsp;
                                        {selectedBoxes && selectedBoxes.length >= 1 ? 
                                        <Link to={RoutesNames.transform.path} state={{isNew: true, isUpdate: false}}> <Button>Transform</Button></Link>: 
                                        <Button onClick={handleEmptyClicked}>Transform</Button> }
                                    </div> 
                                </div>
                            </Header> 
                        </div>
                        <div className="col-lg-12" style={{height: "700px"}} ref={ref}>
                            <Canvas
                            resize={bounds}
                            dpr={getDevicePixelRatio({maxDpr: 5})}
                            >
                                <ambientLight />
                                <pointLight position={[10, 10, 10]} />
                                {boxes}
                            </Canvas>
                        </div>
                        <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Adding List</Modal.Title>
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
    };
  };

const mapDispatchToProps = (dispatch) => {
  return {
    addBox: (id, data) => {
        dispatch(addBox(id, data));
    },
    removeBox: (id) => {
        dispatch(removeBox(id));
    },
    addList: (data) => {
        dispatch(addList(data))
    },
    removeAllBoxes: () => {
        dispatch(removeAllBoxes());
    } 
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(New);