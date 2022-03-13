import Layout from "../../Layout/Layout";
import "bootstrap/dist/css/bootstrap.min.css";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import { connect } from 'react-redux';
import {RoutesNames} from '../../routes/RoutesNames';
import { Link } from "react-router-dom";
const Main = ({lists}) => {
    return (
        <>
            <Layout>
                <div className="d-flex align-items-center justify-content-center" style={{ height: "500px" }}>
                    <Alert variant="success">
                        <Alert.Heading>Hey, nice to see you  😊</Alert.Heading>
                        
                        {lists.length === 0 ? <p>
                            You didn't created any list yet. Please add a list first. &nbsp;&nbsp;&nbsp; <Link to={RoutesNames.new.path}><Button> Add New</Button></Link>
                        </p>: <p>
                        Please select a list which you want to see or add a new list &nbsp;&nbsp;&nbsp; <Link to={RoutesNames.new.path}><Button> Add New</Button></Link></p>}
                    </Alert>
                </div>

            </Layout>
        </>
    );
};

const mapStateToProps = state => {
    return {
      lists: state.listsData,
    };
  };
  
  export default connect(mapStateToProps)(Main);