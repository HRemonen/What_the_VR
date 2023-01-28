import axios from 'axios'
import { LOCATION_API } from '../utils/config'

async function pollTrainLocations() {
  try {
    const response = await axios.get(LOCATION_API)
    return response.data
  } catch (error) {
    console.log(error)
    return []
  }
}

export default pollTrainLocations
