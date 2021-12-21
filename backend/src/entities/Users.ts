import {Entity, PrimaryColumn, Column,CreateDateColumn, UpdateDateColumn} from "typeorm";
import { Exclude } from "class-transformer";
import {v4 as uuid} from "uuid";

@Entity("users")
class Users {

    @PrimaryColumn()
    readonly id_user: string;    

    @Column()
    email:string;

    @Exclude()
    @Column()
    password:string;

    @Column()
    name:string;

    @Column({
        type:'char',
        precision: 11
    })
    identity:string;

    @Column({type:'date'})
    date_birth:Date;

    @Column()
    address:string;

    @Column()
    number:string;

    @Column()
    district:string;

    @Column()
    city:string;

    @Column()
    state:string;

    @Column()
    admin:boolean;

    @CreateDateColumn()
    created_at:Date;

    @UpdateDateColumn()
    updated_at:Date;

    constructor() {
        if(!this.id_user){
            this.id_user = uuid();
        }
    }
}



export {Users};
