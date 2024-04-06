export interface TreeTarget {
  baseModel: BaseModel;
  selectionMethod: SelectionMethod;
  name: string;
}

export interface BaseModel {
  indexes: Array<number[]>;
  n: number;
  replacement: boolean;
  maxFeatures: number;
  nEstimators: number;
  treeOptions: TreeOptions;
  isClassifier: boolean;
  seed: number;
  estimators: Estimator[];
  useSampleBagging: boolean;
}

export interface Estimator {
  options: Options;
  root: Node;
  name: Name;
}

export type Name = "DTRegression";

export interface Options {
  gainFunction: GainFunction;
  splitFunction: SelectionMethod;
  minNumSamples: number;
  maxDepth: number;
  kind: GainFunction;
}

export type GainFunction = "regression";

export type SelectionMethod = "mean";

export interface Node {
  kind: GainFunction;
  gainFunction: GainFunction;
  splitFunction: SelectionMethod;
  minNumSamples: number;
  maxDepth: number;
  gainThreshold: number;
  splitValue?: number;
  splitColumn?: number;
  gain?: number | null;
  numberSamples?: number;
  left?: Node;
  right?: Node;
  distribution?: number;
}

export interface TreeOptions {}
