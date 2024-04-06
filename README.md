# RFR - Random Forest Regression from Pickle

## Solution description

1. Create an in-memory object from the pickle in Python
2. Serialize the object to JSON in format of `ml-random-forest`
3. Spawn RFR in Browser and display the prediction via React (`npm run dev`)

## Possible alternative solutions
- Run WASM-based Python with Scikit 1.1.3 and create JS-interop.
- Re-sample and re-train a new model in existing JS RFR implementations. Store and import re-trained model as JSON.

## Comment

- Intermediate `model.json` may contain extra fields used for debugging purposes. File structure may be optimized.
- Current JS representation of the RF may be downloaded from the main page.
- Original solution is written in TypeScript for eased structure mapping, nevertheless, JS version is also provided.
- The increased precision of the JS implementation may be achieved by the original Python code re-engineering in JS. (pkg. `scikit-learn`: `class DecisionTreeClassifier`, `class ExtraTreeRegressor`)

## Main contents

- `src/rfrRunner.ts` - Main file to run the Random Forest Regression
- `src/rfrRunner.js` - JS version of the main file (as asked in the assignment)
- `src/App.jsx` - Entry point of the Web Application.
- `transformers/` - Folder contains the `.pkl` and the converter from the pickle format to `.json` and the generated `model.json`. Also contains the GT pickle runner, also with generated output.

## Underlies React + Vite Template

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.
