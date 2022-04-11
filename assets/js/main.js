// New elements will be childs of #infcontent
const infcontent = document.getElementById('infcontent');

// We create an IntersectionObserver
const observer = new IntersectionObserver(newItem, { threshold: 0.4 });

// And now we tell it to observe the last child of #infcontent
observer.observe(infcontent.children[infcontent.children.length - 1]);

function newItem(entries) {
    // There are some chances that the callback is called when the observed element is out of the screen
    // To avoid creating unintended items, we check if the intersectionRatio is greater than 0.4
    if (entries[0].intersectionRatio > 0.4) {
        // Creating a random hex color
        let color = '#' + Math.random().toString(16).substr(-6);
        let elem = `<div class="item" style="background-color: ${color}">
            <span class="hexcode">${color}</span>
        </div>`;
        // The HTML string is parsed, adding a new element at the end of #infcontent
        infcontent.insertAdjacentHTML('beforeend', elem);
        // Because the previous observed child is no longer the last one, we need to stop checking if it's on the screen.
        observer.unobserve(entries[0].target);
        // And finally, observe the new last child.
        observer.observe(infcontent.children[infcontent.children.length - 1]);
    }
}