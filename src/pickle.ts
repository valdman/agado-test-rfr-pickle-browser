// Custom parsed
export interface PickleParserExtraLite {
  estimator_type: string;
  estimator_parameters: EstimatorParameters;
  estimator_state: EstimatorState;
}

export interface EstimatorParameters {
  n_estimators: number;
  max_depth: number;
  min_samples_split: number;
  random_state: number;
}

export interface EstimatorState {
  feature_importances_: number[];
  estimators_: Estimator[];
}

export interface Estimator {
  left_child: number[];
  right_child: number[];
  feature: number[];
  threshold: number[];
  impurity: number[];
  n_node_samples: number[];
  weighted_n_node_samples: number[];
}

// JS lib parsed

export interface PickleParsedLite {
  base_estimator: BaseEstimator;
  n_estimators: number;
  estimator_params: string[];
  bootstrap: boolean;
  oob_score: boolean;
  n_jobs: null;
  random_state: number;
  verbose: number;
  warm_start: boolean;
  class_weight: null;
  max_samples: null;
  criterion: Criterion;
  max_depth: number;
  min_samples_split: number;
  min_samples_leaf: number;
  min_weight_fraction_leaf: number;
  max_features: number;
  max_leaf_nodes: null;
  min_impurity_decrease: number;
  ccp_alpha: number;
  n_features_in_: number;
  n_outputs_: number;
  base_estimator_: BaseEstimator;
  estimators_: BaseEstimator[];
  _sklearn_version: SklearnVersion;
}

export enum SklearnVersion {
  The113 = "1.1.3",
}

export interface BaseEstimator {
  criterion: Criterion;
  splitter: Splitter;
  max_depth: number | null;
  min_samples_split: number;
  min_samples_leaf: number;
  min_weight_fraction_leaf: number;
  max_features: number | null;
  max_leaf_nodes: null;
  random_state: number | null;
  min_impurity_decrease: number;
  class_weight: null;
  ccp_alpha: number;
  _sklearn_version: SklearnVersion;
  n_features_in_?: number;
  n_outputs_?: number;
  max_features_?: number;
  tree_?: Tree;
}

export enum Criterion {
  SquaredError = "squared_error",
}

export enum Splitter {
  Best = "best",
}

export interface Tree {
  max_depth: number;
  node_count: number;
  nodes: {
    [key: string]:
      | number[]
      | boolean
      | number
      | {
          [key: string]: NodeElement[] | NodeClass | PurpleNode | number | null;
        };
  };
  values: {
    [key: string]:
      | number[]
      | boolean
      | number
      | {
          [key: string]: NodeElement[] | NodeClass | PurpleNode | number | null;
        };
  };
}

export interface NodeClass {
  left_child: Array<
    | number
    | { [key: string]: NodeElement[] | NodeClass | PurpleNode | number | null }
  >;
  right_child: Array<
    | number
    | { [key: string]: NodeElement[] | NodeClass | PurpleNode | number | null }
  >;
  feature: Array<
    | number
    | { [key: string]: NodeElement[] | NodeClass | PurpleNode | number | null }
  >;
  threshold: Array<
    | number
    | { [key: string]: NodeElement[] | NodeClass | PurpleNode | number | null }
  >;
  impurity: Array<
    | number
    | { [key: string]: NodeElement[] | NodeClass | PurpleNode | number | null }
  >;
  n_node_samples: Array<
    | number
    | { [key: string]: NodeElement[] | NodeClass | PurpleNode | number | null }
  >;
  weighted_n_node_samples: Array<
    | number
    | { [key: string]: NodeElement[] | NodeClass | PurpleNode | number | null }
  >;
}

export enum NodeElement {
  Feature = "feature",
  Impurity = "impurity",
  LeftChild = "left_child",
  NNodeSamples = "n_node_samples",
  RightChild = "right_child",
  Threshold = "threshold",
  WeightedNNodeSamples = "weighted_n_node_samples",
}

export enum PurpleNode {
  Empty = "|",
  Node = "<",
}
