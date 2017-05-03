import React, { Component } from 'react';

class DataBind3 extends Component {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        this.obj = {
            name: {
                firstName: 'shaofeng',
                lastName: 'liang'
            },
            age: 25
        }

        function Observer(data) {
            this.convert(data);
            this.data = data;
        }
        Observer.prototype.$set = function (key, value, cb) {
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
                        tempFn.call(this, newValue);
                        temp = newValue;
                    },
                });
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
        Observer.prototype.bubble = function (objKey, cb) {
            if ({}.toString.call(this.data[objKey]) === "[object Object]") {
                let tempObj = this.data[objKey];
                Object.defineProperty(this.data, objKey, {
                    enumerable: true,
                    configurable: true,
                    get: function () {
                        console.log(`这个对象被访问了`);
                        return tempObj;
                    },
                    set: function (newValue) {
                        console.log(`这个对象被设置了`);
                        tempObj = newValue;
                    },
                });
            } else {
                console.log("必须为对象");
            }
        }

        this.app1 = new Observer(this.obj);
        this.app1.bubble('name', function (newName) {
            console.log('我的姓名发生了变化，可能是姓氏变了，也可能是名字变了。')
        });
        // console.log(this.app1.data);
        this.app1.data.name.firstName = 1;

    }








    render() {
        return (
            <div>

            </div>
        );
    }
}

export default DataBind3;