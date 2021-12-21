import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { Packages } from "./Packages";
import { Users } from "./Users";

@Entity("operations")
class Operations {
  @PrimaryColumn()
  readonly id_operation: string;

  @Column()
  parent_id: string;

  @JoinColumn({ name: "parent_id" })
  @ManyToOne(() => Operations)
  parent: Operations;

  //Busca inversa
  @OneToMany(() => Operations, (operation) => operation.parent)
  children_operation: Operations[];

  @Column()
  client_id: string;

  @JoinColumn({ name: "client_id" })
  @ManyToOne(() => Users)
  client: Users;

  @Column({ type: "decimal", precision: 5, scale: 2, default: 0.0 })
  value: number;

  @Column({ type: "char", precision: 1 })
  pref_note: number;

  @Column({ type: "char", precision: 1 })
  status: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;


  //Busca inversa
  @OneToMany(() => Packages, (Epackage) => Epackage.operation)
  packages: Packages[];

  constructor() {
    if (!this.id_operation) {
      this.id_operation = uuid();
    }
  }
}

export { Operations };
