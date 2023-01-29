import { useState, useEffect } from 'react'
import axios from 'axios'

function useTrainLocations() {
  const [trainLocations, setTrainLocations] = useState(null)

  useEffect(() => {
    axios
      .get('/api/locations')
      .then((locationData) => setTrainLocations(locationData.data))
  }, [])

  return trainLocations
}

export default useTrainLocations
