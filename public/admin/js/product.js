// Change status

const buttonChangeStatus = document.querySelectorAll("[button-change-status]");

if(buttonChangeStatus.length > 0) {
  const formChangeStatus = document.querySelector("#form-change-status");

  const path = formChangeStatus.getAttribute("data-path");
  console.log(path);

  buttonChangeStatus.forEach(button => {
    button.addEventListener("click", () => {
      const currentStatus = button.getAttribute("data-status");
      const id = button.getAttribute("data-id");

      let statusChange = currentStatus === "active" ? "inactive" : "active";

      const action = path + `/${statusChange}/${id}?_method=PATCH`;

      formChangeStatus.action = action;
      
      // submit form
      formChangeStatus.submit();

    })
  })
}



// Delete item

const deleteButton = document.querySelectorAll("[button-delete]");

if(deleteButton.length > 0) {
  deleteButton.forEach(button => {
    button.addEventListener("click", () => {
      const isConfirm = confirm("Bạn có chắc muốn xóa sản phẩm này?");
      const deleteForm = document.querySelector("#form-delete-item");

      const path = deleteForm.getAttribute("data-path");


      if(isConfirm) {
        const id = button.getAttribute("data-id");
        const action = `${path}/${id}?_method=DELETE`;

        deleteForm.action = action;
        
        deleteForm.submit();
        
      }
    })
  });
}

// End Delete item