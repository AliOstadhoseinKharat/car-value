import {
  Body,
  Controller,
  Patch,
  Post,
  UseGuards,
  Param,
  Get,
  Query,
} from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto';
import { AuthGuard } from '../guards/auth.guard';
import { AdminGuard } from '../guards/admin.guard';
import { ReportsService } from './reports.service';
import { CurrentUserDecorator } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/users.entity';
import { serialize } from 'src/interceptors/serialize.interceptor';
import { ReportDto } from './dtos/report.dto';
import { ApproveReportDto } from './dtos/approve-report.dto';
import { GetEstimateDto } from './dtos/get-estimate.dto';

@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  //***‌ Get reports list with specific query params filters */
  @Get('/')
  getEstimate(@Query() query: GetEstimateDto) {
    console.log(query);
  }

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
  @UseGuards(AuthGuard, AdminGuard)
  changeApproved(@Body() body: ApproveReportDto, @Param('id') id: string) {
    return this.reportsService.changeApproval(id, body.approved);
  }
}
