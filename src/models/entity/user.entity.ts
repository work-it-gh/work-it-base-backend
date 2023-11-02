import {
  Entity,
  BaseEntity,
  PrimaryColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { Profile } from "./profile.entity";
import { Service } from "./service.entity";

@Entity({ name: "Users" })
export class User extends BaseEntity {
  @PrimaryColumn({ type: "uuid", name: "UserID" })
  id!: string;

  @Column({
    type: "varchar",
    length: 255,
    nullable: false,
    name: "Email",
  })
  email!: string;

  @Column({
    type: "varchar",
    length: 20,
    nullable: false,
    name: "Phone",
  })
  phone!: string;

  @Column({ type: "text", name: "Password" })
  password!: string;

  @Column({ type: "boolean", default: false, name: "AccountVerified" })
  accountVerified!: boolean;

  @Column({
    type: "varchar",
    length: 15,
    enum: ["client", "cleaner", "electrician", "cobbler", "worker", "admin"],
    name: "Role",
  })
  role!: string;

  @OneToOne(() => Profile, { onDelete: "SET NULL" })
  @JoinColumn({ name: "ProfileID" })
  profile!: Profile;

  @OneToMany(() => Service, (service) => service.client, {
    onDelete: "SET NULL",
  })
  clientServices!: Service[];

  @OneToMany(() => Service, (service) => service.worker, {
    onDelete: "SET NULL",
  })
  workerServices!: Service[];

  @OneToMany(() => Service, (service) => service.assignedBy)
  adminServicesAssigned!: Service[];
}
