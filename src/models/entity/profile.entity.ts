import { Entity, BaseEntity, PrimaryColumn, Column } from "typeorm";

@Entity({ name: "Profiles" })
export class Profile extends BaseEntity {
  @PrimaryColumn({ type: "uuid", name: "ProfileID" })
  id!: string;

  @Column({ type: "varchar", length: 64, unique: true, name: "Username" })
  username!: string;

  @Column({ type: "varchar", length: 64, name: "Firstname" })
  firstname!: string;

  @Column({ type: "varchar", length: 64, name: "Lastname" })
  lastname!: string;

  @Column({ type: "int", name: "Age" })
  age!: number;

  @Column({
    type: "varchar",
    enum: ["male", "female"],
    length: "6",
    name: "Gender",
  })
  gender!: string;

  @Column({ type: "int", name: "AverageRating" })
  averageRating!: number;

  @Column({ type: "text", name: "ProfilePicture" })
  profilePicture!: string;
}
