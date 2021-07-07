import { Controller, Get, Param, Post, Redirect, Req } from '@nestjs/common';
import { Request } from 'express';

interface Params {
  id: number;
}

@Controller('cats')
export class CatsController {
  @Post()
  create(): string {
    return 'This action adds a new cat';
  }

  @Get()
  findAll(@Req() request: Request): string {
    console.log(request);

    return 'This action returns all cats';
  }

  @Get(':id')
  findOne(@Param() params: Params): string {
    console.log(params.id);
    return `This action returns a #${params.id} cat`;
  }

  @Get('docs')
  @Redirect('https://docs.nestjs.com', 302)
  getDocs() {
    return null;
  }
}
