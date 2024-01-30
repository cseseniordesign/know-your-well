import { Column, Entity, Index, OneToMany } from "typeorm";
import { TblSchool } from "./TblSchool";

@Index("PK_tblNRDLookup", ["nrdId"], { unique: true })
@Entity("tblNRDLookup", { schema: "dbo" })
export class TblNrdLookup {
  @Column("int", { primary: true, name: "nrd_id" })
  nrdId: number;

  @Column("nvarchar", { name: "nrd_name", length: 255 })
  nrdName: string;

  @Column("nvarchar", { name: "nrd_abbr", length: 10 })
  nrdAbbr: string;

  @OneToMany(() => TblSchool, (tblSchool) => tblSchool.nrd)
  tblSchools: TblSchool[];
}
