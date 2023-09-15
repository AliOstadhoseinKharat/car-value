import { Injectable } from '@nestjs/common';
import { User } from './users.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private repo: Repository<User>) { }


    //*** create method */
    create(body: Partial<User>) {

        //*** Make a new instance of a user entity but does not persist it to the DB */
        const user = this.repo.create({ ...body })

        //*** Save to DB */
        return this.repo.save(user);
    }


    //*** find one method */
    findOne(id: number) {
        return this.repo.findOne({ where: { id } });
    }
    //*** find By email */
    find(email: string) {
        return this.repo.find({ where: { email } })
    }

    //*** Update users method */
    async update(id: number, attrs: Partial<User>) {

        //?? Find instance of user
        const user = await this.findOne(id);

        //?? Check to find the user
        if (!user) {
            throw new Error("User not found !")
        }

        //?? Assign two objects
        Object.assign(user, attrs);

        //?? Save changes
        return this.repo.save(user);


    }


    //*** Remove users method */
    async remove(id: number) {
        //?? find instance of user
        const user = await this.findOne(id);


        //?? Check to find the user
        if (!user) {
            throw new Error("User not found !")
        }


        //?? remove user
        return this.repo.remove(user);
    }

}
