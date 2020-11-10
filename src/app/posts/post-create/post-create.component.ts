import { Component,EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

// import { Post } from '../post.model';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})

export class PostCreateComponent{

  enteredTitle = '';
  enteredContent = '';

  constructor(public postsService: PostsService){}

  // property to emit event
  // @Output() turn postCreated into an event that can be listened to from the outer component i.e by parent compo
  // output decorater removed since service is injected;

  onAddPost(form: NgForm){
    if(form.invalid){
      return
    }
    this.postsService.addPost(form.value.title,form.value.content);
    form.resetForm();
  }
}
