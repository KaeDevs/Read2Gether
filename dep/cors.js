export default {
  async fetch(request) {
    const allowedOrigin = 'https://kaedevs.github.io';

    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': allowedOrigin,
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      });
    }

    if (request.method !== 'POST') {
      return new Response('Method Not Allowed', { status: 405 });
    }

    const body = await request.text();
    const appsScriptUrl = 'https://script.google.com/macros/s/AKfycbwcjPY1x7QZ6dHIIQ5QE-q-X3s2C4NejP5-91sFK8QQIW6gWJCI_Jwk4A6zHlizrzc7/exec';
    
    const res = await fetch(appsScriptUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
      body
    });

    const text = await res.text();
    let payload = text;
    try { payload = JSON.stringify(JSON.parse(text)); } catch {}

    return new Response(payload, {
      status: res.status,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': allowedOrigin,
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }
}