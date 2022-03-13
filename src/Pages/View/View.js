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
const View = ({lists}) => {
    const location = useLocation();
    const list = lists.filter((item) => item.name === location.state.id);



    const { addToast } = useToasts();
    const boxes = []
    for (let i = 0; i < 400; i++) {
        const id = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);

        const position_x = Math.random() * 1600 - 800
		const position_y = Math.random() * 900 - 450
	    const position_z = Math.random() * 900 - 500

        const scale_x = Math.random() * 2 + 1;
		const scale_y = Math.random() * 2 + 1;
		const scale_z = Math.random() * 2 + 1;
        
        const rotation_x = Math.random() * 2 * Math.PI;
		const rotation_y = Math.random() * 2 * Math.PI;
		const rotation_z = Math.random() * 2 * Math.PI;
        boxes.push(<Box id={id} position={[position_x, position_y, position_z]} boxGeometryArgs={[20, 20, 20]} scale={[scale_x, scale_y, scale_z]} rotation={[rotation_x, rotation_y, rotation_z]}/>);
    }

    return (
        <>
            <Layout>
                <div>
                    <div className="row">
                        <div className="col-lg-12">
                            <Header> 
                                <Link to="/transform">Next</Link>
                            </Header>
                        </div>
                        <div className="col-lg-12" style={{backgroundColor: "red", height: "700px"}}>
                            <Canvas
                            >
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
  
export default connect(mapStateToProps)(View);