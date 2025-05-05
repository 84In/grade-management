import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Subject } from './entities/subject.entity';
import { Repository } from 'typeorm';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';

@Injectable()
export class SubjectService {
  constructor(
    @InjectRepository(Subject)
    private readonly subjectRepo: Repository<Subject>,
  ) {}

  async createSubject(dto: CreateSubjectDto): Promise<Subject> {
    const subject = this.subjectRepo.create();
    const existing = await this.subjectRepo.findOne({
      where: { code: dto.code },
    });
    if (existing) {
      throw new ConflictException('Subject already in use');
    }
    return this.subjectRepo.save(subject);
  }

  async findAllSubject(): Promise<Subject[]> {
    return this.subjectRepo.find();
  }

  async updateSubject(id: string, dto: UpdateSubjectDto): Promise<Subject> {
    const subject = await this.subjectRepo.findOne({
      where: { id },
    });
    if (!subject) {
      throw new NotFoundException('Subject not found');
    }
    Object.assign(subject, dto);
    return this.subjectRepo.save(subject);
  }

  async findSubjectById(id: string): Promise<Subject> {
    const subject = await this.subjectRepo.findOne({
      where: { id },
    });
    if (!subject) {
      throw new NotFoundException('Subject not found');
    }

    return subject;
  }

  async findSubjectByCode(code: string): Promise<Subject> {
    const subject = await this.subjectRepo.findOne({
      where: { code },
    });
    if (!subject) {
      throw new NotFoundException('Subject not found');
    }

    return subject;
  }

  async remove(id: string): Promise<void> {
    const subject = await this.subjectRepo.findOne({ where: { id } });
    if (subject) {
      await this.subjectRepo.remove(subject);
    }
  }
}
