import config from '../config';

const URL_VIDEOS = `${config.URL_BACKEND}/videos`;

function create(params) {
  return fetch(`${URL_VIDEOS}?_embed=videos`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(params),
  }).then(async (response) => {
    if (response.ok) {
      const json = await response.json();
      return json;
    }
    throw new Error('Não foi possível cadastrar os dados.');
  });
}

export default {
  create,
};
