const currentPage = location.pathname
const menuItensSite =  document.querySelectorAll("header .links a")
const menuItensAdmin =  document.querySelectorAll("header .links-admin a")

for (itemSite of menuItensSite) {
    if (currentPage.includes(itemSite.getAttribute("href"))) {
        itemSite.classList.add("active")
    }
}

for (itemAdmin of menuItensAdmin) {
    if (currentPage.includes(itemAdmin.getAttribute("href"))) {
        itemAdmin.classList.add("active")
    }
}
console.log(currentPage)