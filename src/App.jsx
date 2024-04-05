import { useEffect, useState } from "react";
import { saveRandomForestModel } from "./saveRandomForestModel";
import { loadModel } from "./loadModel";

import "./App.css";

function App() {
  const [result, setResult] = useState(null);

  function handleSaveSomeModel() {
    const json = saveRandomForestModel();
    exportToJson(json);
  }

  useEffect(() => {
    loadModel().then(setResult);
  }, []);

  const modelView = result ? (
    <pre>{JSON.stringify(result, null, 2)}</pre>
  ) : null;

  if (!result) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>Prediction is: {JSON.stringify(result)}</div>
      <button
        onClick={handleSaveSomeModel}
        style={{ marginTop: 12, position: "fixed", top: 24, right: 24 }}
      >
        Save example model (not task testcase)
      </button>
    </div>
  );
}

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
