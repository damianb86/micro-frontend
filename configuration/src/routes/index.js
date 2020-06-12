import get from 'lodash/get';
import isObject from 'lodash/isObject';

import ROUTES from './constants';
import { getFeature } from "../features";

export const linkTo = (routePath, version = 'default', featurePath = null) => {
  const route = get(ROUTES, routePath);

  if (isObject(route)) {
    const feature = getFeature(featurePath || `${routePath}.${version}`);
    if (feature){
      return get(route, version, route.default);
    }

    return route.default;
  }

  return route;
};

export default linkTo;
