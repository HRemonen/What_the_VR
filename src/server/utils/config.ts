import dotenv from 'dotenv'

dotenv.config()

export const PORT = process.env.PORT || 8000

export const LOCATION_API =
  'https://rata.digitraffic.fi/api/v1/train-locations.geojson/latest/'
