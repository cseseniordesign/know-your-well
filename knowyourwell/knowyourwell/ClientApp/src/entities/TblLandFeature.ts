import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { TblWellInfo } from "./TblWellInfo";

@Index("PK_tblLandFeature", ["landfeatureId"], { unique: true })
@Entity("tblLandFeature", { schema: "dbo" })
export class TblLandFeature {
  @PrimaryGeneratedColumn({ type: "int", name: "landfeature_id" })
  landfeatureId!: number;

  @Column("nvarchar", { name: "lf_type", length: 100 })
  lfType!: string;

  @Column("decimal", { name: "lf_latitude", precision: 10, scale: 5 })
  lfLatitude!: number;

  @Column("decimal", { name: "lf_longitude", precision: 10, scale: 5 })
  lfLongitude!: number;

  @Column("decimal", { name: "lf_genlatitude", precision: 10, scale: 3 })
  lfGenlatitude!: number;

  @Column("decimal", { name: "lf_genlongitude", precision: 10, scale: 3 })
  lfGenlongitude!: number;

  @Column("nvarchar", { name: "lf_datacollector", nullable: true, length: 255 })
  lfDatacollector: string | null | undefined;

  @Column("nvarchar", { name: "lf_observation", nullable: true })
  lfObservation: string | null | undefined;

  @Column("nvarchar", { name: "lf_filename", nullable: true, length: 255 })
  lfFilename: string | null | undefined;

  @Column("nvarchar", { name: "lf_comments", nullable: true })
  lfComments: string | null | undefined;

  @Column("datetime", { name: "lf_datecollected", default: () => "getdate()" })
  lfDatecollected!: Date;

  @ManyToOne(() => TblWellInfo, (tblWellInfo) => tblWellInfo.tblLandFeatures)
  @JoinColumn([{ name: "well_id", referencedColumnName: "wellId" }])
  well!: TblWellInfo;
}
