import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {DonateService} from '../../../_services/donate.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-donate-admin',
  templateUrl: './donate-admin.component.html',
  styleUrls: ['./donate-admin.component.scss']
})
export class DonateAdminComponent implements OnInit {
    public rows = [];
    public temp = [];
    public loadingIndicator = true;
    public reorderable = true;
    public columns = [];
    @ViewChild(DatatableComponent) table: DatatableComponent;
    @ViewChild('dateTemplate') dateTemplate: TemplateRef<any>;
    public messages: any = {};

    constructor(
        private donateService: DonateService,
        private router: Router
    ) {}

    ngOnInit() {
        this.columns = [{
            prop: 'name',
            name: 'Nombre'
        }, {
            prop: 'email',
            name: 'Correo'
        }, {
            prop: 'amount',
            name: 'Monto'
        }, {
            prop: 'date',
            name: 'Fecha',
            cellTemplate: this.dateTemplate
        }];
        this.messages = {
            emptyMessage: 'Ningún resultado',
            totalMessage: 'en total'
        };

        this.donateService.index().subscribe(donations => {
            this.temp = [...donations];
            this.rows = donations;

            setTimeout(() => {
                this.loadingIndicator = false;
            }, 1500);
        });
    }

    onFilter(value: string) {
        const data = this.temp.filter(d => {
            return d.name.toLowerCase().indexOf(value) !== -1 || !value;
        });
        this.rows = data;
        this.table.offset = 0;
    }
}
