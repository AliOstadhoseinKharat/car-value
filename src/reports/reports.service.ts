import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from './Report.entity';
import { CreateReportDto } from './dtos/create-report.dto';
import { User } from 'src/users/users.entity';

@Injectable()
export class ReportsService {
  constructor(@InjectRepository(Report) private repo: Repository<Report>) {}

  //**** Create report into DB */
  public create(body: CreateReportDto, user: User) {
    //*** Create instance of report */
    const report = this.repo.create(body);

    //*** Report associate to specific user */
    report.user = user;

    //*** save to DB */
    return this.repo.save(report);
  }

  //*** Change approval specific report */
  async changeApproval(id: string, approved: boolean) {
    const report = await this.repo.findOne({ where: { id: +id } });

    //*** Check report find or not */
    if (!report) {
      throw new NotFoundException('report not found !');
    }

    // Change approved value
    report.approved = approved;

    return this.repo.save(report);
  }
}
