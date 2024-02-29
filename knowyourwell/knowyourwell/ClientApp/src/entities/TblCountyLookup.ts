import { Column, Entity, Index } from "typeorm";

@Index("PK_tblCountyLookup", ["countyId"], { unique: true })
@Entity("tblCountyLookup", { schema: "dbo" })
export class TblCountyLookup {
  @Column("int", { primary: true, name: "county_id" })
  countyId!: number;

  @Column("nvarchar", { name: "county_name", length: 255 })
  countyName!: string;
}
