function getAllBooks() {
    for (let i = 0; i < books.length; i++) {
        const element = books[i];
        let mainContent = document.getElementById("mainContent");
        mainContent.innerHTML += getBook(element.name,
            element.author,
            element.likes,
            element.liked,
            element.price,
            element.publishedYear,
            element.genre,
            i);
        getComments(element.comments, i);
    }
}

function getBook(name, author, likes, liked, price, publishedYear, genre, index) {
    return `<div class="bookDiv">
                <div class="bookName">${name}</div>
                <div class="imgBook">
                    <img src="./assets/img/book.png">
                </div>
                <div class="priceLikes">
                    <div class="price">${(price).toFixed(2)}€</div>
                    <div class="likes">
                        <div id="likes${index}">${likes}</div>
                        <img id="likedHeart${index}" class="likedHeart" src="${setLiked(liked)}" onclick="changedLike(${index})">
                    </div>
                </div>
                <div class="bookDetails">
                    <table>
                        <tr>
                            <td>Author</td>
                            <td>:${author}</td>
                        </tr>
                        <tr>
                            <td>Erscheinungsjahr</td>
                            <td>:${publishedYear}</td>
                        </tr>
                        <tr>
                            <td>Genre</td>
                            <td>:${genre}</td>
                        </tr>
                    </table>
                </div>
                <div class="commentsDiv">
                    <span>Kommentare:</span>
                    <div class="cTableDiv">
                        <table id="commentsTable${index}"></table>
                    </div>
                    <div class="sentInput">
                        <form onsubmit="sendComment(${index}); event.preventDefault()"> 
                            <input id="inputComment${index}" class="inputComment" type="text" placeholder="  Schreib dein Kommentar...">
                            <img class="sentImg" onclick="sendComment(${index})" src="./assets/img/sent.png">
                        </form>
                    </div>
                </div> 
            </div>`;
}

function setLiked(liked) {
    if (liked) {
        return "./assets/img/liked-heart.png";
    } else {
        return "./assets/img/unliked-heart.png";
    }
}

function getComments(comments, index) {
    let tableComments = document.getElementById(`commentsTable${index}`);

    for (let i = 0; i < comments.length; i++) {
        const element = comments[i];
        // Insert a row at the beginning of the table
        let newRow = tableComments.insertRow(0);

        // Insert a cell in the row at index 0
        let newCell = newRow.insertCell(0);

        // Append a text node to the cell
        let newName = document.createTextNode(`[${comments[i].name}]`);

        newCell.appendChild(newName);

        let newCell2 = newRow.insertCell(1);

        // Append a text node to the cell
        let newComment = document.createTextNode(":" + comments[i].comment);

        newCell2.appendChild(newComment);

    }
}

function changedLike(index) {
    let likedHeart = document.getElementById("likedHeart" + index);
    let likes = document.getElementById("likes" + index);

    if (likedHeart.src.indexOf("/assets/img/liked-heart.png") !== -1) {
        likedHeart.src = "./assets/img/unliked-heart.png";
        likes.innerHTML = +likes.innerHTML - 1;
        //updating data
        books[index].liked = false;
        books[index].likes = likes.innerHTML;
    } else {
        likedHeart.src = "./assets/img/liked-heart.png";
        likes.innerHTML = +likes.innerHTML + 1;
        //updating data
        books[index].liked = true;
        books[index].likes = likes.innerHTML;
    }

    saveToLocalStorage();
}

function sendComment(index) {
    let comment = document.getElementById(`inputComment${index}`);
    let bookComment = comment.value;
    if (bookComment != "") {
        let tableComments = document.getElementById(`commentsTable${index}`);
        // Insert a row at the beginning of the table
        let newRow = tableComments.insertRow(0);

        // Insert a cell in the row at index 0
        let newCell = newRow.insertCell(0);

        // Append a text node to the cell
        let newName = document.createTextNode(`[${userName}]`);

        newCell.appendChild(newName);

        let newCell2 = newRow.insertCell(1);

        // Append a text node to the cell

        let newComment = document.createTextNode(":" + bookComment);

        newCell2.appendChild(newComment);

        books[index].comments.push({ "name": userName, "comment": bookComment });

        comment.value = "";

        saveToLocalStorage();
    }
}