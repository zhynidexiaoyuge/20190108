import builder from './api-common';

export const radar1 = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/',
  method: 'GET',
  simulation: true,
  simulator: 'static/api-simulation/radar-chart/radarChart1.json'
});

export const radar2 = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/',
  method: 'GET',
  simulation: true,
  simulator: 'static/api-simulation/radar-chart/radarChart2.json'
});

export const radar3 = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/',
  method: 'GET',
  simulation: true,
  simulator: 'static/api-simulation/radar-chart/radarChart3.json'
});

export const radar4 = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/',
  method: 'GET',
  simulation: true,
  simulator: 'static/api-simulation/radar-chart/radarChart4.json'
});
export const radar5 = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/',
  method: 'GET',
  simulation: true,
  simulator: 'static/api-simulation/radar-chart/radarChart5.json'
});
