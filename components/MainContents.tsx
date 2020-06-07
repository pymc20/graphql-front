import React from "react"
import _ from 'lodash'
import * as THREE from 'three';

type state = {
    schemaDisplay: string,
    typeDisplay: string
};

export default class MainContents extends React.Component<{},state> {
    constructor(props) {
        super(props);
        this.state = {
            schemaDisplay: 'none',
            typeDisplay: 'none'
        }
    }

    componentDidMount() {
        this.threeRender();
    }
    threeRender = () => {
        const container = document.getElementById("content-canvas-container");
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize( container.offsetWidth, container.offsetHeight );
        document.getElementById("content-canvas").appendChild(renderer.domElement);
        
        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        const cube = new THREE.Mesh( geometry, material );
        scene.add( cube );
        
        camera.position.z = 5;
        const animate = function () {
            requestAnimationFrame( animate );
        
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
        
            renderer.render( scene, camera );
        };
        animate();
    }
    render() {
        return (
            <div id="content-canvas"/>
        )
    }
}