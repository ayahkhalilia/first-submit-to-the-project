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
            let deletedPerson = sessionStorage.getItem('deletedPerson');
            if (deletedPerson) {
                requests = requests.filter(request => request.name !== deletedPerson);
                sessionStorage.removeItem('deletedPerson');
            }
            render_requests(requests, "inside-list-rec");
            sessionStorage.removeItem('newPerson');
        });
}

function render_requests(requests, elementId) {
    const wrapper_list = document.getElementById(elementId);
    wrapper_list.innerHTML = "";
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
function deleteRequest(requestId) {
    sessionStorage.setItem('deletedPerson', requestId);
    window.location.href = 'index.html';
}

 document.getElementById('addPersonForm').addEventListener('submit', function(event) {
                event.preventDefault();
                const name = document.getElementById('full-name').value;
                const url = "donor_request_detail.html"; // Assuming this is the URL for all donor details
                const img = "img/donor_default.png"; // Replace with the path to a default image or a dynamically uploaded image
                const details = `${document.getElementById('type').value}, ${document.getElementById('size').value}, ${document.getElementById('color').value}`;
                const newDonor = {
                    url: url,
                    img: img,
                    name: name,
                    detail: details
                };
                sessionStorage.setItem('newPerson', JSON.stringify(newDonor));
                window.location.href = 'index.html';
            });