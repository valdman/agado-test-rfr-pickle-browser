import { RandomForestRegression as RFRegression } from "ml-random-forest";

const MAX_DEPTH = 100;

/**
 * @param {RandomForestSerialiazed} model - The JSON model to load
 * @returns The RFR model object
 */
export async function loadModel(model) {
  const indexes = Array(model.estimator_state.estimators_.length);
  for (let i = 0; i < indexes.length; i++) {
    indexes[i] = [i];
  }

  const modelOpt = {
    name: "RFRegression",
    selectionMethod: "mean",
    selectionMethos: "mean",
    baseModel: {
      indexes,
      n: model.n,
      estimators: model.estimator_state.estimators_.map((est) => {
        const root = buildTree(est, 0);

        return {
          name: "DTRegression",
          root,
          options: {
            kind: "regression",
            gainFunction: "regression",
            splitFunction: "mean",
            maxDepth: model.max_depth,
            minNumSamples: model.min_num_samples,
          },
        };
      }),
      maxFeatures: model.max_features,
      replacement: model.replacement,
      nEstimators: model.estimator_state.estimators_.length,
      seed: model.seed,
      useSampleBagging: true,
      treeOptions: {
        gainFunction: "regression",
        splitFunction: "mean",
        minNumSamples: model.min_num_samples,
        maxDepth: model.max_depth,
      },
      isClassifier: false,
      // @ts-ignore-next-line lib quirk
      noOOB: model.no_oob,
    },
  };

  const regression = RFRegression.load(modelOpt);

  return regression;
}

export function runModel(model, dataset) {
  const result = model.predict(dataset);

  return result;
}

function buildTree(originalEstimator, nodeIndex) {
  return {
    kind: "regression",
    gainFunction: "regression",
    splitFunction: "mean",
    minNumSamples: originalEstimator.n_node_samples[nodeIndex],
    maxDepth: MAX_DEPTH,
    gainThreshold: originalEstimator.impurity[nodeIndex],
    splitValue: originalEstimator.threshold[nodeIndex],
    splitColumn: originalEstimator.feature[nodeIndex],
    gain: originalEstimator.impurity[nodeIndex],
    numberSamples: originalEstimator.n_node_samples[nodeIndex],
    left: buildTreeNode(
      originalEstimator,
      originalEstimator.left_child[nodeIndex]
    ),
    right: buildTreeNode(
      originalEstimator,
      originalEstimator.right_child[nodeIndex]
    ),
  };
}

function buildTreeNode(originalEstimator, nodeIndex) {
  if (nodeIndex === -1) {
    return undefined;
  }

  return {
    kind: "regression",
    gainFunction: "regression",
    splitFunction: "mean",
    minNumSamples: originalEstimator.n_node_samples[nodeIndex],
    maxDepth: MAX_DEPTH,
    gainThreshold: originalEstimator.impurity[nodeIndex],
    splitValue: originalEstimator.threshold[nodeIndex],
    splitColumn: originalEstimator.feature[nodeIndex],
    gain: originalEstimator.impurity[nodeIndex],
    numberSamples: originalEstimator.n_node_samples[nodeIndex],
    distribution: originalEstimator.weighted_n_node_samples[nodeIndex],
  };
}
