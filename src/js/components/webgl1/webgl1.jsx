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
        camera.position.set(1, 1, 3);
        camera.lookAt(new THREE.Vector3(0, 0, 0));




        //制作立方体
        var cube1 = new THREE.Mesh(new THREE.CubeGeometry(30, 20, 24),
            new THREE.MeshLambertMaterial({
                color: "#D2D2D2",
            })
        );


        //圆环面（像轮胎那样
        var TorusGeometry1 = new THREE.Mesh(new THREE.TorusGeometry(3, 2, 16, 10),
            new THREE.MeshLambertMaterial({
                color: "green",
            })
        );
        TorusGeometry1.position.set(-15, -10, 12);

        var TorusGeometry2 = new THREE.Mesh(new THREE.TorusGeometry(3, 2, 16, 10),
            new THREE.MeshLambertMaterial({
                color: "green",
            })
        );
        TorusGeometry2.position.set(-15, -10, -12);

        var TorusGeometry3 = new THREE.Mesh(new THREE.TorusGeometry(3, 2, 16, 10),
            new THREE.MeshLambertMaterial({
                color: "green",
            })
        );
        TorusGeometry3.position.set(15, -10, 12);

        var TorusGeometry4 = new THREE.Mesh(new THREE.TorusGeometry(3, 2, 16, 10),
            new THREE.MeshLambertMaterial({
                color: "green",
            })
        );
        TorusGeometry4.position.set(15, -10, -12);


        var light = new THREE.DirectionalLight()
        light.position.set(-2, 2, 5)
        scene.add(light)


        scene.add(cube1);
        scene.add(TorusGeometry1);
        scene.add(TorusGeometry2);
        scene.add(TorusGeometry3);
        scene.add(TorusGeometry4);

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