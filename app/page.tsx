"use client";

import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Building2,
  Check,
  Clock3,
  Mail,
  MapPin,
  FileText,
  Home,
  Menu,
  MoveUpLeft,
  PenTool,
  Phone,
  Quote,
  Route,
  Search,
  ShieldCheck,
  Sparkles,
  Store,
  X,
} from "lucide-react";
import { useReveal } from "@/lib/use-reveal";

/* بيانات التواصل الرسمية — المصدر: https://east-consultants.com
   تُعرَّف هنا مرة واحدة وتُستهلك في كل الصفحة، فلا يتكرر رقم في عدة مواضع. */
const CONTACT = {
  phoneDisplay: "+966 54 329 9191",
  phoneHref: "tel:+966543299191",
  whatsapp:
    "https://wa.me/966543299191?text=" +
    encodeURIComponent("السلام عليكم، أرغب بالاستفسار عن إصدار رخصة بناء."),
  email: "Info@east-consultants.com",
  address: "7579 التخصصي، الرياض",
};

/* lucide-react 1.x لا يوفّر أيقونات العلامات التجارية، لذا تُضمَّن المسارات هنا. */
const WhatsAppIcon = ({ size = 26 }: { size?: number }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884a9.82 9.82 0 0 1 6.988 2.896 9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
  </svg>
);

const InstagramIcon = ({ size = 18 }: { size?: number }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0Zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03Zm0 3.678a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324ZM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4Zm7.846-10.405a1.441 1.441 0 0 1-2.88 0 1.44 1.44 0 0 1 2.88 0Z" />
  </svg>
);

const TikTokIcon = ({ size = 18 }: { size?: number }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07Z" />
  </svg>
);

const SnapchatIcon = ({ size = 18 }: { size?: number }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12.206.793c.99 0 4.347.276 5.93 3.821.529 1.193.403 3.219.299 4.847l-.003.06c-.012.18-.022.345-.03.51.075.045.203.09.401.09.3-.016.659-.12 1.033-.301.165-.088.344-.104.464-.104.182 0 .359.029.509.09.45.149.734.479.734.838.015.449-.39.839-1.213 1.168-.089.029-.209.075-.344.119-.45.135-1.139.36-1.333.81-.09.225-.061.524.12.868l.015.015c.06.136 1.526 3.475 4.791 4.014.255.044.435.27.42.509 0 .075-.015.149-.045.225-.24.569-1.273.988-3.146 1.271-.059.091-.12.375-.164.57-.029.179-.074.36-.134.553-.076.271-.27.405-.555.405h-.03c-.135 0-.313-.031-.538-.074-.36-.075-.765-.135-1.273-.135-.3 0-.599.015-.913.074-.6.104-1.123.464-1.723.884-.853.599-1.826 1.288-3.294 1.288-.06 0-.119-.015-.18-.015h-.149c-1.468 0-2.427-.675-3.279-1.288-.599-.42-1.107-.779-1.707-.884-.314-.045-.629-.074-.928-.074-.54 0-.958.089-1.272.149-.211.043-.391.074-.54.074-.374 0-.523-.224-.583-.42-.061-.192-.09-.389-.135-.567-.046-.181-.105-.494-.166-.57-1.918-.222-2.95-.642-3.189-1.226-.031-.063-.052-.15-.055-.225-.015-.243.165-.465.42-.509 3.264-.54 4.73-3.879 4.791-4.02l.016-.029c.18-.345.224-.645.119-.869-.195-.434-.884-.658-1.332-.809-.121-.029-.24-.074-.346-.119-1.107-.435-1.257-.93-1.197-1.273.09-.479.674-.793 1.168-.793.146 0 .27.029.383.074.42.194.789.298 1.104.298.234 0 .384-.058.465-.104l-.031-.271c-.105-1.643-.234-3.674.3-4.882C7.392 1.137 10.739.82 11.727.82l.419-.015h.06Z" />
  </svg>
);

