import React, { useRef, useState, useEffect } from 'react'
import mapboxgl from 'mapbox-gl'

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN

const RenderMapBox = () => {
  const mapContainer = useRef(null)
  const map = useRef(null)
  const [lat, setLat] = useState(60.192)
  const [lng, setLng] = useState(24.9458)
  const [zoom, setZoom] = useState(9)

  useEffect(() => {
    if (map.current) return // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom,
    })
  })

  useEffect(() => {
    if (!map.current) return // wait for map to initialize
    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4))
      setLat(map.current.getCenter().lat.toFixed(4))
      setZoom(map.current.getZoom().toFixed(2))
    })
    console.log(
      `Map reloaded to position (lat, lng): (${lat}, ${lng}), zoom: ${zoom}`
    )
  })

  return (
    <div>
      <div ref={mapContainer} className="map-container" />
    </div>
  )
}

export default RenderMapBox
