// filter options
let ulElement = document.querySelector("#sidebarNav");
ulElement.addEventListener("click", function (e) {
  let filterOption = e.target.value;
  let data = {
    filterOption: filterOption,
  };
  const config = {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
    //body: JSON.stringify(data),
  };
  if (String(filterOption) !== "undefined") {
    fetch(`/filteredBooks/${filterOption}`, config)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }
});
