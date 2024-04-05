import pickle
import json
import numpy as np
from sklearn.ensemble import RandomForestRegressor

with open('model.pkl', 'rb') as f:
    model = pickle.load(f)

def convert_to_json(obj):
    if isinstance(obj, RandomForestRegressor):
        return {
            "estimator_type": "RandomForestRegressor",
            "estimator_parameters": {
                "n_estimators": obj.n_estimators,
                "max_depth": obj.max_depth,
                "min_samples_split": obj.min_samples_split,
                "random_state": obj.random_state
            },
            "estimator_state": {
                "feature_importances_": obj.feature_importances_.tolist(),
                "estimators_": [convert_to_json(tree) for tree in obj.estimators_]
            }
        }
    elif hasattr(obj, "tree_"):
        nodes = obj.tree_.nodes if hasattr(obj.tree_, "nodes") else []

        if(not hasattr(obj.tree_, "nodes")):
            return {
                    "left_child": obj.tree_.children_left,
                    "right_child": obj.tree_.children_right,
                    "feature": obj.tree_.feature,
                    "threshold": obj.tree_.threshold,
                    "impurity": obj.tree_.impurity,
                    "n_node_samples": obj.tree_.n_node_samples,
                    "weighted_n_node_samples": obj.tree_.weighted_n_node_samples
            }

        return {
            "tree_": {
                "max_depth": obj.tree_.max_depth,
                "node_count": obj.tree_.node_count,
                "nodes": [
                    {
                        "left_child": node.children_left,
                        "right_child": node.children_right,
                        "feature": node.feature,
                        "threshold": node.threshold,
                        "impurity": node.impurity,
                        "n_node_samples": node.n_node_samples,
                        "weighted_n_node_samples": node.weighted_n_node_samples
                    }
                    for node in nodes
                ]
            }
        }
    else:
        raise TypeError(f"Cannot convert object of type {type(obj)} to JSON")

class NumpyEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, np.ndarray):
            return obj.tolist()
        return json.JSONEncoder.default(self, obj)

model_json = json.dumps(convert_to_json(model), indent=2, cls=NumpyEncoder)

# Save the JSON representation to a file
with open('model.json', 'w') as f:
    f.write(model_json)
