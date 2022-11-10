import { Injectable } from '@angular/core';
import { IBlog } from '../../interfaces/blog/blog.interface';
import { IUser } from '../../interfaces/user/user.interface';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private blogs: Array<IBlog> = [
    {
      id: 1,
      postedBy: 'admin',
      topic: 'First post',
      date: Date.now(),
      message: 'Sign up to create your account and start to use Angular Blog'
    }
  ];

  private users: Array<IUser> = [
    {
      id: 1,
      username: 'admin',
      email: 'admin@gmail.com',
      password: 'admin'
    }
  ];

  constructor() { }

  getBlogs(): Array<IBlog> {
    return this.blogs;
  }

  addBlog(blog: IBlog): void {
    this.blogs.push(blog);
  }

  updateBlog(discount: IBlog, id: number): void {
    const index = this.blogs.findIndex(blog => blog.id === id);
    this.blogs.splice(index, 1, discount);
  }

  deleteBlog(id: number): void {
    const index = this.blogs.findIndex(blog => blog.id === id);
    this.blogs.splice(index, 1);
  }

  getUsers(): Array<IUser> {
    return this.users;
  }

  addUser(user: IUser): void {
    this.users.push(user);
  }

}