import { useState, useEffect } from 'react'
import axios from 'axios'
import { FeatureCollection } from '../types'

function useTrainLocations(): FeatureCollection {
  const [trainLocations, setTrainLocations] = useState<FeatureCollection>(null)

  useEffect(() => {
    const interval = setInterval(async () => {
      await axios
        .get('/api/locations')
        .then((locationData) => setTrainLocations(locationData.data))
    }, 1000)

    return () => clearInterval(interval)
  })
  return trainLocations
}

export default useTrainLocations
