// In-memory chat - no model needed
const chatHistory = new Map();

// Generate simple session ID (could use user ID if auth added later)
const generateSessionId = () => `chat_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

// Keyword-based responses for Gram Panchayat services
const responses = {
  birth: 'Birth certificates are available in Citizen Portal → Birth Certificate Form. Required docs: Birth proof, ID.',
  death: 'Death certificates via Citizen Portal → Death Certificate Form. Submit within 21 days.',
  residence: 'Residence certificate form in Certificates section. Processing: 7 days.',
  news: 'Latest news in News section. Check updates regularly.',
  contact: 'Contact us via Contact form or email gramkadepur@gmail.com',
  kunbi: 'Kunbi records available in dedicated page. Admin access for updates.',
  complaint: 'File grievances in Grievance section (Complaint/Suggestion tabs).',
  default: 'I can help with certificates (birth/death/residence), news, kunbi records, complaints, contacts. What do you need?',
  greetings: ['Namaskar! ग्रामपंचायत कादेपूर च्या चॅटबॉटकडे स्वागत आहे। Birth/Death/Residence प्रमाणपत्र, बातम्या, तक्रार इत्यादी साठी विचारा।', 'Hello! Welcome to Kadepur Gram Panchayat chatbot. Ask about certificates, news, complaints etc.']
};

const getBotResponse = async (userMessage, sessionId) => {
  const lowerMsg = userMessage.toLowerCase();

// Save user message to in-memory
  const sessionMessages = chatHistory.get(sessionId) || [];
  sessionMessages.push({ sessionId, role: 'user', message: userMessage, timestamp: new Date() });
  chatHistory.set(sessionId, sessionMessages);

  // Simple keyword matching (advanced: could integrate Gemini API)
  let response;
  if (lowerMsg.includes('hello') || lowerMsg.includes('hi') || lowerMsg.includes('नमस्कार')) {
    response = responses.greetings[Math.floor(Math.random() * responses.greetings.length)];
  } else if (lowerMsg.includes('birth') || lowerMsg.includes('जन्म')) {
    response = responses.birth;
  } else if (lowerMsg.includes('death') || lowerMsg.includes('मृत्यु')) {
    response = responses.death;
  } else if (lowerMsg.includes('residence') || lowerMsg.includes('निवास')) {
    response = responses.residence;
  } else if (lowerMsg.includes('news') || lowerMsg.includes('बातम्या')) {
    response = responses.news;
  } else if (lowerMsg.includes('contact') || lowerMsg.includes('ईमेल')) {
    response = responses.contact;
  } else if (lowerMsg.includes('kunbi')) {
    response = responses.kunbi;
  } else if (lowerMsg.includes('complaint') || lowerMsg.includes('तक्रार')) {
    response = responses.complaint;
  } else {
    response = responses.default;
  }

// Save bot response to in-memory
 
  sessionMessages.push({ sessionId, role: 'bot', message: response, timestamp: new Date() });
  chatHistory.set(sessionId, sessionMessages);

  return response;
};

exports.sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    if (!message || !message.trim()) {
      return res.status(400).json({ success: false, message: 'Message required' });
    }

    const sessionId = req.body.sessionId || generateSessionId();

    const response = await getBotResponse(message.trim(), sessionId);

    res.json({
      success: true,
      response,
      sessionId
    });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.getHistory = async (req, res) => {
  try {
    const { sessionId } = req.params;
  const sessionMessages = chatHistory.get(req.params.sessionId) || [];
  const messages = sessionMessages
    .sort((a, b) => a.timestamp - b.timestamp)
    .slice(-50)
    .map(msg => ({
      role: msg.role,
      message: msg.message
    }));
    res.json({ success: true, messages });
  } catch (error) {
    console.error('History error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
