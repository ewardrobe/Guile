import {Entity, ObjectIdColumn, ObjectID, Column, BaseEntity, CreateDateColumn, UpdateDateColumn} from "typeorm";
import jwt from "jsonwebtoken";

@Entity()
export class User extends BaseEntity {

    @ObjectIdColumn()
    id: ObjectID;

    @Column({
        type: "varchar",
        length: 150,
    })
    firstName: string;

    @Column({
        type: "varchar",
        length: 150,
    })
    lastName: string;

    @Column({
        type: "varchar",
        length: 150,
        unique: true
    })
    username: string;

    @Column({
        type: "varchar",
        length: 150,
    })  
    email: string;

    @Column({
        type: "varchar",
        length: 150,
    })
    password: string;

    @Column()
    dateOfBirth: Date;

    @CreateDateColumn()
    createdDate: Date

    @UpdateDateColumn()
    lastUpdated: Date
    
    async generateAuthToken() {
        let token = await jwt.sign({ _id: this.id }, 'eWardrobeSecret');
        
        return token;
    }
}
