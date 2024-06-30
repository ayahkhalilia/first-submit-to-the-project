window.onload = () => {
    fetch_data();
    fetch_list2();
};

function fetch_data() {
    fetch("data_file.json")
        .then(response => response.json())
        .then(data => {
            let new_Person = sessionStorage.getItem('newPerson');
            new_Person = new_Person ? JSON.parse(new_Person) : null;
            let requests = new_Person ? [new_Person, ...data.requests] : data.requests;
            render_requests(requests, "inside-list-rec");
            sessionStorage.removeItem('newPerson');
        });
}

function render_requests(requests, elementId, category) {
    const wrapper_list = document.getElementById(elementId);
    wrapper_list.innerHTML = "";
    const title = document.createElement("h1");
    title.innerHTML = category;
    wrapper_list.appendChild(title);
    const list = document.createElement("ul");
    requests.forEach(request => {
        const li = document.createElement("li");
        const link = document.createElement("a");
        link.href = request.url;
        const img = document.createElement("img");
        img.src = request.img;
        const textContent = document.createElement("div");
        textContent.innerHTML = `${request.name}<br><br>${request.detail}`;
        li.appendChild(img);
        link.appendChild(textContent);
        li.appendChild(link);
        list.appendChild(li);
    });
    wrapper_list.appendChild(list);
}

function fetch_list2() {
    fetch("clothes_requests_list.json")
    .then(response => response.json())
    .then(data => {
      const wrapper_list = document.getElementById("inside-list-rec2");
      const title = document.createElement("h1");
      title.innerHTML = data.category;
      wrapper_list.appendChild(title);
      const list = document.createElement("ul");
      let requests = JSON.parse(localStorage.getItem('requests')) || data.requests;
      data.requests.forEach(request => {
        const li = document.createElement("li");
        const link = document.createElement("a");
        link.href = request.url;
        const img = document.createElement("img");
        img.src = request.img;
        const textContent = document.createElement("div");
        textContent.innerHTML = `${request.name}<br><br>${request.detail}`;
        li.appendChild(img);
        link.appendChild(textContent);
        li.appendChild(link);
        list.appendChild(li);
      });
      wrapper_list.appendChild(list);
    });

}


