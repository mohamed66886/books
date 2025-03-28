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

document.getElementById("saveBtn").addEventListener("click", function() {
    let name = document.getElementById("name").value;
    let age = document.getElementById("age").value;
    let novelType = document.getElementById("novelType").value;

    if (name && age && novelType) {
        // تخزين الاسم في localStorage
        localStorage.setItem("userName", name);

        // تحديث نص الرابط بالاسم
        document.getElementById("registerLink").innerHTML = name;

        // إغلاق المودال
        var modal = bootstrap.Modal.getInstance(document.getElementById('staticBackdrop'));
        modal.hide();
        alert("تم تسجيل  بنجاح!");
    } else {
        alert("يرجى ملء جميع الحقول قبل الحفظ.");
    }
});


document.addEventListener("DOMContentLoaded", function() {
    let savedName = localStorage.getItem("userName");
    if (savedName) {
        document.getElementById("registerLink").innerHTML = savedName;
    }
});

document.getElementById("logoutLink").addEventListener("click", function(event) {
    event.preventDefault(); 

    localStorage.removeItem("userName");

  
    document.getElementById("registerLink").innerHTML = 'تسجيل <i class="bi bi-box-arrow-in-right"></i>';
   
    alert("تم تسجيل الخروج بنجاح!");

    location.reload();
});
const novels = [
    "روميو وجولييت",
    "البؤساء",
    "الخيميائي",
    "العمى",
    "مئة عام من العزلة",
    "أوليفر تويست",
    "الجريمة والعقاب",
    "العراب",
    "عزازيل",
    "في قلبي أنثى عبرية"
];

const searchInput = document.getElementById("searchInput");
const resultsList = document.getElementById("resultsList");

searchInput.addEventListener("input", function() {
    let query = this.value.trim();
    resultsList.innerHTML = "";

    if (query !== "") {
        let results = novels.filter(novel => novel.includes(query));

        if (results.length > 0) {
            results.forEach(novel => {
                let li = document.createElement("li");
                li.textContent = novel;
                
                li.addEventListener("click", function() {
                    searchInput.value = novel;
                    resultsList.style.display = "none";
                });

                resultsList.appendChild(li);
            });
            resultsList.style.display = "block";
        } else {
            resultsList.style.display = "none";
        }
    } else {
        resultsList.style.display = "none"; 
    }
});

document.addEventListener("click", function(e) {
    if (!searchInput.contains(e.target) && !resultsList.contains(e.target)) {
        resultsList.style.display = "none";
    }
});