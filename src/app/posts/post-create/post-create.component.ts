import { Component,EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Post } from '../post.model';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})

export class PostCreateComponent{

  enteredTitle = '';
  enteredContent = '';

  // property to emit event
  // @Output() turn postCreated into an event that can be listened to from the outer component i.e by parent compo
  @Output() postCreated = new EventEmitter<Post>();

  onAddPost(form: NgForm){
    if(form.invalid){
      return
    }
    const post: Post = {
      title: form.value.title,
      content: form.value.content
    };
    this.postCreated.emit(post);
  }
}
