import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Order } from './Order'
import { Product } from '@modules/products/database/entities/Product'

@Entity('orders_products')
export class OrderProduct {
  @PrimaryGeneratedColumn('increment')
  id: number

  @ManyToOne(() => Order, (order) => order.order_products)
  @JoinColumn({ name: 'order_id' })
  order: Order

  @Column()
  order_id: number

  @ManyToOne(() => Product, (product) => product.order_product)
  @JoinColumn({ name: 'product_id' })
  product: Product

  @Column()
  product_id: number

  @Column('decimal', { precision: 10, scale: 2 })
  price: number

  @Column('integer')
  quantity: number

  @CreateDateColumn()
  created_at: Date

  @CreateDateColumn()
  updated_at: Date
}
