import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../services/categories.service';
import { Location } from '../models/location';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit{
 
// after an hour fixing I found out this is how to declare an array variable 
itemArray: any[] = [];
// because this one didn't work itemArray = Array<Obeject>;
formItem: string = '';

formStatus: string = 'Add';

itemId: string = '';
  constructor ( private categoryService: CategoriesService) {}
  ngOnInit(): void {
    

    
  }


  onSubmit(formData: any) {

    let categoryDataItems: Location = { location: formData.value.location };
    // console.log(categoryDataItems);

    if (this.formStatus == 'Add') {
      this.categoryService.saveDataLocation(categoryDataItems);
      formData.reset();
    }
    else if (this.formStatus == 'Edit') {
      this.categoryService.updateLocation(this.itemId, categoryDataItems);
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
    this.categoryService.deleteLocation(id);
  }



}
