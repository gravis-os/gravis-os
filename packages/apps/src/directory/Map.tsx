/* eslint-disable fp/no-let, fp/no-mutation, fp/no-loops, fp/no-mutating-methods, import/no-unresolved, import/no-webpack-loader-syntax */

import React, { useEffect, useRef, useState } from 'react'

// @ts-ignore
import mapboxgl from '!mapbox-gl'
import { Box } from '@gravis-os/ui'
import { useTheme } from '@mui/material/styles'
import xor from 'lodash/xor'

mapboxgl.accessToken = process.env.MAPBOX_ACCESS_TOKEN

export interface MapProps {
  markers?: Array<{
    geometry: {
      coordinates: number[] // Lng, Lat
      type: string // 'Point'
    }
    id: number
    properties: {
      subtitle?: string
      title?: string
    }
    type: string // 'Feature'
  }>
  shouldResize?: boolean
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
  const { markers: injectedMarkers, shouldResize } = props

  const theme = useTheme()
  const mapContainerRef = useRef(null)
  const [mapInstance, setMapInstance] = useState(null)

  // Effect: Initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      center: [103.809_676_230_792_66, 1.353_937_636_282_964_3],
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
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
  const hasMarkersChanged = xor(injectedMarkerIds, mapMarkerIds).length > 0
  useEffect(() => {
    if (!mapInstance) return

    // Clear all markers. We have to do this imperatively.
    // @link https://stackoverflow.com/a/55917076/3532313
    for (const { instance } of mapMarkers) instance.remove()
    mapMarkers = []

    // Add the new markers
    if (injectedMarkers)
      for (const feature of injectedMarkers) {
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
      }
  }, [hasMarkersChanged])

  return (
    <div>
      <Box
        className="map-container"
        ref={mapContainerRef}
        sx={{
          '& .mapboxgl-marker': {
            '&:hover svg': {
              cursor: 'pointer',
              transform: 'scale(1.1)',
              transition: (theme) => theme.transitions.create(['transform']),
            },
            height: 20,
            position: 'absolute',
            top: 0,
            width: 20,
          },
          '& .mapboxgl-popup': {
            '& .mapboxgl-popup-close-button': {
              '&:hover': { color: 'primary.main', cursor: 'pointer' },
              background: 'transparent',
              border: '0',
              borderRadius: '0',
              padding: 1,
              position: 'absolute',
              right: '0',
              top: '0',
            },
            '& h3, p': { margin: 0 },
            backgroundColor: 'white',
            borderRadius: 1,
            boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
            color: '#222',
            fontSize: '0.8rem',
            maxWidth: '240px',
            padding: 1,
            position: 'absolute',
            top: '0',
            transform: 'translate(-50%, -100%) translate(363px, 565px)',
          },
          '&.map-container': {
            bottom: 0,
            left: 0,
            position: 'absolute',
            right: 0,
            top: 0,
          },
        }}
      />
    </div>
  )
}

export default Map
