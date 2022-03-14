import "bootstrap/dist/css/bootstrap.min.css";
import Left from "./Left";
const Layout = ({ children }) => {
    return (
        <div className="row">
            <div className="col-xl-3 col-lg-3 col-md-3 col-3">
                <Left />
            </div>
            <div className="col-xl-9 col-lg-9 col-md-9 col-9" style={{marginLeft: "-30px"}}>
                {children} 
            </div>
        </div>
    );
};

export default Layout;