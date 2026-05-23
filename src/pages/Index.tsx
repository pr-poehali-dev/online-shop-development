import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

type IconName = Parameters<typeof Icon>[0]["name"];

// ─── DATA ───────────────────────────────────────────────────────────────────

const HERO_IMAGE = "https://cdn.poehali.dev/projects/16f09a0e-b28e-480b-bb47-7ff3efc1b963/files/3031e7a7-6fcf-450c-8c63-53836cbd2d4a.jpg";
const CATALOG_IMAGE = "https://cdn.poehali.dev/projects/16f09a0e-b28e-480b-bb47-7ff3efc1b963/files/695664ec-d934-488a-b6aa-e046869c0067.jpg";
const ABSTRACT_IMAGE = "https://cdn.poehali.dev/projects/16f09a0e-b28e-480b-bb47-7ff3efc1b963/files/6ef9eaa2-cb79-4e4f-99f2-99dbb1248dc2.jpg";

const NAV_LINKS = [
  { id: "home", label: "Главная" },
  { id: "catalog", label: "Каталог" },
  { id: "about", label: "О магазине" },
  { id: "delivery", label: "Доставка" },
  { id: "reviews", label: "Отзывы" },
  { id: "blog", label: "Блог" },
  { id: "faq", label: "FAQ" },
  { id: "contacts", label: "Контакты" },
];

const PRODUCTS = [
  { id: 1, name: "Sneaker Pro X", price: 12990, oldPrice: 18990, category: "Обувь", tag: "sale", rating: 4.8, reviews: 234, image: CATALOG_IMAGE },
  { id: 2, name: "Urban Jacket", price: 8490, oldPrice: null, category: "Одежда", tag: "new", rating: 4.6, reviews: 87, image: HERO_IMAGE },
  { id: 3, name: "Cyber Bag", price: 5990, oldPrice: 7490, category: "Аксессуары", tag: "sale", rating: 4.9, reviews: 412, image: ABSTRACT_IMAGE },
  { id: 4, name: "Neon Cap", price: 2490, oldPrice: null, category: "Аксессуары", tag: "new", rating: 4.5, reviews: 56, image: CATALOG_IMAGE },
  { id: 5, name: "Tech Pants", price: 6990, oldPrice: 9990, category: "Одежда", tag: "sale", rating: 4.7, reviews: 189, image: HERO_IMAGE },
  { id: 6, name: "Glow Watch", price: 24990, oldPrice: null, category: "Аксессуары", tag: "new", rating: 4.9, reviews: 67, image: ABSTRACT_IMAGE },
  { id: 7, name: "Street Hoodie", price: 4990, oldPrice: 6490, category: "Одежда", tag: null, rating: 4.4, reviews: 321, image: CATALOG_IMAGE },
  { id: 8, name: "Future Boots", price: 15490, oldPrice: null, category: "Обувь", tag: "new", rating: 4.8, reviews: 143, image: HERO_IMAGE },
];

const CATEGORIES = ["Все", "Одежда", "Обувь", "Аксессуары"];

const REVIEWS_DATA = [
  { id: 1, name: "Александра М.", avatar: "А", rating: 5, text: "Просто влюблена в этот магазин! Качество товаров на высоте, доставка молниеносная. Заказывала уже 4 раза — всегда всё идеально.", date: "15 мая 2026", verified: true },
  { id: 2, name: "Дмитрий К.", avatar: "Д", rating: 5, text: "Крутой дизайн сайта и ещё круче товары! Кроссовки приехали за 2 дня, упаковка огонь. Рекомендую всем!", date: "10 мая 2026", verified: true },
  { id: 3, name: "Мария Л.", avatar: "М", rating: 4, text: "Отличный магазин с уникальными вещами. Немного ждала доставку, но оно того стоит. Куртка просто шедевр.", date: "3 мая 2026", verified: false },
  { id: 4, name: "Иван Т.", avatar: "И", rating: 5, text: "Лучший онлайн-шоп! Поддержка отвечает моментально, вещи соответствуют описанию. Буду постоянным клиентом.", date: "28 апреля 2026", verified: true },
];

