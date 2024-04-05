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

# Save the prediction to a file
with open('result.json', 'w') as f:
    data = [
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
  ]
    
    # data[0][-69::] = [1.0] * 69 # == 0.6
    prediction = model.predict(data)

    f.write(json.dumps({"prediction": prediction.tolist()}, indent=2))

# Save the JSON representation to a file
with open('model.json', 'w') as f:
    f.write(model_json)
