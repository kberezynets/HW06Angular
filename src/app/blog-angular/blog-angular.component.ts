import { Component, OnInit } from '@angular/core';
import { faClock } from '@fortawesome/free-solid-svg-icons';

import { IBlog } from 'src/app/shared/interfaces/blog/blog.interface';
import { IUser } from 'src/app/shared/interfaces/user/user.interface';
import { BlogService } from 'src/app/shared/services/blog/blog.service';

@Component({
  selector: 'app-blog-angular',
  templateUrl: './blog-angular.component.html',
  styleUrls: ['./blog-angular.component.scss']
})

export class BlogAngularComponent implements OnInit {
  faClock = faClock

  public registered = true;
  public signedUser = '';

  public userData!: IUser[];
  public username = '';
  public email = '';
  public password = '';

  public blogData!: IBlog[];
  public title = '';
  public text = '';
  public publishedTime!: number;

  public editStatus = false;
  public editID!: number;

  constructor(
    private blogService: BlogService
  ) { }

  ngOnInit(): void {
    this.blogData = this.blogService.getBlogs();
    this.userData = this.blogService.getUsers();
  }

  submitSignIn(): void {
    let findEmail = this.userData.findIndex(user => user.email === this.email);
    if (findEmail === -1) {
      alert('This email is not registered yet!');
    }
    else if (this.userData[findEmail].password !== this.password){
      alert('Incorrect password');
    }
    else {
      this.signedUser = this.userData[findEmail].username;
    }
    this.resetForm();
  }

  submitSignUp(): void {
    let findUsername = this.userData.findIndex(user => user.username === this.username);
    let findEmail = this.userData.findIndex(user => user.email === this.email);
    
    if (findUsername !== -1) {
      alert('This email is registered already!');
    }
    else if (findEmail !== -1) {
      alert('This email is registered already!');
    }
    else {
      const newUser = {
        id: 1,
        username: this.username,
        email: this.email,
        password: this.password
      }
      if (this.userData.length > 0) {
        const id = this.userData.slice(-1)[0].id;
        newUser.id = id + 1;
      }
      this.blogService.addUser(newUser);
      this.signedUser = newUser.username;
    }
    this.resetForm();
  }

  addPost(): void {
    this.publishedTime = Date.now();
    const newPost = {
      id: 1,
      postedBy: this.signedUser,
      topic: this.title,
      date: this.publishedTime,
      message: this.text
    };
    if (this.blogData.length > 0) {
      const id = this.blogData.slice(-1)[0].id;
      newPost.id = id + 1;
    }
    this.blogService.addBlog(newPost);
    this.resetForm();
  }

  editPost(post: IBlog): void {
    this.title = post.topic;
    this.text = post.message;
    this.editStatus = true;
    this.editID = post.id;
  }

  saveEdit(): void {
    this.publishedTime = Date.now();
    const updatePost = {
      id: this.editID,
      postedBy: this.signedUser,
      topic: this.title,
      date: this.publishedTime,
      message: this.text
    };
    this.blogService.updateBlog(updatePost, this.editID);
    this.resetForm();
  }

  deletePost(post: IBlog): void {
    this.blogService.deleteBlog(post.id);
  }

  resetForm(): void {
    this.title = '';
    this.text = '';
    this.username = '';
    this.email = '';
    this.password = '';
    this.editStatus = false;
  }

  signIn(): void {
    this.registered = true;
  }

  signUp(): void {
    this.registered = false;
  }

  signOut(): void {
    this.signedUser = '';
  }
}