import { Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Farmacia } from './farmacia'
import { FarmaciaFilial } from './farmaciaFilial'

@Entity('farmaciaSede')
export class FarmaciaSede {
  @PrimaryGeneratedColumn('increment')
  id: number

  @OneToOne(() => Farmacia)
  @JoinColumn({ name: 'idFarmaciaSede' })
  sede: Farmacia

  @OneToMany(() => FarmaciaFilial, farmaciaFilial => farmaciaFilial.farmaciaSede, {
    cascade: ['insert', 'update']
  })
  @JoinColumn({ name: 'id_pessoa' })
  filias: FarmaciaFilial[]
}