/* مخطط واجهة معمارية يرسم نفسه داخل إطار صورة الهيرو، ثم تظهر الصورة فوقه.
   كل عنصر يحمل pathLength={1} فتعمل حركة stroke-dashoffset
   بدقة متساوية مهما اختلفت هندسته، بلا قياس بـ JavaScript. */
const bp = (i: number) => ({ "--i": i }) as React.CSSProperties;

const HeroBlueprint = () => (
  <svg
    className="hero-blueprint"
    viewBox="0 0 600 540"
    preserveAspectRatio="xMidYMid meet"
    aria-hidden="true"
    focusable="false"
  >
    {/* خط الأرض */}
    <path d="M40 460 H560" pathLength={1} style={bp(0)} />

    {/* الكتلة السفلية — الطابق الأرضي */}
    <path d="M150 460 V270 H450 V460" pathLength={1} style={bp(1)} />

    {/* الطابق العلوي المرتد */}
    <path d="M195 270 V175 H405 V270" pathLength={1} style={bp(2)} />

    {/* شريحة السقف وبروزها */}
    <path d="M178 175 H422" pathLength={1} style={bp(3)} />
    <path d="M178 175 V163 H422 V175" pathLength={1} style={bp(3)} />

    {/* نوافذ الطابق الأرضي */}
    <rect x="178" y="305" width="68" height="56" pathLength={1} style={bp(4)} />
    <path d="M212 305 V361" pathLength={1} style={bp(5)} />
    <rect x="354" y="305" width="68" height="56" pathLength={1} style={bp(4)} />
    <path d="M388 305 V361" pathLength={1} style={bp(5)} />

    {/* الباب والمقبض */}
    <path d="M270 460 V310 H330 V460" pathLength={1} style={bp(6)} />
    <circle cx="282" cy="390" r="4" pathLength={1} style={bp(7)} />

    {/* نوافذ الطابق العلوي */}
    <rect x="215" y="205" width="52" height="42" pathLength={1} style={bp(5)} />
    <rect x="274" y="205" width="52" height="42" pathLength={1} style={bp(5)} />
    <rect x="333" y="205" width="52" height="42" pathLength={1} style={bp(5)} />

    {/* المحاور الإنشائية */}
    <g className="bp-detail">
      <path d="M150 490 V145" pathLength={1} style={bp(8)} />
      <path d="M300 490 V145" pathLength={1} style={bp(8)} />
      <path d="M450 490 V145" pathLength={1} style={bp(8)} />
      <circle cx="150" cy="128" r="14" pathLength={1} style={bp(9)} />
      <circle cx="300" cy="128" r="14" pathLength={1} style={bp(9)} />
      <circle cx="450" cy="128" r="14" pathLength={1} style={bp(9)} />
    </g>

    {/* خط الأبعاد الأفقي */}
    <g className="bp-detail">
      <path d="M150 505 H450" pathLength={1} style={bp(10)} />
      <path d="M150 497 V513" pathLength={1} style={bp(10)} />
      <path d="M450 497 V513" pathLength={1} style={bp(10)} />
      <path d="M150 505 L164 500 M150 505 L164 510" pathLength={1} style={bp(11)} />
      <path d="M450 505 L436 500 M450 505 L436 510" pathLength={1} style={bp(11)} />
    </g>

    {/* خط الأبعاد الرأسي — الارتفاع */}
    <g className="bp-detail">
      <path d="M110 175 V460" pathLength={1} style={bp(10)} />
      <path d="M102 175 H118" pathLength={1} style={bp(10)} />
      <path d="M102 460 H118" pathLength={1} style={bp(10)} />
      <path d="M110 175 L105 189 M110 175 L115 189" pathLength={1} style={bp(11)} />
      <path d="M110 460 L105 446 M110 460 L115 446" pathLength={1} style={bp(11)} />
    </g>

    {/* سهم الشمال */}
    <g className="bp-detail">
      <circle cx="520" cy="110" r="26" pathLength={1} style={bp(12)} />
      <path d="M520 88 L529 126 L520 118 L511 126 Z" pathLength={1} style={bp(13)} />
    </g>

    {/* رموز التشجير */}
    <g className="bp-detail">
      <circle cx="80" cy="430" r="24" pathLength={1} style={bp(12)} />
      <path d="M80 406 V454 M56 430 H104 M63 413 L97 447 M97 413 L63 447" pathLength={1} style={bp(13)} />
      <circle cx="520" cy="440" r="18" pathLength={1} style={bp(12)} />
      <path d="M520 422 V458 M502 440 H538" pathLength={1} style={bp(13)} />
    </g>
  </svg>
);

