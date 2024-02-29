import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { TblWellInfo } from "./TblWellInfo";

@Index("PK_tblWellFeature", ["wellfeatureId"], { unique: true })
@Entity("tblWellFeature", { schema: "dbo" })
export class TblWellFeature {
  @PrimaryGeneratedColumn({ type: "int", name: "wellfeature_id" })
  wellfeatureId!: number;

  @Column("nvarchar", { name: "wf_type", length: 100 })
  wfType!: string;

  @Column("decimal", { name: "wf_latitude", precision: 10, scale: 5 })
  wfLatitude!: number;

  @Column("decimal", { name: "wf_longitude", precision: 10, scale: 5 })
  wfLongitude!: number;

  @Column("decimal", { name: "wf_genlatitude", precision: 10, scale: 3 })
  wfGenlatitude!: number;

  @Column("decimal", { name: "wf_genlongitude", precision: 10, scale: 3 })
  wfGenlongitude!: number;

  @Column("nvarchar", { name: "wf_datacollector", nullable: true, length: 255 })
  wfDatacollector: string | null | undefined;

  @Column("nvarchar", { name: "wf_observation", nullable: true })
  wfObservation: string | null | undefined;

  @Column("nvarchar", { name: "wf_filename", nullable: true, length: 255 })
  wfFilename: string | null | undefined;

  @Column("nvarchar", { name: "wf_comments", nullable: true })
  wfComments: string | null | undefined;

  @Column("datetime", { name: "wf_datecollected", default: () => "getdate()" })
  wfDatecollected!: Date;

  @ManyToOne(() => TblWellInfo, (tblWellInfo) => tblWellInfo.tblWellFeatures)
  @JoinColumn([{ name: "well_id", referencedColumnName: "wellId" }])
  well!: TblWellInfo;
}
