import { Component, OnInit, ViewChild } from '@angular/core';
import { PostService } from '../../../_services/post.service';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { Post } from '../../../_models/post';
import { Router } from '@angular/router';

@Component({
    selector: 'app-post-admin-list',
    templateUrl: './post-admin-list.component.html',
    styleUrls: ['./post-admin-list.component.scss']
})
export class PostAdminListComponent implements OnInit {
    public rows = [];
    public temp = [];
    public loadingIndicator = true;
    public reorderable = true;
    public columns = [];
    @ViewChild(DatatableComponent) table: DatatableComponent;
    public messages: any = {};

    constructor(
        private postService: PostService,
        private router: Router
    ) {}

    ngOnInit() {
        this.columns = [{
            prop: 'title',
            name: 'Título'
        }, {
            prop: 'author.name',
            name: 'Autor'
        }, {
            prop: 'date',
            name: 'Fecha'
        }];
        this.messages = {
            emptyMessage: 'Ningún resultado',
            totalMessage: 'en total'
        };

        this.postService.index().subscribe(posts => {
            this.temp = [...posts];
            this.rows = posts;

            setTimeout(() => {
                this.loadingIndicator = false;
            }, 1500);
        });
    }

    onFilter(value: string) {
        const data = this.temp.filter(d => {
            return d.title.toLowerCase().indexOf(value) !== -1 || !value;
        });
        this.rows = data;
        this.table.offset = 0;
    }

    onSelect(event: any) {
        const post = event.selected[0] as Post;
        this.router.navigate(['/administrador/publicaciones/editar/' + post.uid]);
    }
}
