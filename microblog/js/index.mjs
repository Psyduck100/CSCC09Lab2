import { getMessages, addMessage, deleteMessage, upvoteMessage, downvoteMessage } from './api.mjs'

function createPost(username, content, id, upvotes = 0, downvotes = 0) {

    let elmt = document.createElement("div");
    elmt.className = "message";
    elmt.id = String(id)
    elmt.innerHTML = `
        <div class="message_user">
            <img class="message_picture" src="media/user.png" alt="${username}">
            <div class="message_username">${username}</div>
        </div>
        <div class="message_content">${content}</div>
        <div class="upvote-icon icon">${upvotes}</div>
        <div class="downvote-icon icon">${downvotes}</div>
        <div class="delete-icon icon"></div>
    `;
    // add this element to the document
    document.getElementById("messages").prepend(elmt);

}







let posts = getMessages();

//build posts once page loads
document.addEventListener('DOMContentLoaded', function() {

  for (const [key, value] of Object.entries(posts)){
    createPost(value['username'], value['content'], key, value['upvotes'], value['downvotes']);
  }  
});





document
  .getElementById("create_message_form")
  .addEventListener("submit", function (e) {
    // prevent from refreshing the page on submit
    e.preventDefault();
    // read form elements
    let username = document.getElementById("post_name").value;
    let content = document.getElementById("post_content").value;
    // clean form
    document.getElementById("create_message_form").reset();
    // create a new message element


    let messageID = addMessage(username, content);
    createPost(username, content, messageID);

  });


let messages = document.getElementById("messages");



messages.addEventListener("click", function (e) {
  if (e.target.classList.contains("delete-icon")){
    e.target.parentElement.remove();

    let id = e.target.parentElement.id;
    deleteMessage(id);
  }

})

messages.addEventListener("click", function (e) {
  if (e.target.classList.contains("downvote-icon")){
    let num = parseInt(e.target.textContent) + 1
    e.target.textContent = num;

    let id = e.target.parentElement.id; 
    downvoteMessage(id);
  }
})

messages.addEventListener("click", function (e) {
  if (e.target.classList.contains("upvote-icon")){
    let num = parseInt(e.target.textContent) + 1
    e.target.textContent = num;

    let id = e.target.parentElement.id;
    upvoteMessage(id);
  }
})
