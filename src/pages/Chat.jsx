import { useState, useRef, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { colors, borderRadius, shadows } from "../constants/theme";
import api from "../api/client";

// ── Sample Data ──
const CONTACTS = [
  { id: 1, name: "Sarah Johnson", avatar: "https://i.pravatar.cc/40?img=21", online: true, lastMsg: "Sure, I'll send the files today!", time: "2m ago", unread: 2 },
  { id: 2, name: "Raj Patel", avatar: "https://i.pravatar.cc/40?img=33", online: true, lastMsg: "The project looks great so far", time: "15m ago", unread: 0 },
  { id: 3, name: "Emily Chen", avatar: "https://i.pravatar.cc/40?img=25", online: false, lastMsg: "Can we discuss the pricing?", time: "1h ago", unread: 1 },
  { id: 4, name: "Ahmed Hassan", avatar: "https://i.pravatar.cc/40?img=53", online: false, lastMsg: "Thanks for the delivery!", time: "3h ago", unread: 0 },
  { id: 5, name: "Lisa Mueller", avatar: "https://i.pravatar.cc/40?img=44", online: true, lastMsg: "I need a revision on the logo", time: "5h ago", unread: 0 },
  { id: 6, name: "Bikash Thapa", avatar: "https://i.pravatar.cc/40?img=60", online: false, lastMsg: "Let me check and get back to you", time: "1d ago", unread: 0 },
];

const MESSAGES = {
  1: [
    { id: 1, from: "them", text: "Hi! I saw your gig for promo videos. Can you do one for my app?", time: "10:00 AM" },
    { id: 2, from: "me", text: "Hello Sarah! Absolutely, I'd love to help. Could you share some details about your app?", time: "10:02 AM" },
    { id: 3, from: "them", text: "It's a fitness tracking app. I need a 60-second promo video with animations.", time: "10:05 AM" },
    { id: 4, from: "me", text: "Sounds great! I can do that with the Standard package. It includes multiple device mockups and 1080HD.", time: "10:07 AM" },
    { id: 5, from: "them", text: "Perfect! What do you need from me to get started?", time: "10:10 AM" },
    { id: 6, from: "me", text: "I'll need your logo, app screenshots, brand colors, and any text you want in the video.", time: "10:12 AM" },
    { id: 7, from: "them", text: "Sure, I'll send the files today!", time: "10:15 AM" },
  ],
  2: [
    { id: 1, from: "them", text: "Hey, just wanted to check on the progress of my website promo.", time: "9:30 AM" },
    { id: 2, from: "me", text: "Hi Raj! I'm about 70% done. Should have a draft for you by tomorrow.", time: "9:35 AM" },
    { id: 3, from: "them", text: "The project looks great so far", time: "9:40 AM" },
  ],
  3: [
    { id: 1, from: "them", text: "Hi, I'm interested in the premium package but the price is a bit high for me.", time: "Yesterday" },
    { id: 2, from: "me", text: "I understand! I can offer a small discount for first-time clients. Would 10% off work?", time: "Yesterday" },
    { id: 3, from: "them", text: "Can we discuss the pricing?", time: "Yesterday" },
  ],
  4: [
    { id: 1, from: "me", text: "Your video is ready! Please check the delivery and let me know if you need any changes.", time: "Yesterday" },
    { id: 2, from: "them", text: "Thanks for the delivery!", time: "Yesterday" },
  ],
  5: [
    { id: 1, from: "them", text: "I need a revision on the logo", time: "Today" },
  ],
  6: [
    { id: 1, from: "me", text: "Hi Bikash, did you get a chance to review the draft?", time: "Yesterday" },
    { id: 2, from: "them", text: "Let me check and get back to you", time: "Yesterday" },
  ],
};

// ── Icons ──
const SendIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

const AttachIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={colors.gray[400]} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
  </svg>
);

const EmojiIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={colors.gray[400]} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><line x1="9" y1="9" x2="9.01" y2="9" /><line x1="15" y1="9" x2="15.01" y2="9" />
  </svg>
);

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={colors.gray[400]} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

// ── Contact List Item ──
function ContactItem({ contact, active, onClick }) {
  return (
    <button onClick={onClick} style={{ ...st.contactItem, ...(active ? st.contactItemActive : {}) }}>
      <div style={{ position: "relative", flexShrink: 0 }}>
        <img src={contact.avatar} alt={contact.name} style={st.contactAvatar} />
        {contact.online && <div style={st.onlineDot} />}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={st.contactTop}>
          <span style={{ ...st.contactName, ...(active ? { color: colors.primary } : {}) }}>{contact.name}</span>
          <span style={st.contactTime}>{contact.time}</span>
        </div>
        <div style={st.contactBottom}>
          <span style={st.contactLastMsg}>{contact.lastMsg}</span>
          {contact.unread > 0 && <span style={st.unreadBadge}>{contact.unread}</span>}
        </div>
      </div>
    </button>
  );
}

