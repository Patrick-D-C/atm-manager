import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

import { v4 as uuid } from "uuid";
import { Operations } from "./Operations";
import { Users } from "./Users";

@Entity("packages")
export class Packages {
  @PrimaryColumn()
  readonly id_package: string;

  @Column()
  operation_id: string;

  @JoinColumn({ name: "operation_id" })
  @ManyToOne(() => Operations)
  operation: Operations;

  @Column()
  client_id: string;

  @JoinColumn({ name: "client_id" })
  @ManyToOne(() => Users)
  client: Users;

  @Column({ type: "char", precision: 1 })
  type_note: number;

  @Column({ type: "char", precision: 2 })
  quantity_notes: number;

  @Column({ type: "decimal", precision: 5 })
  value: number;

  @Column({ type: "char", precision: 1 })
  status: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  closed_at: Date;

  constructor() {
    if (!this.id_package) {
      this.id_package = uuid();
    }
  }
}
