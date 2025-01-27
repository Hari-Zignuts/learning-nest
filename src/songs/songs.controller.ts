import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

@Controller('songs')
export class SongsController {
  @Get()
  findAll() {
    return 'This action returns all songs';
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action returns a #${id} song`;
  }

  @Post()
  create() {
    return 'This action adds a new song';
  }

  @Put(':id')
  update(@Param('id') id: string) {
    return `This action updates a #${id} song`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} song`;
  }
}
