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
    'nav.activity': 'कार्य',
    'nav.grievance': 'तक्रार',
    'nav.aboutus': 'आमच्याबद्दल',

    'rti.title': 'माहितीचा अधिकार (RTI)',
    'rti.subtitle': 'Right to Information Act',
    'rti.findOut': 'अधिक जाणून घ्या',
    'rti.sectionTitle': 'माहितीचा अधिकार दस्तऐवज आणि नोंदी',
    'rti.previewText': 'माहितीचा अधिकार दस्तऐवज - 2023-24',

    // Hero
    'hero.welcome': 'स्वागत स्थान',
    'hero.title': 'ग्राम पंचायत गंगावऱ्हे-सावरगाव',
    'hero.desc': 'ग्राम पंचायत गंगावऱ्हे-सावरगाव - ग्रामीण आत्मनिर्भरता आणि विकासाचे केंद्र',
    'hero.citizenLogin': 'नागरिक लॉगिन',
    'hero.moreKnow': 'अधिक जाणा',
    'hero.ministers': 'माननीय मंत्री व पदाधिकारी',
    'hero.gpOfficials': 'ग्रामपंचायत पदाधिकारी',
    'hero.minister1.name': 'महायुत मुख्यमंत्री देवेंद्र फडणवीस',
    'hero.minister1.role': 'मुख्यमंत्री, महाराष्ट्र',
    'hero.minister1.desc': 'ग्रामीण विकास आणि पायाभूत सुविधा विकासाचे नेतृत्व',
    'hero.minister2.name': 'मुख्यमंत्री एकनाथ शिंदे',
    'hero.minister2.role': 'मुख्यमंत्री, महाराष्ट्र',
    'hero.minister2.desc': 'ग्रामपंचायती सक्षमीकरण आणि नागरी सेवांचे डिजिटलायझेशन',
    'hero.minister3.name': 'सुनेत्रा अजित पवार',
    'hero.minister3.role': 'महसूल व सार्वजनिक बांधकाम मंत्री',
    'hero.minister3.desc': 'ग्रामीण रस्ते, पाणीपुरवठा आणि महसूल सुधारणा',
    'hero.minister4.name': 'ओमकार पवार',
    'hero.minister4.role': 'ग्रामविकास मंत्री',
    'hero.minister4.desc': 'ग्रामपंचायतींचे सक्षमीकरण आणि ७३ वा घटनापुरस्कार अंमलबजावणी',
    'hero.official1.name': 'लक्ष्मण बेंडकुळे',
    'hero.official1.role': 'सरपंच',
    'hero.official1.desc': 'ग्रामपंचायतीचे प्रमुख आणि विकासाचे नेतृत्व',
    'hero.official2.name': 'रोहिणी गाडे',
    'hero.official2.role': 'उप सरपंच',
    'hero.official2.desc': 'महिला व बाल विकास योजना आणि ग्रामसभेचे आयोजन',
    'hero.official3.name': 'ग्रामसेवक',
    'hero.official3.role': 'ग्राम विकास अधिकारी',
    'hero.official3.desc': 'नागरी सेवा, प्रमाणपत्रे आणि विकास योजनांचे समन्वय',

    // AdminCommittee
    'admin.title': 'ग्राम पंचायत गंगावऱ्हे-सावरगाव - प्रशासकीय समिती',
    'admin.desc': 'ग्राम प्रशासनाची प्रभावी व जबाबदार कार्यप्रणाली सुनिश्चित करणारी मुख्य यंत्रणा. ग्रामपंचायतीच्या धोरणांचा अंमलबजावणी, संसाधन व्यवस्थापन आणि नागरिकांना गुणवत्तेची सेवा प्रदान करणे हे समितीचे प्राथमिक कार्य. पारदर्शकता, दक्षता आणि उत्तरदायित्वाच्या तत्त्वावर आधारित या समिती ग्राम विकासाचे मार्गदर्शन करते.',
    'admin.cta': 'माहिती मिळवा',
    'admin.heading': 'प्रशासकीय संरचना',
    'admin.members': [
      { name: 'श्री. लक्ष्मण जगन्नाथ बेंडकुळे', role: 'सार्वजनिक नियुक्त सरपंच', enName: 'Mr. Lakshman Jaganath Bendkule', enRole: 'Publicly Appointed Sarpanch' },
      { name: 'श्रीमती रोहिणी विनायक गाडे', role: 'उप सरपंच', enName: 'Mrs. Rohini Vinayak Gade', enRole: 'Deputy Sarpanch' },
      { name: 'श्री. राजा राजाराम धोंगडे', role: 'सभासद', enName: 'Mr. Raja Rajaram Dhongde', enRole: 'Member' },
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

    // Footer and other mr keys
    'navbar.phone': '📞 (02346) 243535',
    'navbar.email': '✉ grampanchayatgangavarhe@gmail.com',
    'navbar.marathi': '🌐 मराठी',
    'lang.mr': 'मराठी',
    'lang.en': 'English',
    'switch.to': 'परिवर्तित करा',

    // Services
    'services.title': 'ऑनलाइन सेवा',
    'services.desc': 'सर्व प्रमाणपत्रे आणि सेवा एका ठिकाणी - ऑनलाइन अर्ज, ट्रॅकिंग आणि डाउनलोड',
    'services.birth.title': 'जन्म प्रमाणपत्र',
    'services.birth.desc': 'जन्म नोंदणी आणि प्रमाणपत्र डाउनलोड',
    'services.death.title': 'मृत्यू प्रमाणपत्र',
    'services.death.desc': 'मृत्यू नोंदणी सेवा',
    'services.residence.title': 'रहिवासी प्रमाणपत्र',
    'services.residence.desc': 'रहिवासी/निवास प्रमाणपत्र',
    'services.grievance.title': 'तक्रार नोंदणी',
    'services.grievance.desc': 'ग्रामपंचायतीकडे तक्रार नोंदवा',
    'services.news.title': 'बातम्या व अद्यतने',
    'services.news.desc': 'नवीनतम बातम्या आणि घोषणा',
    'services.payment.title': 'पेमेंट पोर्टल',
    'services.payment.desc': 'ऑनलाइन पेमेंट सुविधा',

    // Contact
    'contact.haveSay': 'आपल्याला काय म्हणायचे आहे?',
    'contact.desc': 'आमच्याशी संपर्क साधा. आपल्या सूचना आणि तक्रारींसाठी.',
    'contact.firstName': 'नाव',
    'contact.lastName': 'आडनाव',
    'contact.email': 'ईमेल',
    'contact.subject': 'विषय',
    'contact.message': 'मेसेज',
    'contact.submit': 'पाठवा'
  },

  en: {
    // Navbar
    'nav.home': 'Home',
    'nav.adminCommittee': 'Administrative Committee',
    'nav.otherCommittee': 'Other Committees',
    'nav.citizenPortal': 'Citizen Portal',
    'nav.smartVillage': 'Smart Village',
    'nav.rti': 'RTI',
    'nav.news': 'News',
    'nav.activity': 'Activity',
    'nav.grievance': 'Grievance',
    'nav.aboutus': 'About Us',

    // Hero - Improved
    'hero.welcome': 'Welcome',
    'hero.title': 'Gram Panchayat Gangavarhe-Savargaon',
    'hero.desc': 'Your trusted source for village governance services and citizen empowerment.',
    'hero.citizenLogin': 'Citizen Portal',
    'hero.moreKnow': 'Learn More',
    'hero.ministers': 'Honourable Ministers & Officials',
    'hero.gpOfficials': 'Gram Panchayat Officials',
    'hero.minister1.name': 'Chief Minister Devendra Fadnavis',
    'hero.minister1.role': 'Chief Minister, Maharashtra',
    'hero.minister1.desc': 'Leading rural development and infrastructure growth',
    'hero.minister2.name': 'Chief Minister Eknath Shinde',
    'hero.minister2.role': 'Chief Minister, Maharashtra',
    'hero.minister2.desc': 'Gram Panchayat empowerment and digital citizen services',
    'hero.minister3.name': 'Sunetra Ajit Pawar',
    'hero.minister3.role': 'Revenue & Public Works Minister',
    'hero.minister3.desc': 'Rural roads, water supply and revenue reforms',
    'hero.minister4.name': 'Omkar Pawar',
    'hero.minister4.role': 'Rural Development Minister',
    'hero.minister4.desc': 'Gram Panchayat strengthening and 73rd amendment implementation',
    'hero.official1.name': 'Lakshman Bendkule',
    'hero.official1.role': 'Sarpanch',
    'hero.official1.desc': 'Head of Gram Panchayat and development leadership',
    'hero.official2.name': 'Rohini Gade',
    'hero.official2.role': 'Deputy Sarpanch',
    'hero.official2.desc': 'Women & child development schemes and Gram Sabha organization',
    'hero.official3.name': 'Gram Sevak',
    'hero.official3.role': 'Village Development Officer',
    'hero.official3.desc': 'Citizen services, certificates and development schemes coordination',

    // AdminCommittee - Improved English
    'admin.title': 'Administrative Committee',
    'admin.desc': 'Dedicated team ensuring transparent and efficient village administration for sustainable growth and citizen welfare.',
    'admin.cta': 'View Details',
    'admin.heading': 'Committee Members',
    'admin.members': [
      { name: 'Mr. Lakshman Jaganath Bendkule', role: 'Publicly Appointed Sarpanch' },
      { name: 'Mrs. Rohini Vinayak Gade', role: 'Deputy Sarpanch' },
      { name: 'Mr. Raja Rajaram Dhongde', role: 'Member' },
      { name: 'Mr. Vaibhav Pandurang Yadav', role: 'Member' },
      { name: 'Mr. Patangrao Shivaji Yadav', role: 'Member' },
      { name: 'Mr. Deepak Ramchandra Pardeshi', role: 'Member' },
      { name: 'Mr. Vikas Rajaram Karkate', role: 'Member' },
      { name: 'Mrs. Vaishali Prithviraj Yadav', role: 'Member' },
      { name: 'Mrs. Bharti Dhananjay Yadav', role: 'Member' },
      { name: 'Mrs. Lata Vikas Yadav', role: 'Member' },
      { name: 'Mrs. Anuja Manoj Yadav', role: 'Member' },
      { name: 'Mrs. Sunita Madhukar Pingle', role: 'Member' },
      { name: 'Mrs. Meenakshi Santosh Koli', role: 'Member' },
      { name: 'Mrs. Usha Yashwant Waghmare', role: 'Member' }
    ],

    // Other polished keys
    'navbar.phone': '📞 (02346) 243535',
    'navbar.email': '✉ grampanchayatgangavarhe@gmail.com',
    'navbar.marathi': '🌐 English',
    'lang.mr': 'Marathi',
    'lang.en': 'English',
    'switch.to': 'Switch to',

    // Services
    'services.title': 'Online Services',
    'services.desc': 'All certificates and services at one place - Online application, tracking and download',
    'services.birth.title': 'Birth Certificate',
    'services.birth.desc': 'Birth registration and certificate download',
    'services.death.title': 'Death Certificate',
    'services.death.desc': 'Death registration service',
    'services.residence.title': 'Residence Certificate',
    'services.residence.desc': 'Residence proof certificate',
    'services.grievance.title': 'Grievance Registration',
    'services.grievance.desc': 'Register complaint with Gram Panchayat',
    'services.news.title': 'News & Updates',
    'services.news.desc': 'Latest news and announcements',
    'services.payment.title': 'Payment Portal',
    'services.payment.desc': 'Online payment facility',

    // Contact
    'contact.haveSay': 'Have something to say?',
    'contact.desc': 'Get in touch with us. For suggestions and complaints.',
    'contact.firstName': 'First Name',
    'contact.lastName': 'Last Name',
    'contact.email': 'Email',
    'contact.subject': 'Subject',
    'contact.message': 'Message',
    'contact.submit': 'Send',

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
          includedLanguages: 'mr,en',
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
      translations
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
