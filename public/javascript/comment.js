async function comment(event) {
  event.preventDefault();
  const comment_text = document.querySelector("#new-comment").value.trim();
  const post_id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];
  console.log(comment_text, post_id);
  const response = await fetch("/api/comments", {
    method: "POST",
    body: JSON.stringify({ comment_text, post_id }),
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    alert(response.body);
  }
  document.location.reload();
}

document.querySelector("#comment-form").addEventListener("submit", comment);
