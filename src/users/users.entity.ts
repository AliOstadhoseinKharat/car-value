import { AfterInsert, AfterUpdate, AfterRemove, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  @AfterInsert()
  logInsert() {
    console.log('New user inserted !')
  }
  
  @AfterUpdate()
  logUpdate() {
    console.log('Specific user updated !')
  }
  
  @AfterRemove()
  logRemove() {
    console.log('Specific user deleted !')
  }
}
