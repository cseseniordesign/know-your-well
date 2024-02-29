import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { TblFieldActivity } from "./TblFieldActivity";

@Index("PK_tblClassroomLab", ["classlabId"], { unique: true })
@Entity("tblClassroomLab", { schema: "dbo" })
export class TblClassroomLab {
  @PrimaryGeneratedColumn({ type: "int", name: "classlab_id" })
  classlabId!: number;

  @Column("decimal", {
    name: "cl_ammonia",
    nullable: true,
    precision: 8,
    scale: 2,
  })
  clAmmonia: number | null | undefined;

  @Column("decimal", {
    name: "cl_calciumhardness",
    nullable: true,
    precision: 8,
    scale: 2,
  })
  clCalciumhardness: number | null | undefined;

  @Column("decimal", {
    name: "cl_chloride",
    nullable: true,
    precision: 8,
    scale: 2,
  })
  clChloride: number | null | undefined;

  @Column("nvarchar", { name: "cl_bacteria", nullable: true, length: 255 })
  clBacteria: string | null | undefined;

  @Column("decimal", {
    name: "cl_copper",
    nullable: true,
    precision: 8,
    scale: 2,
  })
  clCopper: number | null | undefined;

  @Column("decimal", {
    name: "cl_iron",
    nullable: true,
    precision: 8,
    scale: 2,
  })
  clIron: number | null | undefined;

  @Column("decimal", {
    name: "cl_manganese",
    nullable: true,
    precision: 8,
    scale: 2,
  })
  clManganese: number | null | undefined;

  @Column("decimal", {
    name: "cl_nitrate",
    nullable: true,
    precision: 8,
    scale: 2,
  })
  clNitrate: number | null | undefined;

  @Column("nvarchar", { name: "cl_observation", nullable: true })
  clObservation: string | null | undefined;

  @Column("decimal", {
    name: "cl_nitrite",
    nullable: true,
    precision: 8,
    scale: 2,
  })
  clNitrite: number | null | undefined;

  @Column("nvarchar", { name: "cl_pest_atrazine", nullable: true, length: 255 })
  clPestAtrazine: string | null | undefined;

  @Column("nvarchar", { name: "cl_datacollector", nullable: true, length: 255 })
  clDatacollector: string | null | undefined;

  @Column("nvarchar", { name: "cl_comments", nullable: true })
  clComments: string | null | undefined;

  @Column("datetime", { name: "cl_datecollected", default: () => "getdate()" })
  clDatecollected!: Date;

  @OneToMany(
    () => TblFieldActivity,
    (tblFieldActivity) => tblFieldActivity.classlab
  )
  tblFieldActivities!: TblFieldActivity[];
}
