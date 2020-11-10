import { Post } from './post.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({providedIn: 'root'})
export class PostsService{
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>()

  getPosts(){
    // creating new array and pulling the posts array using spread operator
    // new copy of array is returned instead of returning reference
    return [...this.posts];
  }


  getPostUpdatedListener(){
    return this.postsUpdated.asObservable();
  }
  addPost(title:string, content: string){
    const post:Post = {
      title:title,
      content: content
    };
    this.posts.push(post);
    this.postsUpdated.next([...this.posts]);
  }
}
