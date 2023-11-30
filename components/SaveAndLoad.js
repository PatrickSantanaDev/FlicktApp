async function loadList(url,list,setlist) {
  const response = await fetch(url);
  const names = await response.json();

  names.forEach((item) => {
    list.push(item);
  }) 

  const newList = list.map((item) => {return item})
  setlist(newList);
  console.log("load complete!");
}

async function saveList(url,list) {
  
  const requestOption = {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify(list)
  }
  const response = await fetch(url, requestOption);
  console.log(response + "a");
  console.log("save complete!");
}

export {loadList}
export {saveList}