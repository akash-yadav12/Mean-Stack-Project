import { Component,EventEmitter, Output, OnInit } from '@angular/core';
import { FormGroup, FormControl,Validators } from '@angular/forms';

// import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from '../post.model';
import { timestamp } from 'rxjs/operators';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})

export class PostCreateComponent implements OnInit{

  enteredTitle = '';
  enteredContent = '';
  post: Post;
  isLoading = false;
  form: FormGroup

  private mode = 'create';
  private postId = '';

  constructor(public postsService: PostsService, public route: ActivatedRoute){}

  // property to emit event
  // @Output() turn postCreated into an event that can be listened to from the outer component i.e by parent compo
  // output decorater removed since service is injected;

  ngOnInit(){
    this.form = new FormGroup({
      'title': new FormControl(null, {validators:[Validators.required, Validators.minLength(3)]}),
      'content': new FormControl(null, {validators:[Validators.required]})
    });

    this.route.paramMap.subscribe((paramMap: ParamMap)=>{
      if (paramMap.has('postId')){
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.isLoading = true
        this.postsService.getPost(this.postId).subscribe(postData=>{
          this.isLoading = false
          this.post = { id: postData._id, title: postData.title, content:postData.content}
        });
        this.form.setValue({
          title:this.post.title,
          content: this.post.content
        });
      }
      else{
        this.mode = 'create';
        this.postId = null;
      }
    });
  }

  onSavePost(){
    if(this.form.invalid){
      return
    }
    this.isLoading = true
    if (this.mode === 'create'){
      this.postsService.addPost(this.form.value.title,this.form.value.content);
    }else{
      this.postsService.updatePost(this.postId,this.form.value.title,this.form.value.content)
    }
    this.form.reset();
  }
}
