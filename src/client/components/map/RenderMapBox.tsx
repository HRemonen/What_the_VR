/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useRef, useState, useEffect } from 'react'
import mapboxgl from 'mapbox-gl'
import useTrainLocations from '../../hooks/useTrainLocations'

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN

const RenderMapBox = () => {
  const mapContainer = useRef(null)
  const map = useRef(null)
  const trainLocations = useTrainLocations()
  const [lat, setLat] = useState(60.192)
  const [lng, setLng] = useState(24.9458)
  const [zoom, setZoom] = useState(9)

  useEffect(() => {
    if (map.current) return // initialize map only once
    console.log('Loading new map...')
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom,
    })
  })

  useEffect(() => {
    if (!trainLocations) return // wait for locations to load

    if (map.current.getSource('trainLocations')) {
      console.log('Updating train locations...')
      map.current.getSource('trainLocations').setData(trainLocations)
    } else {
      map.current.addSource('trainLocations', {
        type: 'geojson',
        data: trainLocations,
      })
      map.current.addLayer({
        id: 'trainLocations',
        type: 'circle',
        source: 'trainLocations',
        paint: {
          'circle-radius': 6,
          'circle-color': '#B42222',
        },
      })
    }
  }, [trainLocations])

  return (
    <div>
      <div className="sidebar">
        {trainLocations
          ? `Longitude: ${lng} | Latitude: ${lat} | Zoom: ${zoom}`
          : 'Loading train locations'}
      </div>
      <div ref={mapContainer} className="map-container" />
    </div>
  )
}

export default RenderMapBox
