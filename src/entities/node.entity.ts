import { Property } from './property.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity({name: 'node'})
export class Node {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: true})
  parentNodeId: number;

  @Column()
  name: string;

  @Column({unique: true})
  path: string;

  @OneToMany(() => Property, (property) => property.node)
  properties: Property[];
}