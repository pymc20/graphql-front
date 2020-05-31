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
        const container = document.getElementById("content-container");
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
            <div className="container">
                <div id="content-canvas">
                </div>
                <style jsx>{`
                    .container {
                    min-height: 85vh;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: stretch;
                    }

                    .main {
                    width: 100%;
                    flex: 1;
                    display: flex;
                    justify-content: center;
                    align-items: stretch;
                    }

                    .side {
                        flex: 1;
                    }

                    .content {
                        flex: 5;
                    }

                    footer {
                    background: #fbfbfb;
                    width: 100%;
                    height: 100px;
                    border-top: 1px solid #eaeaea;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    }
                    
                    .main-menu-schema {
                        cursor: pointer;
                        user-select: none;
                }

                .main-menu-schema:hover {
                        cursor: pointer;
                        background: #ececec;
                    }

                .main-menu-type {
                        cursor: pointer;
                        user-select: none;
                }

                .main-menu-type:hover {
                        cursor: pointer;
                        background: #ececec;
                    }

                .sub-menu {
                        cursor: pointer;
                        margin: 10px 10px 10px 10px;
                }

                .sub-menu:hover {
                        cursor: pointer;
                        margin: 10px 10px 10px 10px;
                        background: #ececec;
                    }
                .sub-menu-mutation {

                }

                    body {
                        background: #b5a3ff;
                    }

                `}</style>
            </div>
        )
    }
}