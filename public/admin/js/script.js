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


    if(checkedTotal.length > 0) {
      let ids = [];
      checkedTotal.forEach(checkbox => {
        const id = checkbox.value;
        ids.push(id);
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