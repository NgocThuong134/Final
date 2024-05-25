// HANDLE BLOCK_UNBLOCK USER
document.addEventListener("click", function (event) {
  if (
    event.target.id === "userBlockBtn" ||
    event.target.id === "userUnBlockBtn"
  ) {
    event.preventDefault();
    const userId = event.target.getAttribute("data-id");
    const isBlocked = event.target.id === "userBlockBtn";

    const url = `/api/admin/users/${userId}${
      isBlocked ? "/block" : "/unblock"
    }`;
    axios
      .put(url)
      .then(function (response) {
        if (response.data.success) {
          if (isBlocked) {
            event.target.id = "userUnBlockBtn";
            event.target.textContent = "Unblock";
          } else {
            event.target.id = "userBlockBtn";
            event.target.textContent = "Block";
          }
          axios.get(location.href).then(function (response) {
            const usersTable = document.querySelector("#usersTable");
            const newContent = document.createElement("div");
            newContent.innerHTML = response.data;
            usersTable.innerHTML =
              newContent.querySelector("#usersTable").innerHTML;
          });
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  }
});

// DELETE USER WHEN CLICK DELETE
document.addEventListener("click", async function (event) {
  if (event.target.id === "userDeleteBtn") {
    event.preventDefault();
    const userId = event.target.getAttribute("data-id");

    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "Do you want to delete this user?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#1d4289",
        cancelButtonColor: "#f7ba01",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        const response = await axios.delete(
          `/api/admin/users/${userId}/delete`
        );
        if (response.data.success) {
          // Remove the deleted user element from the UI
          const userRow = event.target.closest("tr");
          if (userRow) {
            userRow.parentNode.removeChild(userRow);
          } else {
            console.error("Failed to find the user row element");
          }
        } else {
          console.error("Failed to delete the user:", response.data);
        }
      }
    } catch (error) {
      console.error("Error deleting the user:", error);
    }
  }
});
