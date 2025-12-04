
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
    'bus/index.html': {size: 17400, hash: '39410db81283e6b5977eba900aa9c92737058f2a3b92ee5e249528f0908dd0f2', text: () => import('./assets-chunks/bus_index_html.mjs').then(m => m.default)},
    'boletos/index.html': {size: 20782, hash: '4e19578f25c7428ef8b0a2b3329d3434a12ebd202f03e71c43eca447df5655c2', text: () => import('./assets-chunks/boletos_index_html.mjs').then(m => m.default)},
    'finanzas/index.html': {size: 23778, hash: 'c1656d35c259ca840a5d868dc04aea4bb963f32fd6d94f82912318e172427111', text: () => import('./assets-chunks/finanzas_index_html.mjs').then(m => m.default)},
    'rubro/index.html': {size: 12618, hash: '6bc1bce65b24ebb2248d46bfbb5044a18b34cd5f33ba1a731e67b11497362e90', text: () => import('./assets-chunks/rubro_index_html.mjs').then(m => m.default)},
    'oficiales/index.html': {size: 15417, hash: '5878f7fc4d337c0ae0c25c29aa82b88089ef0b2ba5de34bb98db4fc1f7dda74d', text: () => import('./assets-chunks/oficiales_index_html.mjs').then(m => m.default)},
    'turnos/index.html': {size: 15344, hash: '8c84951a5183ac9d1e8669f9c7ec787fdedb698eb36630bc565dda02259ba765', text: () => import('./assets-chunks/turnos_index_html.mjs').then(m => m.default)},
    'choferes/index.html': {size: 15414, hash: 'b12872a7dfc6db9f758dbe772a6f0a6786f052ce44ddc92a94546b8342be4454', text: () => import('./assets-chunks/choferes_index_html.mjs').then(m => m.default)},
    'styles-VRDYZCWE.css': {size: 230966, hash: 'yJEOwb9t5lw', text: () => import('./assets-chunks/styles-VRDYZCWE_css.mjs').then(m => m.default)}
  },
};
