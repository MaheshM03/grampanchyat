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
'rti.title': 'माहितीचा अधिकार (RTI)',
'rti.subtitle': 'Right to Information Act',
    'rti.findOut': 'अधिक जाणून घ्या',
    'rti.sectionTitle': 'माहितीचा अधिकार दस्तऐवज आणि नोंदी',
    'rti.previewText': 'माहितीचा अधिकार दस्तऐवज - 2023-24',

    // OtherCommittee
    'otherCommittee.badge': 'ग्राम पंचायत गंगावऱ्हे-सावरगाव',
'otherCommittee.heroTitle': 'ग्राम पंचायत गंगावऱ्हे-सावरगाव - सर्व समितिया',
    'otherCommittee.heroDesc': 'ग्राम विकासार्थ कार्यरत विविध समितींचे संघटन. शिक्षण, आरोग्य, स्वच्छता, पाणी व्यवस्थापन, महिला व बाल कल्याण, कृषी विकास आणि सामाजिक सेवा यांसारख्या महत्वाच्या क्षेत्रात योगदान देणाऱ्या समितिया. सर्व समितिया पारदर्शकता, एकता आणि नागरिक-केंद्रित दृष्टिकोनाने ग्रामीणांच्या आशा पूर्ण करण्यासाठी प्रतिबद्ध.',
    'otherCommittee.tableTitle': 'ग्राम विकास समितिया',
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
'hero.title': 'ग्राम पंचायत गंगावऱ्हे-सावरगाव',
'hero.desc': 'ग्राम पंचायत गंगावऱ्हे-सावरगाव - ग्रामीण आत्मनिर्भरता आणि विकासाचे केंद्र',
    'hero.citizenLogin': 'नागरिक लॉगिन',
    'hero.moreKnow': 'अधिक जाणा',
    'hero.ministers': 'माननीय मंत्री व पदाधिकारी',
    'hero.gpOfficials': 'ग्रामपंचायत पदाधिकारी',

    // AdminCommittee
