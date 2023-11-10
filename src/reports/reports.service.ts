import { Injectable } from '@nestjs/common';

@Injectable()
export class ReportsService {
  public create(body: any) {
    console.log(`report controller work! with body : `, body);
  }
}
