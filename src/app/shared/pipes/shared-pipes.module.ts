import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExcerptPipe } from './excerpt.pipe';
import { GetValueByKeyPipe } from './get-value-by-key.pipe';
import { RelativeTimePipe } from './relative-time.pipe';
import { OrderByPipe } from './orderBy';
import { FileSizePipe } from './fileSize';

const pipes = [
  ExcerptPipe,
  GetValueByKeyPipe,
  RelativeTimePipe,
  OrderByPipe,
  FileSizePipe
];

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: pipes,
  exports: pipes
})
export class SharedPipesModule { }
