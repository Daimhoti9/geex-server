const { jsPDF } = require('jspdf');
const fs = require('fs');

function generateCVPDF(data, filePath) {
  const doc = new jsPDF();

  const pageHeight = doc.internal.pageSize.height;
  const lineHeight = 7;
  let currentY = 10;

  function addSection(title, sectionData) {
    try {
      // Calculate the height needed for this section
      let sectionHeight = lineHeight; // Start with one line height for section title

      Object.entries(sectionData).forEach(([key, value]) => {
        if (Array.isArray(value) && value.length === 0) {
          return;
        }
        if (typeof value === 'object' && !Array.isArray(value)) {
          // For nested objects (like certificates, languages, memberships)
          const nestedKeys = Object.keys(value);
          nestedKeys.forEach(nestedKey => {
            const nestedValue = value[nestedKey];
            const text = `${nestedKey}: ${nestedValue}`;
            sectionHeight += lineHeight; // Increase height for each line of text
          });
        } else if (Array.isArray(value)) {
          // For arrays (like skills, certificates, languages, memberships)
          value.forEach(item => {
            const text = Object.values(item).join(': ');
            sectionHeight += lineHeight; // Increase height for each line of text
          });
        } else {
          const text = `${key}: ${value}`;
          sectionHeight += lineHeight; // Increase height for each line of text
        }
      });

      // Check if adding this section will exceed the current page height
      if (currentY + sectionHeight > pageHeight - lineHeight) {
        doc.addPage(); // Add a new page if current page is full
        currentY = 10; // Reset Y position for the new page
      }

      // Add section title
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.text(title, 10, currentY);

      // Add section data
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      currentY += lineHeight; // Move Y position after the section title

      Object.entries(sectionData).forEach(([key, value]) => {
        if (Array.isArray(value) && value.length === 0) {
          return;
        }
        if (typeof value === 'object' && !Array.isArray(value)) {
          // For nested objects (like certificates, languages, memberships)
          const nestedKeys = Object.keys(value);
          nestedKeys.forEach(nestedKey => {
            const nestedValue = value[nestedKey];
            const text = `${nestedKey}: ${nestedValue}`;
            doc.text(text, 15, currentY);
            currentY += lineHeight; // Move Y position after each line of text
          });
        } else if (Array.isArray(value)) {
          // For arrays (like skills, certificates, languages, memberships)
          value.forEach(item => {
            const text = Object.values(item).join(': ');
            doc.text(text, 15, currentY);
            currentY += lineHeight; // Move Y position after each line of text
          });
        } else {
          const text = `${key}: ${value}`;
          doc.text(text, 15, currentY);
          currentY += lineHeight; // Move Y position after each line of text
        }
      });

      currentY += lineHeight; // Add padding after the section

    } catch (e) {
      console.log(e.message);
    }
  }

  // Iterate through each section in the data
  addSection('Contact Details', data.contactDetails);
  addSection('Career Goals', data.careerGoals);
  addSection('Education', data.education);
  addSection('Work Experience', data.workExperience);
  addSection('Skills', { Skills: data.skills });
  addSection('Skills Information', data.skillsInfo);
  addSection('Certificates', data.certificates);
  addSection('Languages', data.languages);
  addSection('Memberships', data.memberships);
  addSection('Volunteer Experiences', data.volunteerExperinces);
  addSection('Achievements', data.achievements);
  addSection('References', data.references);
  addSection('Problem Solving', data.problemSolving);
  addSection('Team Work', data.teamWork);
  addSection('Customer Service', data.customerService);
  addSection('Adaptibility and Learning', data.adaptibility);
  addSection('Company Motivation', data.companyMotivation);
  addSection('Additional Questions', data.additionalQuestions);

  // Save PDF to the specified file path
  doc.save(filePath);

  // Return a string based on the email address for identification
  return data.contactDetails.email + '_cv.pdf';
}

module.exports = generateCVPDF;
