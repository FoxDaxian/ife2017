import React, { Component } from 'react';

class DataBind1 extends Component {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        this.obj = {
            name: 'youngwind',
            age: 25
        }

        function Observer(data) {
            this.convert(data);
            this.data = data;
        }
        Observer.prototype.convert = function (data) {
            for (let item in data) {
                let now_val = data[item];
                if (data.hasOwnProperty(item)) {
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

        this.app1 = new Observer(this.obj);
    }

    componentDidMount() {
        console.log(`这是生成的观察者模式对象：${this.app1}`);
    }
    

    mockVue(event) {
        //event.target.value这个值取的是当前改变之后的瞬间的input框代表的值，所以这个值才是真实的
        this.app1.data.age = event.target.value;
        this.forceUpdate();
    }

   

    render() {
        let age = this.app1.data.age;
        return (
            <div>
                <input type="text" value={age} onChange={this.mockVue.bind(this)} />
                <h1>{age}</h1>
            </div>
        );
    }
}

export default DataBind1;