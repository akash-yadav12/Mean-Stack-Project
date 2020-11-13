import { Component,Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription} from 'rxjs';

import { Post } from '../post.model';
import { PostsService} from '../posts.service';
@Component({
  selector: 'app-post-list',
  templateUrl : './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})

export class PostListComponent implements OnInit,OnDestroy {
  // posts = [
  //   {title: "First Post", content: "This is the first posts content"},
  //   {title: "Second Post", content: "This is the second posts content"},
  //   {title: "Third Post", content: "This is the third posts content"},
  // ]

  // @Input() decorator for binding data, binding posts from outside i.e from parent component
  posts:Post[] = [];
  isLoading = false;
  private postsSub: Subscription;

  constructor(public postsService: PostsService) {}

  ngOnInit(){
    this.isLoading = true
    this.postsService.getPosts();
    this.postsSub = this.postsService.getPostUpdatedListener()
      .subscribe((posts:Post[])=>{
        this.isLoading = false;
        this.posts = posts;
      });
  }

  onDelete(id){
    this.postsService.deletePost(id);
  }

  ngOnDestroy(){
    this.postsSub.unsubscribe();
  }

}
