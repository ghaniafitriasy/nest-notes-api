import { Injectable } from '@nestjs/common';
import pool from '../db'; // samain dengan punyamu

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
    await pool.query(
      `
      UPDATE users
      SET is_deleted = TRUE
      WHERE id = $1 AND is_deleted = FALSE
      RETURNING id, username, role
      `, [id]);
    return { message: 'User deleted' };
  }
}
