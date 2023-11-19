import {
  Body,
  Controller,
  Patch,
  Post,
  UseGuards,
  Param,
} from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto';
import { AuthGuard } from '../guards/auth.guard';
import { ReportsService } from './reports.service';
import { CurrentUserDecorator } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/users.entity';
import { serialize } from 'src/interceptors/serialize.interceptor';
import { ReportDto } from './dtos/report.dto';
import { ApproveReportDto } from './dtos/approve-report.dto';

@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  //**** Create report with specific user */
  @Post()
  @serialize(ReportDto)
  @UseGuards(AuthGuard)
  createReport(
    @Body() body: CreateReportDto,
    @CurrentUserDecorator() user: User,
  ) {
    return this.reportsService.create(body, user);
  }

  //**** Patch method for approval reports */
  @Patch('/:id')
  @UseGuards(AuthGuard)
  changeApproved(@Body() body: ApproveReportDto, @Param('id') id: string) {
    return this.reportsService.changeApproval(id, body.approved);
  }
}
