
export default function scrollMenu() {
    window.addEventListener("scroll", function () {
        if (
            document.body.scrollTop > 150 ||
            document.documentElement.scrollTop > 150
        ) {
            headerMenu.classList.add("menu-scroll");
            for (let menuItem of menuItems) {
                menuItem.querySelector("span").style.display = "none";
            }
        } else {
            headerMenu.classList.remove("menu-scroll");
            for (let menuItem of menuItems) {
                menuItem.querySelector("span").style.display = "inline-block";
            }
        }
    });
}