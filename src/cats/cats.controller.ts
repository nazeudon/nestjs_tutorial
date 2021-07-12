import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Redirect,
  UseFilters,
  UsePipes,
} from '@nestjs/common';
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';
import { JoiValidationPipe } from 'src/pipes/validation.pipe';
import { ParseIntPipe } from 'src/pipes/parse-int.pipe';
import { CatsService } from './cats.service';
import { CreateCatDto, UpdateCatDto } from './dto/cat.dto';
import { Cat } from './interfaces/cat.interface';
import { createCatSchema } from './schema/cat.schema';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  @UseFilters(new HttpExceptionFilter())
  @UsePipes(new JoiValidationPipe(createCatSchema))
  async create(@Body() createCatDto: CreateCatDto) {
    // UseFiltersはどの条件だと動くのかまだ謎...
    if (!createCatDto) {
      throw new ForbiddenException();
    }

    this.catsService.create(createCatDto);
  }

  // @Get()
  // findAll(@Req() request: Request): string {
  //   console.log(request);
  //   return 'This action returns all cats';
  // }

  // @Get()
  // findAll(@Query() query: ListAllEntities) {
  //   return `This action returns all cats (limit: ${query.limit} items)`;
  // }

  @Get()
  async findAll(): Promise<Cat[]> {
    const cats = this.catsService.findAll();

    if (!cats.length) {
      throw new HttpException('There is NO Cats...', HttpStatus.FORBIDDEN);
    }

    return cats;
  }

  @Get('docs')
  @Redirect('https://docs.nestjs.com', 302)
  getDocs() {
    return null;
  }

  @Get(':id')
  async findOne(@Param('id', new ParseIntPipe()) id: number): Promise<string> {
    return `This action returns a #${id} cat`;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    console.log(updateCatDto);

    return `This action updates a #${id} cat`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} cat`;
  }
}
