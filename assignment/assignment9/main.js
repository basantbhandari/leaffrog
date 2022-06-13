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

// add event listener and next slide functionality
nextSlide.addEventListener("click", function () {
    // if current slide is not the last slide
    if (curSlide < totalNumbeOfFrame - 1) {
        curSlide++;

        slides.forEach((slide, indx) => {
            slide.style.transform = `translateX(${100 * (indx - curSlide)}%)`;
            updateSlide(curSlide)
            prevSlide.style.display = "block";
        });
    }else{
        nextSlide.style.display = "none";
        prevSlide.style.display = "block";
    }
});


// add event listener and previous slide functionality

prevSlide.addEventListener("click", function () {
    // if current slide is not the first slide
    if (curSlide > 0) {
        curSlide--;
        slides.forEach((slide, indx) => {
            slide.style.transform = `translateX(${100 * (indx - curSlide)}%)`;
            updateSlide(curSlide)
            nextSlide.style.display = "block";
            }
        );
    }else{
        prevSlide.style.display = "none";
        nextSlide.style.display = "block";
    }
}
);
