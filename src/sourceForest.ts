// Custom parsed
export interface RandomForestSerialized {
  estimator_type: string;
  n: number;
  max_features: number;
  replacement: boolean;
  seed: number;
  use_sample_bagging: boolean;
  no_oob: boolean;
  max_depth: number;
  min_num_samples: number;
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
  distribution: Array<Array<number[]>>;
}
