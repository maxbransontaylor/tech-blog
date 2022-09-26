async function deleteHandler(event) {
  console.log("click");
  event.preventDefault();
  if (event.target.matches(".delete")) {
    const id = event.target.dataset.deleteid;
    const response = await fetch(`/api/posts/${id}`, { method: "DELETE" });
    if (response.ok) {
      document.location.replace("/dashboard");
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
}

document.querySelector("#your-posts").addEventListener("click", deleteHandler);
