// retrieve all messages
export function getMessages() {
  let posts = {};

  if (localStorage.getItem("posts") == null) {
    localStorage.setItem("postsMade", "0");
    localStorage.setItem("posts", JSON.stringify(posts));
  } else {
    //parse posts
    posts = JSON.parse(localStorage.getItem("posts"));
  }

  return posts;
}

// add a message
export function addMessage(author, content) {
  let posts = JSON.parse(localStorage.getItem("posts")) || {};

  let messageID = parseInt(localStorage.getItem("postsMade")) + 1;
  let post_info = {
    username: author,
    content: content,
    upvotes: 0,
    downvotes: 0,
    messageID: messageID,
  };
  posts[messageID] = post_info;

  localStorage.setItem("postsMade", String(messageID));
  localStorage.setItem("posts", JSON.stringify(posts));

  return messageID;
}

// delete a message given its messageId
export function deleteMessage(messageId) {
  let posts = JSON.parse(localStorage.getItem("posts"));
  delete posts[messageId];
  localStorage.setItem("posts", JSON.stringify(posts));
}

export function downvoteMessage(messageID) {
  let posts = JSON.parse(localStorage.getItem("posts"));
  posts[messageID]["downvotes"] += 1;
  localStorage.setItem("posts", JSON.stringify(posts));
}

export function upvoteMessage(messageID) {
  let posts = JSON.parse(localStorage.getItem("posts"));
  posts[messageID]["upvotes"] += 1;
  localStorage.setItem("posts", JSON.stringify(posts));
}
