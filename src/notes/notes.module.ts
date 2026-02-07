import { Module } from '@nestjs/common';
import { NotesController } from './notes.controller'; //ini ambil fungsi dari notes controller
import { NotesService } from './notes.service'; //ini ambil fungsi dari service controller

@Module({
  controllers: [NotesController],
  providers: [NotesService],
})
export class NotesModule {}
