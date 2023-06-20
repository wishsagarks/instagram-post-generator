import { compact } from "lodash";
import Sentiment from "sentiment";

interface Validation {
  type: "positive" | "negative";
  message: string;
}


export interface RankResponse {
  score: number;
  validations: Validation[];
}

interface PostData {
  post: string;
  originalPost: string;
  sentiment: Sentiment.AnalysisResult;
  postMedia: boolean;
}

export function rank(post: string, postMedia: boolean): RankResponse {
  const parsedPost = post.toLowerCase();

  if (parsedPost.length < 2) {
    return {
      score: 0,
      validations: [],
    };
  }

  const theSentiment = new Sentiment();
  const theSentimentResponse = theSentiment.analyze(post);

  const postData: PostData = {
    post: parsedPost,
    originalPost: post,
    sentiment: theSentimentResponse,
    postMedia: postMedia,
  };

  const rules = [
    multipleHashtags,
    imageVideoBoost,
    postHasUrl,
    emojis,
    sentiment,
    lineBreaks,
    questions,
    lineLength,
  ];

  const scores = rules.map((rule) => rule(postData).score);
  const validations: Validation[] = compact(
    rules.map((rule) => {
      const result = rule(postData);
      if (result?.message !== undefined) {
        return {
          type: "positive", 
          score: result.score,
          message: result.message,
        };
      }
      return null;
    })
  );
  
  const sum = scores.reduce((partialSum, score) => partialSum * score, 1);

  return {
    score: sum,
    validations,
  };
}

function multipleHashtags({ post }: PostData) {
  const regex = /#[\w-]+/g;
  const hashtags = post.match(regex);
  const lowerCasePost = post.toLowerCase();

  if (hashtags && hashtags.length > 3) {
    return {
      score: 0.5,
      message: "Too many hashtags.",
    };
  }
  if (hashtags && hashtags.length <= 3) {
    if (
      lowerCasePost.includes("#follow") ||
      lowerCasePost.includes("#comment") ||
      lowerCasePost.includes("#like")
    ) {
      return {
        score: 0.5,
        message: "Avoid using hashtags like 'follow,' 'comment,' or 'like'.",
      };
    }
    return {
      score: 1,
      message: "Combine general and specific hashtags.",
    };
  }

  return {
    score: 1.0,
  };
}

function imageVideoBoost({ postMedia }: PostData) {
  const has_media = postMedia;
  if (has_media) {
    return {
      score: 2.0,
      message: "Contains image or video.",
    };
  }
  return {
    score: 1.0,
  };
}

function postHasUrl({ post }: PostData) {
  const regex =
    /https?:\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:/~+#-]*[\w@?^=%&amp;/~+#-])?/g;
  const urls = post.match(regex);
  if (urls && urls.length > 0) {
    return {
      score: 0.5,
      message: "Remove the link from the post and add it in the comments.",
    };
  }
  return {
    score: 1.0,
  };
}

function emojis({ post, sentiment }: PostData) {
  const regex = new RegExp("[\uD800-\uDBFF][\uDC00-\uDFFF]", "g");
  const emojis = post.match(regex) || [];
  const totalMatches = emojis.length;
  if (totalMatches > 0) {
    return {
      score: 1.5,
      message: `Included ${totalMatches} emojis in the post.`,
    };
  }
  return {
    score: 1,
  };
}

function sentiment({ post, sentiment }: PostData) {
  if (sentiment.comparative >= 0.5) {
    if (sentiment.comparative > 1.5) {
      return {
        score: 1.5,
        message: "Exceptionally positive.",
      };
    } else {
      return {
        score: 1.1,
        message: "Positive sentiment.",
      };
    }
  } else if (sentiment.comparative <= -0.5) {
    if (sentiment.comparative < -1.5) {
      return {
        score: 0.5,
        message: "Exceptionally negative.",
      };
    } else {
      return {
        score: 0.9,
        message: "Negative sentiment.",
      };
    }
  } else {
    return {
      score: 1,
    };
  }
}

function lineBreaks({ post }: PostData) {
  const breaks = post.split(/\n\s*\n/);
  const totalBreaks = breaks.length - 1;
  if (totalBreaks >= 1) {
    return {
      score: 1.5,
      message: `Used ${totalBreaks} line breaks.`,
    };
  } else {
    return {
      score: 1,
    };
  }
}

function lineLength({ post }: PostData) {
  const lines = post.split("\n");
  let score = 1.0;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].length > 200) {
      return {
        score: 0.9,
        message: `Reduce line length to improve readability (200 characters).`,
      };
    }
  }
  return {
    score: 1,
  };
}

function questions({ post }: PostData) {
  if (post.includes("?")) {
    return {
      score: 1.5,
      message: "Included a question in the post.",
    };
  } else {
    return {
      score: 1,
    };
  }
}
