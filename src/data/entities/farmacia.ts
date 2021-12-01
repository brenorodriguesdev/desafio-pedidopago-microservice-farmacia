import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity('farmacia')
export class Farmacia {
  @PrimaryGeneratedColumn('increment')
  id?: number

  @Column()
  logo: string

  @Column()
  nome: string

  @Column()
  cnpj: string

  @Column()
  endereco: string

  @Column()
  horarioFuncionamento: string

  @Column()
  responsavel: string

  @Column()
  telefone: string

  @Column()
  outros?: string
}