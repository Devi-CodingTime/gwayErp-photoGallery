import { Injectable } from '@nestjs/common';
import { Album } from './album.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AlbumsService {
constructor(
    @InjectModel(Album.name) private albumModel: Model<Album>
  ) {}
async create(title: string, userId: string) {
  const album = new this.albumModel({ title, createdBy: userId });
  return album.save();
}

 async getAllAlbums() {
    return this.albumModel.find().sort({ createdAt: -1 }).exec();
  }

  async getAlbumsByUserId(userId: string) {
    return this.albumModel.find({ createdBy: userId }).sort({ createdAt: -1 }).exec();
  }
}
