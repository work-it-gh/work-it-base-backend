import {
  Entity,
  BaseEntity,
  Column,
  PrimaryColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { User } from "./user.entity";

@Entity({ name: "Services" })
export class Service extends BaseEntity {
  @PrimaryColumn({ type: "uuid", name: "ServiceID" })
  id!: string;

  @Column({ type: "varchar", length: "255", name: "Title" })
  title!: string;

  @Column({ type: "varchar", length: 4096, name: "Description" })
  description!: string;

  @Column({ type: "varchar", length: 64, name: "Date" })
  date!: string;

  @Column({
    type: "varchar",
    length: 16,
    enum: ["active", "completed", "assigned"],
    default: "active",
    name: "Status",
  })
  status!: string;

  // @Column({ type: "uuid", name: "ClientID", nullable: true })
  // cliendId!: string;

  // @Column({ type: "uuid", name: "WorkerID", nullable: true })
  // workerId!: string;

  // @ManyToOne(() => User)
  // client!: User;

  // @ManyToOne(() => User)
  // worker!: User;

  @ManyToOne(() => User, (user) => user.clientServices, { onDelete: "CASCADE" })
  client!: User;

  @ManyToOne(() => User, (user) => user.workerServices, {
    onDelete: "SET NULL",
  })
  worker!: User;
}
