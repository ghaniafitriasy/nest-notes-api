import { Injectable } from '@nestjs/common';
import pool from '../db';

@Injectable()
export class NotesService {

  async create(userId: number, title: string, content: string) {
    const result = await pool.query(
      `
      INSERT INTO notes (user_id, title, content)
      VALUES ($1, $2, $3)
      RETURNING id, user_id, title, content, created_at
      `,
      [userId, title, content],
    );
    return result.rows[0];
  }

  async findAllByUser(userId: number) {
    const result = await pool.query(
      `
      SELECT id, title, content, created_at
      FROM notes
      WHERE user_id = $1
      ORDER BY created_at DESC
      `,
      [userId],
    );
    return result.rows;
  }

  async findOneById(noteId: number, userId: number) {
  const result = await pool.query(
    `
    SELECT id, title, content, created_at
    FROM notes
    WHERE id = $1 AND user_id = $2
    `,
    [noteId, userId],
  );
  return result.rows[0];
  }

  async deleteById(noteId: number, userId: number) {
  const result = await pool.query(
    `
    DELETE FROM notes
    WHERE id = $1 AND user_id = $2
    `,
    [noteId, userId],
  );
  return { deleted: result.rowCount };
  }
}
