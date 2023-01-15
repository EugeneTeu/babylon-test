import React, { useCallback, useRef } from "react";
import {
  FreeCamera,
  Vector3,
  HemisphericLight,
  SceneLoader,
  MeshBuilder,
  ArcRotateCamera,
  Color3,
  StandardMaterial,
} from "@babylonjs/core";
import { useState } from "react";

import "./App.css";
import BabylonEngineComponent from "./engine";

function App() {
  const [option, setOption] = useState(1);
  const babylonComponent = useRef(null);

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
    scene.clearColor = Color3.FromHexString("#f9fafb");
    scene.registerBeforeRender(function () {
      light.position = camera.position;
    });
    
    return scene;
  };

  /**
   * Will run on every frame render.  We are spinning the box on y-axis.
   */
  const onRender = (scene) => {
    return scene;
  };

  const BabylonComponent = useCallback(
    () => (
      <BabylonEngineComponent ref={babylonComponent.current} antialias={true} adaptToDeviceRatio={true} onRender={onRender} onSceneReady={onSceneReady} />
    ),
    [onRender, onSceneReady]
  );

  return (
    <div className="canvas-container">
     
      <h1>Sample Product viewer</h1>
      <h2>Just imagine the skull is the product</h2>
      <div className="panel">
        <div className="panel-text-container">
          <div className="panel-text">
            <h2>Get a feel for what it is like to own this in advance</h2>
            <h4>Click and drag image to view</h4>
            <div className="panel-option-container">
              <button onClick={() => setOption(1)}>Option 1</button>
              <button onClick={() => setOption(2)}>Option 2</button>
            </div>
          </div>
        </div>
        <div className="render-canvas">
          <BabylonComponent />
        </div>
      </div>
    </div>
  );
}

export default App;
