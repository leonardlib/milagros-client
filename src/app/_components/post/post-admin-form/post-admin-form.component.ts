import {ChangeDetectionStrategy, Component, OnInit, ViewChild} from '@angular/core';
import { Post } from '../../../_models/post';
import { Author } from '../../../_models/author';
import { AuthorService } from '../../../_services/author.service';
import { UtilsService } from '../../../_services/utils.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../../../_services/post.service';
import { ModalComponent } from '../../layout/modal/modal.component';
import { MatDialog } from '@angular/material';
import {NgForm} from '@angular/forms';

@Component({
    selector: 'app-post-admin-form',
    templateUrl: './post-admin-form.component.html',
    styleUrls: ['./post-admin-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.Default
})
export class PostAdminFormComponent implements OnInit {
    @ViewChild('postForm') form: NgForm;
    public post: Post = new Post();
    public authors: Author[] = [];
    public loading = false;
    public images: any[] = [];
    public editar: boolean;

    constructor(
        private authorService: AuthorService,
        private route: ActivatedRoute,
        private utilsService: UtilsService,
        public postService: PostService,
        private dialog: MatDialog,
        private router: Router
    ) {
        this.editar = false;
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            const uid = params.uid;

            if (uid) {
                this.utilsService.showSnackbar('Cargando...');
                this.postService.show(uid).subscribe(response => {
                    this.post = response[0] as Post;
                    this.postService.getMainImagePreview(this.post).then(res => {
                        this.images[0] = res;
                    });
                    this.editar = true;
                });
            }
        });

        this.authorService.index().subscribe(authors => {
            this.authors = authors;
        });
    }

    onSubmit() {
        if (this.validData()) {
            this.utilsService.showSnackbar('Guardando...');
            if (this.editar) {
                this.post['new_image'] = {
                    file: this.images[0].file
                };

                this.postService.update(this.post).then(response => {
                    if (response) {
                        this.post = response as Post;
                        this.utilsService.showSnackbar('La publicación ha sido guardada');
                    } else {
                        this.utilsService.showSnackbar('Ocurrió un error al guardar. Intenta de nuevo');
                    }
                });
            } else {
                this.post.main_image.file = this.images[0].file;
                this.postService.create(this.post).then(response => {
                    if (response) {
                        this.post = response as Post;
                        this.editar = true;
                        this.utilsService.showSnackbar('La publicación ha sido guardada');
                    } else {
                        this.utilsService.showSnackbar('Ocurrió un error al guardar. Intenta de nuevo');
                    }
                });
            }
        } else {
            this.utilsService.showSnackbar('Verifica que la información este completa');
        }
    }

    onDelete() {
        const dialogRef = this.dialog.open(ModalComponent, {
            width: '300px',
            data: {
                title: '¿Estás seguro de eliminar la publicación?',
                content: 'Esta acción no podrá revertirse, una vez eliminada no se podrá recuperar después.',
                closeBtnText: 'Cancelar',
                confirmBtnText: 'OK'
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.deletePost();
            }
        });
    }

    deletePost() {
        this.utilsService.showSnackbar('Eliminando...');
        this.postService.destroy(this.post).then(response => {
            if (response) {
                this.utilsService.showSnackbar('Publicación eliminada');
                this.router.navigate(['/administrador/publicaciones']);
            } else {
                this.utilsService.showSnackbar('No se ha podido eliminar la publicación');
            }
        });
    }

    validData() {
        return (
            this.form.valid &&
            this.post.content && this.post.content !== '' &&
            this.images.length > 0 &&
            this.post.author && this.post.author.name !== '' &&
            this.post.main_image.author && this.post.main_image.author.name !== ''
        );
    }
}
