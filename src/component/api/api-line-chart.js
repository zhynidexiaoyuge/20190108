import builder from './api-common';

export const chart1 = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/',
  method: 'GET',
  simulation: true,
  simulator: 'static/api-simulation/line-chart/lineChart1.json'
});

export const chart3 = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/',
  method: 'GET',
  simulation: true,
  simulator: 'static/api-simulation/line-chart/lineChart3.json'
});

export const chart4 = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/',
  method: 'GET',
  simulation: true,
  simulator: 'static/api-simulation/line-chart/lineChart4.json'
});
