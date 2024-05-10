import { Component, OnInit } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { CategoriesService } from '../services/categories.service';
import { Category } from '../models/category';
import { doc } from 'firebase/firestore';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  // after an hour fixing I found out this is how to declare an array variable 
  itemArray: any[] = [];
  // because this one didn't work itemArray = Array<Obeject>;
  formItem: string = '';

  formStatus: string = 'Add';

  itemId: string = '';

  constructor( private categoryService: CategoriesService ) {}
  
  ngOnInit(): void { 
    this.categoryService.loadData().subscribe(val => {
      console.log(val);
      this.itemArray = val;
    })
    }

  onSubmit(formData: any) {

    let categoryDataItems: Category = { category: formData.value.category };
    // console.log(categoryDataItems);

    if (this.formStatus == 'Add') {
      this.categoryService.saveData(categoryDataItems);
      formData.reset();
    }
    else if (this.formStatus == 'Edit') {
      this.categoryService.updateData(this.itemId, categoryDataItems);
      formData.reset();
      this.formStatus = 'Add';
    }
  }


  onEdit (item: any, id: any) {
   this.formItem = item;
   this.formStatus = 'Edit';
   this.itemId = id;
  }

  onDelete (id: any) {
    this.categoryService.deleteData(id);
  }  
}
