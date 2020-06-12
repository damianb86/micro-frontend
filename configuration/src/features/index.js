import { useState, useEffect } from 'react';
import get from 'lodash/get';

import { requestFeatures } from '@clockwork/api';

let features = null;

export const loadFeatures = () =>
  requestFeatures().then(({ data }) => features = data);

export const getFeature = (featurePath, defaultValue = undefined) =>
  get(features, featurePath, defaultValue);

export const useFeature = (featurePath, defaultValue = undefined) => {
  const [feature, setFeature] = useState(defaultValue);

  useEffect(() => {
    if (features === null) {
      loadFeatures().then(() => setFeature(getFeature(featurePath, defaultValue)));
    } else {
      setFeature(getFeature(featurePath, defaultValue))
    }
  }, []);

  return feature;
}

export const useFeatures = () => {
  const [loaded, setFeaturesLoaded] = useState(!!features);

  useEffect(() => {
    if (features === null) {
      loadFeatures().then(() => setFeaturesLoaded(true));
    } else {
      setFeaturesLoaded(true)
    }
  }, []);

  return loaded;
}
