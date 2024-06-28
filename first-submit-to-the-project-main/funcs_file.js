window.onload = () =>{
  fetch_data();
}

function fetch_data() {
    fetch("data_file.json")
         .then(response =>response.json())
         .then(data =>{
            const wrapper_list=document.getElementById("list-rec1");
            const title=document.createElement("h1");
            title.innerHTML=data.category;
            wrapper_list.appendChild(title);
           
            const list=document.createElement("ul");
            data.requests.forEach(request => {
                const li=document.createElement("li");
                const img = document.createElement("img");
                img.src = request.img;
                const textContent = document.createElement("div");
                textContent.innerHTML = `${request.name}<br><br>${request.detail}`;

                li.appendChild(img);
                li.appendChild(textContent);
                list.appendChild(li);
            });
            wrapper_list.appendChild(list);
         });
}