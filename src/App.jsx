import { useEffect, useState } from "react";
import { loadModel, runModel } from "./loadModel";

import "./App.css";

function App() {
  const [result, setResult] = useState(null);
  const [model, setModel] = useState(null);

  function handleSaveSomeModel() {
    const obj = model.toJSON();
    exportToJson(obj);
  }

  async function loadAndRunRandomForest() {
    const model = await loadModel(TEST_DATASET);
    setModel(model);

    console.log("Model loaded", {model});

    const result = runModel(model, TEST_DATASET);
    setResult(result);
  }

  useEffect(() => {
    loadAndRunRandomForest();
  }, []);

  if (!result) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>Prediction is: {JSON.stringify(result)}</div>
      <div style={{ marginTop: 12, position: "fixed", top: 48, right: 24 }}>
        <button onClick={handleSaveSomeModel}>
          Save model (JS version of the RFR)
        </button>
        <details style={{ width: 400, marginTop: 12 }}>
          <summary>Test dataset</summary>
          <span style={{fontSize: 10}}>{JSON.stringify(TEST_DATASET, null, 2)}</span>
        </details>
      </div>
    </div>
  );
}

const TEST_DATASET = [
  [
    -0.24049124600404337, -39.99927704297411, -28.203897174230224,
    2.459881887698783, 25.849373356209398, -2.8126023818381327,
    -1.8414758265454658, 25.712808684371353, -0.9573841983781293,
    -9.899077764091523, 16.367147085191583, -36.0003943304004,
    10.723619178962625, 15.887882387797745, -31.076049769364598,
    -0.8199606292329413, 17.317946404214826, -113.55309518466673,
    -0.27942792392854265, 16.874755393721642, -95.91248969206308,
    2.116322964835888, 43.419835568728516, 26.96708505192356,
    1.1085501244378495, 45.78266206071851, 22.074805990354946,
    -7.4391958763927395, 42.21652044140098, -38.81299671223853,
    8.88214335241716, 41.6006910721691, -32.033433967742724, 1.2963623356029466,
    60.737781972943345, -86.58601013274317, 0.8291222005093069,
    62.65741745444014, -73.83768370170813, -1.1360348382668644,
    2.1953415170943473, -65.56936562480614, 2.0979998222831977,
    1.6233159105275032, -61.68485940363557, -5.006798702522929,
    100.75896089724998, -59.82964122017556, 7.613265730643269,
    102.63479261608174, -44.1862582658153, -1.1360348382668644,
    2.1953415170943473, -65.56936562480614, 2.0979998222831977,
    1.6233159105275032, -61.68485940363557, -35.890455475084224,
    0.4766880054723597, -0.48098249200814536, -17.961260487275744,
    0.1262579041521832, 18.19946134046073, -15.26775853203008,
    -0.0025766919214766926, 4.44336206902765, -18.96903332767378,
    2.489084396142168, 13.307182278892114,
  ],
];

function exportToJson(objectData) {
  let filename = "export.json";
  let contentType = "application/json;charset=utf-8;";
  if (window.navigator && window.navigator.msSaveOrOpenBlob) {
    var blob = new Blob(
      [decodeURIComponent(encodeURI(JSON.stringify(objectData)))],
      { type: contentType }
    );
    navigator.msSaveOrOpenBlob(blob, filename);
  } else {
    var a = document.createElement("a");
    a.download = filename;
    a.href =
      "data:" +
      contentType +
      "," +
      encodeURIComponent(JSON.stringify(objectData));
    a.target = "_blank";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}

export default App;
