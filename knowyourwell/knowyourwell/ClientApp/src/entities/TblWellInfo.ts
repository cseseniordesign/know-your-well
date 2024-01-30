import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { TblFieldActivity } from "./TblFieldActivity";
import { TblLandFeature } from "./TblLandFeature";
import { TblWellFeature } from "./TblWellFeature";
import { TblWellForm } from "./TblWellForm";
import { TblSchool } from "./TblSchool";

@Index("PK_tblWellInfo", ["wellId"], { unique: true })
@Entity("tblWellInfo", { schema: "dbo" })
export class TblWellInfo {
  @PrimaryGeneratedColumn({ type: "int", name: "well_id" })
  wellId: number;

  @Column("nvarchar", { name: "wi_wellcode", length: 100 })
  wiWellcode: string;

  @Column("nvarchar", { name: "wi_wellname", length: 255 })
  wiWellname: string;

  @Column("nvarchar", { name: "wi_well_user", nullable: true, length: 255 })
  wiWellUser: string | null;

  @Column("nvarchar", { name: "wi_address", nullable: true, length: 255 })
  wiAddress: string | null;

  @Column("nvarchar", { name: "wi_city", nullable: true, length: 255 })
  wiCity: string | null;

  @Column("nvarchar", { name: "wi_state", nullable: true, length: 2 })
  wiState: string | null;

  @Column("nvarchar", { name: "wi_zipcode", nullable: true, length: 100 })
  wiZipcode: string | null;

  @Column("int", { name: "county_id" })
  countyId: number;

  @Column("int", { name: "nrd_id" })
  nrdId: number;

  @Column("nvarchar", {
    name: "wi_phone_well_user",
    nullable: true,
    length: 255,
  })
  wiPhoneWellUser: string | null;

  @Column("nvarchar", {
    name: "wi_email_well_user",
    nullable: true,
    length: 255,
  })
  wiEmailWellUser: string | null;

  @Column("nvarchar", { name: "wi_well_owner", nullable: true, length: 255 })
  wiWellOwner: string | null;

  @Column("int", { name: "wi_installyear" })
  wiInstallyear: number;

  @Column("nvarchar", { name: "wi_smelltaste", nullable: true })
  wiSmelltaste: string | null;

  @Column("nvarchar", { name: "wi_smelltaste_description", nullable: true })
  wiSmelltasteDescription: string | null;

  @Column("nvarchar", { name: "wi_welldry", nullable: true })
  wiWelldry: string | null;

  @Column("nvarchar", { name: "wi_welldry_description", nullable: true })
  wiWelldryDescription: string | null;

  @Column("nvarchar", { name: "wi_maintenance5yr", length: 255 })
  wiMaintenance5yr: string;

  @Column("nvarchar", { name: "wi_landuse5yr", length: 255 })
  wiLanduse5yr: string;

  @Column("int", { name: "wi_numberwelluser", nullable: true })
  wiNumberwelluser: number | null;

  @Column("nvarchar", { name: "wi_pestmanure", length: 255 })
  wiPestmanure: string;

  @Column("decimal", { name: "wi_estlatitude", precision: 10, scale: 5 })
  wiEstlatitude: number;

  @Column("decimal", { name: "wi_estlongitude", precision: 10, scale: 5 })
  wiEstlongitude: number;

  @Column("decimal", { name: "wi_boreholediameter", precision: 8, scale: 2 })
  wiBoreholediameter: number;

  @Column("decimal", { name: "wi_totaldepth", precision: 8, scale: 2 })
  wiTotaldepth: number;

  @Column("decimal", { name: "wi_waterleveldepth", precision: 8, scale: 2 })
  wiWaterleveldepth: number;

  @Column("nvarchar", { name: "wi_aquifertype", length: 100 })
  wiAquifertype: string;

  @Column("nvarchar", { name: "wi_aquiferclass", length: 100 })
  wiAquiferclass: string;

  @Column("nvarchar", { name: "wi_welltype", length: 100 })
  wiWelltype: string;

  @Column("nvarchar", { name: "wi_wellcasematerial" })
  wiWellcasematerial: string;

  @Column("nvarchar", { name: "wi_datacollector", nullable: true, length: 255 })
  wiDatacollector: string | null;

  @Column("nvarchar", { name: "wi_observation", nullable: true })
  wiObservation: string | null;

  @Column("nvarchar", { name: "wi_topography", nullable: true, length: 100 })
  wiTopography: string | null;

  @Column("int", { name: "wi_commonid", nullable: true })
  wiCommonid: number | null;

  @Column("nvarchar", { name: "wi_comments", nullable: true })
  wiComments: string | null;

  @Column("datetime", { name: "wi_dateentered", default: () => "getdate()" })
  wiDateentered: Date;

  @Column("nvarchar", {
    name: "wi_registration_number",
    nullable: true,
    length: 100,
  })
  wiRegistrationNumber: string | null;

  @Column("int", { name: "wi_dnr_well_id", nullable: true })
  wiDnrWellId: number | null;

  @OneToMany(
    () => TblFieldActivity,
    (tblFieldActivity) => tblFieldActivity.well
  )
  tblFieldActivities: TblFieldActivity[];

  @OneToMany(() => TblLandFeature, (tblLandFeature) => tblLandFeature.well)
  tblLandFeatures: TblLandFeature[];

  @OneToMany(() => TblWellFeature, (tblWellFeature) => tblWellFeature.well)
  tblWellFeatures: TblWellFeature[];

  @OneToMany(() => TblWellForm, (tblWellForm) => tblWellForm.well)
  tblWellForms: TblWellForm[];

  @ManyToOne(() => TblSchool, (tblSchool) => tblSchool.tblWellInfos)
  @JoinColumn([{ name: "school_id", referencedColumnName: "schoolId" }])
  school: TblSchool;
}
