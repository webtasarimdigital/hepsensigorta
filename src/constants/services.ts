export interface ServiceData {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  badge: string;
  tagline: string;
  shortDescription: string;
  heroDescription: string;
  icon: string;
  whatsappMessage: string;
  benefits: string[];
  keyHighlights: {
    title: string;
    description: string;
  }[];
  processSteps: {
    step: string;
    title: string;
    description: string;
  }[];
  whoIsItFor: string[];
  faqs: {
    question: string;
    answer: string;
  }[];
  disclaimer?: string;
}

export const SERVICES: ServiceData[] = [
  {
    id: "bireysel-emeklilik",
    slug: "bireysel-emeklilik",
    title: "Bireysel Emeklilik Sistemi (BES)",
    shortTitle: "Bireysel Emeklilik",
    badge: "Gelecek Planlaması & Birikim",
    tagline: "Küçük tasarruflarla geleceğinizi güvenceye alın, profesyonel fon yönetimiyle birikimlerinizi büyütün.",
    shortDescription: "Düzenli tasarruf alışkanlığı kazanarak devlet katkısı avantajından yararlanın, emeklilik döneminizde ek gelir güvencesi oluşturun.",
    heroDescription: "Bireysel Emeklilik Sistemi (BES), kamu sosyal güvenlik sisteminin tamamlayıcısı olarak gelecekteki yaşam standardınızı korumanızı sağlayan güvenilir bir tasarruf modelidir. Hepsen Sigorta olarak mevcut sözleşmelerinizin fon dağılımından yeni başlangıçlara kadar her adımda yanınızdayız.",
    icon: "PiggyBank",
    whatsappMessage: "Merhaba, Hepsen Sigorta web sitesinden ulaşıyorum. Bireysel Emeklilik (BES) hakkında bilgi almak ve seçenekleri değerlendirmek istiyorum.",
    benefits: [
      "Mevzuat gereği sağlanan devlet katkısı avantajı",
      "Kişisel risk profiline uygun fon karması ve dağılımı",
      "18 yaş altı çocuklar ve aile bireyleri için bağımsız BES imkanı",
      "Düzenli katkı payı değişikliği ve esnek ödeme planları",
      "Mevcut BES sözleşmelerinin uzman gözüyle incelenmesi",
      "Yılda birden fazla fon dağılım değişikliği hakkı"
    ],
    keyHighlights: [
      {
        title: "Devlet Katkısı Avantajı",
        description: "Yürürlükteki yasal mevzuat kapsamında belirlenen oranlarda devlet katkısı ile tasarruflarınız güçlenir."
      },
      {
        title: "Uzman Fon Yönetimi",
        description: "Tasarruflarınız, Sermaye Piyasası Kurulu gözetiminde uzman portföy yönetim şirketleri tarafından yönetilen fonlarda değerlendirilir."
      },
      {
        title: "Esnek Ödeme Seçenekleri",
        description: "Bütçenize göre aylık, üç aylık, altı aylık veya yıllık katkı payı belirleyebilir, dilediğinizde tutarı güncelleyebilirsiniz."
      },
      {
        title: "18 Yaş Altı Çocuklar İçin Gelecek",
        description: "Çocuklarınızın eğitimi ve geleceği için doğumdan itibaren kendi adlarına BES hesabı açarak birikime erken başlayabilirsiniz."
      }
    ],
    processSteps: [
      {
        step: "01",
        title: "İhtiyaç ve Hedef Belirleme",
        description: "Yaşınız, gelir durumunuz ve emeklilik hedefleriniz doğrultusunda tasarruf planınızı oluşturuyoruz."
      },
      {
        step: "02",
        title: "Risk Profili ve Fon Seçimi",
        description: "Dengeli, muhafazakar ya da büyüme odaklı fon seçeneklerini risk toleransınıza göre analiz ediyoruz."
      },
      {
        step: "03",
        title: "Başvuru ve Sözleşme Kurulumu",
        description: "Allianz güvencesiyle sözleşmenizi hızlı ve şeffaf adımlarla hayata geçiriyoruz."
      },
      {
        step: "04",
        title: "Periyodik Takip ve Fon Güncelleme",
        description: "Piyasa koşulları ve mevzuat değişikliklerinde fon tercihlerinizi birlikte gözden geçiriyoruz."
      }
    ],
    whoIsItFor: [
      "Emeklilik döneminde mevcut hayat standardını korumak isteyen çalışanlar",
      "Çocuklarının üniversite ve kariyer geleceğini bugünden teminat altına almak isteyen ebeveynler",
      "Mevcut BES sözleşmesi olup fon dağılımından yeterli verim alamayan katılımcılar",
      "Düzenli tasarruf disiplini kazanmak isteyen genç profesyoneller"
    ],
    faqs: [
      {
        question: "BES'e kimler katılabilir?",
        answer: "Türkiye Cumhuriyeti vatandaşı olan, mavi kart sahibi olan ve 18 yaş altı çocuklar dahil olmak üzere her birey Bireysel Emeklilik Sistemi'ne dahil olabilir."
      },
      {
        question: "Devlet katkısı nasıl işler?",
        answer: "Yatırılan katkı payı tutarına, ilgili mevzuat çerçevesinde belirlenen yasal oran doğrultusunda devlet katkısı tahakkuk ettirilir. Sistemde kalma süresine göre kademeli hak ediş kuralları uygulanır."
      },
      {
        question: "Mevcut BES sözleşmemi size taşıyabilir veya danışmanlık alabilir miyim?",
        answer: "Evet, başka bir kurumda bulunan BES sözleşmenizi Allianz güvencesine taşıyabilir veya mevcut planınızın fon dağılımını birlikte değerlendirebiliriz."
      },
      {
        question: "Fon dağılımı ne sıklıkla değiştirilebilir?",
        answer: "Mevcut yönetmelikler uyarınca katılımcılar yılda 12 defaya kadar fon dağılım oranlarını değiştirme hakkına sahiptir."
      }
    ]
  },
  {
    id: "hayat-sigortasi",
    slug: "hayat-sigortasi",
    title: "Hayat Sigortası Çözümleri",
    shortTitle: "Hayat Sigortası",
    badge: "Aile & Yaşam Güvencesi",
    tagline: "Hayatın beklenmedik sürprizlerine karşı sevdiklerinizin finansal geleceğini şimdiden koruma altına alın.",
    shortDescription: "Vefat, kritik hastalık veya maluliyet gibi beklenmedik durumlarda ailenizin yaşam standardını ve kredi yükümlülüklerini güvenceye alın.",
    heroDescription: "Hayat Sigortası, ailenizin ve sevdiklerinizin yarınlarını güvence altına almanın en sorumlu adımıdır. Beklenmedik bir kayıp, sakatlık ya da ciddi bir sağlık sorunu durumunda ailenizin yaşam kalitesinin kesintiye uğramamasını sağlar.",
    icon: "HeartHandshake",
    whatsappMessage: "Merhaba, Hepsen Sigorta web sitesinden ulaşıyorum. Hayat Sigortası hakkında bilgi almak ve teklif değerlendirmek istiyorum.",
    benefits: [
      "Ailenin eğitim ve yaşam giderlerini teminat altına alma",
      "Kredi ve borç yükümlülüklerine karşı koruma kalkanı",
      "Kritik hastalıklar ve kaza sonucu maluliyet teminatları",
      "Ödenen primlerin gelir vergisi matrahından indirilebilme avantajı",
      "Poliçe süresi ve teminat tutarlarının ihtiyaca göre esnek belirlenmesi",
      "Allianz'ın küresel finansal gücü ve güvenilir tazminat ödeme altyapısı"
    ],
    keyHighlights: [
      {
        title: "Aileniz İçin Güvenlik Ağı",
        description: "Vefat teminatı sayesinde geride kalan sevdiklerinizin kira, eğitim ve temel ihtiyaçları güvence altına alınır."
      },
      {
        title: "Kritik Hastalık Koruması",
        description: "Kanser, kalp krizi gibi ciddi hastalıklarda tedavi ve toparlanma sürecinde kullanılmak üzere nakit destek sunulur."
      },
      {
        title: "Vergi İndirimi Avantajı",
        description: "Ödediğiniz hayat sigortası primleri, Gelir Vergisi Kanunu uyarınca vergi matrahınızdan indirilebilir."
      },
      {
        title: "Kişiselleştirilmiş Teminatlar",
        description: "Mesleğinize, yaşınıza ve borç durumunuza göre tam size uyan teminat tutarları oluşturulur."
      }
    ],
    processSteps: [
      {
        step: "01",
        title: "Mevcut Durum Analizi",
        description: "Ailenizin aylık giderleri, çocukların eğitim planları ve varsa mevcut borçlarınızı birlikte değerlendiriyoruz."
      },
      {
        step: "02",
        title: "Doğru Teminat Tutarının Hesaplanması",
        description: "Gereksiz prim yükü oluşturmadan, gerçekçi bir koruma sağlayacak teminat limitini belirliyoruz."
      },
      {
        step: "03",
        title: "Allianz Teklifi ve Başvuru",
        description: "Sağlık beyanınızı ve temel bilgilerinizi alarak poliçenizi hızlıca oluşturuyoruz."
      },
      {
        step: "04",
        title: "Yıllık Gözden Geçirme",
        description: "Hayatınızdaki değişikliklere (evlilik, çocuk sahibi olma, yeni konut kredisi vb.) göre poliçenizi güncelliyoruz."
      }
    ],
    whoIsItFor: [
      "Ailesinin veya çocuklarının tek ya da ana gelir kaynağı olan çalışanlar",
      "Konut veya ihtiyaç kredisi kullanan ve borç yükünü ailesine bırakmak istemeyenler",
      "Kendi işini yöneten ve iş ortaklığı güvencesi arayan girişimciler",
      "Gelecekteki kritik sağlık risklerine karşı finansal kalkan oluşturmak isteyenler"
    ],
    faqs: [
      {
        question: "Hayat sigortası primi neye göre belirlenir?",
        answer: "Yaşınız, cinsiyetiniz, mesleğiniz, genel sağlık durumunuz ve talep ettiğiniz teminat limitlerine göre prim hesaplanır."
      },
      {
        question: "Ödediğim primleri vergiden düşebilir miyim?",
        answer: "Evet, ücretli çalışanlar veya serbest meslek erbabı, yasal sınırlar dahilinde ödedikleri hayat sigortası primlerini gelir vergisi matrahından indirebilir."
      },
      {
        question: "Bankanın yaptığı hayat sigortası varken başka bir poliçe yaptırabilir miyim?",
        answer: "Evet, birden fazla hayat sigortası poliçesi yaptırılabilir ve vefat durumunda hak sahipleri tüm geçerli poliçelerden teminat alma hakkına sahiptir."
      },
      {
        question: "Poliçe süresi ne kadar olabilir?",
        answer: "Yıllık yenilenen poliçelerden 10, 15 veya 20 yıllık uzun vadeli koruma sağlayan poliçelere kadar seçenekler mevcuttur."
      }
    ],
    disclaimer: "Teminat kapsamı, istisnalar ve limitler seçilen poliçe genel ve özel şartlarına bağlı olarak değişkenlik gösterebilir."
  },
  {
    id: "saglik-sigortasi",
    slug: "saglik-sigortasi",
    title: "Özel & Tamamlayıcı Sağlık Sigortası",
    shortTitle: "Sağlık Sigortası",
    badge: "Sağlık Güvencesi",
    tagline: "Özel hastanelerde yüksek fatura endişesi duymadan alanında uzman hekimlerden kaliteli sağlık hizmeti alın.",
    shortDescription: "Tamamlayıcı Sağlık (TSS) ve Özel Sağlık Sigortası (ÖSS) alternatifleri ile muayene, tahlil ve ameliyat giderlerinizi bütçenizi sarsmadan karşılayın.",
    heroDescription: "Sağlık Sigortası, en kıymetli varlığınız olan sağlığınızı korumanız için en etkili finansal araçtır. Özel hastanelerde karşılaşılabilecek yüksek tetkik ve ameliyat masraflarına karşı sizi ve ailenizi tam koruma altına alır.",
    icon: "HeartPulse",
    whatsappMessage: "Merhaba, Hepsen Sigorta web sitesinden ulaşıyorum. Sağlık Sigortası hakkında bilgi almak ve teklif değerlendirmek istiyorum.",
    benefits: [
      "Geniş anlaşmalı özel hastane ve sağlık kuruluşu ağı",
      "SGK fark ücreti ödemeden modern sağlık hizmetine erişim (TSS)",
      "Yatarak tedavi (ameliyat, yoğun bakım, oda-refakatçi) tam koruma",
      "Yılda 8-10 adet ayakta muayene, tahlil ve ileri görüntüleme hakkı",
      "Aile indirimi ve çocuklara yönelik avantajlı paketler",
      "Vergi avantajı ile primlerin vergi matrahından indirilebilmesi"
    ],
    keyHighlights: [
      {
        title: "Tamamlayıcı Sağlık Sigortası (TSS)",
        description: "SGK'lı bireylerin anlaşmalı özel hastanelerdeki fark ücretlerini karşılayan, son derece ekonomik bir çözümdür."
      },
      {
        title: "Özel Sağlık Sigortası (ÖSS)",
        description: "A+ hastaneler dahil en geniş kurum ağında geçerli, yurt içi ve yurt dışı seçenekleri bulunan kapsamlı sağlık güvencesidir."
      },
      {
        title: "Hızlı Provizyon Süreci",
        description: "Allianz'ın dijital altyapısı sayesinde hastane veznesinde beklemeden anında onay alınır."
      },
      {
        title: "Aile Paketi İndirimi",
        description: "Eş ve çocuklarınızı poliçeye dahil ederek özel aile indirimlerinden faydalanabilirsiniz."
      }
    ],
    processSteps: [
      {
        step: "01",
        title: "Hizmet Tercihinin Tespiti",
        description: "İkamet ettiğiniz bölgedeki anlaşmalı hastanelere ve bütçenize göre TSS veya ÖSS alternatifini belirliyoruz."
      },
      {
        step: "02",
        title: "Teminat Kapsamı Belirleme",
        description: "Sadece yatarak mı yoksa ayakta muayeneleri de içeren karma bir paket mi istediğinizi netleştiriyoruz."
      },
      {
        step: "03",
        title: "Hızlı Teklif ve Karşılaştırma",
        description: "Temel kişisel bilgilerinizi alarak en uygun primli poliçe teklifini hazırlıyoruz."
      },
      {
        step: "04",
        title: "Poliçeleştirme ve Kullanım Rehberi",
        description: "Poliçenizi oluşturup anlaşmalı kurumları nasıl kullanacağınıza dair pratik rehberinizi iletiyoruz."
      }
    ],
    whoIsItFor: [
      "Devlet hastanelerindeki randevu yoğunluğu yerine özel hastane konforunu tercih edenler",
      "Yüksek ameliyat ve tetkik masraflarına karşı bütçesini güvenceye almak isteyen aileler",
      "SGK'lı olup özel hastanelerde ek fark ücreti ödemek istemeyen çalışanlar",
      "Çocuklarının rutin kontrollerini ve doktor muayenelerini aksatmadan yaptırmak isteyen ebeveynler"
    ],
    faqs: [
      {
        question: "Tamamlayıcı Sağlık ile Özel Sağlık arasındaki fark nedir?",
        answer: "Tamamlayıcı Sağlık Sigortası SGK ile anlaşmalı özel hastanelerde geçerlidir ve fark ücretlerini karşılar. Özel Sağlık Sigortası ise SGK şartı aranmaksızın daha geniş (A+ sınıfı dahil) özel hastane ağında geçerlidir."
      },
      {
        question: "Mevcut kronik hastalıklar poliçe kapsamına girer mi?",
        answer: "Tüm sigorta şirketlerinde olduğu gibi poliçe başlangıç tarihinden önce var olan tanısı konmuş hastalıklar genellikle poliçe kapsamı dışındadır. Bu nedenle sağlık sigortasına sağlıklı iken başlamak çok önemlidir."
      },
      {
        question: "Sağlık sigortasında bekleme süresi var mıdır?",
        answer: "Acil durumlar ve rutin muayeneler anında geçerlidir; ancak safra kesesi, fıtık, bademcik gibi bazı planlı cerrahi işlemler için sektör genelinde 3 ay ile 12 ay arasında bekleme süresi uygulanır."
      },
      {
        question: "Ömür boyu yenileme garantisi nedir?",
        answer: "Belirli bir süre kesintisiz sigortalı kalan ve belirli hasar/prim kriterlerini karşılayan sigortalılara, sonradan ortaya çıkabilecek rahatsızlıkları da kapsayacak şekilde ömür boyu poliçe yenileme hakkı tanınır."
      }
    ]
  },
  {
    id: "finansal-danismanlik",
    slug: "finansal-danismanlik",
    title: "Finansal Planlama ve Tasarruf Danışmanlığı",
    shortTitle: "Finansal Danışmanlık",
    badge: "Bilinçli Tasarruf & Risk Yönetimi",
    tagline: "Gelir ve tasarruflarınızı doğru yönetin, emeklilik ve güvence hedeflerinize planlı şekilde ilerleyin.",
    shortDescription: "Ailenizin ve işletmenizin uzun vadeli hedeflerine uygun birikim disiplini oluşturun; riskleri, sigorta ihtiyaçlarını ve emeklilik planını bir bütün olarak yönetin.",
    heroDescription: "Finansal Danışmanlık yaklaşımımız; karmaşık finansal terimlerden uzak, tamamen sizin ve ailenizin gerçek hedeflerine odaklanan bir yol haritasıdır. Fon Yöneticisi Merve Doğan liderliğinde, tasarruflarınızın ve sigorta poliçelerinizin birbirini nasıl tamamlayacağını birlikte planlıyoruz.",
    icon: "LineChart",
    whatsappMessage: "Merhaba, Hepsen Sigorta web sitesinden ulaşıyorum. Finansal Danışmanlık ve tasarruf planlaması hakkında görüşmek istiyorum.",
    benefits: [
      "Kişiye ve aileye özel finansal check-up ve ihtiyaç analizi",
      "Kısa, orta ve uzun vadeli tasarruf hedeflerinin belirlenmesi",
      "Enflasyon karşısında birikim disiplininin korunması",
      "Mevcut sigorta ve birikim poliçelerinin optimize edilmesi",
      "İstanbul Kozyatağı'nda yüz yüze veya Türkiye geneli online görüşme",
      "Objektif, sade ve anlaşılır bilgilendirme süreci"
    ],
    keyHighlights: [
      {
        title: "Tasarruf & Hedef Uyumu",
        description: "Çocukların eğitimi, konut alımı veya emeklilik dönemi için ayrı ayrı birikim stratejileri oluşturulur."
      },
      {
        title: "Risk Yönetimi Dengesi",
        description: "Beklenmedik sağlık veya vefat risklerinin tasarrufları eritmesini önleyecek koruma kalkanı kurulur."
      },
      {
        title: "Fon Dağılım Değerlendirmesi",
        description: "Bireysel Emeklilik sözleşmelerinizdeki fonların piyasa döngülerine göre dengelenmesi incelenir."
      },
      {
        title: "Bütçe Disiplini Rehberliği",
        description: "Aylık gelir-gider dengesi gözetilerek sürdürülebilir bir tasarruf miktarı belirlenir."
      }
    ],
    processSteps: [
      {
        step: "01",
        title: "İlk Tanışma ve Finansal Check-Up",
        description: "Mevcut gelir, birikim, borç ve mevcut poliçelerinizi detaylı bir şekilde dinliyoruz."
      },
      {
        step: "02",
        title: "Gelecek Hedeflerinin Netleştirilmesi",
        description: "Kaç yıl sonra ne kadarlık bir birikim veya gelir güvencesi hedeflediğinizi modelliyoruz."
      },
      {
        step: "03",
        title: "Bütüncül Çözüm Önerisi",
        description: "BES, hayat ve sağlık ürünlerinin bir arada en verimli şekilde nasıl kurgulanacağını sunuyoruz."
      },
      {
        step: "04",
        title: "Düzenli Takip ve Güncelleme",
        description: "Piyasa ve mevzuat gelişmelerinde yol haritanızı güncel tutuyoruz."
      }
    ],
    whoIsItFor: [
      "Birikim yapmak isteyip nereden başlayacağını bilemeyenler",
      "Farklı kurumlarda dağınık BES ve sigorta poliçeleri olup bunları derli toplu yönetmek isteyenler",
      "Çocuklarının üniversite ve gelecek fonunu şimdiden disipline etmek isteyen ebeveynler",
      "Kendi işini yapan ve gelecekteki emeklilik gelirini planlamak isteyen serbest meslek sahipleri"
    ],
    faqs: [
      {
        question: "Finansal danışmanlık hizmeti için bir ücret ödüyor muyum?",
        answer: "Hepsen Sigorta olarak sunduğumuz ön analiz ve ihtiyaç belirleme görüşmeleri tamamen ücretsizdir."
      },
      {
        question: "Görüşmeler nasıl gerçekleştiriliyor?",
        answer: "İstanbul'da bulunan danışanlarımızla Kozyatağı ofisimizde yüz yüze; şehir dışındaki danışanlarımızla ise telefon, WhatsApp veya online video görüşme yoluyla buluşuyoruz."
      },
      {
        question: "Yatırım tavsiyesi veriyor musunuz?",
        answer: "Hayır. Danışmanlığımız Bireysel Emeklilik Sistemi (BES), hayat sigortası, sağlık sigortası ve aile bütçesi tasarruf planlaması kapsamındadır. Borsa, hisse senedi veya kripto varlıklar üzerine portföy yönetimi veya yatırım tavsiyesi verilmemektedir."
      }
    ],
    disclaimer: "Burada sunulan bilgiler genel bilgilendirme, tasarruf disiplini ve sigorta planlaması amaçlıdır. Sermaye Piyasası Kurulu (SPK) mevzuatı kapsamında yatırım danışmanlığı veya portföy yöneticiliği faaliyeti teşkil etmez."
  }
];

export function getServiceBySlug(slug: string): ServiceData | undefined {
  return SERVICES.find((s) => s.slug === slug);
}
