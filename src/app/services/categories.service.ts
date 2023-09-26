import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService implements OnInit {

  catagoryArray!: Array<any>;
  constructor(private afs: AngularFirestore, private toastr: ToastrService) {}
  ngOnInit(): void {
    
  }

  saveData(data: any) {

    this.afs.collection('items').add(data).then(docref => {
      
      this.toastr.success('Data Inserted Successfully...!');
    }).catch(err => {console.log(err)});

  }

  // locaiton data
  saveDataLocation(data: any) {

    this.afs.collection('location').add(data).then(docref => {
      
      this.toastr.success('Data Inserted Successfully...!');
    }).catch(err => {console.log(err)});

  }

  // to upload users data we use this method and write query inside this method to get their data and display on UI
  loadData() {
    return this.afs.collection('items', (ref) => ref.orderBy('category')).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id   = a.payload.doc.id;
          return { id , data }
        });
      })
    );
  }
  // end upload


  // updating method goes down below
  updateData(  id: any , EditData: any) {

    this.afs.collection('items').doc(id).update(EditData).then(docRef => {
      this.toastr.success('Data Updated Successfully...!');
    })
  }

  //========================================--
  updateLocation(  id: any , EditData: any) {

    this.afs.collection('location').doc(id).update(EditData).then(docRef => {
      this.toastr.success('Data Updated Successfully...!');
    })
  }

  deleteData( id: any) {

    this.afs.collection('items').doc(id).delete().then(docRef => {
      this.toastr.success('Data Deleted!');
    })
  }
   // ==========================
  
   deleteLocation( id: any) {

    this.afs.collection('location').doc(id).delete().then(docRef => {
      this.toastr.success('Data Deleted!');
    })
  }
  
}
