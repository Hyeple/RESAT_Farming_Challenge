document.addEventListener("DOMContentLoaded", function () {
    const wrapper = document.querySelector('.slider-wrapper');
    const slides = document.querySelectorAll('.slider-wrapper img');
    const slider = document.querySelector('.slider');
    const prevButton = document.querySelector('.control.prev');
    const nextButton = document.querySelector('.control.next');

    let index = 0;

    function updateSlider() {
        const offset = -index * 100;
        wrapper.style.transform = `translateX(${offset}%)`;
        slider.style.height = `${slides[index].offsetHeight}px`;
    }

    prevButton.addEventListener('click', () => {
        index = (index - 1 + slides.length) % slides.length;
        updateSlider();
    });

    nextButton.addEventListener('click', () => {
        index = (index + 1) % slides.length;
        updateSlider();
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowLeft') {
            index = (index - 1 + slides.length) % slides.length;
            updateSlider();
        } else if (event.key === 'ArrowRight') {
            index = (index + 1) % slides.length;
            updateSlider();
        }
    });

    // Set the initial height of the slider
    if (slides.length > 0) {
        slides[0].addEventListener('load', () => {
            slider.style.height = `${slides[0].offsetHeight}px`;
        });
    }
});
