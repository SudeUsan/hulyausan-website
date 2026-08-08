# Hülya Uşan – Sanat Portfolyosu

Basit, statik (sunucu gerektirmeyen) bir web sitesi. HTML + CSS + biraz JavaScript.

## Klasör Yapısı

```
index.html          → Ana Sayfa (TR)
biyografi.html       → Biyografi (TR)
eserler.html         → Eserler (TR, kategorilere göre filtrelenebilir galeri)
iletisim.html        → İletişim (TR)

en/index.html        → Home (EN)
en/biography.html    → Biography (EN)
en/works.html        → Works (EN)
en/contact.html       → Contact (EN)

css/style.css        → Tüm görsel stil (her iki dil de aynı dosyayı kullanır)
js/script.js         → Mobil menü + galeri filtresi + scroll animasyonları + lightbox

ebru/                 → Ebru eseri fotoğrafları
kat-i/                 → Kat'ı eseri fotoğrafları
geleneksel-cilt/       → Geleneksel cilt eseri fotoğrafları
sulu boya/             → Sulu boya eseri fotoğrafları
yagli-boya/            → Yağlı boya eseri fotoğrafları
```

Kategoriler, Hülya Hanım'ın biyografisinde geçen beş sanat dalıyla birebir
eşleşiyor: Ebru, Kat'ı, Geleneksel Cilt, Sulu Boya, Yağlı Boya.

Site iki dilli: her TR sayfasının sağ üstünde bir **EN** düğmesi, her EN
sayfasının sağ üstünde bir **TR** düğmesi var ve karşılık gelen sayfaya
götürüyor (ör. `biyografi.html` ↔ `en/biography.html`).
`en/` klasöründeki sayfalar `../css/style.css`, `../js/script.js` ve
`../ebru` gibi klasörleri bir üst dizinden referans alıyor — görsel
eklerken yolun başına `../` koymayı unutmayın.

## Fotoğraf Eklemek

1. Fotoğrafı ilgili kategori klasörüne koyun (ör. `ebru/lale-deseni.jpg`).
2. `eserler.html` içinde o kategoriye ait bir `.work-card` bloğunu kopyalayın.
3. İçindeki yorum satırını (`<!-- <img ... -->`) gerçek bir `<img>` etiketine
   çevirin ve `src` yolunu fotoğrafın adına göre ayarlayın:

   ```html
   <div class="thumb">
     <img src="ebru/lale-deseni.jpg" alt="Ebru eseri">
   </div>
   ```

   Not: Eserlerin ayrı isimleri/başlıkları gösterilmiyor — kartlar sadece
   fotoğraftan oluşuyor. `data-category` değeri filtrenin doğru çalışması
   için kalmalı.

> Not: `sulu boya` klasör adında boşluk var. HTML içinde yol yazarken
> boşluk yerine `%20` kullanın: `sulu%20boya/dosya.jpg`
> (İsterseniz klasörü `sulu-boya` olarak yeniden adlandırıp linkleri
> güncellemek daha temiz olur — ileride birlikte yapabiliriz.)

Ana sayfadaki 5 kategori kartına ve biyografi sayfasındaki fotoğrafa da
aynı mantıkla görsel ekleyebilirsiniz (ilgili HTML dosyalarında yorum
satırları yol gösteriyor).

## Etkileşim / Animasyonlar

- **Lightbox:** Bir `.work-card` içine gerçek bir `<img>` eklediğiniz anda,
  o fotoğrafa tıklandığında otomatik olarak tam ekran büyütülmüş halde
  açılır (ok tuşlarıyla veya oklara tıklayarak diğer eserlere geçilebilir,
  Esc ile kapanır). Ekstra bir şey yapmanıza gerek yok — `js/script.js`
  sayfadaki gerçek fotoğrafları kendisi bulup etkinleştiriyor.
- **Scroll'da belirme:** Bölümler ve galeri kartları sayfa kaydırıldıkça
  yumuşakça belirir. Yeni bir bölüm eklerken `class="reveal"` (tek eleman)
  ya da `class="reveal-group"` (kartların olduğu bir kapsayıcı — içindeki
  her çocuk otomatik olarak kademeli gecikmeyle belirir) ekleyerek bu
  efekti kullanabilirsiniz.
- **Hover yakınlaştırma:** Eser ve kategori fotoğraflarının üzerine
  gelindiğinde hafif bir yakınlaştırma efekti oluşur.
- Tüm animasyonlar, kullanıcının işletim sisteminde "hareketi azalt"
  (reduced motion) ayarı açıksa otomatik olarak devre dışı kalır.

## Yerel Önizleme

`index.html` dosyasına çift tıklayıp tarayıcıda açmanız yeterli.
(Daha sağlıklı bir önizleme için VS Code'da "Live Server" eklentisi de kullanılabilir.)

## Yayınlama (Vercel)

1. Bu klasörü bir GitHub deposuna yükleyin.
2. vercel.com üzerinden depoyu bağlayın → "Other/Static" proje olarak
   otomatik algılanır, build ayarı gerekmez.
3. Her `git push` sonrası site otomatik güncellenir.

## Yapılacaklar

- [x] Gerçek biyografi metni eklendi (TR + EN, `biyografi.html` / `en/biography.html`)
- [x] Kategoriler biyografi metniyle uyumlu hale getirildi (Ebru, Kat'ı, Geleneksel Cilt, Sulu Boya, Yağlı Boya)
- [ ] Her kategoriye gerçek eser fotoğraflarını ekle
- [ ] Gerçek iletişim bilgilerini (e-posta, telefon, sosyal medya) gir
- [ ] Hero (ana sayfa üst görsel) için bir eser fotoğrafı seç
- [ ] Biyografi sayfası için bir fotoğraf ekle
- [ ] İletişim formunu gerçekten çalışır hale getir (ör. Formspree)
- [ ] Bir alan adı seç ve satın al (ör. hulyausan.com)
