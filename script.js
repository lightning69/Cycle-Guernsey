/*Hide and display menu*/
function hidemenu_borders(menu) {
    menu.classList.add("menu_hide_borders")
}

function showmenu_borders(menu) {
    menu.classList.remove("menu_hide_borders")
}

function hidemenu_links(menu_link1, menu_link2, menu_link3){
    menu_link1.classList.add("menu_link_hide")
    menu_link2.classList.add("menu_link_hide")
    menu_link3.classList.add("menu_link_hide")
}

function showmenu_links(menu_link1, menu_link2, menu_link3){
    menu_link1.classList.remove("menu_link_hide")
    menu_link2.classList.remove("menu_link_hide")
    menu_link3.classList.remove("menu_link_hide")
}

function hidemenu(){
    var menu_link1 = document.getElementById("menu_link1")
    var menu_link2 = document.getElementById("menu_link2")
    var menu_link3 = document.getElementById("menu_link3")
    var menu = document.getElementById("menu")
    if (!menu.classList.contains("menu_hide")){
        menu.classList.add("menu_hide")
        setTimeout(function() {hidemenu_links(menu_link1, menu_link2, menu_link3)}, 10)
        setTimeout(function() {hidemenu_borders(menu)}, 200)
    } 
    else{
        menu.classList.remove("menu_hide")
        setTimeout(function() {showmenu_links(menu_link1, menu_link2, menu_link3)}, 300)
        showmenu_borders(menu)
    }
}
/*Hide and display menu ------------------------------------------------------------------------------------------------------*/

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

/*-------------------------------------------------------------------------------------------------------------------------------*/

function transition(){
    console.log("happened")
    const current_image_list = document.getElementsByClassName("route_image current")
    const current_image = current_image_list[0]
    if (current_image.id == "i1"){
        current_image.classList.remove("current")
        document.getElementById("i2").classList.add("current")
    }
    if (current_image.id == "i2"){
        current_image.classList.remove("current")
        document.getElementById("i3").classList.add("current")
    }
    if (current_image.id == "i3"){
        current_image.classList.remove("current")
        document.getElementById("i1").classList.add("current")
    }
}