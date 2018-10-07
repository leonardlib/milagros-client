import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Post } from '../../../_models/post';
import { Author } from '../../../_models/author';
import { AuthorService } from '../../../_services/author.service';
import { UtilsService } from '../../../_services/utils.service';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../../_services/post.service';
import { ImageModel } from '../../../_models/image';

@Component({
    selector: 'app-post-admin-form',
    templateUrl: './post-admin-form.component.html',
    styleUrls: ['./post-admin-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.Default,
})
export class PostAdminFormComponent implements OnInit {
    public post: Post = new Post();
    public authors: Author[] = [];
    public selectedAuthors: Author[] = [];
    public selectedImageAuthors: Author[] = [];
    public loading = false;
    public images: any = [];
    public froalaOptions: any = {};
    public editar: boolean;

    constructor(
        private authorService: AuthorService,
        private route: ActivatedRoute,
        private utilsService: UtilsService,
        public postService: PostService
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
        };
        this.editar = false;
        this.post.main_image = new ImageModel();
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
        console.log(this.post);
        console.log(this.selectedAuthors);
        console.log(this.selectedImageAuthors);
        console.log(this.images);

        if (
            this.post.title && this.post.title !== '' &&
            this.post.content && this.post.content !== '' &&
            this.images.length > 0 &&
            this.selectedAuthors.length > 0 &&
            this.selectedImageAuthors.length > 0
        ) {
            console.log('Guardar');
        } else {
            this.utilsService.showSnackbar('Verifica que la información este completa.');
        }
    }
}
