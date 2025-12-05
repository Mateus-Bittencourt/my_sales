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

  @Column({ type: 'integer', name: 'user_id' })
  userId: number

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date
}
