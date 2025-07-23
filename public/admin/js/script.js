// Button status
const buttonStatus = document.querySelectorAll("[button-status]");

if(buttonStatus.length > 0) {
  let url = new URL(window.location.href);
  buttonStatus.forEach((button) => {
    button.addEventListener("click", () => {
      const status = button.getAttribute("button-status");
      if(status){
        url.searchParams.set("status", status);
      } else {
        url.searchParams.delete("status");
      }

      window.location.href = url.href;
    })
  })
}

// Form search
const formSearch = document.querySelector("#form-search");
if(formSearch) {
  let url = new URL(window.location.href);

  formSearch.addEventListener("submit", (e) => {
    e.preventDefault();
    const keyword = e.target.keyword.value;

    if(keyword){
        url.searchParams.set("keyword", keyword);
      } else {
        url.searchParams.delete("keyword");
      }

      window.location.href = url.href;
  })
}

// End Form Search


// Pagination
const buttonPagination = document.querySelectorAll("[button-pagination]");

if(buttonPagination) {
  let url = new URL(window.location.href);

  buttonPagination.forEach(button => {
    button.addEventListener("click", () => {
      const page = button.getAttribute("button-pagination");
      url.searchParams.set("page", page);

      window.location.href = url.href;
    })
  })
}
// End Pagination



// Checkbox multi

const checkboxMulti = document.querySelector("[checkbox-multi]");

if(checkboxMulti) {
  const selectAllCheckbox = checkboxMulti.querySelector("input[name='checkall']");
  const selectOneCheckboxes = checkboxMulti.querySelectorAll("input[name='id']");



  if(selectOneCheckboxes.length === 0 ) {
    selectAllCheckbox.remove();
  }


  if(selectAllCheckbox) {
    selectAllCheckbox.addEventListener("click", () => {

      if(selectAllCheckbox.checked) {
        selectOneCheckboxes.forEach(checkbox => {
          checkbox.checked = true;
        })
      } else {
        selectOneCheckboxes.forEach(checkbox => {
          checkbox.checked = false;
        })
      }
    })
  }

  if(selectOneCheckboxes.length) {
    selectOneCheckboxes.forEach(checkbox => {
      checkbox.addEventListener("click", () => {
        const checkedTotal = checkboxMulti.querySelectorAll("input[name='id']:checked");


        if(checkedTotal.length === selectOneCheckboxes.length){
          selectAllCheckbox.checked = true;
        } else{
          selectAllCheckbox.checked = false;
        }
      });
    });
  }
}

// end checkbox multi


// Form change multi status
const formChangeMulti = document.querySelector("[form-change-multi");
if(formChangeMulti){
  formChangeMulti.addEventListener("submit", (e) => {
    e.preventDefault();
    // get table
    const checkboxMulti = document.querySelector("[checkbox-multi]");
    const checkedTotal = checkboxMulti.querySelectorAll("input[name='id']:checked");


    const typeChange = e.target.elements.type.value;
    if(typeChange === 'delete-all') {
      const isConfirm = confirm('Bạn có chắc muốn xóa những sản phẩm này?');

      if(!isConfirm) {
        return;
      }
    }

    if(checkedTotal.length > 0) {
      let ids = [];
      checkedTotal.forEach(checkbox => {
        const id = checkbox.value;
        if(typeChange === "change-position") {
          const position = checkbox
            .closest("tr")
            .querySelector("input[name='position']").value;
          ids.push(`${id}-${position}`);
        } else {
          ids.push(id);
        }
      })
      
      const inputIds = formChangeMulti.querySelector("input[name='ids']");
      inputIds.value = ids.join(", ");

      formChangeMulti.submit();
      
    } else {
      alert("Vui lòng chọn ít nhất 1 bản ghi");
    }
  });
}


// End form change multi status



// Show alert
const showAlert = document.querySelector("[show-alert]");

if(showAlert) {
  const time = parseInt(showAlert.getAttribute("data-time"));
  setTimeout(() => {
    showAlert.classList.add("alert-hidden");
  }, time)

  const closeAlert = showAlert.querySelector("[close-alert]");
  closeAlert.addEventListener("click", () => {
    showAlert.classList.add("alert-hidden");
  })
}

// End Show alert



// Upload Image (preview)
const uploadImage = document.querySelector("[upload-image]");

console.log(uploadImage);
if(uploadImage) {
  const uploadImageInput = uploadImage.querySelector("[upload-image-input]");
  const uploadImagePreview = uploadImage.querySelector("[upload-image-preview]");

  
  console.log(uploadImageInput.files);

  uploadImageInput.addEventListener("change", (e) => {

    const file = e.target.files[0];
    if(file){
      uploadImagePreview.src = URL.createObjectURL(file);
      const closeImagePreview = document.querySelector("[close-image-preview]");
      closeImagePreview.innerHTML = "x"
      closeImagePreview.classList.add("close-image-preview");

      closeImagePreview.addEventListener("click", () => {
        uploadImageInput.value = "";
        uploadImagePreview.src = "";
        closeImagePreview.innerHTML = "";
        closeImagePreview.classList.remove("close-image-preview");

      });
    }
  })
  
}

// End Upload Image


