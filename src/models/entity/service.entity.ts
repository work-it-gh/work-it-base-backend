import {
  Entity,
  BaseEntity,
  PrimaryColumn,
  Column,
  JoinColumn,
  OneToOne,
} from "typeorm";
import { User } from "./user.entity";

@Entity({ name: "service" })
export class Service extends BaseEntity {
  @PrimaryColumn({ type: "uuid" })
  id!: string;

  @Column({ type: "varchar", length: 255 })
  title!: string;

  @Column({ type: "varchar", length: 4096 })
  description!: string;

  @Column({ type: "date" })
  date!: Date;

  @Column({
    type: "varchar",
    enum: ["active", "pending", "completed"],
    length: 15,
  })
  status!: string;

  @OneToOne(() => User)
  @JoinColumn()
  client!: User;

  @OneToOne(() => User)
  @JoinColumn()
  serviceProvider!: User;
}
