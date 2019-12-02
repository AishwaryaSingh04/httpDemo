import React, { Component } from 'react';
import axios from 'axios';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {
    state = {
        posts:[],
        selectedId : null
    }

    componentDidMount(){
        axios.get('https://jsonplaceholder.typicode.com/posts').then(response=>{
            /**
             * Only taking first four object
             */
            const result = response.data.slice(0,4);
               /**
                 * returning an object that will containing those four object with author as aish
                 */
            const finalResult = result.map(item=>
                {
                return{
                    ...item,
                    author:'aish'
                }
            })
            this.setState({posts:finalResult})
        })
    }

    setSelectedId = (id) =>{
        this.setState({selectedId:id});
        console.log(this.state.selectedId)
    }

    render () {
        const posts = this.state.posts.map(post=>{
            return <Post
                    clicked={()=>this.setSelectedId(post.id)} 
                    title={post.title}
                    author={post.author}
                    key={post.id}
            ></Post>
        })
        return (
            <div>
                <section className="Posts">
                 {posts}
                </section>
                <section>
                    <FullPost id={this.state.selectedId}/>
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;