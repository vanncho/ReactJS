import React from 'react';
import trainStationImg from '../../static/img/train-station.jpg';
import { Link } from 'react-router-dom';

const CatalogUnit = (props) => {

    return(
        <Link to={'/trips/' + props.train._id} className="added-train" >
            <img src={trainStationImg} alt="" className="picture-added-train" />
            <h3>{props.train.destination}</h3>
            <span>from {props.train.origin}</span>
            <span>departs {props.train.time}</span>
            <span>arrives {props.train.arrives}</span>
            <span>duration {props.train.duration}</span>
        </Link>
    );
}

export default CatalogUnit;