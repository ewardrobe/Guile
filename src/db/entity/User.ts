import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  ObjectID,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @ObjectIdColumn()
  public id: ObjectID;

  @Column({
    length: 150,
    type: 'varchar',
  })
  public firstName: string;

  @Column({
    length: 150,
    type: 'varchar',
  })
  public lastName: string;

  @Column({
    length: 150,
    type: 'varchar',
    unique: true,
  })
  public username: string;

  @Column({
    length: 150,
    type: 'varchar',
  })
  public email: string;

  @Column({
    length: 150,
    type: 'varchar',
  })
  public password: string;

  @Column()
  public dateOfBirth: Date;

  @CreateDateColumn()
  public createdDate: Date;

  @UpdateDateColumn()
  public lastUpdated: Date;

  @Column({
    default: false,
  })
  public isAdmin: boolean = false;

  public async generateAuthToken(): Promise<string> {
    const token = await jwt.sign({
      _id: this.id,
      _isAdmin: this.isAdmin
    }, 'eWardrobeSecret');

    return token;
  }

  @BeforeInsert()
  public async hashPassword(): Promise<void> {
    if (this.password) {
      const salt = await bcrypt.genSalt();
      this.password = await bcrypt.hash(this.password, salt);
    }
  }
}
