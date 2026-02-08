import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import pool from '../db';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}
  
  async login(username: string, password: string) {
    const result = await pool.query(
      `SELECT * FROM users WHERE username = $1`,
      [username],
    );
    if (result.rows.length === 0) {
      throw new UnauthorizedException('invalid credentials');
    }
    const user = result.rows[0];
    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
      throw new UnauthorizedException('invalid credentials');
    }
    const payload = {
      id: user.id,
      username: user.username,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(username: string, password: string) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await pool.query(
    `
    INSERT INTO users (username, password_hash)
    VALUES ($1, $2)
    RETURNING id, username, created_at
    `,
    [username, hashedPassword],
  );
  return result.rows[0];
}
}
