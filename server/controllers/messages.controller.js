const pool = require('../config/db');

exports.listChats = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const [chats] = await pool.query(`
      SELECT c.*,
        CASE WHEN c.participant_one = ? THEN c.participant_two ELSE c.participant_one END as contact_id
      FROM chats c
      WHERE c.participant_one = ? OR c.participant_two = ?
      ORDER BY c.updated_at DESC
    `, [userId, userId, userId]);

    const result = [];
    for (const chat of chats) {
      const [contacts] = await pool.query('SELECT id, first_name, last_name, avatar, initials FROM users WHERE id = ?', [chat.contact_id]);
      const [lastMsg] = await pool.query('SELECT text, created_at FROM messages WHERE chat_id = ? ORDER BY created_at DESC LIMIT 1', [chat.id]);
      const [[{ unread }]] = await pool.query('SELECT COUNT(*) as unread FROM messages WHERE chat_id = ? AND sender_id != ? AND is_read = FALSE', [chat.id, userId]);

      const contact = contacts[0];
      result.push({
        id: chat.id,
        contact: {
          id: contact.id,
          name: `${contact.first_name} ${contact.last_name}`,
          avatar: contact.avatar,
          initials: contact.initials,
        },
        lastMessage: lastMsg.length ? lastMsg[0].text : null,
        lastMessageTime: lastMsg.length ? lastMsg[0].created_at : null,
        unreadCount: unread,
      });
    }

    res.json({ success: true, chats: result });
  } catch (err) {
    next(err);
  }
};

exports.getMessages = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    // Verify participant
    const [chats] = await pool.query('SELECT * FROM chats WHERE id = ? AND (participant_one = ? OR participant_two = ?)', [id, userId, userId]);
    if (!chats.length) return res.status(403).json({ success: false, message: 'Not a participant' });

    const [messages] = await pool.query(`
      SELECT m.*, u.first_name, u.last_name, u.avatar, u.initials
      FROM messages m
      LEFT JOIN users u ON m.sender_id = u.id
      WHERE m.chat_id = ?
      ORDER BY m.created_at ASC
    `, [id]);

    res.json({
      success: true,
      messages: messages.map((m) => ({
        id: m.id,
        text: m.text,
        isRead: !!m.is_read,
        createdAt: m.created_at,
        from: m.sender_id === userId ? 'me' : 'them',
        sender: {
          id: m.sender_id,
          name: `${m.first_name} ${m.last_name}`,
          avatar: m.avatar,
          initials: m.initials,
        },
      })),
    });
  } catch (err) {
    next(err);
  }
};

exports.createChat = async (req, res, next) => {
  try {
    const { participantId } = req.body;
    const userId = req.user.id;

    const p1 = Math.min(userId, participantId);
    const p2 = Math.max(userId, participantId);

    // Check existing
    const [existing] = await pool.query('SELECT id FROM chats WHERE participant_one = ? AND participant_two = ?', [p1, p2]);
    if (existing.length) {
      return res.json({ success: true, chatId: existing[0].id });
    }

    const [result] = await pool.query('INSERT INTO chats (participant_one, participant_two) VALUES (?, ?)', [p1, p2]);
    res.status(201).json({ success: true, chatId: result.insertId });
  } catch (err) {
    next(err);
  }
};

exports.sendMessage = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { text } = req.body;
    const userId = req.user.id;

    const [chats] = await pool.query('SELECT * FROM chats WHERE id = ? AND (participant_one = ? OR participant_two = ?)', [id, userId, userId]);
    if (!chats.length) return res.status(403).json({ success: false, message: 'Not a participant' });

    const [result] = await pool.query('INSERT INTO messages (chat_id, sender_id, text) VALUES (?, ?, ?)', [id, userId, text]);
    await pool.query('UPDATE chats SET updated_at = NOW() WHERE id = ?', [id]);

    res.status(201).json({ success: true, messageId: result.insertId });
  } catch (err) {
    next(err);
  }
};

exports.markRead = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    await pool.query('UPDATE messages SET is_read = TRUE WHERE chat_id = ? AND sender_id != ?', [id, userId]);
    res.json({ success: true, message: 'Messages marked as read' });
  } catch (err) {
    next(err);
  }
};
