let currentPage = 1;

function at(query, page) {
    fetch(`https://api.pexels.com/v1/search/?page=${page}&per_page=50&query=${query}`, {
        method: "GET",
        headers: {
            "Authorization": "ZOPlrdq5f6tTzu3F3DVmmdGgCIlHHQwzzkfKA3E4BdnS4Ad3UW5S2r0U",
            "content-type": "application/json"
        }
    })
    .then((response) => response.json())
    .then((data) => {
        let container = document.querySelector("#b");
        container.innerHTML = "";
        data.photos.forEach(photo => {
            let card = `
                <div class="d-flex">
                    <div class="card m-1">
                        <a href="${photo.url}">
                            <img src="${photo.src.medium}" class="card-img-top" alt="${photo.photographer}">
                        </a>
                    </div>
                </div>`;
            container.innerHTML += card;
        });
    })
}

function nextPage() {
    currentPage++;
    let query = document.querySelector("#searchInput").value;
    if (query) {
        at(query, currentPage);
    }
}


function previousPage() {
    if (currentPage > 1) {
        currentPage--;
        let query = document.querySelector("#searchInput").value;
        if (query) {
            at(query, currentPage);
        }
    }
}

function handleSearch(event) {
    event.preventDefault(); 
    currentPage = 1; 
    let query = document.querySelector("#searchInput").value;
    if (query) {
        at(query, currentPage);
    }
}


document.querySelector("#prevButton").addEventListener("click", previousPage);
document.querySelector("#nextButton").addEventListener("click", nextPage);


window.onload = function() {
    at(' ');
    document.querySelector("#searchForm").addEventListener("submit", handleSearch);
};