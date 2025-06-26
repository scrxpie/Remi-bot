const mongoose = require("mongoose");

const reminderSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },

  hunt: {
    enabled: { type: Boolean, default: false },
    message: { type: String, default: null }, // Eğer null ise sunucu mesajı kullanılacak
    respond: { type: Boolean, default: true },
    autoDelete: { type: Boolean, default: false }
  }

  // İlerde başka hatırlatıcılar da buraya eklenebilir: battle, pray, customReminder vs.
});

module.exports = mongoose.model("Reminder", reminderSchema);
