import { Component, OnInit } from '@angular/core';
import { DbapiService } from '../service/dbapi.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrl: './graph.component.css'
})
export class GraphComponent implements OnInit {
  constructor(private dbapiService: DbapiService) {}

  ngOnInit() {
    this.dbapiService.getLaboratorios().subscribe({
      next: (labsResponse) => {
        const labs = labsResponse.data;
        this.dbapiService.getResumen().subscribe({
          next: (resumenResponse) => {
            const data = resumenResponse.data.filter((item: any) => item.idlaboratorio !== null && item.fecha === null);
            const labels = data.map((item: any) => {
              const lab = labs.find((lab: any) => lab.idlaboratorio === item.idlaboratorio);
              return lab ? `${lab.departamento} ${lab.num_ed} ${lab.aula ?? ''}` : item.idlaboratorio;
            });
            const values = data.map((item: any) => item.total_prestamos);

            const ctx = document.getElementById('myChart') as HTMLCanvasElement;
            new Chart(ctx, {
              type: 'bar',
              data: {
                labels: labels,
                datasets: [{
                  label: 'Total Prestamos',
                  data: values,
                  borderWidth: 1
                }]
              },
              options: {
                scales: {
                  y: {
                    beginAtZero: true
                  }
                }
              }
            });
          },
          error: (error) => {
            console.error('There was an error!', error);
          }
        });
      },
      error: (error) => {
        console.error('There was an error!', error);
      }
    });
  }
}
