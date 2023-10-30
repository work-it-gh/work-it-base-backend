import {
  Entity,
  BaseEntity,
  PrimaryColumn,
  Column,
  JoinColumn,
  OneToOne,
} from "typeorm";
import { Service } from "./service.entity";

@Entity({ name: "review" })
export class Review extends BaseEntity {
  @PrimaryColumn("uuid")
  id!: string;

  @Column({ type: "varchar", length: 4096 })
  message!: string;

  @Column({ type: "int4" })
  rating!: number;

  @OneToOne(() => Service)
  @JoinColumn()
  service!: Service;
}
