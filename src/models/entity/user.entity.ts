import { Entity, BaseEntity, PrimaryColumn, Column } from "typeorm";

@Entity({ name: "user" })
export class User extends BaseEntity {
  @PrimaryColumn({ type: "uuid" })
  id!: string;

  @Column({ type: "varchar", length: 255, unique: true, nullable: false })
  email!: string;

  @Column({ type: "varchar", length: 20, unique: true, nullable: false })
  phone!: string;

  @Column({ type: "text" })
  password!: string;

  @Column({ type: "boolean", default: false })
  accountVerified!: boolean;
}
