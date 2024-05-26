const mockData = [{
  _id: '1',
  participants: [{
    _id: '1',
    username: "testUser",
    profilePicture: "",
    status: "Online",
  },
  {
    _id: '2',
    username: "John",
    profilePicture: "",
    status: "Offline",
  }],
  messages: [{
    id: 1, author: {
      username: "John",
      profilePicture: "",
  }, content: "Hello", createdAt: "2024-05-26T10:00:00-06:00" }],
},
{
  _id: '2',
  participants: [{
    _id: '1',
    username: "testUser",
    profilePicture: "",
    status: "Online",
  },
  {
    _id: '3',
    username: "Jane",
    profilePicture: "",
    status: "Online",
  }],
  messages: [],
}];

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