import React, { useRef, useEffect, useState } from 'react'
import { Box } from '@gravis-os/ui'
import { useTheme } from '@mui/material/styles'
import xor from 'lodash/xor'
// @ts-ignore
// eslint-disable-next-line import/no-unresolved,import/no-webpack-loader-syntax
import mapboxgl from '!mapbox-gl'

mapboxgl.accessToken =
  'pk.eyJ1IjoiZGV2MXh0IiwiYSI6ImNsOTMwZHIxMTBhZmE0MW52dGM0MXN3NWUifQ.kJvt1dnjnb3apHqAkCIdfA'

export interface MapProps {
  shouldResize?: boolean
  markers?: Array<{
    id: number
    type: string // 'Feature'
    geometry: {
      type: string // 'Point'
      coordinates: number[] // Lng, Lat
    }
    properties: {
      title?: string
      subtitle?: string
    }
  }>
}

/**
 * We need a cache to store the markers in the map to access them again later
 * for removal. This is necessary because the mapbox-gl library does not provide a way
 * for us to do so.
 *
 * Q. Why is this variable outside the component instead of using state?
 * Performance reasons, setState will cause re-renders which may bring about
 * unnecessary performance issues for something as heavy as this map.
 *
 * Q. Why do we have to use let instead of const?
 * We also have to reset the cache when the markers change hence we have to
 * use `let`.
 *
 * For more info, see:
 * @link https://stackoverflow.com/a/55917076/3532313
 */
let mapMarkers = []

const Map = (props: MapProps) => {
  const { shouldResize, markers: injectedMarkers } = props

  const theme = useTheme()
  const mapContainerRef = useRef(null)
  const [mapInstance, setMapInstance] = useState(null)

  // Effect: Initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [103.80967623079266, 1.3539376362829643],
      zoom: 11,
    })

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), 'top-right')

    // Set map instance to access methods later
    setMapInstance(map)

    // Clean up on unmount
    return () => map.remove()
  }, [])

  // Effect: Resize map
  useEffect(() => {
    if (mapInstance && window) {
      // Only able to trigger resize after adding timeout
      // @issue: https://gis.stackexchange.com/questions/379976/putting-a-mapbox-gl-canvas-into-an-openlayers-node-results-in-the-mapbox-canvas
      window.setTimeout(() => mapInstance.resize(), 200)
    }
  }, [shouldResize])

  // Effect: Add/Remove markers when data changes
  const injectedMarkerIds = injectedMarkers.map(({ id }) => id)
  const mapMarkerIds = mapMarkers.map(({ id }) => id)
  const hasMarkersChanged = Boolean(xor(injectedMarkerIds, mapMarkerIds).length)
  useEffect(() => {
    if (!mapInstance) return

    // Clear all markers. We have to do this imperatively.
    // @link https://stackoverflow.com/a/55917076/3532313
    mapMarkers.forEach(({ instance }) => instance.remove())
    mapMarkers = []

    // Add the new markers
    injectedMarkers?.forEach((feature) => {
      // create a HTML element for each feature
      const el = document.createElement('div')
      el.className = 'marker'

      // Make a marker for each feature and add it to the map
      const newMapMarker = new mapboxgl.Marker({
        color: theme.palette.primary.main,
      })
        .setLngLat(feature.geometry.coordinates)
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }) // add popups
            .setHTML(
              [
                `<h3>${feature.properties.title}</h3>`,
                feature.properties.subtitle &&
                  `<p>${feature.properties.subtitle}</p>`,
              ]
                .filter(Boolean)
                .join('')
            )
        )
        .addTo(mapInstance)

      // Add to cache to remove later
      mapMarkers.push({ id: feature.id, instance: newMapMarker })
    })
  }, [hasMarkersChanged])

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
