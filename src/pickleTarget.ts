export interface PickleTarget {
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
  root: Root;
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

export interface AmbitiousRight {
  kind: GainFunction;
  gainFunction: GainFunction;
  splitFunction: SelectionMethod;
  minNumSamples: number;
  maxDepth: null;
  gainThreshold: number;
  distribution?: number;
  splitValue?: number;
  splitColumn?: number;
  gain?: number | null;
  numberSamples?: number;
  left?: Root;
  right?: IndecentLeft;
}

export interface CunningLeft {
  kind: GainFunction;
  gainFunction: GainFunction;
  splitFunction: SelectionMethod;
  minNumSamples: number;
  maxDepth: null;
  gainThreshold: number;
  splitValue?: number;
  splitColumn?: number;
  gain?: number | null;
  numberSamples?: number;
  distribution?: number;
  left?: StickyRight;
  right?: IndecentLeft;
}

export interface HilariousRight {
  kind: GainFunction;
  gainFunction: GainFunction;
  splitFunction: SelectionMethod;
  minNumSamples: number;
  maxDepth: null;
  gainThreshold: number;
  splitValue?: number;
  splitColumn?: number;
  gain?: number | null;
  numberSamples?: number;
  left?: CunningLeft;
  right?: AmbitiousRight;
  distribution?: number;
}

export interface IndecentRight {
  kind: GainFunction;
  gainFunction: GainFunction;
  splitFunction: SelectionMethod;
  minNumSamples: number;
  maxDepth: null;
  gainThreshold: number;
  splitValue?: number;
  splitColumn?: number;
  gain?: number | null;
  numberSamples?: number;
  left?: Root;
  right?: StickyRight;
  distribution?: number;
}

export interface AmbitiousLeft {
  kind: GainFunction;
  gainFunction: GainFunction;
  splitFunction: SelectionMethod;
  minNumSamples: number;
  maxDepth: null;
  gainThreshold: number;
  distribution?: number;
  splitValue?: number;
  splitColumn?: number;
  gain?: number | null;
  numberSamples?: number;
  left?: FluffyLeft;
  right?: Root;
}

export interface HilariousLeft {
  kind: GainFunction;
  gainFunction: GainFunction;
  splitFunction: SelectionMethod;
  minNumSamples: number;
  maxDepth: null;
  gainThreshold: number;
  distribution?: number;
  splitValue?: number;
  splitColumn?: number;
  gain?: number | null;
  numberSamples?: number;
  left?: AmbitiousLeft;
  right?: IndecentRight;
}

export interface RootRight {
  kind: GainFunction;
  gainFunction: GainFunction;
  splitFunction: SelectionMethod;
  minNumSamples: number;
  maxDepth: null;
  gainThreshold: number;
  splitValue?: number;
  splitColumn?: number;
  gain?: number | null;
  numberSamples?: number;
  left?: HilariousLeft;
  right?: HilariousRight;
  distribution?: number;
}

export interface IndigoRight {
  kind: GainFunction;
  gainFunction: GainFunction;
  splitFunction: SelectionMethod;
  minNumSamples: number;
  maxDepth: null;
  gainThreshold: number;
  distribution?: number;
  splitValue?: number;
  splitColumn?: number;
  gain?: number | null;
  numberSamples?: number;
  left?: StickyRight;
  right?: Root;
}

export interface StickyRight {
  kind: GainFunction;
  gainFunction: GainFunction;
  splitFunction: SelectionMethod;
  minNumSamples: number;
  maxDepth: null;
  gainThreshold: number;
  splitValue?: number;
  splitColumn?: number;
  gain?: number | null;
  numberSamples?: number;
  left?: Root;
  right?: Root;
  distribution?: number;
}

export interface IndecentLeft {
  kind: GainFunction;
  gainFunction: GainFunction;
  splitFunction: SelectionMethod;
  minNumSamples: number;
  maxDepth: null;
  gainThreshold: number;
  splitValue?: number;
  splitColumn?: number;
  gain?: number | number | null;
  numberSamples?: number;
  distribution?: number;
  left?: Root;
  right?: TentacledLeft;
}

export interface IndigoLeft {
  kind: GainFunction;
  gainFunction: GainFunction;
  splitFunction: SelectionMethod;
  minNumSamples: number;
  maxDepth: null;
  gainThreshold: number;
  splitValue?: number;
  splitColumn?: number;
  gain?: number | null;
  numberSamples?: number;
  left?: IndecentLeft;
  right?: StickyRight;
  distribution?: number;
}

export interface TentacledRight {
  kind: GainFunction;
  gainFunction: GainFunction;
  splitFunction: SelectionMethod;
  minNumSamples: number;
  maxDepth: null;
  gainThreshold: number;
  splitValue?: number;
  splitColumn?: number;
  gain?: number | null;
  numberSamples?: number;
  left?: IndigoLeft;
  right?: IndigoRight;
  distribution?: number;
}

export interface RootLeft {
  kind: GainFunction;
  gainFunction: GainFunction;
  splitFunction: SelectionMethod;
  minNumSamples: number;
  maxDepth: null;
  gainThreshold: number;
  splitValue?: number;
  splitColumn?: number;
  gain?: number | null;
  numberSamples?: number;
  left?: PurpleLeft;
  right?: TentacledRight;
  distribution?: number;
}

export interface Root {
  kind: GainFunction;
  gainFunction: GainFunction;
  splitFunction: SelectionMethod;
  minNumSamples: number;
  maxDepth: null;
  gainThreshold: number;
  splitValue?: number;
  splitColumn?: number;
  gain?: number | null;
  numberSamples?: number;
  left?: RootLeft;
  right?: RootRight;
  distribution?: number;
}

export interface FluffyLeft {
  kind: GainFunction;
  gainFunction: GainFunction;
  splitFunction: SelectionMethod;
  minNumSamples: number;
  maxDepth: null;
  gainThreshold: number;
  distribution?: number;
  gain?: number | null;
  splitValue?: number;
  splitColumn?: number;
  numberSamples?: number;
  left?: TentacledLeft;
  right?: TentacledLeft;
}

export interface TentacledLeft {
  kind: GainFunction;
  gainFunction: GainFunction;
  splitFunction: SelectionMethod;
  minNumSamples: number;
  maxDepth: null;
  gainThreshold: number;
  distribution: number;
  gain?: null;
}

export interface PurpleLeft {
  kind: GainFunction;
  gainFunction: GainFunction;
  splitFunction: SelectionMethod;
  minNumSamples: number;
  maxDepth: null;
  gainThreshold: number;
  distribution?: number;
  splitValue?: number;
  splitColumn?: number;
  gain?: number | null;
  numberSamples?: number;
  left?: FluffyLeft;
  right?: PurpleRight;
}

export interface PurpleRight {
  kind: GainFunction;
  gainFunction: GainFunction;
  splitFunction: SelectionMethod;
  minNumSamples: number;
  maxDepth: null;
  gainThreshold: number;
  splitValue?: number;
  splitColumn?: number;
  gain?: number | null;
  numberSamples?: number;
  left?: StickyLeft;
  right?: FluffyRight;
  distribution?: number;
}

export interface StickyLeft {
  kind: GainFunction;
  gainFunction: GainFunction;
  splitFunction: SelectionMethod;
  minNumSamples: number;
  maxDepth: null;
  gainThreshold: number;
  distribution?: number;
  splitValue?: number;
  splitColumn?: number;
  gain?: number | null;
  numberSamples?: number;
  left?: FluffyRight;
  right?: TentacledLeft;
}

export interface FluffyRight {
  kind: GainFunction;
  gainFunction: GainFunction;
  splitFunction: SelectionMethod;
  minNumSamples: number;
  maxDepth: null;
  gainThreshold: number;
  splitValue?: number;
  splitColumn?: number;
  gain?: number;
  numberSamples?: number;
  distribution: number;
}

export interface TreeOptions {}
