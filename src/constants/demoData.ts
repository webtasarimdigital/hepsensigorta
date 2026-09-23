export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  readingTime: string;
  date: string;
  author: string;
  featuredImage: string;
}

export interface AnnouncementItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  isFeatured: boolean;
  date: string;
}

export const DEMO_BLOG_POSTS: BlogPost[] = [
  {
    id: "1",
    title: "BES Nedir ve Nasıl Çalışır? 2026 Yılı Kapsamlı Rehberi",
    slug: "bes-nedir-nasil-calisir-rehber",
    excerpt: "Bireysel Emeklilik Sistemi'nin temel mantığı, devlet katkısının işleyişi ve uzun vadeli tasarrufun önemi hakkında sade ve anlaşılır bir rehber.",
    readingTime: "5 dk",
    date: "14 Mart 2026",
    author: "Merve DOĞAN",
    category: "Bireysel Emeklilik",
    featuredImage: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=1200&q=80",
    content: `
Bireysel Emeklilik Sistemi (BES), çalışma hayatınız boyunca düzenli tasarruf yaparak emeklilik döneminizde mevcut refah seviyenizi korumanıza yardımcı olan özel bir birikim sistemidir.

### BES'in Temel Mantığı Nedir?
Kamu sosyal güvenlik sisteminin sunduğu emeklilik maaşı çoğu zaman çalışma dönemindeki aktif gelirin gerisinde kalabilmektedir. BES, bu açığı kapatmak amacıyla katılımcıların küçük veya büyük düzenli tasarruflarını profesyonel fonlarda biriktirip nemalandırmasını sağlar.

### Devlet Katkısı Avantajı
BES'i klasik tasarruf araçlarından ayıran en önemli unsur devlet katkısı mekanizmasıdır. Yatırılan her katkı payına yasal mevzuat sınırları dahilinde devlet katkısı eklenir. Bu katkı payı devlet tarafından ayrı bir hesapta değerlendirilir ve sistemde kalma süresine göre hak ediş kazanılır.

### Fon Seçimi Neden Önemlidir?
Birikimleriniz sadece nakit olarak durmaz; Sermaye Piyasası Kurulu gözetiminde uzman portföy yönetim şirketlerinin yönettiği emeklilik yatırım fonlarında değerlendirilir. Yaşınıza, getiri beklentinize ve risk profilinize göre altın, hisse senedi, kamu borçlanma araçları veya karma fonlar arasında dağılım yapabilirsiniz.

### Uzman Desteği Neden Gereklidir?
İnternette çok fazla teknik bilgi bulunuyor. Doğru fon dağılımı yapmak, yılda 12 kez olan değişiklik hakkını yerinde kullanmak ve piyasa döngülerine göre pozisyon almak profesyonel bir bakış açısı gerektirir. Hepsen Sigorta olarak biz, BES sözleşmenizin her aşamasında yanınızda yer alıyoruz.
`
  },
  {
    id: "2",
    title: "Hayat Sigortası Neden Önemlidir? Ailenizi Finansal Risklerden Korumanın Yolları",
    slug: "hayat-sigortasi-neden-onemlidir",
    excerpt: "Hayat sigortası yalnızca bir masraf kalemi değil, geride kalan sevdiklerinizin geleceğini teminat altına alan kritik bir güvenlik kalkanıdır.",
    readingTime: "4 dk",
    date: "28 Şubat 2026",
    author: "Merve DOĞAN",
    category: "Hayat Sigortası",
    featuredImage: "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1200&q=80",
    content: `
Hayatın güzel anları kadar beklenmedik riskleri de var. Hayat sigortası, aile reisi ya da evin temel gelirini sağlayan kişinin vefatı, kritik bir hastalığa yakalanması veya kaza sonucu malul kalması durumunda ailenin finansal açıdan zor durumda kalmasını engeller.

### Kimler Hayat Sigortası Yaptırmalı?
Eğer ailenizin geçimini siz sağlıyorsanız, çocuklarınızın eğitim masrafları devam ediyorsa ya da üzerinizde konut kredisi gibi uzun vadeli borçlar bulunuyorsa, hayat sigortası bir lüks değil temel bir sorumluluktur.

### Vergi Avantajı
Gelir Vergisi Kanunu uyarınca, ödediğiniz hayat sigortası primlerini brüt ücretinizin veya beyan edilen gelirinizin belirli bir oranına kadar vergi matrahınızdan indirebilirsiniz. Bu da poliçenin fiili maliyetini ciddi oranda düşürür.

### Poliçe Seçerken Nelere Dikkat Edilmeli?
Doğru teminat tutarının belirlenmesi ilk kuraldır. Gereğinden düşük bir teminat sevdiklerinizi korumaya yetmeyebilirken, aşırı yüksek teminatlar bütçenizi zorlayabilir. İhtiyaç analizi yaparak ideal limitin belirlenmesi en doğru yaklaşımdır.
`
  },
  {
    id: "3",
    title: "Tamamlayıcı Sağlık Sigortası (TSS) Seçerken Bilmeniz Gereken 5 Önemli Nokta",
    slug: "tamamlayici-saglik-sigortasi-secimi-rehberi",
    excerpt: "SGK fark ücreti ödemeden özel hastanelerde kaliteli sağlık hizmeti almanın püf noktaları ve dikkat edilmesi gereken detaylar.",
    readingTime: "6 dk",
    date: "12 Şubat 2026",
    author: "Merve DOĞAN",
    category: "Sağlık Sigortası",
    featuredImage: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80",
    content: `
Tamamlayıcı Sağlık Sigortası (TSS), özel hastanelerde hekim muayenesi, tahlil, tetkik ve ameliyat ihtiyaçlarında cebinizden yüklü fark ücretleri çıkmasını engelleyen en popüler sigorta türlerinden biridir.

### 1. Anlaşmalı Hastane Ağı
Poliçe satın almadan önce evinizin ve iş yerinizin yakınında bulunan, sıkça tercih ettiğiniz özel hastanelerin sigorta şirketinin TSS ağına dahil olup olmadığını kontrol edin. Allianz, Türkiye genelinde son derece yaygın bir anlaşmalı sağlık ağına sahiptir.

### 2. Yatarak ve Ayakta Tedavi Kapsamı
Yalnızca yatarak tedavi (ameliyat, yoğun bakım) teminatı içeren poliçeler daha uygundur; ancak yılda 8-10 adet muayene ve ilişkili tahlilleri kapsayan ayakta tedavi modülü günlük sağlık ihtiyaçları için büyük kolaylık sağlar.

### 3. Bekleme Süreleri
Tüm sağlık sigortalarında olduğu gibi belirli planlı operasyonlar (örneğin safra kesesi, bademcik veya fıtık ameliyatları) için 3 ila 12 ay arası bekleme süreleri bulunabilir. Poliçenizi henüz sağlıklıyken yaptırmak bu nedenle hayatidir.

### 4. Aile İndirimleri
Eşiniz veya çocuklarınızla birlikte aynı poliçe çatısı altında yer alarak aile indirimlerinden faydalanabilirsiniz.
`
  },
  {
    id: "4",
    title: "Çocuklar İçin 18 Yaş Altı BES: Erken Başlamanın Matematiksel Gücü",
    slug: "cocuklar-icin-18-yas-alti-bes",
    excerpt: "Çocuğunuz adına açılacak BES hesabı ile üniversite, evlilik veya iş kurma döneminde güçlü bir birikim hazırlamanın avantajları.",
    readingTime: "4 dk",
    date: "25 Ocak 2026",
    author: "Merve DOĞAN",
    category: "Bireysel Emeklilik",
    featuredImage: "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?auto=format&fit=crop&w=1200&q=80",
    content: `
18 yaşından küçük bireylerin de Bireysel Emeklilik Sistemi'ne (BES) dahil olabilmesi, ailelerin çocukları için uzun vadeli eğitim ve gelecek fonu oluşturmalarında devrim niteliğinde bir adım oldu.

### Neden Erken Başlamalı?
Finans dünyasındaki bileşik getiri gücü zamanla doğru orantılıdır. Çocuğunuz 1 yaşında iken başlatacağınız küçük katkı payları, üniversite çağına geldiğinde 17-18 yıllık getiri ve devlet katkısı birikimiyle muazzam bir eğitim fonuna dönüşebilir.

### Anne ve Babanın Bağımsız Katkısı
Çocuk adına açılan hesap anne ve babanın kendi BES limitlerinden bağımsızdır. Dolayısıyla çocuk kendi adına tam devlet katkısı limitinden yararlanma hakkına sahiptir.
`
  }
];

