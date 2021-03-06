import React, { useState, useEffect } from "react"
import _ from 'lodash'
import * as THREE from 'three';

function MainContents() {

    const [schemaDisplay,setSchemaDisplay] = useState('')
    const [typeDisplay,setTypeDisplay] = useState('')

    const threeRender = () => {
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

    useEffect(() => {
        threeRender();
    })

    return (
        <div id="content-canvas"/>
    )
}

export default MainContents