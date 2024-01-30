import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { TblWellInfo } from "./TblWellInfo";

@Index("PK_tblWellForm", ["wellformId"], { unique: true })
@Entity("tblWellForm", { schema: "dbo" })
export class TblWellForm {
  @PrimaryGeneratedColumn({ type: "int", name: "wellform_id" })
  wellformId: number;

  @Column("nvarchar", { name: "wform_type", length: 100 })
  wformType: string;

  @Column("nvarchar", {
    name: "wform_datacollector",
    nullable: true,
    length: 255,
  })
  wformDatacollector: string | null;

  @Column("nvarchar", { name: "wform_observation", nullable: true })
  wformObservation: string | null;

  @Column("nvarchar", { name: "wform_filename", nullable: true, length: 255 })
  wformFilename: string | null;

  @Column("nvarchar", { name: "wform_comments", nullable: true })
  wformComments: string | null;

  @Column("datetime", {
    name: "wform_datecollected",
    default: () => "getdate()",
  })
  wformDatecollected: Date;

  @ManyToOne(() => TblWellInfo, (tblWellInfo) => tblWellInfo.tblWellForms)
  @JoinColumn([{ name: "well_id", referencedColumnName: "wellId" }])
  well: TblWellInfo;
}
