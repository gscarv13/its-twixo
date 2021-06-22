import { getScore } from '../src/scripts/APICall';

const url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/dywOdGpLHHdIALqxyvig/scores/';
const getCallback = (data) => data;

const getOptions = {
  method: 'GET',
  mode: 'cors',
  headers: {
    'Content-Type': 'application/json',
  },
};

beforeEach(() => {
  const result = [
    {
      user: 'Prinny',
      score: 14,
    },
    {
      user: 'Kurtz',
      score: 50,
    },
    {
      user: 'Etna',
      score: 25,
    },
  ];

  fetch.mockResponseOnce(JSON.stringify({ result }));
});

describe('getScore call', () => {
  test('Should return the username as a string', async () => {
    const value = await getScore(url, getOptions, getCallback);
    expect(value.result[0].user).toBe('Prinny');
    expect(typeof value.result[0].user).toBe('string');
  });

  test('Should return the score', async () => {
    const value = await getScore(url, getOptions, getCallback);
    const user = value.result[0];
    expect(user.score).toBe(14);
    expect(typeof user.score).toBe('number');
  });

  test('Should return an array of scores', async () => {
    const value = await getScore(url, getOptions, getCallback);
    const array = value.result;
    expect(array instanceof Array).toBe(true);
  });
});