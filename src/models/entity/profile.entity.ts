import {
  Entity,
  BaseEntity,
  PrimaryColumn,
  Column,
  JoinColumn,
  OneToOne,
} from "typeorm";
import { User } from "./user.entity";

@Entity({ name: "profile" })
export class Profile extends BaseEntity {
  @PrimaryColumn({ type: "uuid" })
  id!: string;

  @Column({ type: "varchar", length: 64, unique: true })
  username!: string;

  @Column({ type: "varchar", length: 64 })
  firstname!: string;

  @Column({ type: "varchar", length: 64 })
  lastname!: string;

  @Column({ type: "int" })
  age!: number;

  @Column({ type: "varchar", enum: ["male", "female"], length: "6" })
  gender!: string;

  @Column({ type: "int" })
  averageRating!: number;

  @Column({
    type: "varchar",
    length: 15,
    enum: ["client", "cleaner", "electrician", "worker"],
  })
  role!: string;

  @Column({ type: "text" })
  profilePicture!: string;

  @OneToOne(() => User)
  @JoinColumn()
  user!: User;
}
