// import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
// import './index.css'

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
// )

import {Component} from 'react';
import autobind from 'react-autobind';
// import {render} from 'react-dom';
import MapGL from 'react-map-gl';

import WindDemo from './wind-demo';
import ControlPanel from './control-panel';

// animation
import TWEEN from 'tween.js';
const animate = () => {
  TWEEN.update();
  window.requestAnimationFrame(animate);
};

// Set your mapbox token here
const MAPBOX_TOKEN = 'pk.eyJ1IjoidGFuZ2xlaTIwMTMxNCIsImEiOiJjbGtmOTdyNWoxY2F1M3Jqczk4cGllYXp3In0.9N-H_79ehy4dJeuykZa0xA'; // eslint-disable-line

class Root extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        width: 500,
        height: 500,
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
      }
    };
    autobind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this._onResize);
    this._onResize();
    animate();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._onResize);
  }

  _onResize() {
    this._updateViewport({
      width: window.innerWidth,
      height: window.innerHeight
    });
  }

  _updateViewport(viewport) {
    this.setState({
      viewport: {...this.state.viewport, ...viewport}
    });
  }

  _updateSettings(settings) {
    this.setState({
      settings: {...this.state.settings, ...settings}
    });
  }

  render() {
    const {viewport, settings} = this.state;
    // const style={
    //   'version': 8,
    //   'sources': {
    //     'raster-tiles': {
    //       'type': 'raster',
    //       'tiles': [
    //         // 'https://stamen-tiles.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg',
    //         'https://tanglei.site:3210/maps/vt?lyrs=y&gl=CN&x={x}&y={y}&z={z}'
    //       ],
    //       'tileSize': 256,
    //       'attribution': 'Map tiles by <a target="_top" rel="noopener" href="http://stamen.com">Stamen Design</a>, under <a target="_top" rel="noopener" href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a target="_top" rel="noopener" href="http://openstreetmap.org">OpenStreetMap</a>, under <a target="_top" rel="noopener" href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>'
    //     }
    //   },
    //   'layers': [
    //     {
    //       'id': 'simple-tiles',
    //       'type': 'raster',
    //       'source': 'raster-tiles',
    //       'minzoom': 0,
    //       'maxzoom': 22
    //     }
    //   ]
    // }
    return (
      <div>
        <MapGL
          {...viewport}
          mapStyle="mapbox://styles/mapbox/dark-v9"
          mapboxApiAccessToken={MAPBOX_TOKEN}
          dragRotate
          onViewportChange={this._updateViewport}
        >
          <WindDemo viewport={viewport} settings={settings} />
        </MapGL>

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

          <ControlPanel settings={settings} onChange={this._updateSettings} />
        </div>
      </div>
    );
  }
}

// render(<Root />, document.body.appendChild(document.createElement('div')));

ReactDOM.createRoot(document.body.appendChild(document.createElement('div'))).render(
  // <React.StrictMode>
    <Root />
  // </React.StrictMode>,
)
