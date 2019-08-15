import {Entity, ObjectIdColumn, ObjectID, Column} from "typeorm";

@Entity()
export class User {

    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    forename: string;

    @Column()
    surname: string;

    @Column()
    dateOfBirth: string;

}
