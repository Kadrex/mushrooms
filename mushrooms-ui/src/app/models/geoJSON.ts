import { GeoJSONProperties } from './geoJSONProperties';
import { GeoJSONGeometry } from './geoJSONGeometry';

export interface GeoJSON {
  type: string;
  properties: GeoJSONProperties;
  geometry: GeoJSONGeometry
}
