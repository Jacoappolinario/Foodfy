const currentPage = location.pathname
const menuItens =  document.querySelectorAll("header .primary .menu a")

for (itemSite of menuItens) {
    if (currentPage.includes(itemSite.getAttribute("href"))) {
        itemSite.classList.add("active")
    }
}

console.log(currentPage)