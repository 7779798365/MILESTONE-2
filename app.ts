document.getElementById("resumeform")?.addEventListener("submit", (event) => {
    event.preventDefault();
  
    // Type assertion for input fields
    const profilePictureInput = document.getElementById("profilePicture") as HTMLInputElement;
    const nameElement = document.getElementById("name") as HTMLInputElement;
    const emailElement = document.getElementById("email") as HTMLInputElement;
    const phoneElement = document.getElementById("phone") as HTMLInputElement;
    const educationElement = document.getElementById("education") as HTMLTextAreaElement;
    const experienceElement = document.getElementById("experience") as HTMLTextAreaElement;
    const skillsElement = document.getElementById("skills") as HTMLTextAreaElement;
  
    // Check if all elements exist
    if (
      profilePictureInput &&
      nameElement &&
      emailElement &&
      phoneElement &&
      educationElement &&
      experienceElement &&
      skillsElement
    ) {
      const name = nameElement.value;
      const email = emailElement.value;
      const phone = phoneElement.value;
      const education = educationElement.value;
      const experience = experienceElement.value;
      const skills = skillsElement.value;
  
      // Handle profile picture
      const profilePictureFile = profilePictureInput.files?.[0];
      const profilePictureURL = profilePictureFile ? URL.createObjectURL(profilePictureFile) : "";
  
      // Create output for the resume
      const resumeOutPut = `
        <h2>Resume</h2>
        ${profilePictureURL ? `<img src="${profilePictureURL}" alt="Profile Picture" class="profilePicture" style="width: 100px; height: 100px;">` : ''}
        <p><strong>Name:</strong> <span id="edit-name" class="editable">${name}</span></p>
        <p><strong>Email:</strong> <span id="edit-email" class="editable">${email}</span></p>
        <p><strong>Phone Number:</strong> <span id="edit-phone" class="editable">${phone}</span></p>
  
        <h3>Education</h3>
        <p id="edit-education" class="editable">${education}</p>
  
        <h3>Experience</h3>
        <p id="edit-experience" class="editable">${experience}</p>
  
        <h3>Skills</h3>
        <p id="edit-skills" class="editable">${skills}</p>
      `;
  
      // Insert the output into the resume output element
      const resumeOutPutElement = document.getElementById("resumeOutPut");
      if (resumeOutPutElement) {
        resumeOutPutElement.innerHTML = resumeOutPut;
        makeEditable();
      }
    } else {
      console.error("One or more form elements are missing.");
    }
  });
  
  function makeEditable() {
    const editableElements = document.querySelectorAll(".editable");
    editableElements.forEach((element) => {
      element.addEventListener("click", function () {
        const currentElement = element as HTMLElement;
        const currentValue = currentElement.textContent || "";
  
        // Replace the content with an input field for editing
        if (currentElement.tagName === "P" || currentElement.tagName === "SPAN") {
          const input = document.createElement("input");
          input.type = "text";
          input.value = currentValue;
          input.classList.add("editing-input");
          input.addEventListener("blur", function () {
            currentElement.textContent = input.value;
            currentElement.style.display = "inline";
            input.remove();
          });
  
          currentElement.style.display = "none";
          currentElement.parentNode?.insertBefore(input, currentElement);
          input.focus();
        }
      });
    });
  }