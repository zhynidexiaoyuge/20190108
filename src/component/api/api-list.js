import builder from './api-common';

export const list1 = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/',
  method: 'GET',
  simulation: true,
  simulator: 'static/api-simulation/list/list1.json'
});

export const list2 = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/',
  method: 'GET',
  simulation: true,
  simulator: 'static/api-simulation/list/list2.json'
});

export const list3 = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/',
  method: 'GET',
  simulation: true,
  simulator: 'static/api-simulation/list/list3.json'
});

export const list4 = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/',
  method: 'GET',
  simulation: true,
  simulator: 'static/api-simulation/list/list4.json'
});
export const list5 = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/',
  method: 'GET',
  simulation: true,
  simulator: 'static/api-simulation/list/list5.json'
});
