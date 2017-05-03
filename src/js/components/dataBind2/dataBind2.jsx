import React, { Component } from 'react';

class DataBind2 extends Component {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        this.obj = {
            age: 2,
            parent: {
                mother: 1,
                father: 2
            }
        }

        function Observer(data) {
            this.convert(data);
            this.data = data;
            this.$set = function (key, value, cb) {
                let tempFn = null;
                if ({}.toString.call(cb) === "[object Function]") {
                    tempFn = cb;
                } else {
                    tempFn = function (curValue) {
                        console.log(`当前值为${curValue}`);
                    }
                }
                if ({}.toString.call(value) === "[object Object]") {

                } else {
                    let temp = value;
                    Object.defineProperty(data, key, {
                        enumerable: true,
                        configurable: true,
                        get: function () {
                            console.log(`你访问了${key}`);
                            return temp;
                        },
                        set: function (newValue) {
                            tempFn.call(this,newValue);
                            temp = newValue;
                        },
                    });
                }
            }

        }
        Observer.prototype.convert = function (data) {
            for (let item in data) {
                let now_val = data[item];
                if (data.hasOwnProperty(item)) {
                    if ({}.toString.call(now_val) === "[object Object]") {
                        this.convert(now_val);
                    }
                    else {
                        Object.defineProperty(data, item, {
                            enumerable: true,
                            configurable: true,
                            get: function () {
                                console.log(`你访问了${item}`);
                                return now_val;
                            },
                            set: function (newValue) {
                                console.log(`你成功设置了${item}为${newValue}`);
                                now_val = newValue;
                            },
                        });
                    }
                }
            }
        }

        this.app1 = new Observer(this.obj);
        this.app1.$set("ttttt", 22, function (curValue) {
            console.log(`这是自定义函数：改变的值为${curValue}`);
        });
        this.app1.data.ttttt = 1;
    }




    mockVue(event) {
        //event.target.value这个值取的是当前改变之后的瞬间的input框代表的值，所以这个值才是真实的
        this.app1.data.ttttt = event.target.value;
        this.forceUpdate();
    }



    render() {
        console.log(this.app1);
        let age = this.app1.data.ttttt;
        return (
            <div>
                <input type="text" value={age} onChange={this.mockVue.bind(this)} />
                <h1>{age}</h1>
            </div>
        );
    }
}

export default DataBind2;