// select next slide button
const nextSlide = document.querySelector(".btn-next");
const prevSlide = document.querySelector(".btn-prev");

// // Select all slides
var slides = document.querySelectorAll(".slide");
// current slide counter
let totalNumbeOfFrame = slides.length;
let curSlide = 0;

// loop through slides and set each slides translateX property to index * 100% 

function updateSlide(curSlide) {
    slides.forEach((slide, index) => {
        if(index == curSlide ){
            slide.classList.add("active");
        }
        else{
            slide.classList.remove("active");
        }
    });
}

updateSlide(curSlide)
updateSlideEffect(curSlide)


// add event listener and next slide functionality
nextSlide.addEventListener("click", function () {
    // if current slide is not the last slide
    if (curSlide < totalNumbeOfFrame) {
        slides.forEach((slide, indx) => {
            slide.style.transform = `translateX(${100 * (indx - curSlide)}%)`;
            updateSlide(curSlide)
            updateSlideEffect(curSlide);
            prevSlide.style.display = "block";
        });
        curSlide++;
    }else{
        nextSlide.style.display = "none";
        prevSlide.style.display = "block";
    }
});

setInterval(function(){
    if (curSlide < totalNumbeOfFrame) {
        slides.forEach((slide, indx) => {
            slide.style.transform = `translateX(${100 * (indx - curSlide)}%)`;
            updateSlide(curSlide)
            updateSlideEffect(curSlide);
            prevSlide.style.display = "block";
        });
        curSlide++;
    }else if(curSlide == (totalNumbeOfFrame-1)){
        curSlide = 0;

    }
    else{
        nextSlide.style.display = "none";
        prevSlide.style.display = "block";
    }
   

},1000*20)


// add event listener and previous slide functionality

prevSlide.addEventListener("click", function () {
    // if current slide is not the first slide
    if (curSlide > 0) {
        slides.forEach((slide, indx) => {
            slide.style.transform = `translateX(${100 * (indx - curSlide)}%)`;
            updateSlide(curSlide)
            updateSlideEffect(curSlide);
            nextSlide.style.display = "block";
            }
        );
        curSlide--;
    }else if(curSlide == -1){
        curSlide = totalNumbeOfFrame - 1

    }
    
    else{
        prevSlide.style.display = "none";
        nextSlide.style.display = "block";
    }
}
);






// create dots dynamically and add event listener
class Dot {
    constructor(index) {
        this.index = index;
        this.width = 20;
        this.height = 20;
        this.element = document.createElement("div");
        this.element.classList.add("dot");
        this.element.style.width = this.width + "px";
        this.element.style.height = this.height + "px";
        this.element.style.backgroundColor = 'white'
        this.element.style.zIndex = '100'
        this.element.style.margin = " auto 5px"
        this.element.style.position = 'relative'
        this.element.style.flex = "1"
        this.element.style.borderRadius = "50%"
        this.element.addEventListener("click", () => {
            this.click();
        });
    }
    click() {
        curSlide = this.index;
        slides.forEach((slide, index) => {
            slide.style.transform = `translateX(${100 * (index - curSlide)}%)`;
            updateSlide(curSlide)
            updateSlideEffect(curSlide);
            nextSlide.style.display = "block";
            prevSlide.style.display = "block";
        });
    }
}


// function to create dots
var allDots = [];
function createDots() {
    var dotContainer = document.getElementById("dots");
    for (let i = 0; i < totalNumbeOfFrame; i++) {
        const dot = new Dot(i);
        dotContainer.appendChild(dot.element);
        allDots.push(dot.element);
    }
}


// call create dots function
createDots();

// function to create the active effects on dot
function updateSlideEffect(index){
    // iterate through the dot
    const myDots = document.getElementsByClassName('dot');
    for(let i = 0; i < myDots.length; i++){
        if(i == index){
            // append the active class
            myDots[i].classList.add('dotactive')
        }else{
            // remove the active class
            myDots[i].classList.remove('dotactive')
        }
    }
       
        
}