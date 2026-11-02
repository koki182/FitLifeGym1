// FAQ Accordion
const faqQuestions = document.querySelectorAll(".faq-question");

faqQuestions.forEach(function(question) {
    question.addEventListener("click", function() {

        const faqItem = question.parentElement;
        const answer = faqItem.querySelector(".faq-answer");
        const symbol = question.querySelector("span");

        faqItem.classList.toggle("active");

        if (faqItem.classList.contains("active")) {
            answer.style.display = "block";
            symbol.textContent = "-";
        } else {
            answer.style.display = "none";
            symbol.textContent = "+";
        }

    });
});

// Image Gallery Lightbox
const galleryImages = document.querySelectorAll(".gallery-image");
const imageModal = document.getElementById("imageModal");
const modalImage = document.getElementById("modalImage");
const closeModal = document.getElementById("closeModal");

galleryImages.forEach(function(image) {
    image.addEventListener("click", function() {
        imageModal.style.display = "flex";
        modalImage.src = image.src;
        modalImage.alt = image.alt;
    });
});

if (closeModal) {
    closeModal.addEventListener("click", function() {
        imageModal.style.display = "none";
    });
}

if (imageModal) {
    imageModal.addEventListener("click", function(event) {
        if (event.target === imageModal) {
            imageModal.style.display = "none";
        }
    });
}
// Service Search
const serviceSearch = document.getElementById("serviceSearch");
const searchMessage = document.getElementById("searchMessage");

if (serviceSearch && searchMessage) {
    serviceSearch.addEventListener("input", function() {
        const searchText = serviceSearch.value.toLowerCase();
        const services = document.querySelectorAll(".service-card");
        let found = 0;

        services.forEach(function(service) {
            const serviceName = service.textContent.toLowerCase();

            if (serviceName.includes(searchText)) {
                service.style.display = "block";
                found++;
            } else {
                service.style.display = "none";
            }
        });

        if (searchText === "") {
            searchMessage.textContent = "";
        } else if (found === 0) {
            searchMessage.textContent = "No matching services found.";
        } else {
            searchMessage.textContent = found + " service(s) found.";
        }
    });
}
// Scroll Reveal Animation
const fadeElements = document.querySelectorAll(
    "section, .service-card, .gallery-image"
);

fadeElements.forEach(function(element) {
    element.classList.add("fade-in");
});

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observer.unobserve(entry.target);
        }
    });
});

fadeElements.forEach(function(element) {
    observer.observe(element);
});
// Enquiry Form Validation
const enquiryForm = document.getElementById("enquiryForm");

if (enquiryForm) {
    enquiryForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const fullName = document.getElementById("fullName").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const message = document.getElementById("message").value.trim();
        const formMessage = document.getElementById("formMessage");

        if (!fullName || !email || !phone || !message) {
            formMessage.textContent = "Please complete all fields.";
            return;
        }

        formMessage.textContent = "Submitting your enquiry...";

        fetch("https://formsubmit.co/ajax/fitlifegym@gmail.com", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                name: fullName,
                email: email,
                phone: phone,
                message: message,
                _subject: "New FitLife Gym Enquiry"
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Submission failed");
            }
            return response.json();
        })
        .then(data => {
            formMessage.textContent = "Your enquiry was submitted successfully!";
            enquiryForm.reset();
        })
        .catch(error => {
            formMessage.textContent = "Something went wrong. Please try again.";
        });
    });
}