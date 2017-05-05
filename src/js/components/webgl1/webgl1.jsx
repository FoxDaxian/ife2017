import React, { Component } from 'react';
import css from "./webgl1.scss";
const THREE = require("../../../static/three.js");
class Webgl1 extends Component {
    componentDidMount() {
        var renderer = new THREE.WebGLRenderer({
            canvas: document.getElementById('mainCanvas')
        });
        renderer.setClearColor("#666666");

        //开启一个场景，必备的
        var scene = new THREE.Scene();

        //开启一个照相机（有正交的还有透视的
        var camera = new THREE.OrthographicCamera(-50, 50, 50, -50, -20, 100);
        camera.position.set(2, 2, 5);
        camera.lookAt(new THREE.Vector3(0, 0, 0));
        scene.add(camera);

        //制作立方体
        var cube1 = new THREE.Mesh(new THREE.CubeGeometry(30, 20, 24),
            new THREE.MeshBasicMaterial({
                color: "#D2D2D2",
                wireframe: true
            })
        );


        //圆环面（像轮胎那样
        var cube6 = new THREE.Mesh(new THREE.TorusGeometry(3, 2, 24, 20),
            new THREE.MeshBasicMaterial({
                color: 0xff0000,
                wireframe: true
            })
        );


        scene.add(cube1);
        scene.add(cube6);

        //初始化renderer开始渲染
        renderer.render(scene, camera);
    }

    render() {
        return (
            <div className={css.wrap}>
                <canvas id="mainCanvas" width="1000px" height="800px" ></canvas>
            </div>
        );
    }
}

export default Webgl1;