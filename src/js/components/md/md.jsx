import React, { PropTypes } from 'react';
import css from "./md.scss";
import util from "./index.js";
export default class Md extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: `
            <p><br/></p>
            `
        };
    }

    componentDidMount() {
        this.textarea.innerHTML = this.state.text;
        this.testFn();
    }


    testFn() {
        var text = this.textarea.children,
            elArr = [],
            tempWrap = document.createElement("div");
        [].slice.call(text).forEach(function (el, i) {
            var text = el.innerHTML.replace(/<[^>]+>/g, "");

            util.regFn(text, elArr);
        });
        elArr.forEach((el, i) => {
            tempWrap.appendChild(el);
        })
        this.show.innerHTML = tempWrap.innerHTML;
    }



    keydown(e) {
        if (this.textarea.children.length === 1 && e.keyCode === 8 && this.textarea.children[0].innerHTML == "<br>") {
            e.preventDefault();
        }
        setTimeout(() => {
            this.testFn(this.textarea.innerHTML);
        }, 0);
    }


    render() {
        return (
            <div className={css.wrap}>
                <div className="page"></div>
                <div
                    className="mdArea"
                    contentEditable="true"
                    ref={e => this.textarea = e}
                    onKeyDown={e => this.keydown(e)}
                ></div>
                <div className="cutDiv"></div>
                <div
                    className="show"
                    ref={e => this.show = e}
                ></div>
            </div>
        );
    }
}

Md.propTypes = {};
