import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'estado'
})
export class EstadoPipe implements PipeTransform {

  transform(value: string): string {
    switch(value) {
      case 'P':
        return 'Pendiente';
      case 'C':
        return 'Cancelado';
      case 'A':
        return 'Aprobado';
      case 'D':
        return 'Denegado';
      case 'F':
        return 'Finalizado';
      default:
        return value;
    }
  }

}
