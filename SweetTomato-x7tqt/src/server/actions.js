import HttpError from '@wasp/core/HttpError.js'

export const createPost = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const userId = context.user.id;
  const { content, hashtags } = args;

  const post = await context.entities.Post.create({
    data: {
      content,
      author: { connect: { id: userId } },
      hashtags: { connectOrCreate: hashtags.map(name => ({ create: { name }, where: { name } } )) }
    }
  });

  return post;
}

export const createComment = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const comment = await context.entities.Comment.create({
    data: {
      content: args.content,
      postId: args.postId,
      authorId: context.user.id
    }
  });

  return comment;
}

export const sendMessage = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  return context.entities.Message.create({
    data: {
      content: args.content,
      sender: { connect: { id: context.user.id } },
      receiver: { connect: { id: args.receiverId } }
    }
  });
}