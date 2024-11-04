import React, { Component } from "react";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

class Revenue extends Component {
    constructor(props){
        super(props)
    } 
    render() { 
        return (
            <>
            <div>sadsdasdasdasdasdadasdasdasdasdasdassd</div>
           
            </>
        );
    }
}
const mapStateToProps = state => {
    return {
       
    };
};

const mapDispatchToProps = dispatch => {
    return {
        
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Revenue);