export const DEMO_ANNOUNCEMENTS: AnnouncementItem[] = [
  {
    id: "1",
    title: "18 Yaş Altı BES Sözleşmelerinde Çocuklara Özel Avantajlar Devam Ediyor",
    slug: "18-yas-alti-bes-avantajlari",
    excerpt: "Çocuklarınızın geleceğini bugünden teminat altına alabileceğiniz 18 yaş altı BES sözleşmelerinde danışmanlık hizmetimizle yanınızdayız.",
    date: "10 Mart 2026",
    isFeatured: true,
    content: "18 yaşından küçük çocuklarınız için açabileceğiniz bağımsız BES hesaplarıyla geleceğin eğitim masraflarını şimdiden planlayabilirsiniz. Detaylı bilgi ve fon dağılım seçenekleri için ofisimizle iletişime geçebilirsiniz."
  },
  {
    id: "2",
    title: "Mevcut BES Sözleşmeleriniz İçin Ücretsiz Fon Dağılım İncelemesi",
    slug: "ucretsiz-fon-dagilimi-incelemesi",
    excerpt: "Başka bir kurumda bulunan BES sözleşmenizin fon dağılımını uzman gözüyle değerlendiriyor, piyasa koşullarına göre seçenekleri paylaşıyoruz.",
    date: "24 Şubat 2026",
    isFeatured: true,
    content: "Mevcut Bireysel Emeklilik sözleşmenizin hangi fonlarda değerlendirildiğini öğrenmek ve risk profilinize uygun öneriler almak için randevu oluşturabilirsiniz."
  },
  {
    id: "3",
    title: "Sağlık Sigortalarında Aile İndirimi Fırsatları",
    slug: "saglik-sigortasi-aile-indirimi",
    excerpt: "Tamamlayıcı ve Özel Sağlık Sigortalarında tüm aile bireylerini kapsayan avantajlı poliçe seçenekleri sunulmaktadır.",
    date: "15 Ocak 2026",
    isFeatured: false,
    content: "Özel hastanelerde yüksek fark ücretleri ödemeden sağlığınızı koruyun. Aile bireylerinize özel indirimler ve anlaşmalı hastane ağımız hakkında bilgi almak için bize ulaşın."
  }
];

