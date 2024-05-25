const mockData = [
  {
    id: 1,
    messages: [{ id: 1, author: "John", text: "Hello", time: "12:00" }],
    username: "John",
  },
  {
    id: 2,
    messages: [],
    username: "Jane",
  },
];

export const mockContacts = [
  {
    _id: '1',
    username: "John",
    status: "Online",
    profilePicture: "",
  },
  {
    _id: '2',
    username: "Jane",
    status: "Offline",
    profilePicture: "",
  },
]

export const mockPending = [
  {
    user: {
      _id: '1',
      username: "John",
      status: "Online",
      profilePicture: "",
    },
    pendingStatus: "outgoing"
  },
  {
    user: {
      _id: '2',
      username: "Jane",
      status: "Offline",
      profilePicture: "",
    },
    pendingStatus: "incoming"
  },
  {
    user: {
      _id: '3',
      username: "Jeffery",
      status: "Online",
      profilePicture: "",
    },
    pendingStatus: "outgoing"
  },
]

export default mockData;