const SOCIAL = [
  {
    name: "إنستغرام",
    href: "https://www.instagram.com/east.consultants",
    Icon: InstagramIcon,
  },
  {
    name: "تيك توك",
    href: "https://www.tiktok.com/@east.consultants",
    Icon: TikTokIcon,
  },
  {
    name: "سناب شات",
    href: "https://www.snapchat.com/add/eastconsultants",
    Icon: SnapchatIcon,
  },
];

const projectTypes = [
  {
    icon: Home,
    title: "فلل سكنية",
    text: "رخص البناء للفلل السكنية بمخططاتها ومتطلباتها الخاصة.",
  },
  {
    icon: Building2,
    title: "عمائر سكنية",
    text: "إصدار رخص العمائر السكنية بما يتوافق مع اشتراطات الموقع.",
  },
  {
    icon: Store,
    title: "مبانٍ وعمائر تجارية",
    text: "متطلبات واعتمادات المباني والعمائر التجارية حتى الإصدار.",
  },
];

const licensePillars = [
  {
    icon: Search,
    title: "مراجعة وتحقق",
    items: [
      "مراجعة بيانات العقار والمستندات المتوفرة.",
      "التحقق من اشتراطات ونظام البناء للموقع.",
      "تحديد المتطلبات اللازمة لإصدار الرخصة.",
    ],
  },
  {
    icon: PenTool,
    title: "تجهيز المخططات والمستندات",
    items: ["تجهيز ومراجعة المخططات الهندسية.", "تجهيز المستندات المطلوبة."],
  },
  {
    icon: ShieldCheck,
    title: "رفع ومتابعة حتى التسليم",
    items: [
      "رفع طلب الرخصة عبر المنصة المعتمدة.",
      "متابعة الطلب مع الجهات المختصة.",
      "معالجة الملاحظات وإعادة الرفع عند الحاجة.",
      "متابعة المعاملة حتى استكمال جميع المتطلبات.",
      "تسليم رخصة البناء بعد إصدارها.",
    ],
  },
];

const licenseSteps = [
  {
    n: "01",
    t: "استلام البيانات",
    d: "يتم استلام بيانات العقار والمستندات المتوفرة من العميل.",
    icon: FileText,
  },
  {
    n: "02",
    t: "المراجعة",
    d: "نراجع الصك والقرار المساحي واشتراطات البناء ونحدد متطلبات الرخصة.",
    icon: Search,
  },
  {
    n: "03",
    t: "التجهيز",
    d: "يتم تجهيز المخططات والمستندات المطلوبة حسب نوع المشروع.",
    icon: PenTool,
  },
  {
    n: "04",
    t: "التقديم",
    d: "رفع الطلب عبر المنصة ومتابعة الإجراءات والاعتمادات.",
    icon: MoveUpLeft,
  },
  {
    n: "05",
    t: "معالجة الملاحظات",
    d: "في حال وجود ملاحظات، يتم التعامل معها واستكمال المتطلبات وإعادة الرفع.",
    icon: Clock3,
  },
  {
    n: "06",
    t: "الإصدار",
    d: "متابعة الطلب حتى صدور رخصة البناء وتسليمها للعميل.",
    icon: Check,
  },
];

