const criteria = [
  {
    id: 1,
    shortName: "Mental Loop",
    text: "The emotional loop is complete — no need for apology, revenge, or reconciliation.",
    points: 2, // completion is good but lower weight
    sin: "Wrath",
    summary:
      "Completion of the emotional cycle removes anger or resentment. Holding on often ties to wrath or desire for retribution.",
  },
  {
    id: 2,
    shortName: "No Reaction",
    text: "Their name, image, or memory no longer causes a physical reaction.",
    points: 3, // no reaction is meaningful
    sin: "Sloth",
    summary:
      "Indifference signals emotional neutrality. Reactivity means unresolved emotions or attachment.",
  },
  {
    id: 3,
    shortName: "No Threat",
    text: "They do not represent a source of future betrayal, chaos, or energetic drain.",
    points: 5, // important for peace & safety
    sin: "Envy",
    summary:
      "People who repeatedly violate your peace often do so due to their own envy or instability.",
  },
  {
    id: 4,
    shortName: "Outgrown Bond",
    text: "No longer spiritually, mentally, or emotionally resonant — even if history was strong.",
    points: 3,
    sin: "Pride",
    summary:
      "Spiritual misalignment often hides behind egoic attachment to history. Letting go is humility.",
  },
  {
    id: 5,
    shortName: "Failed Communication",
    text: "You've tried communicating with clarity but they remain defensive, manipulative, or elusive.",
    points: 7, // very heavy because it blocks healing
    sin: "Pride",
    summary:
      "Refusal to evolve or acknowledge truth stems from pride. Dialogue dies when ego replaces heart.",
  },
  {
    id: 6,
    shortName: "Lesson Done",
    text: "They symbolize a karmic loop or lesson that has been fully learned.",
    points: 4,
    sin: "Greed",
    summary:
      "Holding onto old karmic partners after a lesson is complete is greed disguised as nostalgia.",
  },
  {
    id: 7,
    shortName: "Unavailable Pattern",
    text: "They consistently choose selfishness, disloyalty, or emotional absence — even if subtly.",
    points: 6,
    sin: "Lust",
    summary:
      "Attachment to emotionally unavailable people is often lust chasing an illusion of fulfillment.",
  },
  {
    id: 8,
    shortName: "Forgiven ≠ Access",
    text: "Forgiveness has been given — but access is no longer warranted.",
    points: 3,
    sin: "Wrath",
    summary:
      "Forgiveness severs wrath, but does not mandate reconnection. You can forgive and still detach.",
  },
  {
    id: 9,
    shortName: "Past Self",
    text: "They remind you of past versions of yourself you’ve transcended.",
    points: 2,
    sin: "Sloth",
    summary:
      "Clinging to the past self blocks growth. Detachment is honoring your evolution.",
  },
  {
    id: 10,
    shortName: "Boundary Breaker",
    text: "They do not respect boundaries — subtle or stated.",
    points: 7, // very critical and harmful
    sin: "Pride",
    summary:
      "Disregarding boundaries stems from a prideful belief in their own entitlement to your space.",
  },
  {
    id: 11,
    shortName: "Energetic Drain",
    text: "Your body tightens, your spirit contracts, or you feel drained around their memory.",
    points: 6,
    sin: "Envy",
    summary:
      "Tension and depletion often signal energetic imbalance, usually rooted in envy or subtle power games.",
  },
  {
    id: 12,
    shortName: "Spiritual Expiry",
    text: "They triggered awakening, but now represent stagnation.",
    points: 4,
    sin: "Greed",
    summary:
      "Taking spiritual value from someone doesn't mean they belong in your future. Growth requires release.",
  },
  {
    id: 13,
    shortName: "Disloyal to Healing",
    text: "They once mattered deeply, but clinging now feels disloyal to your healing.",
    points: 5,
    sin: "Lust",
    summary:
      "Romanticizing pain can be a form of lust — craving a feeling rather than truth. Release honors healing.",
  },
  {
    id: 14,
    shortName: "No Peace",
    text: "The thought of seeing them again brings no peace, only stress or analysis.",
    points: 5,
    sin: "Wrath",
    summary:
      "Unresolved emotions or latent expectations often mask wrath. Clarity brings neutrality.",
  },
  {
    id: 15,
    shortName: "Distrust",
    text: "You would not trust them with a dream, secret, or a deeply vulnerable truth.",
    points: 6,
    sin: "Pride",
    summary:
      "Intuition warns where pride reigns — where empathy is lacking, trust cannot thrive.",
  },
  {
    id: 16,
    shortName: "Stagnant Mind",
    text: "They are spiritually closed, intellectually rigid, or emotionally shallow.",
    points: 3,
    sin: "Sloth",
    summary:
      "Stagnation in others invites stagnation in you. Sometimes loving yourself means letting go.",
  },
  {
    id: 17,
    shortName: "Ego Clash",
    text: "Their presence triggers competition, comparison, or a sense of being diminished.",
    points: 5,
    sin: "Pride",
    summary:
      "When ego battles ego, connection becomes performance. True harmony requires inner security.",
  },
  {
    id: 18,
    shortName: "Delusional Lens",
    text: "They consistently distort truth — theirs or yours — creating confusion or unreality.",
    points: 6,
    sin: "Envy",
    summary:
      "Delusion is often envy in disguise — denying truth to maintain illusion. Clarity is compassion.",
  },
  {
    id: 19,
    shortName: "Dogmatic Belief",
    text: "They are overly rigid in religious views, often using faith to judge, exclude, or limit others.",
    points: 4,
    sin: "Pride",
    summary:
      "True faith is expansive, not exclusive. When religion becomes control, the spirit retreats.",
  },
  {
    id: 20,
    shortName: "Spiritual Openness",
    text: "They embody an inclusive, non-dogmatic spiritual outlook — integrating wisdom from multiple traditions and respecting others’ paths.",
    points: -3,
    sin: "N/A",
    summary:
      "Expansive spirituality honors the divine in all forms. When one transcends dogma with humility, truth flows freely.",
  },
];

export default criteria;
