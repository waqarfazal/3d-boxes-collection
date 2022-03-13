import "bootstrap/dist/css/bootstrap.min.css";
import Left from "./Left";
const Layout = ({children}) => {
    return (
        <>
            <div className="row">
                <div className="col-xl-3 col-lg-3 col-md-3 col-3">
                    <Left />
                </div>
                <div className="col-xl-8 col-lg-8 col-md-4 col-4">
                    {children}
                </div>
            </div>
        </>
    );
};

export default Layout;