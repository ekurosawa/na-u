'use client';

import React, { useState, useEffect } from 'react';
import supabase from '../components/supabaseClient';

// No direct equivalent in JavaScript for interfaces, but you can use a constructor function or a class to create a similar structure.
function Comment(id, content, createdAt) {
    this.id = id;
    this.content = content;
    this.created_at = createdAt;
  }

const Page = () => {
  let comment = '';
  const setComment = (newComment) => {
      comment = newComment;
  };
  
    const comments = [];
  const setComments = (newComments) => {
      // logic to update comments
  };
  
  const fetchComments = async () => {
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) console.error('Error fetching comments', error);
    else setComments(data);
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    const { data, error } = await supabase
      .from('comments')
      .insert([
        { content: comment }
      ]);

    if (error) console.error('Error submitting comment', error);
    else {
      setComment('');
      fetchComments();
    }
  };

  return (
    <div>
      
      <h1>Comments</h1>
      <form onSubmit={handleCommentSubmit}>
        <textarea
          value={comment}
          onChange={function(e) { setComment(e.target.value); }}
          placeholder="Write a comment..."
        />
        <button type="submit">Post Comment</button>
      </form>
      <div>
        
        {comments.map((comment) => (
          <div key={comment.id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
            <p>{comment.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;

