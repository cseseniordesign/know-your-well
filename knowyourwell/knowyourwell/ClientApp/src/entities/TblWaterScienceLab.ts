import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { TblFieldActivity } from "./TblFieldActivity";

@Index("PK_tblWaterScienceLab", ["watersciencelabId"], { unique: true })
@Entity("tblWaterScienceLab", { schema: "dbo" })
export class TblWaterScienceLab {
  @PrimaryGeneratedColumn({ type: "int", name: "watersciencelab_id" })
  watersciencelabId: number;

  @Column("nvarchar", { name: "wsl_samplecode", length: 255 })
  wslSamplecode: string;

  @Column("decimal", { name: "wsl_nh4n", precision: 8, scale: 2 })
  wslNh4n: number;

  @Column("decimal", { name: "wsl_no3no2n", precision: 8, scale: 2 })
  wslNo3no2n: number;

  @Column("decimal", { name: "wsl_conductivity", precision: 8, scale: 2 })
  wslConductivity: number;

  @Column("decimal", { name: "wsl_ph", precision: 8, scale: 2 })
  wslPh: number;

  @Column("nvarchar", { name: "wsl_pesticides", nullable: true, length: 255 })
  wslPesticides: string | null;

  @Column("decimal", { name: "wsl_chloride", precision: 8, scale: 2 })
  wslChloride: number;

  @Column("decimal", { name: "wsl_orthophosphate", precision: 8, scale: 2 })
  wslOrthophosphate: number;

  @Column("decimal", { name: "wsl_sulfate", precision: 8, scale: 2 })
  wslSulfate: number;

  @Column("decimal", { name: "wsl_bromide", precision: 8, scale: 2 })
  wslBromide: number;

  @Column("decimal", { name: "wsl_fluoride", precision: 8, scale: 2 })
  wslFluoride: number;

  @Column("decimal", { name: "wsl_copper", precision: 8, scale: 2 })
  wslCopper: number;

  @Column("decimal", { name: "wsl_iron", precision: 8, scale: 2 })
  wslIron: number;

  @Column("decimal", { name: "wsl_manganese", precision: 8, scale: 2 })
  wslManganese: number;

  @Column("decimal", { name: "wsl_uranium", precision: 8, scale: 2 })
  wslUranium: number;

  @Column("decimal", { name: "wsl_arsenic", precision: 8, scale: 2 })
  wslArsenic: number;

  @Column("decimal", { name: "wsl_hardness", precision: 8, scale: 2 })
  wslHardness: number;

  @Column("decimal", { name: "wsl_calcium", precision: 8, scale: 2 })
  wslCalcium: number;

  @Column("nvarchar", { name: "wsl_magnesium", length: 255 })
  wslMagnesium: string;

  @Column("nvarchar", { name: "wsl_totalcoliform", length: 255 })
  wslTotalcoliform: string;

  @Column("nvarchar", { name: "wsl_ecoli", length: 255 })
  wslEcoli: string;

  @Column("nvarchar", { name: "wsl_comments", nullable: true })
  wslComments: string | null;

  @Column("datetime", { name: "wsl_dateentered", default: () => "getdate()" })
  wslDateentered: Date;

  @OneToMany(
    () => TblFieldActivity,
    (tblFieldActivity) => tblFieldActivity.watersciencelab
  )
  tblFieldActivities: TblFieldActivity[];
}
