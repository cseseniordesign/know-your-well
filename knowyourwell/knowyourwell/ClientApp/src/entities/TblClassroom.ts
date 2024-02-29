import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { TblSchool } from "./TblSchool";

@Index("PK_tblClassroom", ["classroomId"], { unique: true })
@Entity("tblClassroom", { schema: "dbo" })
export class TblClassroom {
  @PrimaryGeneratedColumn({ type: "int", name: "classroom_id" })
  classroomId!: number;

  @Column("nvarchar", { name: "cl_name", length: 255 })
  clName!: string;

  @Column("nvarchar", { name: "cl_firstname", length: 255 })
  clFirstname!: string;

  @Column("nvarchar", { name: "cl_lastname", length: 255 })
  clLastname!: string;

  @Column("nvarchar", { name: "cl_email", length: 255 })
  clEmail!: string;

  @Column("nvarchar", { name: "cl_comments", nullable: true })
  clComments: string | null | undefined;

  @Column("datetime", { name: "cl_dateentered", default: () => "getdate()" })
  clDateentered!: Date;

  @ManyToOne(() => TblSchool, (tblSchool) => tblSchool.tblClassrooms)
  @JoinColumn([{ name: "school_id", referencedColumnName: "schoolId" }])
  school!: TblSchool;
}
