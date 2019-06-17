const Router = require('./router');
const lookup = require('./src/handlers/lookup');
const webhook = require('./src/handlers/webhook');
/**
 * Example of how router can be used in an application
 *  */
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

function handler(request) {
  const init = {
    headers: { 'content-type': 'application/json' },
  }
  const body = JSON.stringify({ some: 'json' })
  return new Response(body, init)
}

async function handleRequest(request) {
  const r = new Router()
  r.post('/lookup', lookup);
  r.post('/webhook', webhook);

  r.get('/', () => new Response('Hello worker!')); // return a default message for the root route
  
  const resp = await r.route(request)
  if (!resp) {
    resp = new Response('Not found', {
      status: 404
    })
  }
  return resp
}
