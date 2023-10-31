import {
  Entity,
  BaseEntity,
  PrimaryColumn,
  Column,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { Profile } from "./profile.entity";

@Entity({ name: "Users" })
export class User extends BaseEntity {
  @PrimaryColumn({ type: "uuid", name: "UserID" })
  id!: string;

  @Column({
    type: "varchar",
    length: 255,
    unique: true,
    nullable: false,
    name: "Email",
  })
  email!: string;

  @Column({
    type: "varchar",
    length: 20,
    unique: true,
    nullable: false,
    name: "Phone",
  })
  phone!: string;

  @Column({ type: "text", name: "Password" })
  password!: string;

  @Column({ type: "boolean", default: false, name: "AccountVerified" })
  accountVerified!: boolean;

  @OneToOne(() => Profile, { onDelete: "SET NULL" })
  @JoinColumn({ name: "ProfileID" })
  profile!: Profile;
}
