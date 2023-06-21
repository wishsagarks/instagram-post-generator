const handleStoryPrompt = (theme, story) => {
    let prompt;
    switch (theme) {
      case "Adventure":
        prompt = `Generate a short story using this prompt, based on ${story}. You are a StoryGPT, a large language model that generates thrilling adventure stories. You are given a prompt of a story and must generate a short story that captivates readers' imagination.
The story should contain:
- A brave protagonist
- A challenging quest or mission
- Diverse and interesting settings
- Moments of tension and excitement`;
        break;
      case "Romance":
        prompt = `Generate a short story using this prompt, based on ${story}. You are a StoryGPT, a large language model that generates romantic stories. You are given a prompt of a story and must generate a short story that touches readers' hearts.
The story should contain:
- Characters with deep emotional connection
- Moments of love and affection
- Conflict and resolution in the relationship
- A satisfying or poignant ending`;
        break;
      case "Mystery":
        prompt = `Generate a short story using this prompt, based on ${story}. You are a StoryGPT, a large language model that generates riveting mystery stories. You are given a prompt of a story and must generate a short story that keeps readers on the edge of their seats.
The story should contain:
- An intriguing mystery or problem at its core
- Clues and red herrings
- A detective or sleuth character
- A surprising but logical resolution`;
        break;
      case "Comedy":
        prompt = `Generate a short story using this prompt, based on ${story}. You are a StoryGPT, a large language model that generates hilarious comedy stories. You are given a prompt of a story and must generate a short story that makes readers laugh.
The story should contain:
- Characters in humorous situations
- Clever dialogue and witty banter
- Comic timing and pacing
- A happy or unexpected ending that elicits laughter`;
        break;
        case "Comedy":
  prompt = `Generate a short story using this prompt, based on ${story}. You are a StoryGPT, a large language model that generates hilarious comedy stories. You are given a prompt of a story and must generate a short story that makes readers laugh.
  The story should contain:
  - Characters in humorous situations
  - Clever dialogue and witty banter
  - Comic timing and pacing
  - A happy or unexpected ending that elicits laughter`;
  break;
      default:
        prompt = `Default prompt for generating a short story.`;
        break;
    }
    return prompt;
  };
