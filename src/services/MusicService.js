import FirebaeService from './FirebaseService';

const database = FirebaeService.database();

export default class MusicService {
  static getAlbums() {
    return database
      .ref('albums')
      .once('value')
      .then(snapshot => Object.values(snapshot.val()));
  }

  static getAuthors() {
    return database
      .ref('authors')
      .once('value')
      .then(snapshot => Object.values(snapshot.val()));
  }

  static getAlbumById(albumId) {
    return database
      .ref(`albums/${albumId}`)
      .once('value')
      .then(snapshot => snapshot.val());
  }

  static getAuthorById(authorId) {
    return database
      .ref(`authors/${authorId}`)
      .once('value')
      .then(snapshot => snapshot.val());
  }

  static getSongById(songId) {
    return database
      .ref(`songs/${songId}`)
      .once('value')
      .then(snapshot => snapshot.val());
  }

  static getAlbumSongs(albumId) {
    return database
      .ref(`albums/${albumId}`)
      .once('value')
      .then(snapshot => Promise.all(
        snapshot.val().songs.map(item => MusicService.getSongById(item))));
  }

  static getAuthorSongs(authorId) {
    return database
      .ref(`authors/${authorId}`)
      .once('value')
      .then(snapshot => Promise.all(
        snapshot.val().songs.map(item => MusicService.getSongById(item))));
  }

  static getSongRatingByUserId(userId) {
    return database
      .ref(`users/${userId}/rating`)
      .once('value')
      .then(snapshot => snapshot.val());
  }

  static setSongsRatingByUserId(userId, songId, rating) {
    return database
      .ref(`users/${userId}/rating/${songId}`)
      .set(rating);
  }
}
