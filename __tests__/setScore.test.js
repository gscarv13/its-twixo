import { setScore } from '../src/scripts/APICall';

const url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/dywOdGpLHHdIALqxyvig/scores/';
const setCallback = (data) => data;

const userData = { user: 'Adel', score: 20 };
const setOptions = {
  method: 'POST',
  mode: 'cors',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(userData),
};

describe('setScore call', () => {
  test('Should return success message', async () => {
    const success = { result: 'Leaderboard score created correctly.' };

    fetch.mockResponseOnce(JSON.stringify({ success }));

    const value = await setScore(url, setOptions, userData, setCallback);
    expect(value.success.result).toBe('Leaderboard score created correctly.');
  });

  test('Should return success message', async () => {
    const invalidUserData = { user: 42, score: 'highest' };
    const fail = { message: 'You need to provide a valid score for the leaderboard.' };

    fetch.mockResponseOnce(JSON.stringify({ fail }));

    const value = await setScore(url, setOptions, invalidUserData, setCallback);
    expect(value.fail.result).toBe(undefined);
    expect(value.fail.message).toBe('You need to provide a valid score for the leaderboard.');
  });
});