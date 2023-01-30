import { useState, useEffect } from 'react'
import axios from 'axios'
import { FeatureCollection } from '../types'

function useTrainLocations(): FeatureCollection {
  const [trainLocations, setTrainLocations] = useState(null)

  useEffect(() => {
    const interval = setInterval(() => {
      axios
        .get('/api/locations')
        .then((locationData) => setTrainLocations(locationData.data))
    }, 10000)

    return () => clearInterval(interval)
  })

  return trainLocations
}

export default useTrainLocations
