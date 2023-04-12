/* eslint-disable */

// export const displayMap = (locations) => {
//   mapboxgl.accessToken =
//     'pk.eyJ1IjoibWlzdGlzb25hMTIzIiwiYSI6ImNsZmlqNm80ZDBjdHYzcnAyZ3ZhMmJlMTYifQ.jNmH6jKJDWjVMnZhlp0nag';
//   var map = new mapboxgl.Map({
//     container: 'map',
//     style: 'mapbox://styles/mistisona123/clfilxeqo00sj01pe0uwl29op',
//     //   center: [-118.113491, 34.111745],
//     //   zoom: 10,
//     //   interactive: false,
//     scrollZoom: false,
//   });

//   const bounds = new mapboxgl.LngLatBounds();

//   locations.forEach((loc) => {
//     // Create Marker
//     const el = document.createElement('div');
//     el.className = 'marker';

//     // Add Marker
//     new mapboxgl.Marker({
//       element: el,
//       anchor: 'bottom',
//     })
//       .setLngLat(loc.coordinates)
//       .addTo(map);

//     // Add popup
//     new mapboxgl.Popup({
//       offset: 30,
//     })
//       .setLngLat(loc.coordinates)
//       .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
//       .addTo(map);

//     // Extends map bounds to include current location
//     bounds.extend(loc.coordinates);
//   });

//   map.fitBounds(bounds, {
//     padding: {
//       top: 200,
//       bottom: 100,
//       left: 200,
//       right: 100,
//     },
//   });
// };
