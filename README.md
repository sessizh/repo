# 💧 WaterTrackerApp

**WaterTrackerApp**, kullanıcıların günlük su tüketimini takip edebileceği mobil tabanlı bir uygulamadır.  
React Native kullanılarak geliştirilmiş mobil uygulama, PHP ve MySQL destekli backend üzerinden veri alışverişi yapar.

---

## 🚀 Özellikler

- 🔐 Kullanıcı Girişi ve Kayıt Sistemi
- 🧮 Günlük toplam içilen suyu gösterme
- ➕ Su ekleme işlemi
- 📋 Son 10 su içme kaydını gösterme
- 🚪 Güvenli çıkış işlemi

---

## ⚙️ Kullanılan Teknolojiler

| Katman | Teknoloji | Açıklama |
|--------|-----------|----------|
| Mobil  | React Native `v0.75.3` | Uygulama arayüzü ve kullanıcı işlemleri |
| Backend | PHP `v8.2.12` | API endpoint'leri |
| Veritabanı | MySQL | `water_logs` tablosu ile veri saklama |
| Sunucu | XAMPP `v8.2.x` | Apache + MySQL server |

---

## 📦 Kurulan React Native Paketleri

```bash
npm install @react-navigation/native
npm install @react-navigation/native-stack
npm install @react-native-async-storage/async-storage
npm install axios

npx pod-install  # iOS için

