import { Injectable } from '@nestjs/common';
import pool from '../db';

@Injectable()
export class UsersService {
  
  async findById(id: number) {
    const result = await pool.query(
      `SELECT id, username, created_at FROM users WHERE id = $1`,
      [id],
    );
    return result.rows[0];
  }

  async deleteById(id: number) {
    await pool.query(`delete from users where id = $1;`, [id]);
    return { message: 'User deleted' };
  }
}
