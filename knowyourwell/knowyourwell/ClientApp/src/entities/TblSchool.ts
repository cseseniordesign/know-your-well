import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { TblClassroom } from "./TblClassroom";
import { TblNrdLookup } from "./TblNrdLookup";
import { TblWellInfo } from "./TblWellInfo";

@Index("PK_tblSchool", ["schoolId"], { unique: true })
@Entity("tblSchool", { schema: "dbo" })
export class TblSchool {
  @PrimaryGeneratedColumn({ type: "int", name: "school_id" })
  schoolId!: number;

  @Column("nvarchar", { name: "sch_name", length: 255 })
  schName!: string;

  @Column("nvarchar", { name: "sch_code", length: 3 })
  schCode!: string;

  @Column("nvarchar", { name: "sch_address", nullable: true, length: 255 })
  schAddress: string | null | undefined;

  @Column("decimal", {
    name: "sch_latitude",
    nullable: true,
    precision: 10,
    scale: 5,
  })
  schLatitude: number| null | undefined;

  @Column("decimal", {
    name: "sch_longitude",
    nullable: true,
    precision: 10,
    scale: 5,
  })
  schLongitude: number| null | undefined;

  @Column("bit", { name: "sch_activeflag", default: () => "(1)" })
  schActiveflag!: boolean;

  @Column("datetime", { name: "sch_datedeactivated", nullable: true })
  schDatedeactivated: Date | null | undefined;

  @Column("nvarchar", { name: "sch_comments", nullable: true })
  schComments: string | null | undefined;

  @Column("datetime", { name: "sch_dateentered", default: () => "getdate()" })
  schDateentered!: Date;

  @OneToMany(() => TblClassroom, (tblClassroom) => tblClassroom.school)
  tblClassrooms!: TblClassroom[];

  @ManyToOne(() => TblNrdLookup, (tblNrdLookup) => tblNrdLookup.tblSchools)
  @JoinColumn([{ name: "nrd_id", referencedColumnName: "nrdId" }])
  nrd: TblNrdLookup | undefined;

  @OneToMany(() => TblWellInfo, (tblWellInfo) => tblWellInfo.school)
  tblWellInfos!: TblWellInfo[];
}
