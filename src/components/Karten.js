import React, { Component } from 'react'
import PropTypes from "prop-types";

export default class Karten extends Component {
    getKarte(){
        if(this.props.form =="♥" ||this.props.form =="♦"){
            return(
                <div className="card text-center text-danger">
                <div className="col">
                    {this.props.zahl}
                </div>
                <div className="col">
                    {this.props.form}
                </div>
            </div>
            )
           
        }
        else{
            return(
                <div className="card text-center ">
                <div className="col">
                    {this.props.zahl}
                </div>
                <div className="col">
                    {this.props.form}
                </div>
            </div>
            )
        }
    }
    render() {
        return (
                <div className="col-sm-2 ml-1 mr-1 mt-1 mb-1">
                  {this.getKarte()}
                </div>
        )
    }
}

Karten.propTypes = {
    zahl: PropTypes.string,
    form: PropTypes.string
}