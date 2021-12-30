var html_insert_blog = `<ul class="nav-detail-content">
                                <li><a href="#">Blog 1</a></li>
                                <li><a href="#">Blog 2</a></li>
                                <li><a href="#">Blog 3</a></li>
                                <li><a href="#">Blog 4</a></li>
                                <li><a href="#">Blog 5</a></li>

                            </ul>`;
var html_insert_book = `<ul class="nav-detail-content">
                                <li><a href="https://andrewlee1807.github.io/books/Cheat Sheets for AI.pdf">Cheat Sheets for AI - <i>BecommingHuman.AI</i></a></li>
                                <li><a href="https://andrewlee1807.github.io/books/Sách Deep Learning cơ bản.pdf">Deep learning (vi) - <i>Tran Thanh Tuan</i> </a></li>
                                <li><a href="https://andrewlee1807.github.io/books/Survey of Neural Transfer Functions.pdf">Survey of Neural Transfer Functions - <i>Włodzisław Duch & Norbert Jankowski</i> </a></li>
                            </ul>`;
var html_insert_project = `<ul class="nav-detail-content">
                                <li><a href="#">Project 1</a></li>
                                <li><a href="#">Project 2</a></li>
                                <li><a href="#">Project 3</a></li>
                            </ul>`;



function blog(){
    document.getElementById("Content_Nav").innerHTML = html_insert_blog;
}

function book(){
    document.getElementById("Content_Nav").innerHTML = html_insert_book;
}

function project(){
    document.getElementById("Content_Nav").innerHTML = html_insert_project;
}
