import React, { useRef, useEffect, useState } from 'react'
import { Box } from '@gravis-os/ui'
import { useTheme } from '@mui/material/styles'
// @ts-ignore
// eslint-disable-next-line import/no-unresolved,import/no-webpack-loader-syntax
import mapboxgl from '!mapbox-gl'

const geoJson = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [103.80967623079266, 1.3539376362829643],
      },
      properties: {
        title: 'Singapore',
        description: 'Pass this through from the frontend.',
      },
    },
  ],
}

mapboxgl.accessToken =
  'pk.eyJ1IjoiZGV2MXh0IiwiYSI6ImNsOTMwZHIxMTBhZmE0MW52dGM0MXN3NWUifQ.kJvt1dnjnb3apHqAkCIdfA'

export interface MapProps {
  shouldResize?: boolean
}

const Map = (props: MapProps) => {
  const { shouldResize }: any = props

  const theme = useTheme()
  const mapContainerRef = useRef(null)
  const [mapInstance, setMapInstance] = useState(null)

  // Initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [103.80967623079266, 1.3539376362829643],
      zoom: 11,
    })

    // add markers to map
    // eslint-disable-next-line no-restricted-syntax
    for (const feature of geoJson.features) {
      // create a HTML element for each feature
      const el = document.createElement('div')
      el.className = 'marker'

      // make a marker for each feature and add it to the map
      new mapboxgl.Marker({ color: theme.palette.primary.main })
        .setLngLat(feature.geometry.coordinates)
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }) // add popups
            .setHTML(
              `<h3>${feature.properties.title}</h3><p>${feature.properties.description}</p>`
            )
        )
        .addTo(map)
    }

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), 'top-right')

    // Set map instance to access methods later
    setMapInstance(map)

    // Clean up on unmount
    return () => map.remove()
  }, [])

  useEffect(() => {
    if (mapInstance && window) {
      // Only able to trigger resize after adding timeout
      // @issue: https://gis.stackexchange.com/questions/379976/putting-a-mapbox-gl-canvas-into-an-openlayers-node-results-in-the-mapbox-canvas
      window.setTimeout(() => mapInstance.resize(), 200)
    }
  }, [shouldResize])

  return (
    <div>
      <Box
        sx={{
          '&.map-container': {
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
          },
          '& .mapboxgl-marker': {
            position: 'absolute',
            top: 0,
            width: 20,
            height: 20,
            '&:hover svg': {
              cursor: 'pointer',
              transform: 'scale(1.1)',
              transition: (theme) => theme.transitions.create(['transform']),
            },
          },
          '& .mapboxgl-popup': {
            maxWidth: '240px',
            transform: 'translate(-50%, -100%) translate(363px, 565px)',
            position: 'absolute',
            top: '0',
            backgroundColor: 'white',
            padding: 1,
            borderRadius: 1,
            color: '#222',
            boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
            fontSize: '0.8rem',
            '& h3, p': { margin: 0 },
            '& .mapboxgl-popup-close-button': {
              position: 'absolute',
              top: '0',
              right: '0',
              padding: 1,
              background: 'transparent',
              borderRadius: '0',
              border: '0',
              '&:hover': { cursor: 'pointer', color: 'primary.main' },
            },
          },
        }}
        className="map-container"
        ref={mapContainerRef}
      />
    </div>
  )
}

export default Map
