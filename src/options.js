const Options = {
  center: [41.4583, 12.7059],
	zoom: 5,
  mapTypeId: 'streets',
  mapTypes: {
    streets: {
      name: 'Streets',
      url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      options: {
        // maxZoom: 24,
        // maxNativeZoom: 19,
        attribution: 'Map data: &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      },
    },
    terrain: {
      name: 'Terrain',
      url: 'https://{a-c}.tile.thunderforest.com/landscape/{z}/{x}/{y}.png',
      options: {
        // maxZoom: 24,
        // maxNativeZoom: 22,
        attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> | Map style: &copy; <a href="http://www.thunderforest.com/">Thunderforest</a>',
        // apikey: '<your apikey>',
      },
    },
    satellite: {
      name: 'Satellite',
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      options: {
        // maxZoom: 24,
        // maxNativeZoom: 18,
        attribution: 'Map data: &copy; <a href="http://www.esri.com/">Esri</a> &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
      },
    },
  },
  drawingFeatures: [ 'Circle'],
  fullscreenElement: 'main'
};

export default Options;