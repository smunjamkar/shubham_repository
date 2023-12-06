import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import getPostComments from '@wasp/queries/getPostComments';
import createComment from '@wasp/actions/createComment';

export function Post() {
  const { postId } = useParams();
  const { data: comments, isLoading, error } = useQuery(getPostComments, { postId });
  const createCommentFn = useAction(createComment);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleCreateComment = (content) => {
    createCommentFn({ postId, content });
  };

  return (
    <div className="p-4">
      <h1>Post: {postId}</h1>

      <div className="my-4">
        <h2>Comments:</h2>
        {comments.map((comment) => (
          <div key={comment.id} className="border p-2 my-2">
            <p>{comment.content}</p>
          </div>
        ))}
      </div>

      <div className="my-4">
        <h2>Add Comment:</h2>
        <input type="text" className="border p-2" />
        <button onClick={handleCreateComment} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2">
          Add Comment
        </button>
      </div>
    </div>
  );
}