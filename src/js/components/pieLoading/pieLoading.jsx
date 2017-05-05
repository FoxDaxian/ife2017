import React, { Component } from 'react';
import css from "./pieLoading.scss";
class PieLoading extends Component {
    render() {
        return (
            <div className={css.wrap}>
                <div className="pieMask"></div>
                <div className="pieMask1"></div>
                <div className="pieMask2"></div>
                <div className="pie"></div>
                <div className="cirque"></div>
            </div>
        );
    }
}

export default PieLoading;