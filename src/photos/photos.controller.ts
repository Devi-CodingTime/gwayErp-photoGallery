import { Controller, Post, UseInterceptors, UploadedFile, Body, Get, UseGuards, Req, Query, Param } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { PhotosService } from './photos.service';
import { AuthGuard } from '@nestjs/passport';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';

@Controller('photos')
export class PhotosController {
  constructor(private readonly photosService: PhotosService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const filename = uuidv4() + path.extname(file.originalname);
          cb(null, filename);
        },
      }),
    }),
  )
  async uploadPhoto(
    @UploadedFile() file: Express.Multer.File,
    @Body('caption') caption: string,
    @Body('albumId') albumId: string,
    @Req() req: any,
  ) {
    return this.photosService.uploadPhoto(file.filename, caption, req.user.userId, albumId);
  }
  @Get()
@UseGuards(AuthGuard('jwt'))
async getPhotos(@Query('q') query?: string) {
  if (query) {
    return this.photosService.searchPhotos(query);
  }
  return this.photosService.getAllPhotos();
}

  @Get(':id')
  async getPhotoByAlbumId(@Param('id') id: string) {
    return this.photosService.getPhotosByAlbumId(id);
  }

}
