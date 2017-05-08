import React, { Component } from 'react';
const THREE = require("../../../static/three.js");
class Webgl2 extends Component {
    componentDidMount() {



        var renderer = new THREE.WebGLRenderer({
            canvas: document.getElementById('canvas')
        });

        renderer.setClearColor(0x666666);

        var scene = new THREE.Scene();

        var camera = new THREE.OrthographicCamera(-5, 5, 3.75, -3.75, 0.1, 100);
        camera.position.set(25, 25, 25);
        camera.lookAt(new THREE.Vector3(0, 0, 0));
        scene.add(camera);

        var material = new THREE.MeshNormalMaterial();

        var cube = new THREE.Mesh(new THREE.CubeGeometry(5, 5, 5), material);
        scene.add(cube);

        var light = new THREE.PointLight(0xffffff, 1, 200);
        light.position.set(10, 5, 3);
        scene.add(light);



        renderer.render(scene, camera);





























    }

    render() {
        const style = {
            width: "500px",
            height: "500px"
        };
        return (
            <div>
                <canvas id="canvas" style={style}></canvas>
            </div>
        );
    }
}

export default Webgl2;