import { RandomForestRegression as RFRegression } from "ml-random-forest";
import type {
  Estimator as EstimatorSource,
  RandomForestSerialized,
} from "./sourceForest";
import type {
  Estimator as EstimatorTarget,
  Node as NodeTarget,
  TreeOptions,
  TreeTarget,
} from "./targetForest";

const MAX_DEPTH = 100;

export async function loadModel(model: RandomForestSerialized) {
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
        const root = buildTree(
          est,
          model.estimator_state.feature_importances_,
          0
        );

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
        } satisfies EstimatorTarget;
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
      } satisfies TreeOptions,
      isClassifier: false,
      // @ts-ignore-next-line lib quirk
      noOOB: model.no_oob,
    },
  } as const satisfies TreeTarget;

  const regression = RFRegression.load(modelOpt);

  return regression;
}

export function runModel(model: RFRegression, dataset: number[][]) {
  const result = model.predict(dataset);

  return result;
}

function buildTree(
  originalEstimator: EstimatorSource,
  featureImportances: number[],
  nodeIndex: number
): NodeTarget {
  return {
    kind: "regression",
    gainFunction: "regression",
    splitFunction: "mean",
    maxDepth: MAX_DEPTH,
    minNumSamples: originalEstimator.n_node_samples[nodeIndex],
    gainThreshold: originalEstimator.impurity[nodeIndex],
    splitValue: originalEstimator.threshold[nodeIndex],
    splitColumn: originalEstimator.feature[nodeIndex],
    gain: featureImportances[nodeIndex],
    numberSamples: originalEstimator.n_node_samples[nodeIndex],
    left: buildTreeNode(
      originalEstimator,
      featureImportances,
      originalEstimator.left_child[nodeIndex]
    ),
    right: buildTreeNode(
      originalEstimator,
      featureImportances,
      originalEstimator.right_child[nodeIndex]
    ),
  } as const;
}

function buildTreeNode(
  originalEstimator: EstimatorSource,
  featureImportances: number[],
  nodeIndex: number
): NodeTarget | undefined {
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
    gain: featureImportances[nodeIndex],
    numberSamples: originalEstimator.n_node_samples[nodeIndex],
    distribution: originalEstimator.distribution[nodeIndex][0][0],
  } as const;
}
