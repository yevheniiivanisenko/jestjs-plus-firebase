import faker from "faker";

import FirebaseService from "../services/FirebaseService";
import MusicService from '../services/MusicService';

jest.mock("../services/FirebaseService");

const database = FirebaseService.database();
const randomId = faker.random.uuid();

afterEach(() => {
  database.ref.mockClear();
  database.once.mockClear();
});

test("getAlbums function calls firebase functions with proper arguments", async () => {
  const data = await MusicService.getAlbums();
  expect(data.constructor).toBe(Array);
  expect(database.ref).toHaveBeenCalledWith("albums");
  expect(database.ref).toHaveBeenCalledTimes(1);
  expect(database.once).toHaveBeenCalledWith("value");
  expect(database.once).toHaveBeenCalledTimes(1);
});

test("getAuthors function calls firebase functions with proper arguments", async () => {
  const data = await MusicService.getAuthors();
  expect(data.constructor).toBe(Array);
  expect(database.ref).toHaveBeenCalledWith("authors");
  expect(database.ref).toHaveBeenCalledTimes(1);
  expect(database.once).toHaveBeenCalledWith("value");
  expect(database.once).toHaveBeenCalledTimes(1);
});

test("getAlbumById function calls firebase functions with proper arguments", async () => {
  await MusicService.getAlbumById(randomId);
  expect(database.ref).toHaveBeenCalledWith(`albums/${randomId}`);
  expect(database.ref).toHaveBeenCalledTimes(1);
  expect(database.once).toHaveBeenCalledWith("value");
  expect(database.once).toHaveBeenCalledTimes(1);
});

test("getAuthorById function calls firebase functions with proper arguments", async () => {
  await MusicService.getAuthorById(randomId);
  expect(database.ref).toHaveBeenCalledWith(`authors/${randomId}`);
  expect(database.ref).toHaveBeenCalledTimes(1);
  expect(database.once).toHaveBeenCalledWith("value");
  expect(database.once).toHaveBeenCalledTimes(1);
});

test("getSongById function calls firebase functions with proper arguments", async () => {
  await MusicService.getSongById(randomId);
  expect(database.ref).toHaveBeenCalledWith(`songs/${randomId}`);
  expect(database.ref).toHaveBeenCalledTimes(1);
  expect(database.once).toHaveBeenCalledWith("value");
  expect(database.once).toHaveBeenCalledTimes(1);
});

test("getAlbumSongs function calls firebase functions with proper arguments", async () => {
  await MusicService.getAlbumSongs(randomId);
  expect(database.ref).toHaveBeenCalledWith(`albums/${randomId}`);
  expect(database.ref).toHaveBeenCalledTimes(2);
  expect(database.once).toHaveBeenCalledWith("value");
  expect(database.once).toHaveBeenCalledTimes(2);
});

test("getAuthorSongs function calls firebase functions with proper arguments", async () => {
  await MusicService.getAuthorSongs(randomId);
  expect(database.ref).toHaveBeenCalledWith(`authors/${randomId}`);
  expect(database.ref).toHaveBeenCalledTimes(2);
  expect(database.once).toHaveBeenCalledWith("value");
  expect(database.once).toHaveBeenCalledTimes(2);
});

test("getSongRatingByUserId function calls firebase functions with proper arguments", async () => {
  await MusicService.getSongRatingByUserId(randomId);
  expect(database.ref).toHaveBeenCalledWith(`users/${randomId}/rating`);
  expect(database.ref).toHaveBeenCalledTimes(1);
  expect(database.once).toHaveBeenCalledWith("value");
  expect(database.once).toHaveBeenCalledTimes(1);
});

test("setSongsRatingByUserId function calls firebase functions with proper arguments", async () => {
  const songId = faker.random.uuid();
  const rating = faker.random.word();
  await MusicService.setSongsRatingByUserId(randomId, songId, rating);
  expect(database.ref).toHaveBeenCalledWith(
    `users/${randomId}/rating/${songId}`
  );
  expect(database.ref).toHaveBeenCalledTimes(1);
  expect(database.set).toHaveBeenCalledWith(rating);
  expect(database.set).toHaveBeenCalledTimes(1);
});
