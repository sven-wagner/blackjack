import React, { Component } from 'react'
import PropTypes from "prop-types";
import Karten from './Karten';

export default class PlayerFeld extends Component {

    constructor(){
        super();

       
    }
    render() {
        return (
            <div className="col-sm-3">
                <div className="card text-center">
                    <div className="col">
                        {this.props.name}
                    </div>
                    <div className="col">
                        {this.props.points}
                    </div>
                    <div className="row d-flex justify-content-center">
                        {
                            this.props.karten.map(item =>
                                    <Karten
                                    key={item}
                                    zahl={item.Value}
                                    form={item.Suit}
                                />
                            ) 
                        }
                    </div>
                </div>
            </div>
        )
    }
}

PlayerFeld.propTypes = {
    name: PropTypes.string,
    points: PropTypes.number,
    karten: PropTypes.array
}