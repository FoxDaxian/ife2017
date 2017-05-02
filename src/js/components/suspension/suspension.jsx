import React, { Component } from 'react';
import css from "./suspension.scss";

class Suspension extends Component {
    render() {
        return (
            <div className={css.wrap}>
                <a href="https://github.com/a13821190779">
                    <div className="main">
                        <p className="text">
                            <span>阿尔冯斯，放学别走</span>
                        </p>
                        <img src="http://i1.piimg.com/567571/33b1dc8cd5753f47.png" alt="" />
                    </div>
                </a>
            </div>
        );
    }
}

export default Suspension;