# RFR - Random Forest Regression from Pickle

## Solution description

1. Create an in-memory object from the pickle in Python
2. Serialize the object to JSON in format of `ml-random-forest`
3. Spawn RFR in Browser and display the prediction via React (`npm run dev`)

## Comment

- Intermediate `model.json` may contain extra fields used for debugging purposes. File structure may be optimized.
- Current JS representation of the RF may be downloaded from the main page.
- Original solution is written in TypeScript for eased structure mapping, nevertheless, JS version is also provided.

## Main contents

- `src/rfrRunner.ts` - Main file to run the Random Forest Regression
- `src/rfrRunner.js` - JS version of the main file (as asked in the assignment)
- `src/App.jsx` - Entry point of the Web Application.
- `transformers/` - Folder contains the `.pkl` and the converter from the pickle format to `.json` and the generated `model.json`. Also contains the GT pickle runner, also with generated output.

## Underline React + Vite Template

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.