const BLOG_POSTS = [
  { id: 1, title: "Тренды весны 2026: что носить прямо сейчас", category: "Мода", date: "20 мая 2026", readTime: "5 мин", image: HERO_IMAGE },
  { id: 2, title: "Как создать идеальный уличный образ", category: "Стиль", date: "15 мая 2026", readTime: "7 мин", image: CATALOG_IMAGE },
  { id: 3, title: "Технологии в одежде: умные ткани будущего", category: "Инновации", date: "8 мая 2026", readTime: "4 мин", image: ABSTRACT_IMAGE },
];

const FAQ_DATA = [
  { q: "Как оформить заказ?", a: "Выберите товар, добавьте в корзину и нажмите «Оформить заказ». Укажите данные доставки и выберите способ оплаты — всё просто!" },
  { q: "Сколько длится доставка?", a: "По Москве — 1-2 дня, по России — 3-7 дней. Экспресс-доставка за 3 часа доступна в Москве и Санкт-Петербурге." },
  { q: "Как вернуть товар?", a: "Возврат в течение 30 дней с момента получения. Товар должен быть в оригинальной упаковке. Оформите заявку в личном кабинете." },
  { q: "Какие способы оплаты доступны?", a: "Банковские карты (Visa, МИР, Mastercard), СБП, электронные кошельки, оплата при получении." },
  { q: "Есть ли программа лояльности?", a: "Да! Зарегистрируйтесь и получайте NOVA-баллы за каждую покупку. 100 баллов = 100 рублей скидки на следующий заказ." },
];

const TICKER_ITEMS = ["БЕСПЛАТНАЯ ДОСТАВКА ОТ 3000₽", "НОВАЯ КОЛЛЕКЦИЯ ВЕСНА 2026", "СКИДКИ ДО 50%", "ПРОГРАММА ЛОЯЛЬНОСТИ", "ВОЗВРАТ 30 ДНЕЙ"];

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <span key={i} style={{ fontSize: 14, color: i <= Math.round(rating) ? "#ffd700" : "#333" }}>★</span>
      ))}
    </div>
  );
}

function formatPrice(price: number) {
  return price.toLocaleString("ru-RU") + " ₽";
}

