import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { SubjectService } from './subject.service';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { success } from 'src/common/helpers/response.helper';

@Controller('subject')
@UseGuards(JwtAuthGuard, RolesGuard)
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @Post()
  @Roles('Admin')
  create(@Body() dto: CreateSubjectDto) {
    return success(
      'Create subject succes!',
      this.subjectService.createSubject(dto),
    );
  }

  @Get()
  findAll() {
    return success(
      'Get all subject success!',
      this.subjectService.findAllSubject(),
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return success(
      `Get subject ${id} success!`,
      this.subjectService.findSubjectById(id),
    );
  }

  @Patch(':id')
  @Roles('Admin')
  update(@Param('id') id: string, @Body() dto: UpdateSubjectDto) {
    return success(
      `Update subject ${id} success!`,
      this.subjectService.updateSubject(id, dto),
    );
  }

  @Delete(':id')
  @Roles('Admin')
  remove(@Param('id') id: string) {
    return success('Remove subject success', this.subjectService.remove(id));
  }
}
