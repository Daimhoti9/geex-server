const generateCVPDF = require('./generateCVpDF');

// Example CV data
const cvData = {
    contactDetails: {
      completeAddress: '123 Main St',
      city: 'City',
      postalCode: '12345',
      province: 'Province',
      country: 'Country',
      email: 'john.doe@example.com',
      phoneNumber: '+1234567890',
      fixNumber: '+0987654321'
    },
    careerGoals: {
      targetJob: 'Software Engineer',
      industry: 'Technology',
      workEnvironment: 'Dynamic and innovative'
    },
    education: {
      degree: 'Bachelor of Science in Computer Science',
      field: 'Computer Science',
      university: 'University of Example',
      place: 'City, Country',
      experience: '4 years',
      projects: 'Developed web applications using React and Node.js',
      information: 'Graduated with honors',
      responsibilities: 'Managed team projects and conducted research',
      toolAndSoftwares: 'Proficient in Java, Python, JavaScript, HTML/CSS, SQL',
      approach: 'Problem-solving oriented with a focus on clean code'
    },
    workExperience: {
      company: 'Tech Solutions Inc.',
      location: 'City, Country',
      title: 'Software Engineer',
      startDate: 'January 2018',
      endDate: 'Present',
      achievements: 'Led development of a scalable e-commerce platform'
    },
    skills: ['JavaScript', 'React', 'Node.js', 'Java', 'Python', 'HTML/CSS', 'SQL'],
    skillsInformation: {
      technicalSkills: 'Web development, software engineering',
      softSkills: 'Communication, teamwork, leadership',
      specialSkills: 'Project management, agile methodologies'
    },
    certificates: ['AWS Certified Developer - Associate', 'Scrum Master Certification'],
    languages: ['English (Fluent)', 'Spanish (Intermediate)'],
    memberships: ['IEEE (Institute of Electrical and Electronics Engineers)'],
    volunteerExperiences: ['Red Cross - Disaster Response Team'],
    achievements: ['Recipient of Employee of the Year Award', 'Published research paper in IEEE journal'],
    references: ['Available upon request'],
    problemSolving: {
      challengingSituation: 'Developing a real-time chat application with complex features',
      deadlines: 'Met tight project deadlines by optimizing code and prioritizing tasks',
      qualityWork: 'Ensured high-quality deliverables through code reviews and testing'
    },
    teamWork: {
      teamProject: 'Collaborated on a cross-functional team to build a data analytics platform',
      handleConflicts: 'Resolved conflicts by facilitating open communication and seeking consensus',
      communicationStyle: 'Clear and concise communicator with a focus on active listening'
    },
    customerService: {
      customerSatisfaction: 'Received positive feedback from clients for excellent service delivery',
      experience: 'Managed customer relationships and addressed inquiries promptly',
      strategies: 'Implemented customer-centric strategies to improve overall satisfaction'
    },
    adaptibilityAndLearning: {
      adaptToChanges: 'Quickly adapted to new technologies and methodologies in fast-paced environments',
      learningSituation: 'Continuously seeking opportunities to learn and grow professionally',
      careerGoals: 'Striving to advance career in software engineering and pursue higher education'
    },
    companyMotivation: {
      interests: 'Passionate about innovative technologies and problem-solving',
      contributions: 'Seeking to contribute to a forward-thinking team and make impactful contributions',
      fitForPosition: 'Confident in my abilities to excel in the role of a Software Engineer'
    },
    additionalQuestions: {
      softwareProficiency: 'Advanced proficiency in JavaScript frameworks and cloud technologies',
      awardsAndRecognition: 'Recipient of multiple awards for outstanding performance and contributions',
      problemSolving: 'Demonstrated strong problem-solving skills through complex project deliveries',
      adaptabilityAndInitiative: 'Proactive in taking initiative and adapting to evolving project requirements',
      continuousLearning: 'Dedicated to continuous learning through online courses and professional development',
      coreStrengths: 'Strong analytical skills, attention to detail, and ability to work under pressure',
      achievements: 'Consistently achieved goals and milestones throughout my career'
    }
  };

// Generate CV PDF
const cvFilePath = generateCVPDF(cvData,'../../public/CVs/'+cvData.contactDetails.email+'_cv.pdf');

console.log(`CV created successfully. File saved: ${cvFilePath}`);
