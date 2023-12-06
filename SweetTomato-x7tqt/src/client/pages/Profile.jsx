import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import getUserPosts from '@wasp/queries/getUserPosts';

export function Profile() {
  const { userId } = useParams();
  const { data: posts, isLoading, error } = useQuery(getUserPosts, { userId });

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <div className='p-4'>
      <h1>User Profile</h1>
      <h2>User ID: {userId}</h2>
      <div>
        {posts.map((post) => (
          <div key={post.id}>
            <p>{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}