const whyUs = [
  {
    icon: Route,
    title: "متابعة من البداية للنهاية",
    text: "نرافق المعاملة من استلام بيانات العقار حتى تسليم الرخصة، دون أن تتابع أنت الإجراءات.",
  },
  {
    icon: ShieldCheck,
    title: "تعامل مع الملاحظات",
    text: "عند ورود أي ملاحظات نستكمل المتطلبات ونعيد الرفع حتى اكتمال الطلب.",
  },
  {
    icon: Building2,
    title: "خبرة بثلاثة أنواع مشاريع",
    text: "فلل سكنية وعمائر سكنية ومبانٍ تجارية، ولكل نوع متطلباته ومخططاته.",
  },
  {
    icon: MapPin,
    title: "مكتب هندسي في الرياض",
    text: "فريق قريب منك ويعرف اشتراطات البناء المحلية والمنصات المعتمدة.",
  },
];

/* آراء العملاء — تُملأ بآراء حقيقية فقط.
   ما دامت فارغة يُخفى القسم بالكامل بدل عرض محتوى ناقص أو مختلق. */
const testimonials: { name: string; role: string; text: string }[] = [];

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactSent, setContactSent] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useReveal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main dir="rtl" className="site-shell">
      <header className={`nav-wrap ${scrolled ? "is-scrolled" : ""}`}>
        <nav className="nav container" aria-label="التنقل الرئيسي">
          <a
            href="#top"
            className="brand"
            aria-label="استشاريون الشرق الرئيسية"
          >
            <img
              className="brand-logo"
              src="/logo.png"
              alt="استشاريون الشرق للاستشارات الهندسية"
            />
          </a>
          <div className={`nav-links ${menuOpen ? "is-open" : ""}`}>
            <a href="#service" onClick={() => setMenuOpen(false)}>
              الخدمة
            </a>
            <a href="#offer" onClick={() => setMenuOpen(false)}>
              ماذا نقدم
            </a>
            <a href="#process" onClick={() => setMenuOpen(false)}>
              آلية العمل
            </a>
            <a href="#why" onClick={() => setMenuOpen(false)}>
              لماذا نحن
            </a>
            <a href="#reach" onClick={() => setMenuOpen(false)}>
              تواصل معنا
            </a>
          </div>
          <div className="nav-actions">
            <a href={CONTACT.phoneHref} className="nav-phone" dir="ltr">
              <Phone size={15} />
              {CONTACT.phoneDisplay}
            </a>
            <a href="#form" className="nav-cta">
              اطلب رخصتك <ArrowLeft size={16} />
            </a>
            <button
              className="menu-button"
              aria-label={menuOpen ? "إغلاق القائمة" : "فتح القائمة"}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>
      </header>

      {/* ① الهيرو — بلا data-reveal: يتحرك فور الرسم حتى لا يومض قبل عمل الـ observer */}
      <section id="top" className="hero section-pad">
        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="eyebrow">
              <Sparkles size={15} /> مكتب هندسي معتمد في الرياض
            </div>
            <h1>
              إصدار رخص البناء
              <br />
              <em>نساعدك من البداية حتى الإصدار</em>
            </h1>
            <p>
              نوفر خدمة متكاملة لإصدار رخص البناء للفلل السكنية والعمائر السكنية
              والمباني التجارية، مع متابعة الإجراءات والمتطلبات حتى استكمال
              المعاملة.
            </p>
            <div className="hero-actions">
              <a className="primary-btn" href="#form">
                ابدأ طلبك الآن <ArrowLeft size={18} />
              </a>
              <a className="hero-call" href={CONTACT.phoneHref}>
                <span className="hero-call-icon">
                  <Phone size={17} />
                </span>
                <span>
                  <small>أو اتصل بنا مباشرة</small>
                  <strong dir="ltr">{CONTACT.phoneDisplay}</strong>
                </span>
              </a>
            </div>
            {/* <a
              className="hero-whatsapp"
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon size={18} />
              تواصل عبر واتساب
            </a> */}
          </div>
          <div className="hero-visual">
            <div className="image-frame">
              <HeroBlueprint />
              <img
                className="frame-photo"
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=90"
                alt="واجهة منزل عصري بتصميم هندسي"
              />
              <div className="image-label">
                <span className="label-dot" />
                نحوّل الرؤية إلى واقع
              </div>
            </div>
            <div className="floating-card">
              <div className="float-icon">
                <Check size={17} />
              </div>
              <div>
                <strong>متابعة حتى الإصدار</strong>
                <span>من أول مستند حتى التسليم</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ② وصف الخدمة */}
      <section id="service" className="service-intro section-pad">
        <div className="container">
          <div className="section-heading centered" data-reveal>
            <span className="section-kicker">وصف الخدمة</span>
            <h2>خدمة متكاملة لإصدار رخصة البناء</h2>
            <p>
              نوفر خدمة متكاملة لإصدار رخص البناء للفلل السكنية والعمائر السكنية
              والمباني التجارية، مع متابعة الإجراءات والمتطلبات حتى استكمال
              المعاملة.
            </p>
          </div>
          <div className="type-grid">
            {projectTypes.map((type, index) => (
              <article
                className="type-card"
                key={type.title}
                data-reveal
                style={{ "--i": index } as React.CSSProperties}
              >
                <div className="type-icon">
                  <type.icon size={22} />
                </div>
                <h3>{type.title}</h3>
                <p>{type.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ③ ماذا نقدم لك؟ */}
      <section id="offer" className="offer section-pad">
        <div className="container">
          <div className="section-heading centered" data-reveal>
            <span className="section-kicker">ماذا نقدم لك؟</span>
            <h2>كل ما تحتاجه المعاملة، نتولاه عنك</h2>
          </div>
          <div className="license-offer" data-reveal>
            <div className="offer-pillars">
              {licensePillars.map((pillar) => (
                <div className="offer-pillar" key={pillar.title}>
                  <div className="pillar-head">
                    <pillar.icon size={18} />
                    <h3>{pillar.title}</h3>
                  </div>
                  <ul>
                    {pillar.items.map((item) => (
                      <li key={item}>
                        <Check size={15} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ④ آلية العمل */}
      <section id="process" className="process section-pad">
        <div className="container">
          <div className="section-heading centered" data-reveal>
            <span className="section-kicker">آلية العمل</span>
            <h2>ست خطوات واضحة حتى تصلك الرخصة</h2>
          </div>
          <div className="process-shell">
            <ol className="process-rail">
              {licenseSteps.map((step, index) => (
                <li
                  className={`process-step${
                    index === licenseSteps.length - 1 ? " is-final" : ""
                  }`}
                  key={step.n}
                  data-reveal
                  style={{ "--i": index } as React.CSSProperties}
                >
                  <span className="step-node">
                    <step.icon size={16} />
                  </span>
                  <div className="step-body" data-n={step.n}>
                    <span className="step-num">{step.n}</span>
                    <h4>{step.t}</h4>
                    <p>{step.d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ⑤ لماذا نحن */}
      <section id="why" className="why section-pad">
        <div className="container">
          <div className="section-heading centered" data-reveal>
            <span className="section-kicker">لماذا نحن</span>
            <h2>لماذا يختارنا العملاء لإصدار رخصهم</h2>
          </div>
          <div className="why-grid">
            {whyUs.map((item, index) => (
              <article
                className="why-card"
                key={item.title}
                data-reveal
                style={{ "--i": index } as React.CSSProperties}
              >
                <div className="why-icon">
                  <item.icon size={21} />
                </div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ⑥ آراء العملاء — يظهر تلقائياً عند إضافة أول رأي حقيقي */}
      {testimonials.length > 0 && (
        <section id="testimonials" className="testimonials section-pad">
          <div className="container">
            <div className="section-heading centered" data-reveal>
              <span className="section-kicker">آراء العملاء</span>
              <h2>ماذا قال من أنجزنا رخصهم</h2>
            </div>
            <div className="testimonial-grid">
              {testimonials.map((item, index) => (
                <article
                  className="testimonial-card"
                  key={item.name}
                  data-reveal
                  style={{ "--i": index } as React.CSSProperties}
                >
                  <Quote className="quote-mark" size={26} />
                  <p>{item.text}</p>
                  <footer>
                    <strong>{item.name}</strong>
                    <small>{item.role}</small>
                  </footer>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ⑦ الفورم */}
      <section id="form" className="contact section-pad">
        <div className="container">
          <div className="license-result" data-reveal>
            <div className="result-text">
              <span className="section-kicker">النتيجة للعميل</span>
              <h3>
                خدمة متكاملة، متابعة مستمرة، وتجهيز المتطلبات اللازمة للوصول إلى
                إصدار رخصة البناء.
              </h3>
            </div>
            <a
              className="primary-btn"
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon size={18} />
              استفسر عبر واتساب
            </a>
          </div>

          <div className="contact-divider" data-reveal>
            <span>ابدأ إجراءك</span>
          </div>

          <div className="contact-box">
            <div className="contact-panel" data-reveal>
              <span className="section-kicker">نحن هنا لمساعدتك</span>
              <h2>
                اطلب رخصة البناء
                <br />
                <span>وابدأ إجراءك اليوم.</span>
              </h2>
              <p>
                عبّئ النموذج وسنعود إليك لمناقشة بيانات العقار والمتطلبات
                اللازمة لإصدار الرخصة.
              </p>
              <div className="contact-details">
                <a href={CONTACT.phoneHref}>
                  <i>
                    <Phone size={19} />
                  </i>
                  <span>
                    <strong>اتصل بنا</strong>
                    <small dir="ltr">{CONTACT.phoneDisplay}</small>
                  </span>
                </a>
                <a
                  href={CONTACT.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i>
                    <WhatsAppIcon size={19} />
                  </i>
                  <span>
                    <strong>واتساب</strong>
                    <small>رد سريع على استفسارك</small>
                  </span>
                </a>
                <a href={`mailto:${CONTACT.email}`}>
                  <i>
                    <Mail size={19} />
                  </i>
                  <span>
                    <strong>راسلنا</strong>
                    <small>{CONTACT.email}</small>
                  </span>
                </a>
                <div>
                  <i>
                    <MapPin size={19} />
                  </i>
                  <span>
                    <strong>زرنا في الرياض</strong>
                    <small>{CONTACT.address}</small>
                  </span>
                </div>
              </div>
            </div>
            <form
              className="contact-form"
              onSubmit={(event) => {
                event.preventDefault();
                setContactSent(true);
              }}
            >
              {contactSent ? (
                <div className="form-success">
                  <Check size={28} />
                  <h3>تم استلام طلبك</h3>
                  <p>
                    شكراً لتواصلك. سنعود إليك قريباً لمناقشة تفاصيل رخصتك. وإن
                    كان الأمر مستعجلاً، اتصل بنا مباشرة.
                  </p>
                  <a className="success-call" href={CONTACT.phoneHref} dir="ltr">
                    {CONTACT.phoneDisplay}
                  </a>
                  <button
                    type="button"
                    className="form-reset"
                    onClick={() => setContactSent(false)}
                  >
                    إرسال طلب آخر
                  </button>
                </div>
              ) : (
                <>
                  <div className="form-row">
                    <label>
                      الاسم الكامل
                      <input
                        name="name"
                        required
                        placeholder="اكتب اسمك الكامل"
                      />
                    </label>
                    <label>
                      رقم الجوال
                      <input
                        name="phone"
                        required
                        type="tel"
                        placeholder="05X XXX XXXX"
                      />
                    </label>
                  </div>
                  <label>
                    البريد الإلكتروني
                    <input
                      name="email"
                      required
                      type="email"
                      placeholder="name@example.com"
                    />
                  </label>
                  <label>
                    نوع المشروع
                    <select name="service" defaultValue="">
                      <option value="" disabled>
                        اختر نوع المشروع
                      </option>
                      <option>فلل سكنية</option>
                      <option>عمائر سكنية</option>
                      <option>مبانٍ وعمائر تجارية</option>
                    </select>
                  </label>
                  <label>
                    تفاصيل الطلب
                    <textarea
                      name="message"
                      required
                      rows={4}
                      placeholder="اكتب نبذة عن العقار والمستندات المتوفرة لديك"
                    />
                  </label>
                  <button className="form-submit" type="submit">
                    إرسال الطلب <ArrowLeft size={18} />
                  </button>
                  <p className="form-alt">
                    تفضّل الاتصال المباشر؟{" "}
                    <a href={CONTACT.phoneHref} dir="ltr">
                      {CONTACT.phoneDisplay}
                    </a>{" "}
                    أو{" "}
                    <a
                      href={CONTACT.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      واتساب
                    </a>
                  </p>
                </>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* شريط التواصل — أرقام وسوشيال داخل الصفحة */}
      <section id="reach" className="reach section-pad">
        <div className="container">
          <div className="section-heading centered" data-reveal>
            <span className="section-kicker">تواصل معنا</span>
            <h2>اختر الطريقة الأنسب لك</h2>
          </div>
          <div className="reach-grid">
            <a
              className="reach-card"
              href={CONTACT.phoneHref}
              data-reveal
              style={{ "--i": 0 } as React.CSSProperties}
            >
              <span className="reach-icon">
                <Phone size={22} />
              </span>
              <strong>اتصل بنا</strong>
              <span className="reach-value" dir="ltr">
                {CONTACT.phoneDisplay}
              </span>
            </a>
            <a
              className="reach-card is-whatsapp"
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              data-reveal
              style={{ "--i": 1 } as React.CSSProperties}
            >
              <span className="reach-icon">
                <WhatsAppIcon size={22} />
              </span>
              <strong>واتساب</strong>
              <span className="reach-value">رد سريع على استفسارك</span>
            </a>
            <a
              className="reach-card"
              href={`mailto:${CONTACT.email}`}
              data-reveal
              style={{ "--i": 2 } as React.CSSProperties}
            >
              <span className="reach-icon">
                <Mail size={22} />
              </span>
              <strong>راسلنا</strong>
              <span className="reach-value">{CONTACT.email}</span>
            </a>
          </div>
          <div className="reach-footer" data-reveal>
            <div className="reach-social">
              {SOCIAL.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.name}
                  title={item.name}
                >
                  <item.Icon size={19} />
                </a>
              ))}
            </div>
            <span className="reach-address">
              <MapPin size={16} /> {CONTACT.address}
            </span>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-skyline" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className="container footer-inner">
          <div className="footer-brand">
            <img src="/eastern-consultants-logo.png" alt="استشاريون الشرق" />
            <h3>استشاريون الشرق</h3>
            <p>هندسة معمارية وإدارة مشاريع وإصدار تراخيص بثقة.</p>
          </div>
          <div className="footer-column">
            <h4>الصفحة</h4>
            <a href="#service">وصف الخدمة</a>
            <a href="#offer">ماذا نقدم</a>
            <a href="#process">آلية العمل</a>
            <a href="#why">لماذا نحن</a>
          </div>
          <div className="footer-column">
            <h4>أنواع المشاريع</h4>
            <a href="#service">فلل سكنية</a>
            <a href="#service">عمائر سكنية</a>
            <a href="#service">مبانٍ وعمائر تجارية</a>
            <a href="#form">اطلب رخصتك</a>
          </div>
          <div className="footer-contact">
            <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            <a href={CONTACT.phoneHref} dir="ltr">
              {CONTACT.phoneDisplay}
            </a>
            <span>{CONTACT.address}</span>
          </div>
          <div className="footer-bottom">
            <div className="social-links">
              {SOCIAL.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.name}
                >
                  <item.Icon size={17} />
                </a>
              ))}
            </div>
            <span>© ٢٠٢٦ استشاريون الشرق. جميع الحقوق محفوظة.</span>
            <span className="footer-credit">بُنيت بعناية لمشاريع أفضل</span>
          </div>
        </div>
      </footer>

      <a
        className="whatsapp"
        href={CONTACT.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="تواصل معنا عبر واتساب"
      >
        <span className="whatsapp-label">واتساب</span>
        <span className="whatsapp-icon">
          <WhatsAppIcon size={27} />
        </span>
      </a>
    </main>
  );
}
