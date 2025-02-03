class AlbumsHandler {
  constructor(service, validator, storageService) {
    this._service = service;
    this._validator = validator;

    this.postAlbumHandler = this.postAlbumHandler.bind(this);
    this.getAlbumByIdHandler = this.getAlbumByIdHandler.bind(this);
    this.putAlbumByIdHandler = this.putAlbumByIdHandler.bind(this);
    this.deleteAlbumByIdHandler = this.deleteAlbumByIdHandler.bind(this);

    this._storageService = storageService;
    this.postUploadCoverHandler = this.postUploadCoverHandler.bind(this);
    this.getUserAlbumLikesByIdHandler = this.getUserAlbumLikesByIdHandler.bind(this);
    this.postUserAlbumLikesHandler = this.postUserAlbumLikesHandler.bind(this);
    this.deleteUserAlbumLikesHandler = this.deleteUserAlbumLikesHandler.bind(this);
  }
  async postAlbumHandler(request, h) {
    this._validator.validateAlbumPayload(request.payload);

    const { name, year } = request.payload;
    const albumId = await this._service.addAlbum({ name, year });

    const response = h.response({
      status: 'success',
      message: 'Album berhasil ditambahkan',
      data: {
        albumId,
      },
    },);
    response.code(201);
    return response;
  }

  async getAlbumByIdHandler(request, h) {
    const { id } = request.params;
    const album = await this._service.getAlbumById(id);
    const response = h.response({
      status: 'success',
      data: {
        album: album
      }
    });

    if (album.source === 'cache') {
      response.header('X-Data-Source', 'cache');
    }
    return response;
  }
  async putAlbumByIdHandler(request, h) {
    this._validator.validateAlbumPayload(request.payload);

    const { id } = request.params;
    await this._service.editAlbumById(id, request.payload);

    const response = h.response({
      status: 'success',
      message: 'Album berhasil diubah'
    });

    response.code(200);
    return response;
  }

  async deleteAlbumByIdHandler(request) {
    const { id } = request.params;
    await this._service.deleteAlbumById(id);

    return {
      status: 'success',
      message: 'Lagu berhasil dihapus',
    };
  }

  async postUploadCoverHandler(request, h) {
    const { cover } = request.payload;
    const { id } = request.params;
    this._validator.validateAlbumCover(cover.hapi.headers);

    const filename = await this._storageService.writeFile(cover, cover.hapi);
    const fileLocation = `http://${process.env.HOST}:${process.env.PORT}/albums/file/covers/${filename}`;

    await this._service.postAlbumCoverById(id, fileLocation);

    const response = h.response({
      status: 'success',
      message: 'Sampul berhasil diunggah'
    });

    response.code(201);
    return response;
  }

  // like
  async getUserAlbumLikesByIdHandler(request, h) {
    const { id } = request.params;

    const albumLikeData = await this._service.getAlbumLikesByAlbumId(id);

    const response = h.response({
      status: 'success',
      data: {
        likes: albumLikeData.data,
      },
    });
    if (albumLikeData.source === 'cache') {
      response.header('X-Data-Source', 'cache');
    }
    response.code(200);
    return response;
  }

  async postUserAlbumLikesHandler(request, h) {
    const { id: credentialId } = request.auth.credentials;
    const { id: albumId } = request.params;

    await this._service.getAlbumById(albumId);

    const likesId = await this._service.addAlbumLikes(
      albumId,
      credentialId
    );

    const response = h.response({
      status: 'success',
      message: 'Likes berhasil ditambahkan',
      data: {
        likesId,
      },
    });
    response.code(201);
    return response;
  }

  async deleteUserAlbumLikesHandler(request) {
    const { id: credentialId } = request.auth.credentials;
    const { id: albumId } = request.params;

    await this._service.deleteAlbumLikes(credentialId, albumId);

    return {
      status: 'success',
      message: 'Likes berhasil dihapus',
    };
  }

}

module.exports = AlbumsHandler;