export default function Index() {
  const [activeSection, setActiveSection] = useState("home");
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState<number[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("Все");
  const [maxPrice, setMaxPrice] = useState(30000);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const filteredProducts = PRODUCTS.filter(p => {
    const matchCat = activeCategory === "Все" || p.category === activeCategory;
    const matchPrice = p.price <= maxPrice;
    const matchSearch = !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchPrice && matchSearch;
  });

  const recommended = PRODUCTS.filter(p => p.rating >= 4.8).slice(0, 4);

  function addToCart(id: number) {
    setCartItems(prev => [...prev, id]);
    setCartCount(prev => prev + 1);
  }

  function toggleWishlist(id: number) {
    setWishlist(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  }

  function scrollTo(id: string) {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); }),
      { threshold: 0.3 }
    );
    NAV_LINKS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <div className="min-h-screen hero-mesh font-body overflow-x-hidden">

      {/* TICKER */}
      <div className="ticker-bar py-2 overflow-hidden">
        <div className="animate-marquee flex gap-12 whitespace-nowrap">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} className="text-white text-xs font-heading font-bold tracking-widest flex items-center gap-4">
              {item} <span style={{ color: "rgba(255,255,255,0.3)" }}>◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* HEADER */}
      <header className="sticky top-0 z-50 glass-card border-b border-white/5">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <button onClick={() => scrollTo("home")} className="flex items-center gap-2 shrink-0">
            <span className="font-heading text-3xl font-black gradient-text tracking-wider">NOVA</span>
          </button>

          <nav className="hidden lg:flex items-center gap-6">
            {NAV_LINKS.map(link => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`relative text-sm font-heading font-medium tracking-wide transition-colors duration-200 ${activeSection === link.id ? "nav-link-active" : "text-white/60 hover:text-white"}`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2 shrink-0">
            <button onClick={() => setSearchOpen(!searchOpen)} className="text-white/60 hover:text-neon-cyan transition-colors p-2">
              <Icon name="Search" size={20} />
            </button>
            <button onClick={() => setProfileOpen(!profileOpen)} className="text-white/60 hover:text-neon-purple transition-colors p-2">
              <Icon name="User" size={20} />
            </button>
            <button onClick={() => setCartOpen(!cartOpen)} className="relative text-white/60 hover:text-neon-purple transition-colors p-2">
              <Icon name="ShoppingBag" size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full bg-neon-purple text-white text-[10px] font-bold flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden text-white/60 hover:text-white p-2">
              <Icon name={mobileMenuOpen ? "X" : "Menu"} size={22} />
            </button>
          </div>
        </div>

        {searchOpen && (
          <div className="border-t border-white/5 px-4 py-3 animate-fade-in">
            <div className="container mx-auto relative">
              <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                autoFocus
                value={searchQuery}
                onChange={e => { setSearchQuery(e.target.value); if (e.target.value) scrollTo("catalog"); }}
                placeholder="Поиск товаров..."
                className="search-input w-full pl-10 pr-4 py-2.5 rounded-xl text-sm"
              />
            </div>
          </div>
        )}

        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-white/5 glass-card animate-fade-in">
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-2">
              {NAV_LINKS.map(link => (
                <button key={link.id} onClick={() => scrollTo(link.id)}
                  className={`text-left font-heading font-medium tracking-wide py-2.5 border-b border-white/5 ${activeSection === link.id ? "text-neon-purple" : "text-white/70 hover:text-white"}`}>
                  {link.label}
                </button>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* CART SIDEBAR */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setCartOpen(false)} />
          <div className="relative w-full max-w-md glass-card border-l border-white/10 h-full overflow-y-auto p-6 flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-2xl text-white">Корзина ({cartCount})</h2>
              <button onClick={() => setCartOpen(false)} className="text-white/40 hover:text-white"><Icon name="X" size={22} /></button>
            </div>
            {cartItems.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center gap-4 text-white/40">
                <Icon name="ShoppingBag" size={64} />
                <p className="font-heading text-lg">Корзина пуста</p>
                <button onClick={() => { setCartOpen(false); scrollTo("catalog"); }}
                  className="btn-neon px-6 py-3 rounded-xl text-sm"><span>В каталог</span></button>
              </div>
            ) : (
              <>
                <div className="flex-1 flex flex-col gap-4">
                  {[...new Set(cartItems)].map(id => {
                    const p = PRODUCTS.find(x => x.id === id)!;
                    const qty = cartItems.filter(x => x === id).length;
                    return (
                      <div key={id} className="glass-card rounded-xl p-4 flex gap-4">
                        <img src={p.image} className="w-16 h-16 rounded-lg object-cover" alt={p.name} />
                        <div className="flex-1">
                          <p className="font-heading text-white text-sm">{p.name}</p>
                          <p className="text-neon-purple text-sm font-bold mt-1">{formatPrice(p.price)}</p>
                          <p className="text-white/40 text-xs mt-0.5">× {qty}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="border-t border-white/10 pt-4">
                  <div className="flex justify-between mb-4">
                    <span className="text-white/60">Итого:</span>
                    <span className="font-heading text-xl text-white font-bold">
                      {formatPrice(cartItems.reduce((s, id) => s + (PRODUCTS.find(x => x.id === id)?.price ?? 0), 0))}
                    </span>
                  </div>
                  <button className="btn-neon w-full py-4 rounded-xl"><span>Оформить заказ</span></button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* PROFILE SIDEBAR */}
      {profileOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setProfileOpen(false)} />
          <div className="relative w-full max-w-md glass-card border-l border-white/10 h-full overflow-y-auto p-6 flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-2xl text-white">Личный кабинет</h2>
              <button onClick={() => setProfileOpen(false)} className="text-white/40 hover:text-white"><Icon name="X" size={22} /></button>
            </div>
            <div className="glass-card rounded-2xl p-6 text-center">
              <div className="w-20 h-20 rounded-full flex items-center justify-center text-white text-2xl font-heading font-bold mx-auto mb-4"
                style={{ background: "linear-gradient(135deg, var(--neon-purple), var(--neon-cyan))" }}>А</div>
              <h3 className="font-heading text-xl text-white">Добро пожаловать!</h3>
              <p className="text-white/40 text-sm mt-1">Войдите, чтобы видеть заказы и получать бонусы</p>
            </div>
            <div className="flex flex-col gap-3">
              <button className="btn-neon py-3 px-6 rounded-xl flex items-center gap-3 justify-center">
                <Icon name="LogIn" size={18} /><span>Войти в аккаунт</span>
              </button>
              <button className="btn-ghost-neon py-3 px-6 rounded-xl flex items-center gap-3 justify-center">
                <Icon name="UserPlus" size={18} />Зарегистрироваться
              </button>
            </div>
            <div className="border-t border-white/10 pt-4 flex flex-col gap-3">
              {[
                { icon: "Package", label: "Мои заказы", value: "0 заказов" },
                { icon: "Heart", label: "Избранное", value: `${wishlist.length} товаров` },
                { icon: "Star", label: "NOVA-баллы", value: "0 баллов" },
              ].map(item => (
                <div key={item.label} className="glass-card rounded-xl p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Icon name={item.icon as IconName} size={18} className="text-neon-purple" />
                    <span className="text-white/80 text-sm">{item.label}</span>
                  </div>
                  <span className="text-white/40 text-sm">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <main>
        {/* HERO */}
        <section id="home" className="relative min-h-[90vh] flex items-center overflow-hidden">
          <div className="absolute inset-0">
            <img src={HERO_IMAGE} alt="Hero" className="w-full h-full object-cover opacity-20" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, black 0%, rgba(0,0,0,0.8) 60%, transparent 100%)" }} />
          </div>
          <div className="container mx-auto px-4 relative z-10 py-20">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full mb-6 animate-fade-up">
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "var(--neon-green)" }} />
                <span className="text-white/70 text-xs font-heading tracking-widest uppercase">Новая коллекция 2026</span>
              </div>
              <h1 className="font-heading text-7xl md:text-9xl font-black leading-none mb-6 animate-fade-up delay-100">
                <span className="text-white">BE</span>
                <br />
                <span className="gradient-text-hot">NOVA</span>
              </h1>
              <p className="text-white/60 text-lg mb-10 leading-relaxed animate-fade-up delay-200 max-w-lg">
                Одежда и аксессуары для тех, кто не боится быть ярким. Эксклюзивные дизайны, премиум качество, уличный стиль.
              </p>
              <div className="flex flex-wrap gap-4 animate-fade-up delay-300">
                <button onClick={() => scrollTo("catalog")} className="btn-neon px-8 py-4 rounded-xl text-base">
                  <span>Смотреть каталог</span>
                </button>
                <button onClick={() => scrollTo("about")} className="btn-ghost-neon px-8 py-4 rounded-xl text-base">
                  О нас
                </button>
              </div>
              <div className="mt-16 flex gap-10 animate-fade-up delay-400">
                {[{ value: "50K+", label: "Клиентов" }, { value: "2K+", label: "Товаров" }, { value: "4.9", label: "Рейтинг" }].map(s => (
                  <div key={s.label}>
                    <p className="font-heading text-3xl font-black gradient-text">{s.value}</p>
                    <p className="text-white/40 text-sm mt-1">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:block animate-float">
            <div className="neon-border-purple border-2 rounded-2xl p-6 glass-card text-center animate-pulse-neon">
              <p className="font-heading text-4xl font-black neon-text-pink">-50%</p>
              <p className="text-white/60 text-xs mt-1">до конца мая</p>
            </div>
          </div>
        </section>

        {/* CATEGORIES STRIP */}
        <div className="border-y border-white/5 py-10">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "Одежда", count: "840 товаров", icon: "Shirt", color: "var(--neon-purple)" },
                { label: "Обувь", count: "320 товаров", icon: "Footprints", color: "var(--neon-cyan)" },
                { label: "Аксессуары", count: "560 товаров", icon: "Watch", color: "var(--neon-pink)" },
              ].map(cat => (
                <button key={cat.label} onClick={() => { setActiveCategory(cat.label); scrollTo("catalog"); }}
                  className="glass-card glass-card-hover rounded-2xl p-6 text-center flex flex-col items-center gap-3">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center"
                    style={{ background: `${cat.color}20`, border: `1px solid ${cat.color}40` }}>
                    <Icon name={cat.icon as IconName} size={26} style={{ color: cat.color }} />
                  </div>
                  <div>
                    <p className="font-heading font-bold text-white">{cat.label}</p>
                    <p className="text-white/40 text-xs mt-0.5">{cat.count}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* CATALOG */}
        <section id="catalog" className="py-20">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-8">
              <aside className="w-full md:w-64 shrink-0">
                <div className="glass-card rounded-2xl p-6 md:sticky top-24 flex flex-col gap-6">
                  <h3 className="font-heading text-xl text-white">Фильтры</h3>
                  <div>
                    <p className="text-white/40 text-xs uppercase tracking-widest mb-3">Категория</p>
                    <div className="flex flex-col gap-2">
                      {CATEGORIES.map(cat => (
                        <button key={cat} onClick={() => setActiveCategory(cat)}
                          className={`text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${activeCategory === cat ? "bg-neon-purple/20 text-neon-purple border border-neon-purple/40" : "text-white/60 hover:text-white hover:bg-white/5"}`}>
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-white/40 text-xs uppercase tracking-widest mb-3">Цена до</p>
                    <input type="range" min={1000} max={30000} step={500} value={maxPrice}
                      onChange={e => setMaxPrice(+e.target.value)}
                      className="w-full accent-purple-500" />
                    <p className="text-white/60 text-sm mt-2 text-right">{formatPrice(maxPrice)}</p>
                  </div>
                  <button onClick={() => { setActiveCategory("Все"); setMaxPrice(30000); }}
                    className="btn-ghost-neon py-2.5 px-4 rounded-xl text-sm">Сбросить</button>
                </div>
              </aside>

              <div className="flex-1">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-heading text-4xl text-white"><span className="gradient-text">Каталог</span></h2>
                  <span className="text-white/40 text-sm">{filteredProducts.length} товаров</span>
                </div>
                {filteredProducts.length === 0 ? (
                  <div className="glass-card rounded-2xl p-16 text-center text-white/40">
                    <Icon name="SearchX" size={48} className="mx-auto mb-4 opacity-40" />
                    <p className="font-heading text-xl">Ничего не найдено</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                    {filteredProducts.map(p => (
                      <div key={p.id} className="product-card group">
                        <div className="relative aspect-[4/3] overflow-hidden">
                          <img src={p.image} alt={p.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                          <div className="absolute top-3 left-3 flex gap-2">
                            {p.tag === "new" && <span className="tag-new">new</span>}
                            {p.tag === "sale" && <span className="tag-sale">sale</span>}
                          </div>
                          <button onClick={() => toggleWishlist(p.id)}
                            className="absolute top-3 right-3 w-9 h-9 glass-card rounded-full flex items-center justify-center transition-all hover:scale-110">
                            <Icon name="Heart" size={16} style={{ color: wishlist.includes(p.id) ? "var(--neon-pink)" : "rgba(255,255,255,0.6)" }} />
                          </button>
                          <div className="product-actions absolute bottom-0 left-0 right-0 p-3">
                            <button onClick={() => addToCart(p.id)} className="btn-neon w-full py-2.5 rounded-xl text-sm">
                              <span>В корзину</span>
                            </button>
                          </div>
                        </div>
                        <div className="p-4">
                          <p className="text-white/40 text-xs mb-1">{p.category}</p>
                          <h3 className="font-heading font-bold text-white text-lg">{p.name}</h3>
                          <div className="flex items-center gap-2 mt-1.5">
                            <Stars rating={p.rating} />
                            <span className="text-white/40 text-xs">({p.reviews})</span>
                          </div>
                          <div className="flex items-center gap-3 mt-3">
                            <span className="font-heading text-xl font-bold neon-text-purple">{formatPrice(p.price)}</span>
                            {p.oldPrice && <span className="text-white/30 text-sm line-through">{formatPrice(p.oldPrice)}</span>}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* RECOMMENDATIONS */}
        <div className="py-16 border-y border-white/5 mesh-bg">
          <div className="container mx-auto px-4">
            <h2 className="font-heading text-3xl text-white mb-8"><span className="gradient-text">Рекомендуем</span></h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {recommended.map(p => (
                <div key={p.id} className="product-card group">
                  <div className="relative aspect-square overflow-hidden">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                    <div className="product-actions absolute bottom-0 left-0 right-0 p-2">
                      <button onClick={() => addToCart(p.id)} className="btn-neon w-full py-2 rounded-lg text-xs"><span>В корзину</span></button>
                    </div>
                  </div>
                  <div className="p-3">
                    <h4 className="font-heading text-white text-sm font-bold">{p.name}</h4>
                    <p className="neon-text-purple text-sm font-bold mt-1">{formatPrice(p.price)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ABOUT */}
        <section id="about" className="py-24">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-white/30 font-heading text-xs tracking-widest uppercase mb-4 block">О нас</span>
                <h2 className="font-heading text-6xl font-black text-white mb-6 leading-none">
                  МЫ <span className="gradient-text">NOVA</span>
                </h2>
                <p className="text-white/60 leading-relaxed mb-6">
                  NOVA — это не просто магазин. Это манифест нового стиля. Мы объединяем уличную культуру, высокие технологии и авторский дизайн в одной точке — там, где ты есть.
                </p>
                <p className="text-white/60 leading-relaxed mb-8">
                  Основанная в 2021 году, наша команда сотрудничает с независимыми дизайнерами со всего мира. Каждая вещь в нашем каталоге — это история.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: "Award", label: "Премиум качество", text: "Каждый товар проходит ОТК" },
                    { icon: "Globe", label: "Мировые бренды", text: "Партнёры из 20+ стран" },
                    { icon: "Leaf", label: "Эко-подход", text: "Устойчивое производство" },
                    { icon: "Zap", label: "Быстро и чётко", text: "Доставка в день заказа" },
                  ].map(item => (
                    <div key={item.label} className="glass-card glass-card-hover rounded-xl p-4">
                      <Icon name={item.icon as IconName} size={20} className="text-neon-purple mb-2" />
                      <p className="font-heading font-bold text-white text-sm">{item.label}</p>
                      <p className="text-white/40 text-xs mt-0.5">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="absolute -inset-4 rounded-3xl blur-2xl" style={{ background: "radial-gradient(ellipse, rgba(168,85,247,0.2), rgba(0,229,255,0.1))" }} />
                <img src={ABSTRACT_IMAGE} alt="About" className="relative rounded-3xl w-full object-cover aspect-square neon-border-purple border-2" />
                <div className="absolute -bottom-6 -left-6 glass-card neon-border-cyan border-2 rounded-2xl p-5">
                  <p className="font-heading text-4xl font-black gradient-text">5★</p>
                  <p className="text-white/60 text-sm">Средний рейтинг</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* DELIVERY */}
        <section id="delivery" className="py-24 border-y border-white/5 mesh-bg">
          <div className="container mx-auto px-4">
            <div className="text-center mb-14">
              <span className="text-white/30 font-heading text-xs tracking-widest uppercase block mb-3">Логистика</span>
              <h2 className="font-heading text-5xl font-black text-white">
                ДОСТАВКА <span className="gradient-text">&amp; ОПЛАТА</span>
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6 mb-14">
              {[
                { icon: "Zap", color: "var(--neon-purple)", title: "Экспресс", subtitle: "1-3 часа", desc: "По Москве и СПб. Курьер привезёт прямо домой.", price: "от 390 ₽" },
                { icon: "Truck", color: "var(--neon-cyan)", title: "Стандарт", subtitle: "2-5 дней", desc: "По всей России. СДЭК, Boxberry, Почта России.", price: "от 190 ₽" },
                { icon: "Gift", color: "var(--neon-pink)", title: "Бесплатно", subtitle: "от 3000 ₽", desc: "При заказе от 3000 рублей — доставка бесплатная.", price: "0 ₽" },
              ].map(item => (
                <div key={item.title} className="glass-card glass-card-hover rounded-2xl p-8 text-center">
                  <div className="w-16 h-16 rounded-2xl mx-auto flex items-center justify-center mb-5"
                    style={{ background: `${item.color}20`, border: `1px solid ${item.color}40` }}>
                    <Icon name={item.icon as IconName} size={28} style={{ color: item.color }} />
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-white">{item.title}</h3>
                  <p className="font-heading font-bold mt-1 neon-text-purple">{item.subtitle}</p>
                  <p className="text-white/50 text-sm mt-3 leading-relaxed">{item.desc}</p>
                  <div className="mt-4 glass-card rounded-xl py-2 px-4 inline-block">
                    <span className="font-heading font-bold text-white">{item.price}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="glass-card rounded-2xl p-8">
              <h3 className="font-heading text-2xl text-white mb-6">Способы оплаты</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { icon: "CreditCard", label: "Банковская карта", sub: "Visa, МИР, Mastercard" },
                  { icon: "Smartphone", label: "СБП", sub: "Быстрые платежи" },
                  { icon: "Wallet", label: "Кошельки", sub: "ЮMoney, Qiwi" },
                  { icon: "Package", label: "При получении", sub: "Наличными/картой" },
                ].map(pay => (
                  <div key={pay.label} className="flex items-center gap-3 p-4 rounded-xl border border-white/5 hover:border-neon-purple/30 transition-colors">
                    <Icon name={pay.icon as IconName} size={22} className="text-neon-cyan shrink-0" />
                    <div>
                      <p className="font-medium text-white text-sm">{pay.label}</p>
                      <p className="text-white/40 text-xs">{pay.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* REVIEWS */}
        <section id="reviews" className="py-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
              <div>
                <span className="text-white/30 font-heading text-xs tracking-widest uppercase block mb-3">Отзывы</span>
                <h2 className="font-heading text-5xl font-black text-white">ЧТО <span className="gradient-text">ГОВОРЯТ</span></h2>
              </div>
              <div className="flex items-center gap-4 mt-4 md:mt-0">
                <div className="text-center">
                  <p className="font-heading text-5xl font-black neon-text-purple">4.9</p>
                  <Stars rating={4.9} />
                  <p className="text-white/40 text-xs mt-1">1240 отзывов</p>
                </div>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              {REVIEWS_DATA.map(r => (
                <div key={r.id} className="glass-card glass-card-hover rounded-2xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-heading font-bold text-lg shrink-0"
                      style={{ background: "linear-gradient(135deg, var(--neon-purple), var(--neon-cyan))" }}>
                      {r.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-heading font-bold text-white">{r.name}</p>
                        {r.verified && (
                          <span className="text-neon-cyan text-xs flex items-center gap-1">
                            <Icon name="BadgeCheck" size={14} className="text-neon-cyan" />Верифицирован
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 mt-1">
                        <Stars rating={r.rating} />
                        <span className="text-white/30 text-xs">{r.date}</span>
                      </div>
                      <p className="text-white/70 text-sm mt-3 leading-relaxed">{r.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <button className="btn-ghost-neon px-8 py-3 rounded-xl">Все отзывы</button>
            </div>
          </div>
        </section>

        {/* BLOG */}
        <section id="blog" className="py-24 border-t border-white/5 mesh-bg">
          <div className="container mx-auto px-4">
            <div className="flex items-end justify-between mb-12">
              <div>
                <span className="text-white/30 font-heading text-xs tracking-widest uppercase block mb-3">Контент</span>
                <h2 className="font-heading text-5xl font-black text-white">НАШИ <span className="gradient-text">СТАТЬИ</span></h2>
              </div>
              <button className="btn-ghost-neon px-6 py-2.5 rounded-xl text-sm hidden md:block">Все статьи</button>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {BLOG_POSTS.map(post => (
                <article key={post.id} className="glass-card glass-card-hover rounded-2xl overflow-hidden cursor-pointer">
                  <div className="aspect-video overflow-hidden">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="tag-new">{post.category}</span>
                      <span className="text-white/30 text-xs flex items-center gap-1">
                        <Icon name="Clock" size={12} />{post.readTime}
                      </span>
                    </div>
                    <h3 className="font-heading text-lg font-bold text-white leading-tight">{post.title}</h3>
                    <p className="text-white/40 text-xs mt-3">{post.date}</p>
                    <button className="mt-4 text-neon-purple text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">
                      Читать <Icon name="ArrowRight" size={14} />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-24">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="text-center mb-12">
              <span className="text-white/30 font-heading text-xs tracking-widest uppercase block mb-3">Вопросы</span>
              <h2 className="font-heading text-5xl font-black text-white"><span className="gradient-text">FAQ</span></h2>
            </div>
            <div className="flex flex-col gap-3">
              {FAQ_DATA.map((item, i) => (
                <div key={i} className={`glass-card rounded-2xl overflow-hidden transition-all duration-300 border ${openFaq === i ? "neon-border-purple" : "border-white/5"}`}>
                  <button className="w-full text-left p-6 flex items-center justify-between gap-4"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                    <span className="font-heading font-bold text-white">{item.q}</span>
                    <Icon name={openFaq === i ? "ChevronUp" : "ChevronDown"} size={18} className="text-neon-purple shrink-0" />
                  </button>
                  {openFaq === i && (
                    <div className="px-6 pb-6 text-white/60 text-sm leading-relaxed border-t border-white/5 pt-4">
                      {item.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACTS */}
        <section id="contacts" className="py-24 border-t border-white/5 mesh-bg">
          <div className="container mx-auto px-4">
            <div className="text-center mb-14">
              <span className="text-white/30 font-heading text-xs tracking-widest uppercase block mb-3">Связь</span>
              <h2 className="font-heading text-5xl font-black text-white">
                СВЯЖИТЕСЬ <span className="gradient-text">С НАМИ</span>
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="flex flex-col gap-4">
                {[
                  { icon: "Phone", label: "Телефон", value: "+7 (800) 555-66-77", sub: "Бесплатно, пн-вс 9:00-21:00" },
                  { icon: "Mail", label: "Email", value: "hello@nova-shop.ru", sub: "Ответ в течение 2 часов" },
                  { icon: "MapPin", label: "Шоурум", value: "Москва, Невский пр., 1", sub: "Пн-Вс, 10:00-20:00" },
                  { icon: "MessageCircle", label: "Telegram", value: "@nova_shop", sub: "Быстрее всего здесь" },
                ].map(c => (
                  <div key={c.label} className="glass-card glass-card-hover rounded-2xl p-5 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: "rgba(168,85,247,0.15)", border: "1px solid rgba(168,85,247,0.3)" }}>
                      <Icon name={c.icon as IconName} size={20} className="text-neon-purple" />
                    </div>
                    <div>
                      <p className="text-white/40 text-xs">{c.label}</p>
                      <p className="font-heading font-bold text-white">{c.value}</p>
                      <p className="text-white/40 text-xs mt-0.5">{c.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="glass-card rounded-2xl p-8">
                <h3 className="font-heading text-2xl text-white mb-6">Написать нам</h3>
                <div className="flex flex-col gap-4">
                  <input placeholder="Ваше имя" className="search-input px-4 py-3 rounded-xl text-sm w-full" />
                  <input placeholder="Email или телефон" className="search-input px-4 py-3 rounded-xl text-sm w-full" />
                  <textarea placeholder="Ваш вопрос..." rows={4} className="search-input px-4 py-3 rounded-xl text-sm w-full resize-none" />
                  <button className="btn-neon py-4 rounded-xl"><span>Отправить сообщение</span></button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-white/5 glass-card py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-10 mb-10">
            <div>
              <span className="font-heading text-3xl font-black gradient-text">NOVA</span>
              <p className="text-white/40 text-sm mt-3 leading-relaxed">Онлайн-магазин premium уличной одежды и аксессуаров</p>
              <div className="flex gap-3 mt-5">
                {["VK", "TG", "YT"].map(s => (
                  <div key={s} className="w-9 h-9 glass-card rounded-lg flex items-center justify-center border border-transparent hover:border-neon-purple/50 transition-all cursor-pointer">
                    <span className="text-white/40 text-xs font-heading">{s}</span>
                  </div>
                ))}
              </div>
            </div>
            {[
              { title: "Магазин", links: [{ l: "Каталог", id: "catalog" }, { l: "Новинки", id: "catalog" }, { l: "Акции", id: "catalog" }] },
              { title: "Покупателям", links: [{ l: "Доставка", id: "delivery" }, { l: "FAQ", id: "faq" }, { l: "Контакты", id: "contacts" }] },
              { title: "Компания", links: [{ l: "О нас", id: "about" }, { l: "Блог", id: "blog" }, { l: "Отзывы", id: "reviews" }] },
            ].map(col => (
              <div key={col.title}>
                <p className="font-heading font-bold text-white mb-4">{col.title}</p>
                <ul className="flex flex-col gap-2">
                  {col.links.map(link => (
                    <li key={link.l}>
                      <button onClick={() => scrollTo(link.id)} className="text-white/40 hover:text-neon-purple text-sm transition-colors">{link.l}</button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row justify-between gap-4 text-white/30 text-xs">
            <span>© 2026 NOVA. Все права защищены.</span>
            <div className="flex gap-6">
              <span className="cursor-pointer hover:text-white/60 transition-colors">Политика конфиденциальности</span>
              <span className="cursor-pointer hover:text-white/60 transition-colors">Пользовательское соглашение</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}