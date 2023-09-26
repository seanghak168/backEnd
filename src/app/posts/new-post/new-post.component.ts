import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { disableDebugTools } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/models/post';
import { CategoriesService } from 'src/app/services/categories.service';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss'],
})
export class NewPostComponent implements OnInit {
  permilink: string = '';
  imgSrc: any = './assets/placeholder-image.png';
  selectedImg: any;

  item: any[] = [];
  post: any;

  formStatus: string = 'Add New';
  docId: string = '';

  postForm!: FormGroup;
  isDisabled = false;
  disableMessage = true;

  constructor(
    private categoryService: CategoriesService,
    private fb: FormBuilder,
    private path: PostsService,
    private route: ActivatedRoute
  ) {
    // =============================================================================

    // this.route.queryParams.subscribe(val => {
    //   this.docId = val['id'];
    //   this.path.loadOneData(val['id']).subscribe(post => {
    //     this.post = post;
    //     this.postForm = new FormGroup({

    //       okay: this.fb.group({

    //                 title: new FormControl([ this.post.title , [Validators.required, Validators.minLength(10)]]),
    //               // title: [ this.post.title , [Validators.required, Validators.minLength(10)]],

    //                 permalink: new FormControl([this.post.permalink , Validators.required,]),
    //               // permalink: [this.post.permalink , Validators.required,],

    //               excerpt: new FormControl([ this.post.excerpt , [Validators.required, Validators.minLength(50)]]),
    //               // excerpt: [ this.post.excerpt , [Validators.required, Validators.minLength(50)]],

    //               category: new FormControl([ `${this.post.category.categoryId}-${this.post.category.category}` ,  Validators.required]),
    //               // category: [ `${this.post.category.categoryId}-${this.post.category.category}` ,  Validators.required],

    //               postImg: new FormControl([ '' , Validators.required]),
    //               // postImg: [ '' , Validators.required],

    //               content: new FormControl([ this.post.content , Validators.required]),
    //               // content: [ this.post.content , Validators.required],
    //             })

    //     })
    //     console.log(this.postForm.value);

    //     this.imgSrc = this.post.postImgPath;
    //     this.formStatus = 'Edit';
    //   })
    // })

    // ================================================================================
    // ================================================================================

    this.route.queryParams.subscribe((val) => {
      this.docId = val['id'];
      console.log('val', val);
      this.path.loadOneData(val['id']).subscribe((post) => {
        // console.log(post);

        this.post = post;
        console.log(post);

        this.postForm = this.fb.group({
          title: [
            this.post?.title,
            [Validators.required, Validators.minLength(5)],
          ],

          permalink: [this.post?.permalink, Validators.required],
          excerpt: [
            this.post?.excerpt,
            [Validators.required, Validators.minLength(5)],
          ],
          category: [
            `${this.post?.category.categoryId}-${this.post?.category.category}`,
            Validators.required,
          ],
          postImg: ['', Validators.required],
          content: [this.post?.content, Validators.required],
        });

        this.imgSrc = this.post?.postImgPath;
        if (post) {
          this.formStatus = 'Edit';
        }
      });
    });

    // ================================================================================
    // ================================================================================

    // this.postForm = new FormGroup({
    //   this: fb.group({
    //           title: [ this.post.title , [Validators.required, Validators.minLength(10)]],
    //           permalink: [this.post.permalink , Validators.required,],
    //           excerpt: [ this.post.excerpt , [Validators.required, Validators.minLength(50)]],
    //           category: [ `${this.post.category.categoryId}-${this.post.category.category}` ,  Validators.required],
    //           postImg: [ '' , Validators.required],
    //           content: [ this.post.content , Validators.required],
    //         })
    // })

    // this.postForm = this.fb.group({
    //   title: [ this.post.title , [Validators.required, Validators.minLength(10)]],
    //     permalink: [this.post.permalink , Validators.required,],
    //     excerpt: [ this.post.excerpt , [Validators.required, Validators.minLength(50)]],
    //     category: [ `${this.post.category.categoryId}-${this.post.category.category}` ,  Validators.required],
    //     postImg: [ '' , Validators.required],
    //     content: [ this.post.content , Validators.required],
    // });
  }

  ngOnInit(): void {
    this.categoryService.loadData().subscribe((val) => {
      this.item = val;
    });
  }

  get fc() {
    return this.postForm.controls;
  }

  onTitleChanged($event: any) {
    //  console.log($event.target.value);

    const title = $event.target.value;
    this.permilink = title.replace(/\s/g, '-');
  }
  //======================================>

  showPreview($event: any) {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.imgSrc = e.target?.result;
    };

    reader.readAsDataURL($event.target.files[0]);
    this.selectedImg = $event.target.files[0];
  }
  setDisabledState(disabled: boolean) {
    this.isDisabled = disabled;
  }

  onSubmit() {
    
    const splitted = this.postForm.value.category.split('-');
    const postData: Post = {
      key: this.docId || this.path.createId(),
      title: this.postForm.value.title,
      permalink: this.postForm.value.permalink,
      category: {
        categoryId: splitted[0].trim(),
        category: splitted[1],
      },
      excerpt: this.postForm.value.excerpt,
      postImgPath: '',
      content: this.postForm.value.content,
      isFeatured: false,
      views: 0,
      status: 'new',
      createAt: new Date(),
      // object: Array.from(this.postForm.value.title)
      // keywords: [...this.splitString(this.postForm.value.title), ...this.splitString(this.postForm.value.content)] combine all fields tgt
      keywords: this.splitString(this.postForm.value.title),
    };

    console.log(postData);

    this.path.uploadImg(
      this.selectedImg,
      postData,
      this.formStatus,
      this.docId
    );
    this.postForm.reset();
    this.imgSrc = './assets/placeholder-image.png';
  }

  splitString(str: string) {
    const tempArray = [];
    for (let i = 0; i < str.length; i++) {
      const element = str.substring(0, i + 1);
      tempArray.push(element.toUpperCase());
    }
    return tempArray;
  }
}
