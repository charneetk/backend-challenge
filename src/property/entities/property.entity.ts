import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Node } from "../../node/entities/node.entity"

@Entity()
export class Property {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: "decimal", precision: 20, scale: 10 })
  value: string;

  @ManyToOne(() => Node, (node) => node.properties)
  node?: Node;
}