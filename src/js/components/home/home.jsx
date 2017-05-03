import React, { Component } from 'react';
import { Link } from "react-router-dom";
import css from "./home.scss";


class Home extends Component {
    render() {
        return (
            <div className={css.wrap}>
                <h2>ife2017</h2>
                <div className="lists">
                    <div className="link_wrap">
                        <Link className="link" to="/ife/suspension">有趣的鼠标悬浮模糊效果</Link>
                    </div>
                    <div className="link_wrap">
                        <Link className="link" to="/ife/dataBind1">动态数据绑定（一）</Link>
                    </div>
                    <div className="link_wrap">
                        <Link className="link" to="/ife/dataBind2">动态数据绑定（二）</Link>
                    </div>
                    <div className="link_wrap">
                        <a className="link" target="_blank" href="https://a13821190779.github.io/dataBindAll/">动态数据绑定（3-4）</a>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;