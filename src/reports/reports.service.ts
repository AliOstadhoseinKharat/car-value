import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from './Report.entity';
import { CreateReportDto } from './dtos/create-report.dto';

@Injectable()
export class ReportsService {
  constructor(@InjectRepository(Report) private repo: Repository<Report>) {}

  public create(body: CreateReportDto) {
    //*** Create instance of report */
    const report = this.repo.create(body);

    //*** save to DB */
    return this.repo.save(report);
  }
}
