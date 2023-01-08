import React from "react";
import {
  FreeCamera,
  Vector3,
  HemisphericLight,
  SceneLoader,
  MeshBuilder,
  ArcRotateCamera,
} from "@babylonjs/core";
import { useState } from "react";

import "./App.css";
import BabylonEngineComponent from "./engine";
let box;
function App() {

  const onSceneReady = async (scene) => {
    // This creates and positions a free camera (non-mesh)
    const camera = new ArcRotateCamera(
      "Camera",
      -1.5,
      1.57,
      200,
      Vector3.Zero(),
      scene
    );


    const canvas = scene.getEngine().getRenderingCanvas();

    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);

    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);

    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.7;
    // not sure why cant get this glb file to load lol
    // box = await SceneLoader.ImportMeshAsync('', "", "BoomBox.glb", scene);
    const result = await SceneLoader.ImportMeshAsync(
      "",
      "",
      "skull.babylon",
      scene
    );

    camera.target = result.meshes[0];
    scene.registerBeforeRender(function () {
      light.position = camera.position;
    });
    // if (!box) {
    //    box.position.y = 1;
    // }
    // // Our built-in 'box' shape.
    // box = MeshBuilder.CreateBox("box", { size: 2 }, scene);

    // biggerBox = MeshBuilder.CreateCapsule("capsule", { size: 10}, scene);
    // biggerBox.position.y = -1;

    // Move the box upward 1/2 its height
    // box.position.y = 1;

    // Our built-in 'ground' shape.
    // MeshBuilder.CreateGround("ground", { width: 6, height: 6 }, scene);
  };

  /**
   * Will run on every frame render.  We are spinning the box on y-axis.
   */
  const onRender = (scene) => {
    if (box !== undefined) {
      const deltaTimeInMillis = scene.getEngine().getDeltaTime();
      const rpm = 10;
      // box.rotation.y += (rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000);
    }
  };

  return (
    <div className="canvas-container">
      <h1>Sample Product viewer</h1>
      <h2>Just imagine the skull is the product</h2>
      <div className="render-canvas">
        <BabylonEngineComponent
          onRender={onRender}
          onSceneReady={onSceneReady}
        />
      </div>
    </div>
  );
}

export default App;
