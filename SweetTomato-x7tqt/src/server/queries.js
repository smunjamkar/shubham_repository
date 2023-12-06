import HttpError from '@wasp/core/HttpError.js'

export const getUserPosts = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  const { userId } = args;

  const posts = await context.entities.Post.findMany({
    where: {
      author: { id: userId }
    }
  });

  return posts;
}

export const getPostComments = async ({ postId }, context) => {
  if (!context.user) { throw new HttpError(401) }

  const post = await context.entities.Post.findUnique({
    where: { id: postId },
    include: { comments: true }
  });

  if (!post) throw new HttpError(404, 'No post with id ' + postId);

  return post.comments;
}

export const getUserMessages = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  const { userId } = args;

  const messages = await context.entities.Message.findMany({
    where: {
      OR: [
        { senderId: userId },
        { receiverId: userId }
      ]
    }
  });

  return messages;
}