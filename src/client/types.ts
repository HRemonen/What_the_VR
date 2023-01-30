export interface Feature {
  type: string
  geometry: {
    type: string
    coordinates: [number, number]
  }
  properties: {
    trainNumber: number
    departureDate: string
    timestamp: string
    speed: number
    accuracy: number
  }
}

export interface FeatureCollection {
  type: string
  features: Feature[]
}
