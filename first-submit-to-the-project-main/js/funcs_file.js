
window.onload = () => {
    fetch_data();
    fetch_list2();
};

function fetch_data() {
    fetch("data/data_file.json")
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
    fetch("data/clothes_requests_list.json")
    .then(response => response.json())
    .then(data => {
        const wrapper_list = document.getElementById("inside-list-rec2");
        const title = document.createElement("h1");
        title.innerHTML = data.category;
        wrapper_list.appendChild(title);
        const list = document.createElement("ul");
        list.classList.add("custom-list");
        let requests = JSON.parse(localStorage.getItem('requests')) || data.requests;
        data.requests.forEach(request => {
            const li = document.createElement("li");
            li.classList.add("custom-list-item");
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


document.addEventListener('DOMContentLoaded', function () {
    const addPersonForm = document.getElementById('addPersonForm');

    addPersonForm.addEventListener('submit', function (event) {
        event.preventDefault();

        
        const name = document.getElementById('full-name').value;
        const url = "donor_request_detail.html";
        const img = "img/donor_default.png";
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

 
    function fetchAndRenderDonors() {
        fetch("data_file.json")
            .then(response => response.json())
            .then(data => {
                let newPerson = sessionStorage.getItem('newPerson');
                newPerson = newPerson ? JSON.parse(newPerson) : null;
                let donors = newPerson ? [newPerson, ...data.requests] : data.requests;

                
                renderDonors(donors, "inside-list-rec");
                sessionStorage.removeItem('newPerson');
            })
            .catch(error => console.error('Error fetching data:', error));
    }

    function renderDonors(donors, elementId) {
        const wrapper = document.getElementById(elementId);
        wrapper.innerHTML = "";

        const list = document.createElement("ul");

        donors.forEach(donor => {
            const li = document.createElement("li");
            const link = document.createElement("a");
            link.href = donor.url;
            const img = document.createElement("img");
            img.src = donor.img;
            const textContent = document.createElement("div");
            textContent.innerHTML = `${donor.name}<br><br>${donor.detail}`;
            li.appendChild(img);
            link.appendChild(textContent);
            li.appendChild(link);
            list.appendChild(li);
        });

        wrapper.appendChild(list);
    }

    fetchAndRenderDonors();
});

