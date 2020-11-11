import { Post } from './post.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { stringify } from '@angular/compiler/src/util';
import { identifierModuleUrl } from '@angular/compiler';


@Injectable({providedIn: 'root'})
export class PostsService{


  constructor( private http: HttpClient) {}

  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>()

  getPosts(){
    // creating new array and pulling the posts array using spread operator
    // new copy of array is returned instead of returning reference
    this.http.get<{message:string, posts: Post[]}>('http://localhost:3000/api/posts')
    .subscribe((postData)=>{
        this.posts = postData.posts;
        this.postsUpdated.next([...this.posts]);
    });
  }


  getPostUpdatedListener(){
    return this.postsUpdated.asObservable();
  }
  addPost(title:string, content: string){
    const post:Post = {
      id:null,
      title:title,
      content: content
    };
    this.http.post<{message:string}>("http://localhost:3000/api/posts",post)
      .subscribe((resData)=>{
        console.log(resData.message)
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
      })
  }
}
