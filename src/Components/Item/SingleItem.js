import "./SingleItem.css";
import Dummy1 from "../../assets/display/Dummy1.jpg";
import Dummy2 from "../../assets/display/Dummy2.jpg";
import Dummy3 from "../../assets/display/Dummy3.jpg";
import Dummy4 from "../../assets/display/Dummy4.jpg";
import Dummy5 from "../../assets/display/Dummy5.jpg";
const SingleItem = ({name, image}) => {
    let displayImage = image === Dummy1 ? Dummy1 : image === Dummy2? Dummy2 : image === Dummy3? Dummy3: image === Dummy4 ? Dummy4 : Dummy5;
    return (
        <div id="single-item">
                <img 
                    src={displayImage}
                    alt='Group Image'
                    width={190}
                    height={160}
                />
            <p> {name}</p>
            <hr/>
        </div>
    );
};

export default SingleItem;