// ── Message Bubble ──
function MessageBubble({ msg }) {
  const isMe = msg.from === "me";
  return (
    <div style={{ display: "flex", justifyContent: isMe ? "flex-end" : "flex-start", marginBottom: 12 }}>
      <div style={{ ...st.bubble, ...(isMe ? st.bubbleMe : st.bubbleThem) }}>
        <p style={st.bubbleText}>{msg.text}</p>
        <span style={{ ...st.bubbleTime, ...(isMe ? { color: "rgba(255,255,255,0.65)" } : {}) }}>{msg.time}</span>
      </div>
    </div>
  );
}

// ── Main Chat Page ──
export default function Chat() {
  const [activeContact, setActiveContact] = useState(1);
  const [search, setSearch] = useState("");
  const [input, setInput] = useState("");
  const [contacts, setContacts] = useState(CONTACTS);
  const [messages, setMessages] = useState(MESSAGES);
  const messagesContainerRef = useRef(null);

  useEffect(() => {
    api.get('/chats').then((data) => {
      if (data.chats?.length) {
        setContacts(data.chats.map((c) => ({
          id: c.id,
          name: c.otherUser?.name || c.name,
          avatar: c.otherUser?.avatar || `https://i.pravatar.cc/40?img=${c.id}`,
          online: c.otherUser?.online || false,
          lastMsg: c.lastMessage || "",
          time: c.lastMessageTime || "",
          unread: c.unreadCount || 0,
        })));
        if (data.chats[0]) setActiveContact(data.chats[0].id);
      }
    }).catch(() => {});
  }, []);

  const scrollToBottom = () => {
    const el = messagesContainerRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeContact, messages]);

  const filteredContacts = contacts.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const currentContact = contacts.find((c) => c.id === activeContact);
  const currentMessages = messages[activeContact] || [];

  const handleSend = () => {
    if (!input.trim()) return;
    const newMsg = {
      id: Date.now(),
      from: "me",
      text: input.trim(),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages((prev) => ({
      ...prev,
      [activeContact]: [...(prev[activeContact] || []), newMsg],
    }));
    setInput("");
    api.post(`/chats/${activeContact}/messages`, { text: input.trim() }).catch(() => {});
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div style={st.page}>
      <Header />

      <div style={st.container}>
        <div style={st.chatLayout}>
          {/* ── Sidebar ── */}
          <div style={st.sidebar}>
            {/* Search */}
            <div style={st.searchBox}>
              <SearchIcon />
              <input
                type="text"
                placeholder="Search conversations..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={st.searchInput}
              />
            </div>

            {/* Contact List */}
            <div style={st.contactList}>
              {filteredContacts.map((contact) => (
                <ContactItem
                  key={contact.id}
                  contact={contact}
                  active={activeContact === contact.id}
                  onClick={() => setActiveContact(contact.id)}
                />
              ))}
              {filteredContacts.length === 0 && (
                <div style={{ padding: 24, textAlign: "center", color: colors.gray[400], fontSize: 13 }}>
                  No conversations found
                </div>
              )}
            </div>
          </div>

          {/* ── Chat Area ── */}
          <div style={st.chatArea}>
            {/* Chat Header */}
            <div style={st.chatHeader}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ position: "relative" }}>
                  <img src={currentContact.avatar} alt={currentContact.name} style={{ width: 40, height: 40, borderRadius: "50%", objectFit: "cover" }} />
                  {currentContact.online && <div style={{ ...st.onlineDot, width: 10, height: 10, border: "2px solid white" }} />}
                </div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: colors.text.primary }}>{currentContact.name}</div>
                  <div style={{ fontSize: 12, color: currentContact.online ? colors.success : colors.gray[400] }}>
                    {currentContact.online ? "Online" : "Offline"}
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button style={st.headerAction} title="Search in chat">
                  <SearchIcon />
                </button>
                <button style={st.headerAction} title="More options">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={colors.gray[500]} strokeWidth="2" strokeLinecap="round">
                    <circle cx="12" cy="5" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="12" cy="19" r="1" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Messages */}
            <div ref={messagesContainerRef} style={st.messagesArea}>
              {currentMessages.map((msg) => (
                <MessageBubble key={msg.id} msg={msg} />
              ))}
            </div>

            {/* Input Area */}
            <div style={st.inputArea}>
              <button style={st.inputAction}><AttachIcon /></button>
              <button style={st.inputAction}><EmojiIcon /></button>
              <input
                type="text"
                placeholder="Type a message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                style={st.messageInput}
              />
              <button onClick={handleSend} disabled={!input.trim()} style={{ ...st.sendBtn, ...(input.trim() ? {} : st.sendBtnDisabled) }}>
                <SendIcon />
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

