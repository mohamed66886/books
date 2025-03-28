//loading screen
window.addEventListener("load", function () {
    setTimeout(() => {
        document.getElementById("loading-screen").style.display = "none";
    }, 2000);
});

document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll(".counter");
    const speed = 100; 

    const startCounting = (counter) => {
        const target = +counter.getAttribute("data-target");
        const step = Math.ceil(target / speed);
        let count = 0;

        const updateCount = () => {
            if (count < target) {
                count += step;
                if (count > target) count = target;
                counter.innerText = count;
                setTimeout(updateCount, 20);
            } else {
                counter.innerText = target;
            }
        };
        
        updateCount();
    };

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    startCounting(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.5 }
    );

    counters.forEach((counter) => observer.observe(counter));
});