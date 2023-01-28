/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useRef, useEffect, useState } from 'react'
import mapboxgl from 'mapbox-gl' // eslint-disable-line import/no-webpack-loader-syntax
import './App.css'

mapboxgl.accessToken = ''

const App = () => {
  const mapContainer = useRef(null)
  const map = useRef(null)
  const [lat, setLat] = useState(60.192059)
  const [lng, setLng] = useState(24.945831)
  const [zoom, setZoom] = useState(9)

  useEffect(() => {
    if (map.current) return // initialize map only once
    console.log(
      `Map reloaded to position (lat, lng): (${lat}, ${lng}), zoom: ${zoom}`
    )
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom,
    })
  })
  return (
    <div>
      <div ref={mapContainer} className="map-container" />
    </div>
  )
}

export default App