// ── Styles ──
const st = {
  page: { fontFamily: "'Segoe UI', Arial, sans-serif", background: "#fff", minHeight: "100vh" },
  container: { maxWidth: 1100, margin: "0 auto", padding: "24px 24px 60px" },

  // Layout
  chatLayout: {
    display: "flex",
    height: "calc(100vh - 220px)",
    minHeight: 500,
    border: `1px solid ${colors.gray[200]}`,
    borderRadius: borderRadius.xl,
    overflow: "hidden",
    boxShadow: shadows.md,
  },

  // ── Sidebar ──
  sidebar: {
    width: 300,
    borderRight: `1px solid ${colors.gray[200]}`,
    display: "flex",
    flexDirection: "column",
    background: colors.white,
    flexShrink: 0,
  },
  searchBox: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: "14px 16px",
    borderBottom: `1px solid ${colors.gray[200]}`,
  },
  searchInput: {
    flex: 1,
    border: "none",
    outline: "none",
    fontSize: 13,
    color: colors.text.primary,
    fontFamily: "inherit",
    background: "transparent",
  },
  contactList: {
    flex: 1,
    overflowY: "auto",
  },
  contactItem: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    width: "100%",
    padding: "14px 16px",
    border: "none",
    borderBottom: `1px solid ${colors.gray[100]}`,
    background: "white",
    cursor: "pointer",
    fontFamily: "inherit",
    textAlign: "left",
    transition: "background 0.15s",
  },
  contactItemActive: {
    background: colors.gray[50],
    borderLeft: `3px solid ${colors.primary}`,
    paddingLeft: 13,
  },
  contactAvatar: {
    width: 42,
    height: 42,
    borderRadius: "50%",
    objectFit: "cover",
  },
  onlineDot: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 10,
    height: 10,
    borderRadius: "50%",
    background: colors.success,
    border: "2px solid white",
  },
  contactTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 3,
  },
  contactName: {
    fontSize: 14,
    fontWeight: 600,
    color: colors.text.primary,
  },
  contactTime: {
    fontSize: 11,
    color: colors.gray[400],
    flexShrink: 0,
  },
  contactBottom: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
  },
  contactLastMsg: {
    fontSize: 12,
    color: colors.gray[500],
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    flex: 1,
  },
  unreadBadge: {
    background: colors.primary,
    color: "white",
    fontSize: 10,
    fontWeight: 700,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    padding: "0 5px",
  },

  // ── Chat Area ──
  chatArea: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    background: colors.gray[50],
    minWidth: 0,
  },
  chatHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 20px",
    background: "white",
    borderBottom: `1px solid ${colors.gray[200]}`,
  },
  headerAction: {
    width: 36,
    height: 36,
    borderRadius: "50%",
    border: "none",
    background: colors.gray[100],
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  },

  // Messages
  messagesArea: {
    flex: 1,
    overflowY: "auto",
    padding: "20px 24px",
  },
  bubble: {
    maxWidth: "70%",
    padding: "10px 16px",
    borderRadius: 16,
    position: "relative",
  },
  bubbleMe: {
    background: colors.primary,
    color: "white",
    borderBottomRightRadius: 4,
  },
  bubbleThem: {
    background: "white",
    color: colors.text.primary,
    borderBottomLeftRadius: 4,
    border: `1px solid ${colors.gray[200]}`,
  },
  bubbleText: {
    margin: 0,
    fontSize: 14,
    lineHeight: 1.55,
  },
  bubbleTime: {
    fontSize: 10,
    color: colors.gray[400],
    marginTop: 4,
    display: "block",
    textAlign: "right",
  },

  // Input
  inputArea: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: "12px 16px",
    background: "white",
    borderTop: `1px solid ${colors.gray[200]}`,
  },
  inputAction: {
    width: 36,
    height: 36,
    borderRadius: "50%",
    border: "none",
    background: "transparent",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    flexShrink: 0,
  },
  messageInput: {
    flex: 1,
    padding: "10px 16px",
    border: `1px solid ${colors.gray[200]}`,
    borderRadius: borderRadius.pill,
    fontSize: 14,
    color: colors.text.primary,
    outline: "none",
    fontFamily: "inherit",
    background: colors.gray[50],
  },
  sendBtn: {
    width: 40,
    height: 40,
    borderRadius: "50%",
    border: "none",
    background: colors.primary,
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    flexShrink: 0,
    transition: "opacity 0.2s",
  },
  sendBtnDisabled: {
    opacity: 0.4,
    cursor: "not-allowed",
  },
};
