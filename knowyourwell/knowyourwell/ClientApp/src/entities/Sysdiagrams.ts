import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK__sysdiagr__C2B05B61B62876B7", ["diagramId"], { unique: true })
@Index("UK_principal_name", ["principalId", "name"], { unique: true })
@Entity("sysdiagrams", { schema: "dbo" })
export class Sysdiagrams {
  @Column("nvarchar", { name: "name", unique: true, length: 128 })
  name!: string;

  @Column("int", { name: "principal_id", unique: true })
  principalId!: number;

  @PrimaryGeneratedColumn({ type: "int", name: "diagram_id" })
  diagramId!: number;

  @Column("int", { name: "version", nullable: true })
  version: number | null | undefined;

  @Column("varbinary", { name: "definition", nullable: true })
  definition: Buffer | null | undefined;
}
