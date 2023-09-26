import { Injectable, OnInit } from '@angular/core';
import { StorageModule } from '@angular/fire/storage';
import { Storage, ref } from '@angular/fire/storage';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(
    private storage: AngularFireStorage,
    private afs: AngularFirestore,
    private toastr: ToastrService,
    private router: Router
  ) {}

  createId() {
    return this.afs.createId();
  }

  uploadImg(selectedImg: any, postdata: any, formStatus: any, id: any) {
    const filePath = `postIMG/${Date.now()}`;
    // console.log('save data');
    this.storage
      .upload(filePath, selectedImg)
      .then(() => {
        this.storage
          .ref(filePath)
          .getDownloadURL()
          .subscribe((URL) => {
            postdata.postImgPath = URL;
            // console.log(postdata);
            if (formStatus == 'Edit') {
              console.log('edit');
              this.updateData(id, postdata);
            } else {
              console.log('save');
              this.saveData(postdata);
            }
          });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  saveData(postData: any) {
    this.afs
      .collection('posts')
      .doc(postData?.key)
      .set(postData, { merge: true })
      .then((ref) => {
        this.toastr.success('Successfully');
        this.router.navigate(['/posts']);
      });
  }

  // load the post
  loadImgage() {
    return this.afs
      .collection('posts')
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((a) => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, data };
          });
        })
      );
  }
  // end

  loadOneData(id: any) {
    return this.afs.collection('posts').doc(id).valueChanges();
  }
  // end
  updateData(id: any, postData: any) {
    this.afs
      .doc(`posts/${id}`)
      .update(postData)
      .then((ref) => {
        this.toastr.success('Updated!');
        this.router.navigate(['/posts']);
      });
  }

  // delete image method

  deleteImage(postImgPath: any, id: any) {
    this.storage.storage
      .refFromURL(postImgPath)
      .delete()
      .then(() => {
        this.deleteData(id);
      });
  }

  // delete data

  deleteData(id: any) {
    this.afs
      .doc(`posts/${id}`)
      .delete()
      .then(() => {
        this.toastr.warning('Deleted successfully...!');
      });
  }

  // marking featured method

  markfeatured(id: any, featuredData: any) {
    this.afs
      .doc(`posts/${id}`)
      .update(featuredData)
      .then(() => {
        this.toastr.info('Featured Status Updated');
      });
  }

  //
}
