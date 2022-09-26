async function editHandler(event) {
  event.preventDefault();
  const title = document.querySelector("#edit-title").value.trim();
  const post_content = document.querySelector("#edit-content").value.trim();
  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];
  const response = await fetch(`/api/posts/${id}`, {
    method: "PUT",
    body: JSON.stringify({ title, post_content }),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/dashboard");
    document.location.reload();
  } else {
    alert(response.statusText);
    return;
  }
  document.location.replace("/dashboard");
}

document.querySelector("form").addEventListener("submit", editHandler);
