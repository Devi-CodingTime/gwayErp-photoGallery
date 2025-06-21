import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Photo } from './photo.model';

@Injectable()
export class PhotosService {
  constructor(
    @InjectModel(Photo.name) private readonly photoModel: Model<Photo>
  ) {}

  async uploadPhoto(
    filename: string,
    caption: string,
    uploadedBy: string,
    albumId?: string
  ) {
    const photo = new this.photoModel({
      filename,
      caption,
      uploadedBy,
      albumId,
    });
    return photo.save();
  }

  async getAllPhotos() {
    console.log('Fetching all photos');
    const photos = await this.photoModel.find().sort({ createdAt: -1 }).exec();
    if (photos.length === 0) {  
      throw new NotFoundException('No photos found');
    }
    console.log('Photos fetched successfully', photos[0]);
    
    return this.photoModel.find().sort({ createdAt: -1 }).exec();
  }

  async getPhotosByAlbumId(albumId: string) {
    const photos = await this.photoModel.find({ albumId }).populate('albumId').sort({ createdAt: -1 }).exec();
    if (photos.length === 0) {
      throw new NotFoundException('No photos found for this album');
    }
    return photos;
  }

  async searchPhotos(query: string) {
    return this.photoModel.find({
      $or: [
        { caption: { $regex: query, $options: 'i' } },
        { albumId: query },
      ],
    });
  }


//    async getPhotoByFilename(filename: string) {
//     const photo = await this.photoModel.findOne({ filename });
//     if (!photo) throw new NotFoundException('Photo not found');
//     return photo;
//   }

//   async verifyPhotoAccess(filename: string, userId: string) {
//     const photo = await this.getPhotoByFilename(filename);
//     if (photo.uploadedBy !== userId) {
//       throw new ForbiddenException('You are not allowed to access this photo');
//     }
//     return photo;
//   }
}
