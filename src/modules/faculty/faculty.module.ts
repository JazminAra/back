import { Module } from '@nestjs/common';
import { FacultyService } from './services/faculty.service';
import { FacultyController } from './controllers/faculty.controller';
import { facultyProviders } from './faculty.provider';

@Module({
  controllers: [FacultyController],
  providers: [FacultyService, ...facultyProviders],
})
export class FacultyModule {}
