
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "redirectTo": "/rubro",
    "route": "/"
  },
  {
    "renderMode": 2,
    "route": "/finanzas"
  },
  {
    "renderMode": 2,
    "route": "/boletos"
  },
  {
    "renderMode": 2,
    "route": "/rubro"
  },
  {
    "renderMode": 2,
    "route": "/choferes"
  },
  {
    "renderMode": 2,
    "route": "/oficiales"
  },
  {
    "renderMode": 2,
    "route": "/turnos"
  },
  {
    "renderMode": 2,
    "route": "/bus"
  },
  {
    "renderMode": 2,
    "redirectTo": "/rubro",
    "route": "/**"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 4976, hash: 'eed449ced5b7cf9d56444a817af2635859d253b611cc6f1ca7f093a290ed6d22', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 948, hash: '67c5268bcd6a6a410aedbbc4ff082fc059d869bfb5e0bba650f72519bfb29892', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'turnos/index.html': {size: 15344, hash: '8c84951a5183ac9d1e8669f9c7ec787fdedb698eb36630bc565dda02259ba765', text: () => import('./assets-chunks/turnos_index_html.mjs').then(m => m.default)},
    'finanzas/index.html': {size: 23778, hash: 'c1656d35c259ca840a5d868dc04aea4bb963f32fd6d94f82912318e172427111', text: () => import('./assets-chunks/finanzas_index_html.mjs').then(m => m.default)},
    'rubro/index.html': {size: 12618, hash: '6bc1bce65b24ebb2248d46bfbb5044a18b34cd5f33ba1a731e67b11497362e90', text: () => import('./assets-chunks/rubro_index_html.mjs').then(m => m.default)},
    'bus/index.html': {size: 17400, hash: '39410db81283e6b5977eba900aa9c92737058f2a3b92ee5e249528f0908dd0f2', text: () => import('./assets-chunks/bus_index_html.mjs').then(m => m.default)},
    'boletos/index.html': {size: 21152, hash: '2dbb1705b23b3a758a0acc9c92033f25f051bbf8690822c709c5c3745ae41a54', text: () => import('./assets-chunks/boletos_index_html.mjs').then(m => m.default)},
    'choferes/index.html': {size: 15414, hash: 'ab606de1070e7536653db642f97b0f2b60a6ff5d78fe2be177685ab0984ef377', text: () => import('./assets-chunks/choferes_index_html.mjs').then(m => m.default)},
    'oficiales/index.html': {size: 15417, hash: '3d890ce2be8c2f4e3d6aa1060e601afa553e33734a7600a895cbd93679cacb36', text: () => import('./assets-chunks/oficiales_index_html.mjs').then(m => m.default)},
    'styles-VRDYZCWE.css': {size: 230966, hash: 'yJEOwb9t5lw', text: () => import('./assets-chunks/styles-VRDYZCWE_css.mjs').then(m => m.default)}
  },
};
