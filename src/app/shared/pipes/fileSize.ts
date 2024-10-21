import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fileSize'
})
export class FileSizePipe implements PipeTransform {

  transform(sizeInBytes: number): string {
    if (sizeInBytes === 0) {
      return '0 Bytes';
    }

    const units = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const unitIndex = Math.floor(Math.log(sizeInBytes) / Math.log(1024));
    const convertedSize = sizeInBytes / Math.pow(1024, unitIndex);
    const formattedSize = convertedSize.toFixed(2); // keep two decimal places

    return `${formattedSize} ${units[unitIndex]}`;
  }

}
