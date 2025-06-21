import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AlbumsService } from './albums.service';

@Controller('albums')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body('title') title: string, @Req() req: any) {
    return this.albumsService.create(title, req.user.userId);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  getUserAlbums(@Req() req: any) {
    return this.albumsService.getAlbumsByUserId(req.user.userId);
  }
}
