import { Post } from './post.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { stringify } from '@angular/compiler/src/util';
import { identifierModuleUrl } from '@angular/compiler';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class PostsService{


  constructor( private http: HttpClient) {}

  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>()

  getPosts(){
    // creating new array and pulling the posts array using spread operator
    // new copy of array is returned instead of returning reference
    this.http
      .get<{ message:string, posts: any}>(
      'http://localhost:3000/api/posts'
      )
      .pipe(map((postData)=>{
        return postData.posts.map(post =>{
          return {
            title: post.title,
            content: post.content,
            id:post._id
          }
        })
      }))
      .subscribe((transformedPost)=>{
        this.posts = transformedPost;
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
    this.http.post<{message:string, postId: string}>("http://localhost:3000/api/posts",post)
      .subscribe((resData)=>{
        const id = resData.postId;
        console.log(resData.message);
        post.id = id;
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
      })
  }

  deletePost(postId: string){
    this.http.delete("http://localhost:3000/api/posts/"+postId)
      .subscribe(()=>{
        console.log('deleted');
        const updatedPosts = this.posts.filter(post => post.id !== postId);
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts])
      })
  }

}
