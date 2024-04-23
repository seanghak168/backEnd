import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-all-post',
  templateUrl: './all-post.component.html',
  styleUrls: ['./all-post.component.scss'],
})
export class AllPostComponent implements OnInit {
  postArray: any[] = [];
  searchValue: string = '';


  constructor(private postServ: PostsService) {}

  ngOnInit(): void {
    this.postServ.loadImgage().subscribe((val) => {
      this.postArray = val;
      console.log(this.postArray, 'hello');
    });
  }

  // method delete img and data

  onDelete(postImgPath: any, id: any) {
    this.postServ.deleteImage(postImgPath, id);
  }

  // method featured
  onFeatured(id: any, value: boolean) {
    const featuredData = {
      isFeatured: value,
    };
    this.postServ.markfeatured(id, featuredData);
  }

  onSearchChange(searchValue: string) {
    this.searchValue = searchValue;
    console.log(this.searchValue);
    
 }
}
