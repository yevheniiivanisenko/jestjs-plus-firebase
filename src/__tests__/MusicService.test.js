import faker from 'faker';

import FirebaseService, { data as expected } from '../services/FirebaseService';
import MusicService from '../services/MusicService';

jest.mock('../services/FirebaseService');

const database = FirebaseService.database();
const randomId = faker.random.uuid();

afterEach(() => {
  database.ref.mockClear();
  database.once.mockClear();
});

describe('MusicService', () => {
  describe('getAlbums', () => {
    it('should return an array with proper data', async () => {
      const expected = [ 'unnamed', [ 'song' ] ];
      const data = await MusicService.getAlbums();
      expect(data).toEqual(expect.arrayContaining(expected));
    });

    it('should should call firebase functions with proper arguments', async () => {
      await MusicService.getAlbums();
      expect(database.ref).toHaveBeenCalledWith('albums');
      expect(database.once).toHaveBeenCalledWith('value');
    });
  });

  describe('getAuthors', () => {
    it('should return an array with proper data', async () => {
      const expected = [ 'unnamed', [ 'song' ] ];
      const data = await MusicService.getAuthors();

      expect(data).toEqual(expect.arrayContaining(expected));
    });

    it('should should call firebase functions with proper arguments', async () => {
      await MusicService.getAuthors();
      expect(database.ref).toHaveBeenCalledWith('authors');
      expect(database.once).toHaveBeenCalledWith('value');
    });
  });

  describe('getAlbumById', () => {
    it('should return an object with proper data', async () => {
      const data = await MusicService.getAlbumById(randomId);
      expect(data).toEqual(expected);
    });

    it('should should call firebase functions with proper arguments', async () => {
      await MusicService.getAlbumById(randomId);
      expect(database.ref).toHaveBeenCalledWith(`albums/${randomId}`);
      expect(database.once).toHaveBeenCalledWith('value');
    });
  });

  describe('getAuthorById', () => {
    it('should return an object with proper data', async () => {
      const data = await MusicService.getAuthorById(randomId);
      expect(data).toEqual(expected);
    });

    it('should should call firebase functions with proper arguments', async () => {
      await MusicService.getAuthorById(randomId);
      expect(database.ref).toHaveBeenCalledWith(`authors/${randomId}`);
      expect(database.once).toHaveBeenCalledWith('value');
    });
  });

  describe('getSongById', () => {
    it('should return an object with proper data', async () => {
      const data = await MusicService.getSongById(randomId);
      expect(data).toEqual(expected);
    });

    it('should should call firebase functions with proper arguments', async () => {
      await MusicService.getSongById(randomId);
      expect(database.ref).toHaveBeenCalledWith(`songs/${randomId}`);
      expect(database.once).toHaveBeenCalledWith('value');
    });
  });

  describe('getAlbumSongs', () => {
    it('should return an array with proper data', async () => {
      const data = await MusicService.getAlbumSongs(randomId);
      expect(data).toEqual(expect.arrayContaining([expected]));
    });

    it('should should call firebase functions with proper arguments', async () => {
      await MusicService.getAlbumSongs(randomId);
      expect(database.ref).toHaveBeenCalledWith(`albums/${randomId}`);
      expect(database.once).toHaveBeenCalledWith('value');
    });
  });

  describe('getAuthorSongs', () => {
    it('should return an array with proper data', async () => {
      const data = await MusicService.getAuthorSongs(randomId);
      expect(data).toEqual(expect.arrayContaining([expected]));
    });

    it('should should call firebase functions with proper arguments', async () => {
      await MusicService.getAuthorSongs(randomId);
      expect(database.ref).toHaveBeenCalledWith(`authors/${randomId}`);
      expect(database.once).toHaveBeenCalledWith('value');
    });
  });

  describe('getSongRatingByUserId', () => {
    it('should return an object with proper data', async () => {
      const data = await MusicService.getSongRatingByUserId(randomId);
      expect(data).toEqual(expected);
    });

    it('should should call firebase functions with proper arguments', async () => {
      await MusicService.getSongRatingByUserId(randomId);
      expect(database.ref).toHaveBeenCalledWith(`users/${randomId}/rating`);
      expect(database.once).toHaveBeenCalledWith('value');
    });
  });

  describe('setSongsRatingByUserId', () => {
    it('should should call firebase functions with proper arguments', async () => {
      const songId = faker.random.uuid();
      const rating = faker.random.word();
      await MusicService.setSongsRatingByUserId(randomId, songId, rating);
      expect(database.ref).toHaveBeenCalledWith(`users/${randomId}/rating/${songId}`);
      expect(database.set).toHaveBeenCalledWith(rating);
    });
  });
});