'admin.title': 'ग्राम पंचायत गंगावऱ्हे-सावरगाव - प्रशासकीय समिती',
    'admin.desc': 'ग्राम प्रशासनाची प्रभावी व जबाबदार कार्यप्रणाली सुनिश्चित करणारी मुख्य यंत्रणा. ग्रामपंचायतीच्या धोरणांचा अंमलबजावणी, संसाधन व्यवस्थापन आणि नागरिकांना गुणवत्तेची सेवा प्रदान करणे हे समितीचे प्राथमिक कार्य. पारदर्शकता, दक्षता आणि उत्तरदायित्वाच्या तत्वावर आधारित या समिती ग्राम विकासाचे मार्गदर्शन करते.',
    'admin.cta': 'माहिती मिळवा',
    'admin.heading': 'प्रशासकीय संरचना',
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
'smart.title': 'स्मार्ट गाव - गंगावऱ्हे-सावरगाव',
'smart.subtitle': 'डिजिटल आणि शाश्वत विकासाचे केंद्र',
'smart.desc': 'आधुनिक तंत्रज्ञान, सुशासन आणि टिकाऊ विकासाचा प्रतीक. स्वच्छता, शिक्षा, आरोग्य आणि डिजिटल सेवांच्या माध्यमातून गंगावऱ्हे-सावरगाव एक सक्षम ग्रामपंचायतीचे आदर्श उदाहरण आहे.',
'smart.journey': 'विकास व प्रगतीचा शाश्वत पथ',
'smart.journeyDesc': 'आधुनिक तंत्रज्ञान, टिकाऊ विकास आणि सुशासनाचा अनोखा मेळ. नवीकरणीय ऊर्जा, स्वच्छता, जल प्रबंधन, पर्यावरण संवर्धन आणि डिजिटल सुविधांचो संतुलन साधत गंगावऱ्हे-सावरगाव सांगोपांग विकासाचे आदर्श तयार करत आहे.',
    'smart.pillars.water': 'जल व स्वच्छता',
    'smart.pillars.management': 'प्रशासन',
    'smart.pillars.liability': 'उत्तरदायित्व',
    'smart.pillars.energy': 'नवीकरणीय ऊर्जा',
    'smart.pillars.education': 'शिक्षा',
    'smart.waterDesc': 'निरोगी आणि शक्तिशाली समाजाचा पाया. निर्मल व सुरक्षित जलपूरणा, प्रभावी स्वच्छता उपाय आणि स्वच्छताविषयक जनजागृती. निरोगी पर्यावरणमैत्र जीवनपद्धतीसाठी संकल्पबद्ध.',
    'smart.managementDesc': 'पारदर्शक, प्रभावी आणि उत्तरदायी प्रशासन. ग्रामीण विकासाची टिकाऊ योजना, सुप्रबंधित संसाधन वापर आणि नागरिकांच्या सक्रिय सहभागातून सेवा सुधार.',
    'smart.liabilityDesc': 'पारदर्शकता, उत्तरदायित्व आणि विश्वसनीयतेचा अनुपालन. नागरिकांच्या कल्याणार्थ विकास उद्दिष्टे, प्रशासनात नैतिक मूल्यांचे संरक्षण.',
    'smart.energyDesc': 'सौर पॅनल आणि LED प्रकाश यांसारख्या नवीकरणीय ऊर्जा स्रोतांचा अवलंब. कार्बनचाप कमी करत सर्व घरांना अविरत विद्युत पूरणा उपलब्ध करणे.',
    'smart.educationDesc': 'डिजिटल कक्षा, ई-शिक्षण केंद्र आणि ग्रामीण मुलांसाठी शिष्यवृत्ती कार्यक्रम. संस्थांच्या सहकार्याने प्रत्येक परिवारापर्यंत गुणवत्तेची शिक्षा पोहोचवणे.',
    'smart.cta': 'अधिक जाणूनं घ्या',
    'smart.more': 'विस्तृत माहिती',

    // Contact
    'contact.haveSay': 'आपली मत आपल्याशी शेअर करा!',
    'contact.desc': 'आपल्या प्रतिक्रिया आणि सुचना आमच्यासाठी महत्वाचे आहेत. आपली माहिती, प्रश्न किंवा तक्रार आमच्याशी सहजपणे व्यक्त करा. आमची संघटना त्वरीत प्रतिसाद देईल.',
    'contact.firstName': 'नाव',
    'contact.lastName': 'आडनाव',
    'contact.email': 'ईमेल',
    'contact.subject': 'विषय',
    'contact.message': 'मेसेज',
    'contact.submit': 'सबमिट',

    // Services
    'services.birth.title': 'जन्म प्रमाणपत्र',
    'services.birth.desc': 'ऑनलाइन जन्म नोंदणी सेवा',
    'services.death.title': 'मृत्यु प्रमाणपत्र',
    'services.death.desc': 'ऑनलाइन मृत्यु नोंदणी सेवा',
    'services.residence.title': 'निवास प्रमाणपत्र',
    'services.residence.desc': 'निवास प्रमाण पत्र प्राप्त करा',
    'services.grievance.title': 'तक्रार निवेदन',
    'services.grievance.desc': 'ऑनलाइन तक्रार नोंदणी सेवा',
    'services.news.title': 'ग्राम बातम्या',
    'services.news.desc': 'सर्वशेष बातम्या आणि घोषणा',
    'services.payment.title': 'ऑनलाइन भरणा',
    'services.payment.desc': 'सेवांसाठी ऑनलाइन भरणा व्यवस्था',

    // Footer
    'footer.about': 'आमच्याविषयी',
    'footer.services': 'ऑनलाइन सेवा',
    'footer.contact': 'संपर्क माहिती',
    'footer.quick.birth': 'जन्म नोंदणी विवरण',
    'footer.quick.plans': 'दृष्टिकोन व कार्यक्रम',
    'footer.quick.meetings': 'ग्रामसभा आहवाने',
    'footer.services.citizen': 'नागरी सेवा',
    'footer.services.taxes': 'कर व्यवस्था',
    'footer.services.projects': 'विकास योजना',
    'footer.info.roads': 'रस्ते व बुनियादी सुविधा',
    'footer.info.loans': 'सरकारी योजना',
    'footer.email': 'grampanchayatgangavarhe@gmail.com',
    'footer.phone': '(02346) 243535',
    'footer.address': 'ग्राम पंचायत गंगावऱ्हे-सावरगाव\nआपल्या कार्यालयात भेट द्या.',
    'footer.play': 'Google Play',
    'footer.sponsors.digital': 'Digital India',
    'footer.sponsors.mygov': 'MyGov',
    'footer.sponsors.azadi': 'Azadi',
    'footer.sponsors.eco': 'Eco',
    'footer.copyright': '© 2025 grampanchayatgangavarhe.com | Developed by Quantox',

    // Services Section
    'services.title': 'ऑनलाइन ग्रामांची सेवा',
    'services.desc': 'ग्राम विकास आणि नागरिक सुविधेसाठी ऑनलाइन संगम।',
    'services.special': 'गुणवत्तेची सेवा',

    // Common
    'rti.search': 'शोधा',
    'rti.headers.0': 'क्र. संख्या',
    'rti.headers.1': 'विषय',
    'rti.headers.2': 'कालावधी',
    'rti.headers.3': 'प्रलंबित',
    'rti.headers.4': 'सोडवलेले',
    'rti.headers.5': 'बाकी',
    'rti.headers.6': 'टिप्पणी',
    'lang.mr': 'मराठी',
    'lang.en': 'English',
    'switch.to': 'परिवर्तित करा',

    // Grievance Page
    'grievance.title': 'तक्रार पोर्टल',
    'grievance.subtitle': 'आपली तक्रार सहजपणे सबमिट करा',
    'grievance.form.title': 'तक्रार दाखल करा',
    'grievance.form.fullName': 'पूर्ण नाव',
    'grievance.form.mobile': 'मोबाईल नंबर',
    'grievance.form.aadhaar': 'आधार क्रमांक',
    'grievance.form.email': 'ईमेल',
    'grievance.form.department': 'विभाग निवडा',
    'grievance.form.details': 'तक्रारीचे तपशील',
    'grievance.form.submit': 'सबमिट करा',
    'grievance.form.required': 'आवश्यक',
    'grievance.form.invalidMobile': 'अमान्य मोबाईल',
    'grievance.form.invalidAadhaar': 'अमान्य आधार',
    'grievance.form.selectDept': 'विभाग निवडा',
    'grievance.contact.location': 'स्थान',
    'grievance.contact.phone': 'फोन',
    'grievance.contact.email': 'ईमेल',
    'grievance.dept.water': 'जल पुरवठा',
    'grievance.dept.road': 'रस्ते व रचना',
    'grievance.dept.health': 'आरोग्य विभाग',
    'grievance.dept.education': 'शिक्षा',
    'grievance.dept.agriculture': 'कृषी',
    'grievance.dept.revenue': 'राजस्व',
    'grievance.dept.sanitation': 'स्वच्छता',
    'grievance.dept.electricity': 'विद्युत',

    // News Page
    'news.title': 'ग्राम बातम्या व घोषणा',
    'news.subtitle': 'सर्वशेष बातम्या आणि महत्वाची माहिती',
    'news.noNews': 'सध्या कोणती बातमी उपलब्ध नाही',
    'news.loading': 'लोडिंग...',

    // Citizen Portal
    'citizenPortal.title': 'नागरिक सेवा सुविधा केंद्र',
    'citizenPortal.subtitle': 'आपली सेवा सहजपणे खोजा',
    'citizenPortal.search': 'आपली सेवा खोजा...',
    'citizenPortal.findOut': 'जाणून घ्या',
    'citizenPortal.category': 'श्रेणी',
    'citizenPortal.scheme': 'योजना',
    'citizenPortal.department': 'विभाग',
    'citizenPortal.service': 'सेवा',
    'citizenPortal.portal': 'पोर्टल',
    'citizenPortal.website': 'वेबसाइट',

    // Hero Descriptions
    'hero.minister1.name': 'देवेंद्र फडणवीस',
    'hero.minister1.role': 'मा. मुख्यमंत्री',
    'hero.minister1.desc': 'महाराष्ट्राचे मुख्यमंत्री.',
    'hero.minister2.name': 'एकनाथ शिंदे',
    'hero.minister2.role': 'मा. उपमुख्यमंत्री',
    'hero.minister2.desc': 'उपमुख्यमंत्री.',
    'hero.minister3.name': 'सुनेत्रा अजित पवार',
    'hero.minister3.role': 'मा. उपमुख्यमंत्री',
    'hero.minister3.desc': 'उपमुख्यमंत्री.',
    'hero.minister4.name': 'श्री. ओमकार पवार',
    'hero.minister4.role': 'मुख्य कार्यकारी अधिकारी',
    'hero.minister4.desc': 'प्रशासकीय अधिकारी.',
    'hero.official1.name': 'हरिदास गणक',
    'hero.official1.role': 'सरपंच',
    'hero.official1.desc': 'गाव शासनासाठी जबाबदार गाव प्रमुख.',
    'hero.official2.name': 'हनुमान गणक',
    'hero.official2.role': 'उपसरपंच',
    'hero.official2.desc': 'प्रशासन सहाय्य करणारा उप प्रमुख.',
    'hero.official3.name': 'श्री. डी. पुजारी',
    'hero.official3.role': 'ग्रामपंचायत अधिकारी',
    'hero.official3.desc': 'प्रशासकीय अधिकारी.'
  },

  en: {
    // Navbar
    'nav.home': 'Home',
    'nav.adminCommittee': 'Administrative Committee',
    'nav.otherCommittee': 'Other Committees',
    'nav.citizenPortal': 'Citizen Portal',
    'nav.smartVillage': 'Smart Village',
    'nav.rti': 'Right to Information',
    'nav.news': 'News',
    'nav.grievance': 'Grievance',
    'nav.aboutus': 'About Us',
    'rti.title': 'Right to Information',
    'rti.subtitle': 'RTI Act Implementation',
    'rti.findOut': 'Learn More',
    'rti.sectionTitle': 'Information Access - Records and Documents',
    'rti.previewText': 'Right to Information Documents - 2023-24',

    // OtherCommittee
    'otherCommittee.badge': 'Gram Panchayat Gangavarhe-Savargaon',
    'otherCommittee.heroTitle': 'Gram Panchayat Gangavarhe-Savargaon - All Committees',
    'otherCommittee.heroDesc': 'Organization of various committees working for the progress and development of the village. These committees contribute to essential areas including education, health, sanitation, water management, women and child welfare, agricultural development, and social services. All committees are committed to serving villagers with transparency, unity, and a citizen-centric approach.',
    'otherCommittee.tableTitle': 'Village Development Committees',
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
    'admin.title': 'Administrative Committee - Gram Panchayat Gangavarhe-Savargaon',
    'admin.desc': 'The primary mechanism responsible for effective and accountable village governance. This committee is accountable for policy implementation, resource management, and delivery of quality services to villagers. Based on principles of transparency, efficiency, and accountability, the Administrative Committee provides strategic direction for village development.',
    'admin.cta': 'Learn More',
    'admin.heading': 'Administrative Structure',
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
    'smart.title': 'Smart Village - Gangavarhe-Savargaon',
    'smart.subtitle': 'Hub for Digital and Sustainable Development',
    'smart.desc': 'A symbol of modern technology, good governance, and sustainable development. Through sanitation, education, healthcare, and digital services, Gangavarhe-Savargaon exemplifies a progressive and empowered Gram Panchayat model.',
    'smart.journey': 'Journey Towards Sustainable Progress',
    'smart.journeyDesc': 'A unique convergence of advanced technology, sustainable development, and good governance. Through balanced integration of renewable energy, sanitation, water management, environmental conservation, and digital connectivity, Gangavarhe-Savargaon demonstrates a holistic development model.',
    'smart.pillars.water': 'Water and Sanitation',
    'smart.pillars.management': 'Governance',
    'smart.pillars.liability': 'Accountability',
    'smart.pillars.energy': 'Renewable Energy',
    'smart.pillars.education': 'Quality Education',
    'smart.waterDesc': 'Priority for a healthy and strong society. Ensuring clean and safe water supply, effective sanitation measures, and public awareness about cleanliness. Committed to a healthy eco-friendly lifestyle.',
    'smart.managementDesc': 'Transparent, effective, and accountable functioning. Emphasis on sustainable plans for rural development, proper planning of resources, and making administration effective through villagers participation.',
    'smart.liabilityDesc': 'Working style based on transparency, accountability, and trustworthiness. Commitment to development goals for the benefit of villagers, adherence to ethical responsibilities in administration.',
    'smart.energyDesc': 'Promoting renewable energy sources including solar panels and LED street lighting. Reducing carbon footprint while ensuring 24/7 power availability for all households.',
    'smart.educationDesc': 'Digital classrooms, e-learning centers, and scholarships for village children. Partnering with NGOs and government programs to bring quality education to every family.',
    'smart.cta': 'Learn More',
    'smart.more': 'Detailed Information',

    // Contact
    'contact.haveSay': 'Share Your Views and Feedback',
    'contact.desc': 'Your feedback and suggestions are important to us. Please share your inquiries, suggestions, or grievances. Our team commits to prompt response and resolution.',
    'contact.firstName': 'First Name',
    'contact.lastName': 'Last Name',
    'contact.email': 'Email',
    'contact.subject': 'Subject',
    'contact.message': 'Message',
    'contact.submit': 'Submit',

    // Services
    'services.birth.title': 'Birth Certificate',
    'services.birth.desc': 'Online Birth Registration Service',
    'services.death.title': 'Death Certificate',
    'services.death.desc': 'Online Death Registration Service',
    'services.residence.title': 'Residence Certificate',
    'services.residence.desc': 'Obtain Residence Certificate',
    'services.grievance.title': 'Grievance Registration',
    'services.grievance.desc': 'Online Grievance Registration Service',
    'services.news.title': 'Village News & Announcements',
    'services.news.desc': 'Latest News and Official Updates',
    'services.payment.title': 'Online Payment',
    'services.payment.desc': 'Secure Online Payment Gateway',

    // Footer
    'footer.about': 'About Us',
    'footer.services': 'Services',
    'footer.contact': 'Contact',
    'footer.quick.birth': 'Birth Registration Information',
    'footer.quick.plans': 'Vision and Strategic Plans',
    'footer.quick.meetings': 'Gram Sabha Notices',
    'footer.services.citizen': 'Citizen Services',
    'footer.services.taxes': 'Tax Administration',
    'footer.services.projects': 'Development Programs',
    'footer.info.roads': 'Infrastructure & Assets',
    'footer.info.loans': 'Government Schemes',
    'footer.email': 'nsk.gangavarhe@gmail.com',
    'footer.phone': '(02346) 243535',
    'footer.address': 'Gram Panchayat Gangavarhe-Savargaon\nVisit our office for more information.',
    'footer.play': 'Google Play',
    'footer.sponsors.digital': 'Digital India',
    'footer.sponsors.mygov': 'MyGov',
    'footer.sponsors.azadi': 'Azadi',
    'footer.sponsors.eco': 'Eco',
    'footer.copyright': '© 2025 grampanchayatgangavarhe.com | Developed by Quantox',

    // Services Section
    'services.title': 'Digital Services and Online Portal',
    'services.desc': 'Comprehensive services for rural development and citizen welfare.',
    'services.special': 'Quality Service Delivery',

    // Common
    'rti.search': 'Search',
    'rti.headers.0': 'Sr. No.',
    'rti.headers.1': 'Subject',
    'rti.headers.2': 'Period',
    'rti.headers.3': 'Pending',
    'rti.headers.4': 'Disposed',
    'rti.headers.5': 'Outstanding',
    'rti.headers.6': 'Remarks',
    'lang.mr': 'Marathi',
    'lang.en': 'English',
    'switch.to': 'Switch to',

    // Grievance Page
    'grievance.title': 'Grievance Portal',
    'grievance.subtitle': 'Submit Your Complaint Easily',
    'grievance.form.title': 'Submit Complaint',
    'grievance.form.fullName': 'Full Name',
    'grievance.form.mobile': 'Mobile Number',
    'grievance.form.aadhaar': 'Aadhaar Number',
    'grievance.form.email': 'Email',
    'grievance.form.department': 'Select Department',
    'grievance.form.details': 'Complaint Details',
    'grievance.form.submit': 'Submit',
    'grievance.form.required': 'Required',
    'grievance.form.invalidMobile': 'Invalid Mobile',
    'grievance.form.invalidAadhaar': 'Invalid Aadhaar',
    'grievance.form.selectDept': 'Select Department',
    'grievance.contact.location': 'Location',
    'grievance.contact.phone': 'Phone',
    'grievance.contact.email': 'Email',
    'grievance.dept.water': 'Water Supply',
    'grievance.dept.road': 'Road & Infrastructure',
    'grievance.dept.health': 'Health Department',
    'grievance.dept.education': 'Education',
    'grievance.dept.agriculture': 'Agriculture',
    'grievance.dept.revenue': 'Revenue',
    'grievance.dept.sanitation': 'Sanitation',
    'grievance.dept.electricity': 'Electricity',

    // News Page
    'news.title': 'Village News & Announcements',
    'news.subtitle': 'Latest News and Important Information',
    'news.noNews': 'No News Available Currently',
    'news.loading': 'Loading...',

    // Citizen Portal
    'citizenPortal.title': 'Citizen Service Facility Center',
    'citizenPortal.subtitle': 'Find Your Service Easily',
    'citizenPortal.search': 'Find Your Service...',
    'citizenPortal.findOut': 'Find Out',
    'citizenPortal.category': 'Category',
    'citizenPortal.scheme': 'Scheme',
    'citizenPortal.department': 'Department',
    'citizenPortal.service': 'Service',
    'citizenPortal.portal': 'Portal',
    'citizenPortal.website': 'Website',

    // Hero Descriptions
    'hero.minister1.name': 'Devendra Fadnavis',
    'hero.minister1.role': 'Chief Minister',
    'hero.minister1.desc': 'Chief Minister of Maharashtra.',
    'hero.minister2.name': 'Eknath Shinde',
    'hero.minister2.role': 'Deputy Chief Minister',
    'hero.minister2.desc': 'Deputy Chief Minister.',
    'hero.minister3.name': 'Sunetra Ajit Pawar',
    'hero.minister3.role': 'Deputy Chief Minister',
    'hero.minister3.desc': 'Deputy Chief Minister.',
    'hero.minister4.name': 'Omkar Pawar',
    'hero.minister4.role': 'Chief Executive Officer',
    'hero.minister4.desc': 'Administrative Officer.',
    'hero.official1.name': 'Haridas Ganak',
    'hero.official1.role': 'Sarpanch',
    'hero.official1.desc': 'Village Head Responsible for Governance.',
    'hero.official2.name': 'Hanuman Ganak',
    'hero.official2.role': 'Deputy Sarpanch',
    'hero.official2.desc': 'Deputy Head Assisting Administration.',
    'hero.official3.name': 'D. Pujari',
    'hero.official3.role': 'Gram Panchayat Officer',
    'hero.official3.desc': 'Administrative Officer.',

    // Modal
    'modal.close': 'Close'
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

