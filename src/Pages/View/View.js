import React, {useEffect, useRef} from 'react';
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
import {addBox, addMultipleBoxes, removeBox, removeAllBoxes} from "../../State/actions/boxSelectionActions";
import {deleteList} from "../../State/actions/listsActions";
import { useNavigate } from "react-router-dom";
import {RoutesNames} from '../../routes/RoutesNames';
import { FaArrowLeft  } from "react-icons/fa";
const View = ({lists, addBox, addMultipleBoxes, removeBox, removeAllBoxes, selectedBoxes, deleteList}) => {
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
    const listBoxesIds = [];
    list[0].boxes.map((item) => listBoxesIds.push(item.id));
    for(let i = 0; i< 10; i++){
        let isVisible = false;
        let currentBox;
        if(listBoxesIds.includes(randomIds[i])) {
            isVisible = true;
            currentBox = list[0].boxes.filter((item) => item.id === randomIds[i]);
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


        boxes.push(<Box id={randomIds[i]} position={[position_x, position_y, position_z]} boxGeometryArgs={[20, 20, 20]} scale={[scale_x, scale_y, scale_z]} rotation={[rotation_x, rotation_y, rotation_z]} addBox={addBox} removeBox={removeBox} isVisible={isVisible} isView={true}/>);
    }

    const handleDelete = () => {
        deleteList(list[0].id);
        addToast("List is Deleted Successfully", {appearance: "success"});
        const path = RoutesNames.main.path;
        navigate(path);
    }

    const handleEdit = () => {
        removeAllBoxes();
        addMultipleBoxes(list[0].boxes);
        const path = `${RoutesNames.edit.path}/${list[0].name}`;
        navigate(path, {state: {id: list[0].id}});
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
                                    
                                    <div style={{marginLeft: "auto", marginRight: "15px"}}>
                                        <Button onClick={handleDelete} variant="danger">Delete List</Button> &nbsp;&nbsp;&nbsp;
                                        <Button onClick={handleEdit}>Edit</Button>
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
                </div>
            </Layout>
        </>
    );
};
const mapStateToProps = (state) => {
    return {
      lists: state.listsData,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addBox: (id, data) => {
            dispatch(addBox(id, data))
        },
        addMultipleBoxes: (data) => {
            dispatch(addMultipleBoxes(data))
        },
        removeBox: (id) => {
            dispatch(removeBox(id))
        },
        removeAllBoxes: () => {
            dispatch(removeAllBoxes())
        },
        deleteList: (id) => {
            dispatch(deleteList(id))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(View);