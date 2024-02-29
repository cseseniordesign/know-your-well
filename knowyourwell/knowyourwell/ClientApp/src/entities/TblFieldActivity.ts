import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { TblWellInfo } from "./TblWellInfo";
import { TblClassroomLab } from "./TblClassroomLab";
import { TblWaterScienceLab } from "./TblWaterScienceLab";

@Index("PK_tblFieldActivity", ["fieldactivityId"], { unique: true })
@Entity("tblFieldActivity", { schema: "dbo" })
export class TblFieldActivity {
  @PrimaryGeneratedColumn({ type: "int", name: "fieldactivity_id" })
  fieldactivityId!: number;

  @Column("decimal", { name: "fa_latitude", precision: 10, scale: 5 })
  faLatitude!: number;

  @Column("decimal", { name: "fa_longitude", precision: 10, scale: 5 })
  faLongitude!: number;

  @Column("decimal", { name: "fa_genlatitude", precision: 8, scale: 3 })
  faGenlatitude!: number;

  @Column("decimal", { name: "fa_genlongitude", precision: 8, scale: 3 })
  faGenlongitude!: number;

  @Column("nvarchar", { name: "fa_weather", length: 255 })
  faWeather!: string;  

  @Column("nvarchar", { name: "fa_wellcovercondition", length: 255 })
  faWellcovercondition!: string;

  @Column("nvarchar", { name: "fa_wellcoverdescription", nullable: true })
  faWellcoverdescription: string | null | undefined;

  @Column("nvarchar", { name: "fa_surfacerunoff", length: 255 })
  faSurfacerunoff!: string;

  @Column("nvarchar", { name: "fa_pooling", length: 255 })
  faPooling!: string;

  @Column("decimal", { name: "fa_groundwatertemp", precision: 8, scale: 2 })
  faGroundwatertemp!: number;

  @Column("decimal", { name: "fa_ph", precision: 8, scale: 2 })
  faPh!: number;

  @Column("decimal", { name: "fa_conductivity", precision: 8, scale: 2 })
  faConductivity!: number;

  @Column("nvarchar", { name: "fa_datacollector", nullable: true, length: 255 })
  faDatacollector: string | null | undefined;

  @Column("nvarchar", { name: "fa_observation", nullable: true })
  faObservation: string | null | undefined;

  @Column("nvarchar", { name: "fa_comments", nullable: true })
  faComments: string | null | undefined;

  @Column("datetime", { name: "fa_datecollected" })
  faDatecollected!: Date;

  @ManyToOne(() => TblWellInfo, (tblWellInfo) => tblWellInfo.tblFieldActivities)
  @JoinColumn([{ name: "well_id", referencedColumnName: "wellId" }])
  well!: TblWellInfo;

  @ManyToOne(
    () => TblClassroomLab,
    (tblClassroomLab) => tblClassroomLab.tblFieldActivities
  )
  @JoinColumn([{ name: "classlab_id", referencedColumnName: "classlabId" }])
  classlab!: TblClassroomLab;

  @ManyToOne(
    () => TblWaterScienceLab,
    (tblWaterScienceLab) => tblWaterScienceLab.tblFieldActivities
  )
  @JoinColumn([
    { name: "watersciencelab_id", referencedColumnName: "watersciencelabId" },
  ])
  watersciencelab!: TblWaterScienceLab;
}