export const TRUST_BAR_ITEMS = [
  {
    icon: "ShieldCheck",
    title: "Allianz Yetkili Acentesi",
    description: "Bireysel Emeklilik, Hayat ve Sağlık alanında resmi acente güvencesi"
  },
  {
    icon: "Users",
    title: "Kişiye Özel İhtiyaç Analizi",
    description: "Ezbere paketler değil, bütçenize ve hedefinize tam uyan çözümler"
  },
  {
    icon: "MapPin",
    title: "İstanbul'da Yüz Yüze Görüşme",
    description: "Kadıköy Kozyatağı ofisimizde çay eşliğinde detaylı bilgilendirme"
  },
  {
    icon: "Globe",
    title: "Türkiye Geneli Uzaktan Destek",
    description: "Telefon, WhatsApp ve online görüşmelerle kesintisiz danışmanlık"
  },
  {
    icon: "Clock",
    title: "Hızlı & Şeffaf Geri Dönüş",
    description: "Talebiniz sonrasında en kısa sürede net ve anlaşılır bilgilendirme"
  }
];

export const WHY_HEPSEN_ITEMS = [
  {
    icon: "MessageSquare",
    title: "Kişisel ve Birebir İletişim",
    description: "Müşteri temsilcisi bant kayıtlarıyla değil; Fon Yöneticisi Merve Doğan ve uzman ekibimizle doğrudan, kişisel iletişim kurarsınız."
  },
  {
    icon: "Target",
    title: "İhtiyaç Odaklı Yaklaşım",
    description: "Amacımız hızlıca ürün satmak değil; öncelikle mevcut durumunuzu, bütçenizi ve gelecekteki hedeflerinizi doğru şekilde anlamaktır."
  },
  {
    icon: "Compass",
    title: "Anlaşılır ve Şeffaf Bilgilendirme",
    description: "Sigorta ve fon terimlerinin karmaşık dünyasını sadeleştiriyoruz. Neye, neden prim ödediğinizi net olarak bilirsiniz."
  },
  {
    icon: "Repeat",
    title: "Süreç Boyunca Yanınızdayız",
    description: "Poliçeniz kesildiğinde işimiz bitmez. Fon dağılım değişikliklerinde, sağlık tazminatlarında ve yenileme dönemlerinde daima arkanızdayız."
  },
  {
    icon: "Building",
    title: "İstanbul Kozyatağı & Uzaktan Seçenek",
    description: "Dileyen danışanlarımızla Kozyatağı'nda yüz yüze, şehir dışındaki danışanlarımızla ise online ve telefonla düzenli iletişim yürütüyoruz."
  },
  {
    icon: "Award",
    title: "Allianz'ın Güçlü Altyapısı",
    description: "Dünyanın ve Türkiye'nin en köklü finans ve sigorta devlerinden Allianz'ın güvencesi ve hızlı provizyon altyapısıyla hizmet veriyoruz."
  }
];

