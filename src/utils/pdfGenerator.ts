import jsPDF from 'jspdf';
import { personalInfo } from '../data/personalInfo';
import { education, experience, achievements } from '../data/resume';

export const generateResumePDF = () => {
  const pdf = new jsPDF();
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  let yPosition = 20;
  const margin = 20;
  const lineHeight = 6;
  
  // Helper function to add text with word wrapping
  const addText = (text: string, x: number, y: number, maxWidth: number, fontSize: number = 10) => {
    pdf.setFontSize(fontSize);
    const lines = pdf.splitTextToSize(text, maxWidth);
    pdf.text(lines, x, y);
    return y + (lines.length * lineHeight);
  };

  // Helper function to check if we need a new page
  const checkNewPage = (requiredSpace: number) => {
    if (yPosition + requiredSpace > pageHeight - margin) {
      pdf.addPage();
      yPosition = margin;
    }
  };

  // Header
  pdf.setFontSize(24);
  pdf.setFont('helvetica', 'bold');
  pdf.text(personalInfo.name, pageWidth / 2, yPosition, { align: 'center' });
  yPosition += 10;

  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'normal');
  pdf.text(personalInfo.subtitle, pageWidth / 2, yPosition, { align: 'center' });
  yPosition += 8;

  pdf.setFontSize(10);
  pdf.text(personalInfo.email, pageWidth / 2, yPosition, { align: 'center' });
  yPosition += 5;
  pdf.text(personalInfo.phone, pageWidth / 2, yPosition, { align: 'center' });
  yPosition += 5;
  pdf.text(personalInfo.location, pageWidth / 2, yPosition, { align: 'center' });
  yPosition += 15;

  // Career Objective
  checkNewPage(30);
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text('CAREER OBJECTIVE', margin, yPosition);
  yPosition += 8;
  
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(10);
  yPosition = addText(personalInfo.objective, margin, yPosition, pageWidth - 2 * margin);
  yPosition += 10;

  // Education
  checkNewPage(40);
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text('EDUCATION', margin, yPosition);
  yPosition += 8;

  education.forEach((edu) => {
    checkNewPage(25);
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.text(edu.degree, margin, yPosition);
    yPosition += 6;
    
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    pdf.text(edu.institution, margin, yPosition);
    pdf.text(edu.duration, pageWidth - margin - 40, yPosition);
    yPosition += 5;
    
    if (edu.field) {
      pdf.text(edu.field, margin, yPosition);
      yPosition += 5;
    }
    
    if (edu.cgpa) {
      pdf.text(`CGPA: ${edu.cgpa}`, margin, yPosition);
      yPosition += 5;
    }
    
    if (edu.percentage) {
      pdf.text(`Percentage: ${edu.percentage}`, margin, yPosition);
      yPosition += 5;
    }
    
    yPosition += 5;
  });

  // Professional Experience
  if (experience.length > 0) {
    checkNewPage(40);
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text('PROFESSIONAL EXPERIENCE', margin, yPosition);
    yPosition += 8;

    experience.forEach((exp) => {
      checkNewPage(35);
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      pdf.text(exp.position, margin, yPosition);
      yPosition += 6;
      
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      pdf.text(exp.company, margin, yPosition);
      pdf.text(exp.duration, pageWidth - margin - 60, yPosition);
      yPosition += 8;
      
      pdf.setFont('helvetica', 'bold');
      pdf.text('Key Responsibilities:', margin, yPosition);
      yPosition += 5;
      
      pdf.setFont('helvetica', 'normal');
      exp.responsibilities.forEach((responsibility) => {
        checkNewPage(10);
        yPosition = addText(`• ${responsibility}`, margin + 5, yPosition, pageWidth - 2 * margin - 5);
        yPosition += 2;
      });
      
      yPosition += 5;
    });
  }

  // Key Achievements
  checkNewPage(40);
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text('KEY ACHIEVEMENTS', margin, yPosition);
  yPosition += 8;

  achievements.forEach((achievement) => {
    checkNewPage(20);
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'bold');
    yPosition = addText(achievement.title, margin, yPosition, pageWidth - 2 * margin, 11);
    yPosition += 2;
    
    pdf.setFontSize(9);
    pdf.setFont('helvetica', 'normal');
    pdf.text(achievement.date, margin, yPosition);
    yPosition += 5;
    
    pdf.setFontSize(10);
    yPosition = addText(achievement.description, margin, yPosition, pageWidth - 2 * margin);
    yPosition += 8;
  });

  // Technical Skills
  checkNewPage(30);
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text('TECHNICAL SKILLS', margin, yPosition);
  yPosition += 8;

  const skillCategories = [
    { name: 'Programming Languages', skills: ['Python', 'C Programming', 'JavaScript', 'TypeScript'] },
    { name: 'Development', skills: ['Full Stack Development', 'Web Development', 'App Development'] },
    { name: 'Tools & Technologies', skills: ['Git & GitHub', 'VS Code', 'Database Management'] }
  ];

  skillCategories.forEach((category) => {
    checkNewPage(15);
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'bold');
    pdf.text(`${category.name}:`, margin, yPosition);
    yPosition += 5;
    
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    const skillsText = category.skills.join(', ');
    yPosition = addText(skillsText, margin + 5, yPosition, pageWidth - 2 * margin - 5);
    yPosition += 5;
  });

  // Languages
  checkNewPage(20);
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text('LANGUAGES', margin, yPosition);
  yPosition += 8;

  personalInfo.languages.forEach((lang) => {
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    pdf.text(`${lang.name}: ${lang.proficiency}`, margin, yPosition);
    yPosition += 5;
  });

  // Save the PDF
  const fileName = `${personalInfo.name.replace(/\s+/g, '_')}_Resume.pdf`;
  pdf.save(fileName);
};

export default generateResumePDF;