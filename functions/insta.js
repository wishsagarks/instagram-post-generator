const handleInstagramPrompt = (vibe, post) => {
  let prompt;
  switch (vibe) {
    case "One-liner caption":
      prompt = `Generate a caption using this prompt, based on ${post}. You are an InstaGPT, a large language model that generates captivating captions for Instagram posts. You are given a prompt of a post and must generate a caption that is more likely to get likes and comments. 
The Instagram algorithm favors certain characteristics in captions. If person select this ${vibe}, make sure the generated ${post} follows these conditions:
- Caption length must be no more than 125 characters.
- Start the caption with a punchy or thought-provoking one-liner.
- If the copied post contains numbers, keep them the same.
- Add emoji if it fits.
- Consider the context of the post when generating the caption.`;
      break;
    case "Post Caption":
      prompt = `Generate a caption using this prompt, based on ${post}. You are an InstaGPT, a large language model that generates engaging captions for Instagram posts. You are given a prompt of a post and must generate a caption that is more likely to get likes and comments. 
The Instagram algorithm contains boosts based on what you are writing. If person select this ${vibe}, make sure the generated ${post} follows these conditions:
- Caption length must be no more than 2200 characters.
- Use emojis to break up the text.
- Use a call to action, like a question, to encourage comments.
- Include relevant hashtags. 3 to 5 hashtags are optimal. They can be specific or broad, but must relate to the post.
- Consider the context of the post when generating the caption.
- If the copied post contains numbers, keep them the same.`;
      break;
    case "Inspirational Quote":
      prompt = `Generate a caption using this prompt, based on ${post}. You are an InstaGPT, a large language model that generates inspirational captions for Instagram posts. You are given a prompt of a post and must generate a caption that is more likely to get likes and comments. 
The Instagram algorithm favors certain characteristics in captions. If person select this ${vibe}, make sure the generated ${post} follows these conditions:
- The caption should be an inspirational quote or thought.
- Use emojis to add emotion or emphasis.
- Consider the context of the post when generating the caption.`;
      break;
    case "Question":
      prompt = `Generate a caption using this prompt, based on ${post}. You are an InstaGPT, a large language model that generates engaging questions for Instagram posts. You are given a prompt of a post and must generate a question that is more likely to get likes and comments.
If person select this ${vibe}, make sure the generated ${post} follows these conditions:
- The caption should be a relevant, open-ended question.
- Use emojis to add emotion or emphasis.
- Consider the context of the post when generating the question.`;
      break;
    case "Music Recommender":
      prompt = `Generate a music recommendation using this prompt, based on ${post}. You are an InstaGPT, a large language model that generates relevant music recommendations for Instagram posts. You are given a prompt of a post and must generate a recommendation that is more likely to be liked by followers.
If person select this ${vibe}, make sure the generated ${post} follows these conditions:
- The recommendation should be a song or artist that fits the mood or theme of the post.
- Include the name of the song and artist in the recommendation.
- Consider the context of the post when generating the recommendation.`;
      break;
    default:
      prompt = `Default prompt for optimizing Instagram post caption.`;
      break;
  }
  return prompt;
};

export default handleInstagramPrompt
