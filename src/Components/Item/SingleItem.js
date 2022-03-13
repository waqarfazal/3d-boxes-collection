import Dummy1 from '../../assets/display/dummy1.jpg';
import "./SingleItem.css";
const SingleItem = ({name}) => {
    return (
        <div id="single-item">
                <img 
                    src={Dummy1}
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