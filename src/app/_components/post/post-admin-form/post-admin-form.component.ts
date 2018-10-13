import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Post } from '../../../_models/post';
import { Author } from '../../../_models/author';
import { AuthorService } from '../../../_services/author.service';
import { UtilsService } from '../../../_services/utils.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../../../_services/post.service';
import { ImageModel } from '../../../_models/image';
import { ModalComponent } from '../../layout/modal/modal.component';
import { MatDialog } from '@angular/material';

@Component({
    selector: 'app-post-admin-form',
    templateUrl: './post-admin-form.component.html',
    styleUrls: ['./post-admin-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.Default
})
export class PostAdminFormComponent implements OnInit {
    public post: Post = new Post();
    public authors: Author[] = [];
    public loading = false;
    public images: any[] = [];
    public froalaOptions: any = {};
    public editar: boolean;

    constructor(
        private authorService: AuthorService,
        private route: ActivatedRoute,
        private utilsService: UtilsService,
        public postService: PostService,
        private dialog: MatDialog,
        private router: Router
    ) {
        const buttons = [
            'fullscreen', 'bold', 'italic', 'underline', 'strikeThrough', 'subscript',
            'superscript', '|', 'fontFamily', 'fontSize', 'color', 'inlineStyle', 'paragraphStyle', '|',
            'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'quote', '-', 'insertLink',
            'insertImage', 'insertVideo', 'embedly', 'insertFile', 'insertTable', '|', 'emoticons',
            'specialCharacters', 'insertHR', 'selectAll', 'clearFormatting', '|', 'print', 'spellChecker', 'help',
            'html', '|', 'undo', 'redo'
        ];

        this.froalaOptions = {
            language: 'es',
            toolbarButtons: buttons,
            toolbarButtonsMD: buttons,
            toolbarButtonsSM: buttons,
            toolbarButtonsXS: buttons,
            imageUploadURL: 'https://i.froala.com/upload?x'
        };
        this.editar = false;
        this.post.main_image = new ImageModel();
        this.post.author = new Author();
        this.post.main_image.author = new Author();
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            const uid = params.uid;

            this.utilsService.showSnackbar('Cargando...');
            this.postService.show(uid).subscribe(response => {
                this.post = response[0] as Post;
                this.postService.getMainImage(this.post).then(res => {
                    this.images[0] = res;
                });
                this.editar = true;
            });
        });

        this.authorService.index().subscribe(authors => {
            this.authors = authors;
        });
    }

    onSubmit() {
        if (this.validData()) {
            this.utilsService.showSnackbar('Guardando...');
            if (this.editar) {
                this.post['new_image'] = this.images[0].preview;
                this.postService.update(this.post).then(response => {
                    if (response) {
                        this.post = response as Post;
                        this.utilsService.showSnackbar('La publicación ha sido guardada');
                    } else {
                        this.utilsService.showSnackbar('Ocurrió un error al guardar. Intenta de nuevo');
                    }
                });
            } else {
                this.post.main_image.url = this.images[0].preview;
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
                this.router.navigate(['/admin']);
            } else {
                this.utilsService.showSnackbar('No se ha podido eliminar la publicación');
            }
        });
    }

    validData() {
        return (
            this.post.title && this.post.title !== '' &&
            this.post.content && this.post.content !== '' &&
            this.images.length > 0 &&
            this.post.author && this.post.author.name !== '' &&
            this.post.main_image.author && this.post.main_image.author.name !== ''
        );
    }
}
