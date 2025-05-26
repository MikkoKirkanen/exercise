export type HedgehogFeature = {
  type: 'Feature';
  geometry: {
    type: 'Point';
    coordinates: [number, number];
  };
  properties: {
    name: string;
    age: number;
    gender: 'male' | 'female' | 'unknown';
  };
};
