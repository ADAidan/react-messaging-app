const UserContextValue = {
  contacts: [
    {
      id: 1,
      username: "Seymour Wade",
      status: "Online",
    },
    {
      id: 2,
      username: "Kaiya Mccarthy",
      status: "Offline",
    },
    {
      id: 3,
      username: "Brooks Sosa",
      status: "Away",
    },
    {
      id: 4,
      username: "Anton Boone",
      status: "Offline",
    },
    {
      id: 5,
      username: "Hung Buchanan",
      status: "Online",
    },
    {
      id: 6,
      username: "Johnathan Sheppard",
      status: "Online",
    },
  ],
  directMessages: [
    {
      id: 1,
      username: "Seymour Wade",
      messages: [
        {
          id: 1,
          author: "Seymour Wade",
          text: "What time are you available for a meeting?",
          time: "10:57 PM",
        },
        {
          id: 2,
          author: "AidanDyer",
          text: "I am available at 3:30 PM tomorrow.",
          time: "10:57 PM",
        },
        {
          id: 3,
          author: "Seymour Wade",
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tellus orci ac auctor augue mauris augue neque gravida in.",
          time: "11:58 PM",
        },
      ],
    },
    {
      id: 2,
      username: "Kaiya Mccarthy",
      messages: []
    },
  ],
  pending: [
    {
      id: 1,
      username: "Sophia Gonzalez",
      status: "outgoing contact request",
    },
    {
      id: 2,
      username: "Isabella Morales",
      status: "outgoing contact request",
    },
    {
      id: 3,
      username: "Olivia Castillo",
      status: "incoming contact request",
    },
  ],
};
    
export default UserContextValue;