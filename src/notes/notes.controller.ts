import { Controller, Get, Post, Body, UseGuards, Req, Param, Delete } from '@nestjs/common';
import { NotesService } from './notes.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  createNotes(
    @Body() body: { title: string; content: string }, 
    @Req() req: any,
  ) {
  return this.notesService.create(
    req.user.id,
    body.title,
    body.content,
  );
  }
  
  @UseGuards(JwtAuthGuard)
  @Get()
  getMyNotes(@Req() req: any) {
    return this.notesService.findAllByUser(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getNoteById(@Param('id') id: string, @Req() req: any) {
    return this.notesService.findOneById(Number(id), req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteNote(@Param('id') id: string, @Req() req: any) {
    return this.notesService.deleteById(Number(id), req.user.id);
  }
}

