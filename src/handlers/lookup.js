const qs = require('qs');

export default async request => {
  try {
    const body = await request.text();
    const params = qs.parse(body);
    const text = params['text'].trim();
    const challenge = params['challenge'].trim();

    const response = new Response(challenge);
  } catch (err) {
    const errorText = "Some error occurred!";
    return new Response(errorText);
  }
}