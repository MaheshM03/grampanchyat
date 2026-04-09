import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';

const LanguageContext = createContext();

const translations = {
  mr: {
    // Navbar
    'nav.home': 'मुख्यपृष्ठ',
    'nav.adminCommittee': 'प्रशासकीय समिती',
    'nav.otherCommittee': 'इतर समिती',
    'nav.citizenPortal': 'नागरिक पोर्टल',
    'nav.smartVillage': 'स्मार्ट गाव',
    'nav.rti': 'माहितीचा अधिकार',
    'nav.news': 'बातम्या',
       'nav.grievance': 'तक्रार',
       'nav.aboutus': 'आमच्याबद्दल',

    // OtherCommittee
    'otherCommittee.badge': 'ग्रामपंचायत गंगावऱ्हे-सावरगाव',
    'otherCommittee.heroTitle': 'ग्राम पंचायत गंगावऱ्हे-सावरगांव सर्व समिती',
    'otherCommittee.heroDesc': 'गावाच्या प्रगतीसाठी कार्यरत असलेल्या समितींचे संघटन. या समित्या शिक्षण, आरोग्य, स्वच्छता, पाणी व्यवस्थापन, महिला़ व बाल कल्याण, कृषी विकास आणि सामाजिक कल्याण यासारख्या महत्त्वाच्या क्षेत्रात योगदान देतात. सर्व समित्या पारदर्शकता, एकता आणि लोकाभिमुख दृष्टिकोनाने गावकऱ्यांच्या अपेक्षा पूर्ण करण्यासाठी वचनबद्ध आहेत.',
    'otherCommittee.tableTitle': 'संघर्षरहित गाव समिती',
    'otherCommittee.search': 'शोधा',
    'otherCommittee.headers.0': 'क्र. नं.',
    'otherCommittee.headers.1': 'पद',
    'otherCommittee.headers.2': 'नाव',
    'otherCommittee.headers.3': 'समिती पदवी',
    'nav.moreInfo': 'अधिक माहिती',
    'nav.digitalLibrary': 'डिजिटल लायब्ररी',
    'nav.admin': 'Admin Login',
    'nav.adminCommittee': 'प्रशासकीय समिती',
    'nav.otherCommittee': 'इतर समिती',
    'nav.citizenPortal': 'नागरिक पोर्टल',
    'nav.smartVillage': 'स्मार्ट गाव',
    'nav.rti': 'माहितीचा अधिकार',
    'nav.news': 'बातम्या',  // Fixed - News section
    'nav.grievance': 'तक्रार',
    'nav.moreInfo': 'अधिक माहिती',
    'nav.digitalLibrary': 'डिजिटल लायब्ररी',
    'navbar.phone': '📞 (02346) 243535',
    'navbar.email': '✉ grampanchayatgangavarhe@gmail.com',
    'navbar.fax': '📠 FAX: 243535',
    'navbar.marathi': '🌐 मराठी',
    'navbar.grampanchayat': 'ग्रामपंचायत अधिनियम',

    // Hero
    'hero.welcome': 'स्वागत स्थान',
    'hero.title': 'ग्राम पंचायत गंगावरहे-सावरगांव',
    'hero.desc': 'ग्राम पंचायत गंगावरहे-सावरगांव ग्रामसभासाठी माहिती - सभासद, ग्रामसेवक आणि नागरिकांसाठी (सामान्य नमुना)',
    'hero.citizenLogin': 'नागरिक लॉगिन',
    'hero.moreKnow': 'अधिक जाणा',
    'hero.ministers': 'माननीय मंत्री व पदाधिकारी',
    'hero.gpOfficials': 'ग्रामपंचायत पदाधिकारी',

    // AdminCommittee
    'admin.title': 'ग्राम पंचायत गंगावरहे-सावरगांव प्रशासकीय समिती',
    'admin.desc': 'गाव प्रशासनाची जबाबदारी कार्यक्षमपणे पार पडवणारा महत्त्वाचा यंत्रणा. ग्रामपंचायतीच्या विविध धोरणांची अंमलबजावणी, संसाधने व्यवस्थापन आणि गावकऱ्यांना आवश्यक सेवा पुरवण्याची जबाबदारी या समितीची आहे. पारदर्शकता, कार्यक्षमता आणि जबाबदारीवर भर देऊन प्रशासकीय समिती गावाच्या प्रगतीसाठी ठोस पावले उचलते.',
    'admin.cta': 'माहिती मिळवा',
    'admin.heading': 'प्रशासकीय समिती',
    'admin.members': [
      { name: 'श्री. सतीश सयाजीराव देशमुख', role: 'सार्वजनिक नियुक्त सरपंच', enName: 'Mr. Satish Sayajirao Deshmukh', enRole: 'Publicly appointed Sarpanch' },
      { name: 'श्री. हनुमान गणपती गरुडा', role: 'उप सरपंच', enName: 'Mr. Hanuman Ganpati Garuda', enRole: 'Sub-Sarpanch' },
      { name: 'श्री. अनिल बापूसो यादव', role: 'सभासद', enName: 'Mr. Anil Bapuso Yadav', enRole: 'Member' },
      { name: 'श्री. वैभव पांडुरंग यादव', role: 'सभासद', enName: 'Mr. Vaibhav Pandurang Yadav', enRole: 'Member' },
      { name: 'श्री. पटंगराव शिवाजी यादव', role: 'सभासद', enName: 'Mr. Patangrao Shivaji Yadav', enRole: 'Member' },
      { name: 'श्री. दीपक रामचंद्र परदेशी', role: 'सभासद', enName: 'Mr. Deepak Ramchandra Pardeshi', enRole: 'Member' },
      { name: 'श्री. विकास राजाराम कारकटे', role: 'सभासद', enName: 'Mr. Vikas Rajaram Karkate', enRole: 'Member' },
      { name: 'सौ. वैशाली पृथ्वीराज यादव', role: 'सभासद', enName: 'Mrs. Vaishali Prithviraj Yadav', enRole: 'Member' },
      { name: 'सौ. भारती धनंजय यादव', role: 'सभासद', enName: 'Mrs. Bharti Dhananjay Yadav', enRole: 'Member' },
      { name: 'सौ. लता विकास यादव', role: 'सभासद', enName: 'Mrs. Lata Vikas Yadav', enRole: 'Member' },
      { name: 'सौ. अनुजा मनोज यादव', role: 'सभासद', enName: 'Mrs. Anuja Manoj Yadav', enRole: 'Member' },
      { name: 'सौ. सुनीता माधुकर पिंगले', role: 'सभासद', enName: 'Mrs. Sunita Madhukar Pingle', enRole: 'Member' },
      { name: 'सौ. मीनाक्षी संतोष कोली', role: 'सभासद', enName: 'Mrs. Meenakshi Santosh Koli', enRole: 'Member' },
      { name: 'सौ. उषा यशवंत वाघमारे', role: 'सभासद', enName: 'Mrs. Usha Yashwant Waghmare', enRole: 'Member' }
    ],

    // SmartVillage
    'smart.title': 'स्मार्ट गाव गंगावरहे-सावरगांव',
    'smart.subtitle': 'ग्राम सचिवालय गंगावरहे-सावरगांव',
    'smart.desc': 'आधुनिक तंत्रज्ञान, पारदर्शक शासन आणि शाश्वत विकासाचे प्रतीक. स्वच्छता, शिक्षण, आरोग्य आणि डिजिटल सेवा यांच्या माध्यमातून गंगावरहे-सावरगांव प्रगत आणि सक्षम ग्रामपंचायतीचे आदर्श उदाहरण बनले आहे.',
    'smart.journey': 'स्मार्ट गाव गंगावरहे-सावरगांव: आदर्श आधुनिकतेची यात्रा',
    'smart.journeyDesc': 'प्रगत तंत्रज्ञान, शाश्वत विकास आणि पारदर्शक शासन यांचा अनोखा संगम. नवीनीकरणीय ऊर्जा, स्वच्छता, पाणी व्यवस्थापन, पर्यावरण संरक्षण आणि डिजिटल सुखसोयी यांचा समतोल साधत गंगावरहे-सावरगांव सर्वांगीण विकासाचे उदाहरण घडवित आहे.',
    'smart.pillars.water': 'पाणी आणि स्वच्छता',
    'smart.pillars.management': 'व्यवस्थापन',
    'smart.pillars.liability': 'जबाबदारी',
    'smart.pillars.energy': 'ऊर्जा',
    'smart.pillars.education': 'शिक्षण',
    'smart.waterDesc': 'आरोगदायी आणि मजबूत समाजासाठी प्राधान्य. स्वच्छ आणि सुरक्षित पाणी पुरवठा, प्रभावी स्वच्छता उपाययोजना आणि स्वच्छतेबद्दल जनजागृती सुनिश्चित करणे. निरोगी पर्यावरणपूरक जीवनशैलीसाठी वचनबद्ध.',
    'smart.managementDesc': 'पारदर्शक, प्रभावी आणि जबाबदार कार्यपद्धती. ग्रामीण विकासासाठी शाश्वत योजना, संसाधनांचे योग्य नियोजन आणि गावकऱ्यांच्या सहभागातून प्रशासन प्रभावी बनवणे.',
    'smart.liabilityDesc': 'पारदर्शकता, जबाबदारी आणि विश्वासार्हतेवर आधारित कार्यशैली. गावकऱ्यांच्या हितासाठी विकास लक्ष्ये, प्रशासनात नैतिक जबाबदाऱ्यांचे पालन.',
    'smart.energyDesc': 'सौर पॅनल आणि LED रस्त्याच्या प्रकाश यासारख्या नवीकरणीय ऊर्जा स्रोतांचे प्रोत्साहन. कार्बन फूटप्रिंट कमी करत सर्व घरांना 24/7 वीज उपलब्धता सुनिश्चित करणे.',
    'smart.educationDesc': 'डिजिटल वर्गखोल्या, ई-लर्निंग केंद्र आणि गावच्या मुलांसाठी शिष्यवृत्ती. एनजीओ आणि सरकारी कार्यक्रमांशी भागीदारी करून प्रत्येक कुटुंबापर्यंत दर्जेदार शिक्षण पोहोचवणे.',
    'smart.cta': 'जाणून घ्या',
    'smart.more': 'अधिक माहिती',

    // Contact
    'contact.haveSay': 'तुमची मत व्यक्त करा!',
    'contact.desc': 'आम्हाला तुमचे अभिप्राय महत्त्वाचे आहेत. तुमचे सूचना, प्रश्न किंवा तक्रारी आमच्याशी शेअर करा. आमची टीम लवकर उत्तर देईल.',
    'contact.firstName': 'नाव',
    'contact.lastName': 'आडनाव',
    'contact.email': 'ईमेल',
    'contact.subject': 'विषय',
    'contact.message': 'मेसेज',
    'contact.submit': 'सबमिट',

    // Services
    'services.birth.title': 'जन्म प्रमाणपत्र',
    'services.birth.desc': 'जन्म नोंदणी ऑनलाइन सेवा',
    'services.death.title': 'मृत्यू प्रमाणपत्र',
    'services.death.desc': 'मृत्यू नोंदणी सेवा',
    'services.residence.title': 'राहिवासी प्रमाणपत्र',
    'services.residence.desc': 'राहिवासी पुरावा मिळवा',
    'services.grievance.title': 'तक्रार नोंदणी',
    'services.grievance.desc': 'ऑनलाइन तक्रार नोंदवा',
    'services.news.title': 'गाव बातम्या',
    'services.news.desc': 'नवीनतम बातम्या पहा',
    'services.payment.title': 'ऑनलाइन पेमेंट',
    'services.payment.desc': 'सेवांसाठी भरणा करा',

    // Footer
    'footer.about': 'आमच्याबद्दल',
    'footer.services': 'सेवा',
    'footer.contact': 'संपर्क',
    'footer.quick.birth': 'जन्मनोंदणी तपशील',
    'footer.quick.plans': 'दृष्टिकोन आणि योजना',
    'footer.quick.meetings': 'ग्रामसभा परिपत्रक',
    'footer.services.citizen': 'नागरी आणि नागरिकपात्र',
    'footer.services.taxes': 'करपद्धती योजना',
    'footer.services.projects': 'विकास प्रकल्प आराखडे',
    'footer.info.roads': 'सितारे रस्ते',
    'footer.info.loans': 'कर्ज रस्ते',
    'footer.email': 'grampanchayatgangavarhe@gmail.com',
    'footer.phone': '(02346) 243535',
    'footer.address': 'ग्राम पंचायत गंगावरहे-सावरगांव\nआपल्या कार्यालयात भेट द्या.',
    'footer.play': 'Google Play',
    'footer.sponsors.digital': 'Digital India',
    'footer.sponsors.mygov': 'MyGov',
    'footer.sponsors.azadi': 'Azadi',
    'footer.sponsors.eco': 'Eco',
    'footer.copyright': '© 2025 grampanchayatgangavarhe.com | Developed by Quantox',

    // Services Section
    'services.title': 'ऑनलाइन पोर्टलद्वारे उपलब्ध सुविधा',
    'services.desc': 'ग्रामपंचायतीच्या सर्व सुविधा आता ऑनलाइन उपलब्ध आहेत.',
    'services.special': 'दर्जेदार सेवा',

    // Common
    'lang.mr': 'मराठी',
    'lang.en': 'English',
    'switch.to': 'परिवर्तित करा'
  },
  en: {
    // Navbar
    'nav.home': 'Home',
    'nav.adminCommittee': 'Administrative Committee',
    'nav.otherCommittee': 'Other Committee',
    'nav.citizenPortal': 'Citizen Portal',
    'nav.smartVillage': 'Smart Village',
    'nav.rti': 'Right to Information',
    'nav.news': 'News',
     'nav.grievance': 'Grievance',
    'nav.aboutus': 'About Us',

    // OtherCommittee
    'otherCommittee.badge': 'Gram Panchayat gangavarhe-sawargaon',
    'otherCommittee.heroTitle': 'Gram Panchayat gangavarhe-sawargaon Sarva Samiti',
    'otherCommittee.heroDesc': 'Organization of committees working for the progress of the village. These committees contribute to important areas like education, health, sanitation, water management, women and child welfare, agricultural development and social welfare. All committees are committed to fulfilling the expectations of the villagers with transparency, unity, and a people-oriented approach.',
    'otherCommittee.tableTitle': 'Conflict-Free Village Committee',
    'otherCommittee.search': 'Search',
    'otherCommittee.headers.0': 'Sr. No.',
    'otherCommittee.headers.1': 'Position',
    'otherCommittee.headers.2': 'Name',
    'otherCommittee.headers.3': 'Committee Designation',
    'nav.moreInfo': 'More Info',
    'nav.digitalLibrary': 'Digital Library',
    'nav.admin': 'Admin Login',
    'nav.otherCommittee': 'Other Committee',
    'nav.citizenPortal': 'Citizen Portal',
    'nav.smartVillage': 'Smart Village',
    'nav.rti': 'Right to Information',
    'nav.news': 'News',  // Fixed
    'nav.grievance': 'Grievance',
    'nav.moreInfo': 'More Info',
    'nav.shop': 'Shops',
    'nav.digitalLibrary': 'Digital Library',
    'navbar.phone': '📞 (02346) 243535',
    'navbar.email': '✉ grampanchayatgangavarhe@gmail.com',
    'navbar.fax': '📠 FAX: 243535',
    'navbar.marathi': '🌐 English',
    'navbar.grampanchayat': 'Gram Panchayat Act',

    // Hero
    'hero.welcome': 'Welcome',
    'hero.title': 'Gram Panchayat Gangavarhe-Savargaon',
    'hero.desc': 'Gram Panchayat Gangavarhe-Savargaon - Information for Gram Sabha members, Gram Sevak and citizens',
    'hero.citizenLogin': 'Citizen Login',
    'hero.moreKnow': 'Know More',
    'hero.ministers': 'Honourable Ministers and Officials',
    'hero.gpOfficials': 'Gram Panchayat Officials',

    // AdminCommittee - English versions same as before
    'admin.title': 'Gram Panchayat Gangavarhe-Savargaon Administrative Committee',
    'admin.desc': 'An important mechanism that efficiently handles the responsibility of village administration. This committee is responsible for implementing various policies of the Gram Panchayat, managing resources, and providing essential services to the villagers. With emphasis on transparency, efficiency, and accountability, the Administrative Committee takes concrete steps for the progress of the village.',
    'admin.cta': 'Get Information',
    'admin.heading': 'Administrative Committee',
    'admin.members': [
      { name: 'Mr. Satish Sayajirao Deshmukh', role: 'Publicly appointed Sarpanch', enName: 'Mr. Satish Sayajirao Deshmukh', enRole: 'Publicly appointed Sarpanch' },
      { name: 'Mr. Hanuman Ganpati Garuda', role: 'Sub-Sarpanch', enName: 'Mr. Hanuman Ganpati Garuda', enRole: 'Sub-Sarpanch' },
      { name: 'Mr. Anil Bapuso Yadav', role: 'Member', enName: 'Mr. Anil Bapuso Yadav', enRole: 'Member' },
      { name: 'Mr. Vaibhav Pandurang Yadav', role: 'Member', enName: 'Mr. Vaibhav Pandurang Yadav', enRole: 'Member' },
      { name: 'Mr. Patangrao Shivaji Yadav', role: 'Member', enName: 'Mr. Patangrao Shivaji Yadav', enRole: 'Member' },
      { name: 'Mr. Deepak Ramchandra Pardeshi', role: 'Member', enName: 'Mr. Deepak Ramchandra Pardeshi', enRole: 'Member' },
      { name: 'Mr. Vikas Rajaram Karkate', role: 'Member', enName: 'Mr. Vikas Rajaram Karkate', enRole: 'Member' },
      { name: 'Mrs. Vaishali Prithviraj Yadav', role: 'Member', enName: 'Mrs. Vaishali Prithviraj Yadav', enRole: 'Member' },
      { name: 'Mrs. Bharti Dhananjay Yadav', role: 'Member', enName: 'Mrs. Bharti Dhananjay Yadav', enRole: 'Member' },
      { name: 'Mrs. Lata Vikas Yadav', role: 'Member', enName: 'Mrs. Lata Vikas Yadav', enRole: 'Member' },
      { name: 'Mrs. Anuja Manoj Yadav', role: 'Member', enName: 'Mrs. Anuja Manoj Yadav', enRole: 'Member' },
      { name: 'Mrs. Sunita Madhukar Pingle', role: 'Member', enName: 'Mrs. Sunita Madhukar Pingle', enRole: 'Member' },
      { name: 'Mrs. Meenakshi Santosh Koli', role: 'Member', enName: 'Mrs. Meenakshi Santosh Koli', enRole: 'Member' },
      { name: 'Mrs. Usha Yashwant Waghmare', role: 'Member', enName: 'Mrs. Usha Yashwant Waghmare', enRole: 'Member' }
    ],

    // SmartVillage - English versions
    'smart.title': 'Smart Village Gangavarhe-Savargaon',
    'smart.subtitle': 'Gram Sachivalaya Gangavarhe-Savargaon',
    'smart.desc': 'A symbol of modern technology, transparent governance, and sustainable development. Through cleanliness, education, health, and digital services, Gangavarhe-Savargaon village has become a model example of a progressive and empowered Gram Panchayat.',
    'smart.journey': 'Smart Village Gangavarhe-Savargaon: A journey to ideal modernity',
    'smart.journeyDesc': 'A unique blend of advanced technology, sustainable development, and transparent governance. Balancing renewable energy, sanitation, water management, environmental conservation, and digital amenities, Gangavarhe-Savargaon village is creating a model of holistic development.',
    'smart.pillars.water': 'Water and Sanitation',
    'smart.pillars.management': 'Management',
    'smart.pillars.liability': 'Liability',
    'smart.pillars.energy': 'Energy',
    'smart.pillars.education': 'Education',
    'smart.waterDesc': 'Priority for a healthy and strong society. Ensuring clean and safe water supply, effective sanitation measures, and public awareness about cleanliness. Committed to a healthy eco-friendly lifestyle.',
    'smart.managementDesc': 'Transparent, effective, and accountable functioning. Emphasis on sustainable plans for rural development, proper planning of resources, and making administration effective through villagers participation.',
    'smart.liabilityDesc': 'Working style based on transparency, accountability, and trustworthiness. Commitment to development goals for the benefit of villagers, adherence to ethical responsibilities in administration.',
    'smart.energyDesc': 'Promoting renewable energy sources including solar panels and LED street lighting. Reducing carbon footprint while ensuring 24/7 power availability for all households.',
    'smart.educationDesc': 'Digital classrooms, e-learning centers, and scholarships for village children. Partnering with NGOs and government programs to bring quality education to every family.',
    'smart.cta': 'Find out',
    'smart.more': 'More information',

    // Contact
    'contact.haveSay': 'Have Your Say!',
    'contact.desc': 'We value your feedback. Share your suggestions, queries, or concerns with us. Our team will respond soon.',
    'contact.firstName': 'First Name',
    'contact.lastName': 'Last Name',
    'contact.email': 'Email',
    'contact.subject': 'Subject',
    'contact.message': 'Message',
    'contact.submit': 'Submit',

    // Services
    'services.birth.title': 'Birth Certificate',
    'services.birth.desc': 'Online birth registration service',
    'services.death.title': 'Death Certificate',
    'services.death.desc': 'Death registration service',
    'services.residence.title': 'Residence Certificate',
    'services.residence.desc': 'Get residence proof',
    'services.grievance.title': 'Grievance Registration',
    'services.grievance.desc': 'Register online grievance',
    'services.news.title': 'Village News',
    'services.news.desc': 'View latest news',
    'services.payment.title': 'Online Payment',
    'services.payment.desc': 'Make payment for services',

    // Footer
    'footer.about': 'About Us',
    'footer.services': 'Services',
    'footer.contact': 'Contact',
    'footer.quick.birth': 'Birth Registration Details',
    'footer.quick.plans': 'Vision and Plans',
    'footer.quick.meetings': 'Gram Sabha Circulars',
    'footer.services.citizen': 'Civil and Citizen Eligibility',
    'footer.services.taxes': 'Tax System Plans',
    'footer.services.projects': 'Development Project Plans',
    'footer.info.roads': 'Star Roads',
    'footer.info.loans': 'Loan Roads',
    'footer.email': 'nsk.gangavarhe@gmail.com',
    'footer.phone': '(02346) 243535',
    'footer.address': 'Gram Panchayat Gangavarhe-Savargaon\nVisit our office.',
    'footer.play': 'Google Play',
    'footer.sponsors.digital': 'Digital India',
    'footer.sponsors.mygov': 'MyGov',
    'footer.sponsors.azadi': 'Azadi',
    'footer.sponsors.eco': 'Eco',
    'footer.copyright': '© 2025 grampanchayatgangavarhe.com | Developed by Quantox',

    // Services Section
    'services.title': 'Services Available through Online Portal',
    'services.desc': 'All Gram Panchayat services now available online.',
    'services.special': 'Quality Services',

    // Common
    'lang.mr': 'Marathi',
    'lang.en': 'English',
    'switch.to': 'Switch to'
  }
};

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('mr');
  const [isLoaded, setIsLoaded] = useState(false);
  const initRef = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (initRef.current) return;
    initRef.current = true;

    if (document.getElementById('google-translate-sdk')) {
      setIsLoaded(true);
      return;
    }

    let container = document.getElementById('google_translator_root');
    if (!container) {
      container = document.createElement('div');
      container.id = 'google_translator_root';
      container.style.cssText = 'position:fixed;top:-9999px;left:-9999px;visibility:hidden;pointer-events:none;';
      document.body.appendChild(container);
    }

    window.googleTranslateElementInit2 = () => {
      try {
        new window.google.translate.TranslateElement({
          pageLanguage: 'mr',
          includedLanguages: 'mr,en',  // Restricted to mr,en only
          layout: window.google.translate.TranslateElement.InlineLayout.HORIZONTAL,
          autoDisplay: false,
        }, 'google_translator_root');
        setIsLoaded(true);
      } catch (error) {
        console.warn('Google Translate init error:', error);
        setIsLoaded(true);
      }
    };

    const script = document.createElement('script');
    script.id = 'google-translate-sdk';
    script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit2';
    script.async = true;
    script.defer = true;
    script.onerror = () => {
      console.warn('Google Translate script failed to load');
      setIsLoaded(true);
    };
    document.head.appendChild(script);

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((m) => {
        m.addedNodes.forEach((node) => {
          if (
            node.nodeName === 'STYLE' &&
            node.textContent &&
            node.textContent.includes('body{top:')
          ) {
            node.textContent = node.textContent.replace(/body\{top:[^}]+\}/, 'body{top:0!important}');
          }
        });
      });
    });
    observer.observe(document.head, { childList: true });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.classList.remove('lang-en', 'lang-hi', 'lang-mr');
    document.body.classList.add(`lang-${currentLanguage}`);
  }, [currentLanguage]);

  const t = useCallback((key) => {
    return translations[currentLanguage]?.[key] || translations.mr?.[key] || key;
  }, [currentLanguage]);

  const selectLanguage = useCallback((lang) => {
    setCurrentLanguage(lang);
    if (typeof window === 'undefined') return;

    setTimeout(() => {
      try {
        const selectBox = document.querySelector(
          '.goog-te-gadget select, .goog-te-combo'
        );
        if (selectBox) {
          selectBox.value = lang;
          selectBox.dispatchEvent(new Event('change', { bubbles: true }));
        }
      } catch (error) {
        console.warn('Language change error:', error);
      }
    }, 150);
  }, []);

  return (
    <LanguageContext.Provider value={{
      currentLanguage,
      selectLanguage,
      isLoaded,
      t,
      translations  // Export for arrays like admin.members
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslator = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useTranslator must be used within LanguageProvider');
  }
  return context;
};

