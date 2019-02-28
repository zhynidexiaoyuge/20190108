import builder from './api-common';

export const map1 = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/',
  method: 'GET',
  simulation: true,
  simulator: 'static/api-simulation/map-chart/mapChart1.json'
});

export const ellipseForceDirectedTagCloud = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/',
  method: 'GET',
  simulation: true,
  simulator: 'static/api-simulation/map-chart/ellipseForceDirectedTagCloud.json'
});

export const map3 = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/',
  method: 'GET',
  simulation: true,
  simulator: 'static/api-simulation/map-chart/mapChart3.json'
});

export const map4 = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/',
  method: 'GET',
  simulation: true,
  simulator: 'static/api-simulation/map-chart/mapChart4.json'
});
export const map5 = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/',
  method: 'GET',
  simulation: true,
  simulator: 'static/api-simulation/map-chart/mapChart5.json'
});
