const questions = [
  // Responsibility & Integrity
  {
    id: 1,
    text: "Does the person often avoid responsibility?",
    weight: 1,
  },
  {
    id: 2,
    text: "Does the person stay consistent with promises?",
    weight: -2,
  },
  {
    id: 3,
    text: "Do they make excuses instead of finding solutions?",
    weight: 1,
  },

  // Empathy & Relationships
  {
    id: 4,
    text: "Does the person show empathy in difficult situations?",
    weight: -1,
  },
  {
    id: 5,
    text: "Do they frequently criticize or belittle others?",
    weight: 2,
  },
  {
    id: 6,
    text: "Do they prioritize material gain over relationships?",
    weight: 2,
  },
  {
    id: 7,
    text: "Do they genuinely celebrate the success of others?",
    weight: -1,
  },

  // Manipulation & Trust
  {
    id: 8,
    text: "Does the person manipulate or guilt-trip others?",
    weight: 2,
  },
  {
    id: 9,
    text: "Do they exaggerate or twist facts to their advantage?",
    weight: 2,
  },
  {
    id: 10,
    text: "Do they admit when they are wrong?",
    weight: -2,
  },
  {
    id: 11,
    text: "Do they break trust but expect forgiveness quickly?",
    weight: 2,
  },

  // Stability & Growth
  {
    id: 12,
    text: "Are they consistent in their values and actions?",
    weight: -2,
  },
  {
    id: 13,
    text: "Do they lose interest or withdraw when things get hard?",
    weight: 1,
  },
  {
    id: 14,
    text: "Do they seek personal growth and learning?",
    weight: -1,
  },
  {
    id: 15,
    text: "Do they blame others for their own mistakes?",
    weight: 2,
  },

  // Social & Spiritual
  {
    id: 16,
    text: "Do they respect other people’s boundaries?",
    weight: -1,
  },
  {
    id: 17,
    text: "Do they act differently in public vs private?",
    weight: 1,
  },
  {
    id: 18,
    text: "Do they use others for convenience?",
    weight: 2,
  },
  {
    id: 19,
    text: "Do they acknowledge gratitude and show humility?",
    weight: -2,
  },
  {
    id: 20,
    text: "Do they drain more energy from you than they give?",
    weight: 2,
  },
  {
    id: "q_high_1",
    text: "Would you like a size that gives you pain?",
    weight: 5, // very high weight
  },
  {
    id: "q_high_2",
    text: "Do you enjoy extremes even if they are intense?",
    weight: 4,
  },
  {
    id: "q_high_3",
    text: "Do you prefer situations that push boundaries or discomfort?",
    weight: 4,
  },
  {
    id: "q_high_4",
    text: "Do you get satisfaction from reaching unusual or rare experiences?",
    weight: 3,
  },
  {
    id: "q_high_5",
    text: "Do you enjoy being in positions that most people avoid due to intensity?",
    weight: 4,
  },
  {
    id: "q_high_6",
    text: "Do you prefer more time in intimacy than half an hour?",
    weight: 5, // high weight to push toward right tail
  },
  {
    id: "q_high_7",
    text: "Do you prefer less time in intimacy than three minutes?",
    weight: -5, // high weight to push toward left tail
  },
];

export default questions;
