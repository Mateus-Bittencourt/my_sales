import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity('user_tokens')
export class UserToken {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'uuid' })
  @Generated('uuid')
  token: string

  @Column({ type: 'integer' })
  user_id: number

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date
}
