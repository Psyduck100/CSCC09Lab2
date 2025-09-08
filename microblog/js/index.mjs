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
    let elmt = document.createElement("div");
    elmt.className = "message";
    elmt.innerHTML = `
        <div class="message_user">
            <img class="message_picture" src="media/user.png" alt="${username}">
            <div class="message_username">${username}</div>
        </div>
        <div class="message_content">${content}</div>
        <div class="upvote-icon icon">0</div>
        <div class="downvote-icon icon">0</div>
        <div class="delete-icon icon"></div>
    `;
    // add this element to the document
    document.getElementById("messages").prepend(elmt);
  });


let deleteBtn = document.getElementsByClassName("delete-icon");
for (let i = 0; i < deleteBtn.length; i++){
  deleteBtn[i].addEventListener("click", function(e) {
    let post = e.target.parentElement;
    post.remove();
  })
}