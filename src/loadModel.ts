import { RandomForestRegression as RFRegression } from "ml-random-forest";
import type {
  Estimator as EstimatorSource,
  PickleParserExtraLite,
} from "./pickle";
import type {
  Estimator as EstimatorTarget,
  PickleTarget,
} from "./pickleTarget";

type RandomForestRegressionModel = ConstructorParameters<
  typeof RFRegression
>[1];

export async function loadModel() {
  const model = (await fetch("model.json").then((response) =>
    response.json()
  )) as PickleParserExtraLite;

  console.log({ model });

  const dataset = [
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
      8.88214335241716, 41.6006910721691, -32.033433967742724,
      1.2963623356029466, 60.737781972943345, -86.58601013274317,
      0.8291222005093069, 62.65741745444014, -73.83768370170813,
      -1.1360348382668644, 2.1953415170943473, -65.56936562480614,
      2.0979998222831977, 1.6233159105275032, -61.68485940363557,
      -5.006798702522929, 100.75896089724998, -59.82964122017556,
      7.613265730643269, 102.63479261608174, -44.1862582658153,
      -1.1360348382668644, 2.1953415170943473, -65.56936562480614,
      2.0979998222831977, 1.6233159105275032, -61.68485940363557,
      -35.890455475084224, 0.4766880054723597, -0.48098249200814536,
      -17.961260487275744, 0.1262579041521832, 18.19946134046073,
      -15.26775853203008, -0.0025766919214766926, 4.44336206902765,
      -18.96903332767378, 2.489084396142168, 13.307182278892114,
    ],
  ];

  const indexes = Array(model.estimator_state.estimators_.length);
  for (let i = 0; i < indexes.length; i++) {
    indexes[i] = [i];
  }

  const modelOpt = {
    name: "RFRegression",
    // @ts-ignore-next-line lib typo
    selectionMethod: "mean",
    selectionMethos: "mean",
    baseModel: {
      indexes,
      // n: model.n,
      estimators: model.estimator_state.estimators_.map((est) => {
        const root = buildTree(est, 0);

        return {
          name: "DTRegression",
          root,
          options: {
            kind: "regression",
            gainFunction: "regression",
            splitFunction: "mean",
            maxDepth: 100,
            minNumSamples: 2,
          },
        } satisfies EstimatorTarget;
      }),
      // maxFeatures: model.max_features,
      // replacement: model.replacement, // ??
      nEstimators: model.estimator_state.estimators_.length,
      // seed: model.random_state,
      // useSampleBagging: model.bootstrap,
      treeOptions: {
        // minNumSamples: model.min_samples_split,
        // maxDepth: model.max_depth,
        gainFunction: "regression",
        splitFunction: "mean",
      },
      isClassifier: false,
      // noOOB: !model.oob_score,
    },
  } satisfies PickleTarget;

  const regression = RFRegression.load(modelOpt);
  const result = regression.predict(dataset);

  return result;
}

function buildTree(originalEstimator: EstimatorSource, nodeIndex: number) {
  return {
    kind: "regression",
    gainFunction: "regression",
    splitFunction: "mean",
    minNumSamples: originalEstimator.n_node_samples[nodeIndex],
    maxDepth: null,
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
  } as const;
}

type Node = unknown;
function buildTreeNode(
  originalEstimator: EstimatorSource,
  nodeIndex: number
): Node | undefined {
  if (nodeIndex === -1) {
    return undefined;
  }

  return {
    kind: "GainFunction",
    gainFunction: "GainFunction",
    splitFunction: "SelectionMethod",
    minNumSamples: originalEstimator.n_node_samples[nodeIndex],
    maxDepth: null,
    gainThreshold: originalEstimator.impurity[nodeIndex],
    splitValue: originalEstimator.threshold[nodeIndex],
    splitColumn: originalEstimator.feature[nodeIndex],
    gain: originalEstimator.impurity[nodeIndex],
    numberSamples: originalEstimator.n_node_samples[nodeIndex],
    distribution: originalEstimator.weighted_n_node_samples[nodeIndex],
  } as const;
}
