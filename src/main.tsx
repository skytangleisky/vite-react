import {createRoot} from 'react-dom/client';
import Map, {Source, Layer} from 'react-map-gl';

import ControlPanel from './control-panel';
import type {SkyLayer} from 'react-map-gl';
import { useState } from 'react';
import * as React from 'react';
import WindDemo from './wind-demo';

const TOKEN = 'pk.eyJ1IjoidGFuZ2xlaTIwMTMxNCIsImEiOiJjbGtmOTdyNWoxY2F1M3Jqczk4cGllYXp3In0.9N-H_79ehy4dJeuykZa0xA'; // Set your mapbox token here

const skyLayer:SkyLayer = {
  id: 'sky',
  type: 'sky',
  paint: {
    'sky-type': 'atmosphere',
    'sky-atmosphere-sun': [0.0, 0.0],
    'sky-atmosphere-sun-intensity': 15
  }
};

export default function App() {
  const [state, setState] =  useState({viewport: {
    longitude: -98.31907156932937,
    latitude: 37.613897372628045,
    zoom: 4.241754140284522,
    maxZoom: 16,
    pitch: 37.11535300402728,
    bearing: -0.6424747174301046
  },
  settings: {
    time: 30,
    showParticles: true,
    showWind: true,
    showElevation: true,
    useDevicePixels: true
  }})
  return (
    <>
      <Map
        {...state.viewport}
        initialViewState={{
          latitude: 32.6141,
          longitude: -114.34411,
          zoom: 14,
          // bearing: 80,
          // pitch: 80,
          bearing: 0,
          pitch: 0
        }}
        onMove={evt=>setState({...state,viewport:evt.viewState})}
        maxPitch={85}
        mapStyle="mapbox://styles/mapbox/satellite-v9"
        mapboxAccessToken={TOKEN}
        terrain={{source: 'mapbox-dem', exaggeration: 1.5}}
      >
        <Source
          id="mapbox-dem"
          type="raster-dem"
          url="mapbox://mapbox.mapbox-terrain-dem-v1"
          tileSize={512}
          maxzoom={14}
        />
        <WindDemo viewport={state.viewport} settings={state.settings} />
        <Layer {...skyLayer} />
      </Map>
      <div className="control-panel">
          <h1>Wind</h1>
          <p>Visualize wind on vector fields and particles.</p>
          <ul>
            <li>Hold cmd + drag to tilt the map</li>
            <li>Turn on/off between a particles or vector field layer</li>
            <li>Slide through every hour of the day to look at wind change</li>
          </ul>
          <p>
            Made with <a href="http://deck.gl">deck.gl</a> by
            <a href="https://twitter.com/philogb">@philogb</a>
          </p>
          <p>
            Data source: <a href="http://www.census.gov">NCAA</a>
          </p>
          <hr />
          <ControlPanel settings={state.settings} onChange={settings=>setState({...state,settings:{...state.settings,...settings}})} />
        </div>
    </>
  );
}
createRoot(document.getElementById('root')).render(<App/>)