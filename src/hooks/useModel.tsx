import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  ClassifierInputSource,
  CustomMobileNet,
  load,
} from "@teachablemachine/image";

// Model
import { ModelDescriptor } from "../Model";

export interface Prediction {
  className: string;
  probability: number;
}

export function useModel(descriptor: ModelDescriptor) {
  const [model, setModel] = useState<CustomMobileNet>();
  const loaded = useMemo(() => !!model, [model]);

  const predictAll = useCallback(
    async (image: ClassifierInputSource) => {
      if (!model) {
        throw new Error("Model not loaded");
      }
      return (await model.predict(image)) as Prediction[];
    },
    [model]
  );

  const predictClass = useCallback(
    async (image: ClassifierInputSource, threshold: number) => {
      if (!model) {
        throw new Error("Model not loaded");
      }
      const predictions = await predictAll(image);
      return predictions.find((p) => p.probability >= threshold);
    },
    [model, predictAll]
  );

  async function loadModel() {
    await load(descriptor.modelJson, descriptor.metadataJson)
      .then((m) => setModel(m))
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    loadModel();
  }, [descriptor.metadataJson, descriptor.modelJson]);

  return { isModelLoaded: loaded, predictAll, predictClass };
}
