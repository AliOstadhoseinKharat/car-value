import { Report } from 'src/reports/Report.entity';
import {
  AfterInsert,
  AfterUpdate,
  AfterRemove,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: true })
  admin: boolean;

  //*** One to many relationship with Reports */
  @OneToMany(() => Report, (report) => report.user)
  reports: Report[];

  @AfterInsert()
  logInsert() {
    console.log('New user inserted !');
  }

  @AfterUpdate()
  logUpdate() {
    console.log('Specific user updated !');
  }

  @AfterRemove()
  logRemove() {
    console.log('Specific user deleted !');
  }
}
