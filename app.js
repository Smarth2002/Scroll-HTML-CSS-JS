// Element.getBoundingClientRect() method returns the size of an element and its position relative to the viewport.
// pageYOffset is a read - only window property that returns the number of pixels the document has been scrolled vertically.
// slice extracts a section of a string without modifying original string
//offsetTop - A Number, representing the top position of the element, in pixels

// ********** set date ************
//Date() object gives current date and getFullYear() method gives current year
const date = document.getElementById("date");
date.innerHTML = new Date().getFullYear();

// ********** close links ************

//initially height of links container is 0 to hide it (in small screen) 
//but on clicking toggle button we need to set height of that links container
//we can either do it by applying class (show-links) to links container but it will be static height as
//(show-links) class has hard coded value. so it will set same height even if we add/remove links 

// to set height dynamically we need to get height of html element using getBoundingClientRect() method
//but we cant get height by using this method on links-container ele bcz its height is set 0 by us
//so we apply the method on links (unordered list) as its height is still there
//so we check if height of links-container is 0 so we set it to height of links (ul)
//otherwise set it to 0 so we keep height of links (ul) preserved to use it during setting of height 
const navToggle = document.querySelector(".nav-toggle");
const linksContainer = document.querySelector(".links-container");
const links = document.querySelector(".links");

navToggle.addEventListener("click", function () {

    // linksContainer.classList.toggle("show-links");

    const containerHeight = linksContainer.getBoundingClientRect().height;
    const linksHeight = links.getBoundingClientRect().height;

    if (containerHeight === 0) {
        linksContainer.style.height = `${linksHeight}px`;
    }
    else {
        linksContainer.style.height = 0;
    }

});

// ********** fixed navbar ************

const navbar = document.getElementById("nav");
const topLink = document.querySelector(".top-link");
//we add the class fixed-nav to navbar after specified distance of scrolling
//i.e height of navbar
window.addEventListener("scroll", function () {

    const scrollHeight = this.window.scrollY;
    const navHeight = navbar.getBoundingClientRect().height;

    if (scrollHeight > navHeight) {
        navbar.classList.add("fixed-nav");
    }
    else {
        navbar.classList.remove("fixed-nav");
    }

    //if scroll height exceeds this limit then we add the class(show-link)
    //to topLink which sets visibility otherwise remove this class
    if (scrollHeight > 500) {
        topLink.classList.add("show-link");
    }
    else {
        topLink.classList.remove("show-link");
    }

});

// ********** smooth scroll ************
//added html {
// 	scroll-behavior: smooth;
// } in CSS

// select links

//on clicking links we need not only scrolling but navbar to disapper
//so we set height of links container to 0 
//and to scroll to that section we find the element(section) to scroll to
//using href attribute of links to get id of sections
//and then using offsetTop property to get position of element from top
//and scrollTo() method to scroll to specific x and y coordinate
const scrollLinks = document.querySelectorAll(".scroll-link");

scrollLinks.forEach(function (link) {

    link.addEventListener("click", function (e) {

        e.preventDefault();
        const id = this.getAttribute("href").slice(1);

        const element = document.getElementById(id);

        //we need to scroll to the element(section) so we need its position from top
        //if our navbar is fixed , it is out of flow of document and height from top not consider navbar length from top

        //so if our navbar is fixed already (we are at a section) so to go to next section we get its position from top
        //and that position is calculated from below navbar (since in fixed position navbar is taken out of flow)
        //but the position not matter since we scroll also from same starting pt (below navbar) 
        //but since now navbar is taking up space from top so its hiding our section heading so we need our section heading
        //to appear after navbar so we scroll to (position-navbarHeight) so that navbar takes space of above section heading

        //if navbar is not fixed so our calculation of position is from navbar itself(more than prev) 
        //but once we scroll down navbar becomes fixed (taken out of flow),  distance of section from top decreases further
        //since we got position from navbar but we needed from 1st section (so we again decrease navbarHeight) 
        //so pos=pos-navHeight-navHeight

        const navHeight = navbar.getBoundingClientRect().height;
        const linksContainerHeight = linksContainer.getBoundingClientRect().height;
        const fixedNav = navbar.classList.contains("fixed-nav");

        let position = element.offsetTop - navHeight;
        if (!fixedNav) {
            position = position - navHeight;
        }

        //but in small screen our navHeight > 82 bcz links container height is also dynamically set
        //and it further increases navbarHeight
        //so if our screen is not fixed so again position to a specific section
        //is calculated from top i.e navbar and once we scroll navbar becomes fixed and taken out of flow 
        //so we need to subtract its height from position
        //so 2nd if block is fine (subtracting when navbar is not fixed)

        //but in 1st subtraction we are subtracting bcz navbar hides section heading
        //so subtract navbarHeight from position but in this case navbar height consist of its height+ height of links container
        //and once we scroll links container also vanishes (height set to 0) so we are decreasing its height unncecessarily
        //(even if its not appearing in front and not hiding anything) so we add this distance to position
        //this happen only for small screens where navbarHeiht > 82

        if (navHeight > 82) {
            position = position + linksContainerHeight;
        }

        window.scrollTo({

            left: 0,
            top: position
        });

        linksContainer.style.height = 0;
    });
});
