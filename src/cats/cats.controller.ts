import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Post,
  Put,
  Redirect,
  UseFilters,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';
import { JoiValidationPipe } from 'src/pipes/validation.pipe';
import { ParseIntPipe } from 'src/pipes/parse-int.pipe';
import { CatsService } from './cats.service';
import { CreateCatDto, UpdateCatDto } from './dto/cat.dto';
import { Cat } from './interfaces/cat.interface';
import { createCatSchema } from './schema/cat.schema';
import { RoleGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { LoggingInspector } from 'src/interceptors/logging.interceptor';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';

@Controller('cats')
@UseGuards(RoleGuard)
@UseInterceptors(LoggingInspector)
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  @Roles('admin')
  @UseFilters(new HttpExceptionFilter())
  @UsePipes(new JoiValidationPipe(createCatSchema))
  async create(@Body() createCatDto: CreateCatDto) {
    // UseFiltersはどの条件だと動くのかまだ謎...
    if (!createCatDto) {
      throw new ForbiddenException();
    }

    this.catsService.create(createCatDto);
  }

  @Get()
  @UseInterceptors(TransformInterceptor)
  async findAll(): Promise<Cat[]> {
    const cats = this.catsService.findAll();

    // if (!cats.length) {
    //   throw new HttpException('There is NO Cats...', HttpStatus.FORBIDDEN);
    // }

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
