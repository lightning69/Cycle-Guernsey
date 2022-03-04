function getSortFunction() {
    return (row1, row2) => {
        if (!isNaN(parseFloat(row1.text)))
        {
            return parseFloat(row1.text) - parseFloat(row2.text)
        }
        else
        {
            return row1.text.toLowerCase().localeCompare(row2.text.toLowerCase())
        }
    }
}

function sort_rows(table, columnIndex, clicked){
    const tbody = table.querySelector("tbody")
    const rows = tbody.querySelectorAll("tr")
    const sel2 = "td:nth-child(" + (columnIndex + 1) + ")"
    var column_elements = []
    for (let x = 0; x < rows.length; x ++){
        const row = rows[x]
        column_elements.push({ text: row.querySelector(sel2).innerText, row: row})
    }

    if (clicked.classList.contains("done_ascending")){
        column_elements.sort(getSortFunction()).reverse()
        clicked.classList.remove("done_ascending")
    }
    else{
        column_elements.sort(getSortFunction())
        clicked.classList.add("done_ascending")
    }

    const clicked_siblings = clicked.parentNode.parentNode.children
    const clicked_index = Array.prototype.indexOf.call(clicked_siblings, clicked.parentNode);
    for (let x = 0; x < clicked_siblings.length; x ++){
        if (x != clicked_index){
            const array = clicked_siblings[x].children
            const link = array[0]
            if (link.classList.contains("done_ascending")){
                link.classList.remove("done_ascending")
            }
        }
    }
    
    for (let index = 0; index < column_elements.length; index ++){
        const row_to_move = column_elements[index].row
        tbody.insertBefore(row_to_move, tbody[index])
    }
    
}


function find_col_index(table, columns) {
    return (event) => {
        for (let x = 0; x < 6; x ++){
            if (columns[x].contains(event.target)){
                var columnIndex = x
                break
            }
        }
        const clicked = event.target
        sort_rows(table, columnIndex, clicked)
        event.preventDefault();
    }
}

if (document.querySelector("body").classList.contains("routes")){
    var table = document.getElementById("table")
    var thead = table.querySelector("thead")
    table_headers = table.querySelectorAll("th")
    for (let x = 0; x < table_headers.length; x ++){
        table_headers[x].innerHTML = "<a href='#' class='theader_link'>" + table_headers[x].innerText + "</a>"
    }
    var columns = thead.querySelectorAll("th")
    thead.addEventListener("click", find_col_index(table, columns))
}

/*------------------------------------------------------------------------------------------------------------------------------*/

function calcTime (){
    const length = parseFloat(document.getElementById("lengthNum").innerText)
    const ascent = parseFloat(document.getElementById("ascentNum").innerText)
    const speedBox = document.getElementById("speed")
    const speed = speedBox.value
    console.log(speed)
    const time = document.getElementById("time")
    const timeValue = Math.round(60*((length + 0.017*ascent)/speed))

    if (timeValue > 0 && timeValue < 10000000000000000){
        time.innerText = timeValue
    }
    else{
        time.innerText = 0
    }
}

/*--------------------------------------------------------------------------------------------------------------------------------*/
function transition_right(){
    clearInterval(repeat)
    repeat = setInterval(transition_right, 5000)
    const currentImage = document.querySelector(".current")
    console.log(currentImage.id)
    if (currentImage.id == "2"){
        const newImage = document.getElementById("3")
        currentImage.classList.remove("current")
        newImage.classList.add("current")
    }

    if (currentImage.id == "1"){
        const newImage = document.getElementById("2")
        currentImage.classList.remove("current")
        newImage.classList.add("current")
    }

    if (currentImage.id == "3"){
        const newImage = document.getElementById("1")
        currentImage.classList.remove("current")
        newImage.classList.add("current")
    }
        
}

function transition_left(){
    clearInterval(repeat)
    repeat = setInterval(transition_right, 5000)
    const currentImage = document.querySelector(".current")
    console.log(currentImage.id)
    if (currentImage.id == "2"){
        const newImage = document.getElementById("1")
        currentImage.classList.remove("current")
        newImage.classList.add("current")
    }

    if (currentImage.id == "1"){
        const newImage = document.getElementById("3")
        currentImage.classList.remove("current")
        newImage.classList.add("current")
    }

    if (currentImage.id == "3"){
        const newImage = document.getElementById("2")
        currentImage.classList.remove("current")
        newImage.classList.add("current")
    }
        
}

var repeat

function transition(){
    const slide_left = document.getElementById("slide_left")
    slide_left.addEventListener("click", transition_left)
    const slide_right = document.getElementById("slide_right")
    slide_right.addEventListener("click", transition_right)

    repeat = setInterval(transition_right, 4000)
}