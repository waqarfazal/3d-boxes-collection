import Layout from "../../Layout/Layout";
import "bootstrap/dist/css/bootstrap.min.css";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import { connect } from 'react-redux';
import {RoutesNames} from '../../routes/RoutesNames';
import { useNavigate } from "react-router-dom";
import { removeAllBoxes } from "../../State/actions/boxSelectionActions";
const Main = ({lists, removeAllBoxes}) => {
    let navigate = useNavigate();
    const handleAddNew = () => {
        removeAllBoxes()
        const path = RoutesNames.new.path;
        navigate(path);
    }
    return (
        <>
            <Layout>
                <div className="d-flex align-items-center justify-content-center" style={{ height: "500px" }}>
                    <Alert variant="success">
                        <Alert.Heading>Hey, nice to see you  😊</Alert.Heading>
                        
                        {lists.length === 0 ? <p> 
                            You didn't created any list yet. Please add a list first. &nbsp;&nbsp;&nbsp; <Button onClick={handleAddNew}> Add New</Button>
                        </p>: <p>
                        Please select a list which you want to see, edit or Delete. OR add a new list &nbsp;&nbsp;&nbsp; <Button onClick={handleAddNew}> Add New</Button></p>}
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
const mapDispatchToProps = dispatch => {
    return {
        removeAllBoxes: () => {
            dispatch(removeAllBoxes())
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Main);