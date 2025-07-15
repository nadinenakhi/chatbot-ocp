import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { trainModel, predictClass } from './model';

function ChatInterface() {
  const [model, setModel] = useState(null);
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([]);
  const [ticketStatus, setTicketStatus] = useState('');
  const [pendingTicket, setPendingTicket] = useState(null);
  const [awaitingService, setAwaitingService] = useState(false);
  const [serviceOptionsVisible, setServiceOptionsVisible] = useState(false);

  const services = ['IT', 'HR', 'Finance', 'Logistics', 'Security']; 

  useEffect(() => {
    trainModel().then(m => setModel(m));
  }, []);

  const isIssueIntent = (intent) => intent.endsWith('_issue');

  const chatbotReplies = {
    greeting: "👋 Hello! How can I assist you today?",
    goodbye: "👋 Goodbye! Have a great day!",
    thanks: "🙏 You're welcome!",
    small_talk: "💬 I'm just a bot, but I'm here to help!",
    help_request: "🛠️ Sure! Describe your issue so I can help.",
    bot_identity: "🤖 I'm a virtual assistant here to help with IT issues or create tickets.",
    confirmation: "✅ Got it!",
    rejection: "❌ Alright, let me know if you change your mind.",
    gratitude: "😊 Happy to help!"
  };

  const createTicket = async (predictedType, message, service) => {
    const titre = predictedType.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

    const ticketData = {
      titre,
      description: message,
      type: predictedType,
      service,
      urgence: "normal"
    };

    try {
      const token = localStorage.getItem('token');

      await axios.post('http://127.0.0.1:8000/api/tickets', ticketData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setTicketStatus('✅ Ticket created successfully!');
      setTimeout(() => setTicketStatus(''), 5000);
    } catch (error) {
      setTicketStatus('❌ Error creating ticket.');
      console.error('Ticket error:', error);
    }
  };

  const handleSend = async () => {
    if (!inputText.trim()) return;

    const userMessage = { sender: 'user', text: inputText };
    setMessages(prev => [...prev, userMessage]);

    if (awaitingService && pendingTicket) {
      // If service is expected, ignore text and wait for button click
      const botMessage = {
        sender: 'bot',
        text: "Please select your service by clicking a button below."
      };
      setMessages(prev => [...prev, botMessage]);
      setInputText('');
      return;
    }

    const intent = await predictClass(model, inputText);
    let reply = chatbotReplies[intent] || "🤔 Sorry, I didn’t understand that.";

    if (isIssueIntent(intent)) {
      setPendingTicket({ intent, message: inputText });
      setAwaitingService(true);
      setServiceOptionsVisible(true);

      reply = "🛠️ I detected the issue: " + intent.replace(/_/g, ' ') ;
    }

    const botMessage = { sender: 'bot', text: reply };
    setMessages(prev => [...prev, botMessage]);
    setInputText('');
  };

  const handleServiceClick = async (service) => {
    if (!pendingTicket) return;

    await createTicket(pendingTicket.intent, pendingTicket.message, service);

    setMessages(prev => [
      ...prev,
      { sender: 'user', text: service },
      { sender: 'bot', text: `A ticket will be created.` }
    ]);


    setAwaitingService(false);
    setPendingTicket(null);
    setServiceOptionsVisible(false);
  };

  return (
    <div>
      <div style={{
        background: '#0fc070ff',
        color: 'white',
        padding: '15px',
        borderTopLeftRadius: '10px',
        borderTopRightRadius: '10px'
      }}>
        <h5 className="mb-0">AI Assistant</h5>
        <small>Ready to create a ticket for you</small>
      </div>

      <div style={{
        padding: '20px',
        minHeight: '400px',
        backgroundColor: 'white'
      }}>
        {messages.map((msg, i) => (
          <div key={i} style={{
            textAlign: msg.sender === 'user' ? 'right' : 'left',
            marginBottom: '10px'
          }}>
            <span style={{
              display: 'inline-block',
              padding: '10px 15px',
              borderRadius: '20px',
              backgroundColor: msg.sender === 'user' ? '#d1e7dd' : '#e7e9f0',
              maxWidth: '70%'
            }}>
              {msg.text}
            </span>
          </div>
        ))}

        {/* Service buttons */}
        {serviceOptionsVisible && (
          <div className="mb-3" style={{ textAlign: 'center' }}>
            <p>Please select your service:</p>
            {services.map((service, index) => (
              <button
                key={index}
                className="btn btn-outline-success m-1"
                onClick={() => handleServiceClick(service)}
              >
                {service}
              </button>
            ))}
          </div>
        )}

        {ticketStatus && <p className="text-success">{ticketStatus}</p>}
      </div>

      <div style={{
        borderTop: '1px solid #ccc',
        padding: '15px',
        background: '#fff'
      }}>
        <input
          value={inputText}
          onChange={e => setInputText(e.target.value)}
          type="text"
          placeholder="Type your message..."
          className="form-control d-inline-block"
          style={{ width: '80%', marginRight: '10px' }}
        />
        <button className="btn btn-success" onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}

export default ChatInterface;
