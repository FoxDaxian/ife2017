import React, { Component } from 'react';
import { Link } from "react-router-dom";
import css from "./home.scss";


class Home extends Component {
    render() {
        return (
            <div className={css.wrap}>
                <h2>ife2017</h2>
                <div className="lists">
                    <Link className="link" to="/suspension">有趣的鼠标悬浮模糊效果</Link>
                </div>
            </div>
        );
    }
}

export default Home;