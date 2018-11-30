export const data = {
  name: 'unnamed',
  songs: [ 'song' ]
};

const snapshot = { val: () => data };
const database = jest.fn();
database.mockReturnValue({
  ref: jest.fn().mockReturnThis(),
  once: jest.fn(() => Promise.resolve(snapshot)),
  set: jest.fn()
});

export default {
  database
};