export const HOW_IT_WORKS_STEPS = [
  {
    step: "01",
    title: "İhtiyacınızı Paylaşın",
    description: "Web sitemizdeki hızlı teklif formundan veya WhatsApp üzerinden ilgilendiğiniz hizmeti ve temel bilgilerinizi iletin."
  },
  {
    step: "02",
    title: "Sizin İçin Seçenekleri Değerlendirelim",
    description: "Bütçenize, ailenizin yapısına ve beklentinize en uygun BES fonlarını veya sigorta alternatiflerini hazırlayalım."
  },
  {
    step: "03",
    title: "Detayları Birlikte İnceleyelim",
    description: "Yüz yüze veya telefonla tüm teminatları, devlet katkısını ve prim detaylarını şeffafça ele alalım."
  },
  {
    step: "04",
    title: "Başvuru ve Sonraki Süreçte Yanınızdayız",
    description: "Allianz güvencesiyle poliçenizi başlatalım; fon takibi ve yenilemelerde düzenli danışmanlığa devam edelim."
  }
];

export const GENERAL_FAQS = [
  {
    question: "Hepsen Sigorta hangi alanlarda hizmet veriyor?",
    answer: "Hepsen Sigorta; Allianz Yetkili Acentesi olarak Bireysel Emeklilik Sistemi (BES), Hayat Sigortası, Sağlık Sigortası (Tamamlayıcı ve Özel) ve bireysel tasarruf planlaması alanlarında profesyonel danışmanlık hizmeti sunmaktadır."
  },
  {
    question: "Mevcut BES sözleşmem için danışmanlık alabilir miyim?",
    answer: "Evet, başka bir kurumda veya bankada devam eden BES sözleşmelerinizin fon dağılım performansını birlikte inceleyebilir, mevzuatın tanıdığı fon dağılım hakkınızı en verimli şekilde değerlendirmeniz için destek verebiliriz."
  },
  {
    question: "İstanbul dışında yaşıyorum, hizmet alabilir miyim?",
    answer: "Kesinlikle. Danışanlarımızın önemli bir kısmına telefon, WhatsApp ve online görüşme araçları üzerinden Türkiye'nin dört bir yanından kesintisiz danışmanlık sunuyoruz."
  },
  {
    question: "Teklif ve ön bilgilendirme görüşmesi ücretli mi?",
    answer: "Hayır. Hepsen Sigorta bünyesinde gerçekleştirdiğimiz ilk ihtiyaç analizi, teklif hazırlama ve ön bilgilendirme görüşmelerimiz tamamen ücretsizdir."
  },
  {
    question: "Sağlık sigortası için nasıl teklif alabilirim?",
    answer: "Sitemizdeki hızlı teklif formunu doldurarak veya WhatsApp hattımızdan bize ulaşarak doğum yılınız, ikamet şehriniz ve SGK durumunuzla birlikte birkaç dakika içinde teklif alabilirsiniz. Formda özel sağlık geçmişiniz sorulmaz; kişiye özel detaylar yetkili danışmanımızla güvenli görüşmede değerlendirilir."
  },
  {
    question: "Ofisiniz nerede ve yüz yüze görüşebilir miyiz?",
    answer: "Ofisimiz İstanbul Anadolu Yakası'nda, Kadıköy Kozyatağı'nda (Baytur Kozyatağı Konutları) yer almaktadır. Randevu alarak ofisimizde yüz yüze görüşme sağlayabilirsiniz."
  }
];
