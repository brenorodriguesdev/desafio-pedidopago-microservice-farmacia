import { Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Farmacia } from './farmacia'
import { FarmaciaSede } from './farmarciaSede'

@Entity('farmaciaFilial')
export class FarmaciaFilial {
  @PrimaryGeneratedColumn('increment')
  id: number

  @OneToOne(() => Farmacia)
  @JoinColumn({ name: 'idFarmacia' })
  farmacia: Farmacia

  @ManyToOne(() => FarmaciaSede, farmaciaSede => farmaciaSede.filias)
  @JoinColumn({ name: 'idFarmaciaFilial' })
  farmaciaSede: FarmaciaSede

}