import { useEffect, useMemo, useState } from "react"
import {
  ArrowRight,
  Camera,
  Check,
  ChevronLeft,
  ChevronRight,
  Heart,
  LockKeyhole,
  Mail,
  Menu,
  Minus,
  PackageCheck,
  Plus,
  Search,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  Truck,
  X,
} from "lucide-react"

type Product = {
  id: number
  name: string
  category: string
  price: number
  original?: number
  rating: number
  image: string
  isNew?: boolean
  color: string
}

const photos = {
  hero: "https://images.unsplash.com/photo-1622018168951-9381b60507b2?auto=format&fit=crop&w=1800&q=90",
  promo:
    "https://images.unsplash.com/photo-1651126581286-a6ae76cb5c78?auto=format&fit=crop&w=1800&q=90",
  grey: "https://images.unsplash.com/photo-1590099033615-be195f8d575c?auto=format&fit=crop&w=1000&q=85",
  brown:
    "https://images.unsplash.com/photo-1591884807537-0bce39888fe0?auto=format&fit=crop&w=1000&q=85",
  white:
    "https://images.unsplash.com/photo-1522056683100-34f2f60f0094?auto=format&fit=crop&w=1000&q=85",
  editorial:
    "https://images.unsplash.com/photo-1618919308039-bd644f0eea12?auto=format&fit=crop&w=1000&q=85",
  black:
    "https://images.unsplash.com/photo-1630170579389-59921ae88d29?auto=format&fit=crop&w=1000&q=85",
  pumps:
    "https://images.unsplash.com/photo-1539180477815-f0d1ba512c5b?auto=format&fit=crop&w=1000&q=85",
  hats: "https://images.unsplash.com/photo-1693313707162-9f3791a0baf6?auto=format&fit=crop&w=1000&q=85",
  silver:
    "https://images.unsplash.com/photo-1630170579448-5088e866f0b3?auto=format&fit=crop&w=1000&q=85",
  ivory:
    "https://images.unsplash.com/photo-1656105278871-eb7610066b60?auto=format&fit=crop&w=1000&q=85",
}

const products: Product[] = [
  {
    id: 1,
    name: "The Amélie Stiletto",
    category: "Stilettos",
    price: 3499,
    original: 4299,
    rating: 4.9,
    image: photos.grey,
    color: "Pearl Grey",
  },
  {
    id: 2,
    name: "Celeste Slingback",
    category: "Kitten Heels",
    price: 2999,
    rating: 4.8,
    image: photos.brown,
    color: "Caramel",
  },
  {
    id: 3,
    name: "Élan Satin Pump",
    category: "Wedding Heels",
    price: 3999,
    original: 4699,
    rating: 4.9,
    image: photos.white,
    color: "Ivory",
  },
  {
    id: 4,
    name: "Noir Crystal Heel",
    category: "Party Wear",
    price: 4499,
    rating: 4.7,
    image: photos.black,
    color: "Midnight",
  },
  {
    id: 5,
    name: "Margot Classic Pump",
    category: "Classic Pumps",
    price: 3299,
    original: 3899,
    rating: 4.8,
    image: photos.pumps,
    color: "Champagne",
  },
  {
    id: 6,
    name: "Aurelia Block Heel",
    category: "Block Heels",
    price: 2799,
    rating: 4.6,
    image: photos.hats,
    color: "Sand",
  },
  {
    id: 7,
    name: "Lumière Evening Heel",
    category: "Party Wear",
    price: 4299,
    original: 4999,
    rating: 4.9,
    image: photos.silver,
    color: "Silver Mist",
  },
  {
    id: 8,
    name: "Fleur Bridal Pump",
    category: "Wedding Heels",
    price: 3799,
    rating: 4.8,
    image: photos.ivory,
    color: "Soft Ivory",
  },
  {
    id: 9,
    name: "Belle Bow Stiletto",
    category: "Stilettos",
    price: 3899,
    rating: 4.9,
    image: photos.editorial,
    isNew: true,
    color: "Rose Nude",
  },
  {
    id: 10,
    name: "Vienne Sculpted Heel",
    category: "Block Heels",
    price: 3599,
    rating: 4.7,
    image: photos.promo,
    isNew: true,
    color: "Espresso",
  },
  {
    id: 11,
    name: "Colette Pearl Slingback",
    category: "Kitten Heels",
    price: 3399,
    rating: 4.8,
    image: photos.grey,
    isNew: true,
    color: "Stone",
  },
  {
    id: 12,
    name: "Odette Satin Mule",
    category: "Party Wear",
    price: 4199,
    rating: 4.9,
    image: photos.brown,
    isNew: true,
    color: "Bronze",
  },
]

const categories = [
  { name: "Stilettos", image: photos.black },
  { name: "Block Heels", image: photos.hats },
  { name: "Kitten Heels", image: photos.brown },
  { name: "Party Wear", image: photos.silver },
  { name: "Classic Pumps", image: photos.pumps },
  { name: "Wedding Heels", image: photos.white },
]

const reviews = [
  {
    quote:
      "The craftsmanship is exceptional. I wore my Amélie heels through an entire wedding evening and felt as elegant as I did comfortable.",
    name: "Riya Malhotra",
    detail: "Verified buyer · Mumbai",
    initials: "RM",
  },
  {
    quote:
      "SOLEÉ has perfected the balance between luxury and wearability. The packaging alone felt like receiving a beautiful gift.",
    name: "Aanya Kapoor",
    detail: "Verified buyer · New Delhi",
    initials: "AK",
  },
  {
    quote:
      "My Fleur pumps were exactly what I imagined for my wedding day—timeless, refined and surprisingly comfortable.",
    name: "Meera Iyer",
    detail: "Verified buyer · Bengaluru",
    initials: "MI",
  },
]

const money = (value: number) => `₹${value.toLocaleString("en-IN")}`

function Rating({ value }: { value: number }) {
  return (
    <div className="rating" aria-label={`${value} out of 5 stars`}>
      <Star size={13} fill="currentColor" />
      <span>{value}</span>
    </div>
  )
}

function ProductCard({
  product,
  wished,
  onWish,
  onAdd,
}: {
  product: Product
  wished: boolean
  onWish: () => void
  onAdd: () => void
}) {
  const discount = product.original
    ? Math.round(((product.original - product.price) / product.original) * 100)
    : null

  return (
    <article className="product-card">
      <div className="product-image-wrap">
        <img
          src={product.image}
          alt={`${product.name} in ${product.color}`}
          className="product-image"
        />
        <div className="product-badges">
          {product.isNew && <span className="badge badge-dark">New</span>}
          {discount && <span className="badge">-{discount}%</span>}
        </div>
        <button
          className={`wish-btn ${wished ? "active" : ""}`}
          onClick={onWish}
          aria-label={
            wished
              ? `Remove ${product.name} from wishlist`
              : `Add ${product.name} to wishlist`
          }
        >
          <Heart size={18} fill={wished ? "currentColor" : "none"} />
        </button>
        <button className="quick-add" onClick={onAdd}>
          Add to bag <ArrowRight size={15} />
        </button>
      </div>
      <div className="product-info">
        <div className="product-meta">
          <span>{product.category}</span>
          <Rating value={product.rating} />
        </div>
        <h3>{product.name}</h3>
        <p className="color-name">{product.color}</p>
        <div className="price-row">
          <strong>{money(product.price)}</strong>
          {product.original && <del>{money(product.original)}</del>}
        </div>
      </div>
    </article>
  )
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [search, setSearch] = useState("")
  const [wishlist, setWishlist] = useState<number[]>([])
  const [cart, setCart] = useState<Record<number, number>>({})
  const [toast, setToast] = useState("")
  const [email, setEmail] = useState("")
  const [emailState, setEmailState] = useState<"idle" | "error" | "success">(
    "idle",
  )
  const [reviewIndex, setReviewIndex] = useState(0)

  const cartCount = Object.values(cart).reduce((sum, count) => sum + count, 0)
  const cartProducts = products.filter((product) => cart[product.id])
  const cartTotal = cartProducts.reduce(
    (sum, product) => sum + product.price * cart[product.id],
    0,
  )
  const searchResults = useMemo(() => {
    const query = search.trim().toLowerCase()
    if (!query) return products.slice(0, 4)
    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.color.toLowerCase().includes(query),
    )
  }, [search])

  useEffect(() => {
    document.body.style.overflow =
      menuOpen || searchOpen || cartOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [menuOpen, searchOpen, cartOpen])

  useEffect(() => {
    if (!toast) return
    const timer = window.setTimeout(() => setToast(""), 2400)
    return () => window.clearTimeout(timer)
  }, [toast])

  const scrollTo = (id: string) => {
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  const addToCart = (product: Product) => {
    setCart((current) => ({
      ...current,
      [product.id]: (current[product.id] || 0) + 1,
    }))
    setToast(`${product.name} added to your bag`)
  }

  const toggleWish = (product: Product) => {
    const isWished = wishlist.includes(product.id)
    setWishlist((current) =>
      isWished
        ? current.filter((id) => id !== product.id)
        : [...current, product.id],
    )
    setToast(isWished ? "Removed from your wishlist" : "Saved to your wishlist")
  }

  const updateQuantity = (id: number, amount: number) => {
    setCart((current) => {
      const next = (current[id] || 0) + amount
      if (next <= 0) {
        const updated = { ...current }
        delete updated[id]
        return updated
      }
      return { ...current, [id]: next }
    })
  }

  const subscribe = (event: React.FormEvent) => {
    event.preventDefault()
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    setEmailState(isValid ? "success" : "error")
    if (isValid) setEmail("")
  }

  return (
    <div className="site-shell">
      <div className="announcement">
        <p>Complimentary shipping across India on orders above ₹2,999</p>
        <span>Easy 7-day returns</span>
      </div>

      <header className="header">
        <button
          className="icon-btn menu-trigger"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
        >
          <Menu size={21} />
        </button>
        <button
          className="brand"
          onClick={() => scrollTo("home")}
          aria-label="SOLEÉ home"
        >
          SOLEÉ<span>PARIS · MUMBAI</span>
        </button>
        <nav className="desktop-nav" aria-label="Main navigation">
          <button onClick={() => scrollTo("home")}>Home</button>
          <button onClick={() => scrollTo("shop")}>Shop</button>
          <button onClick={() => scrollTo("new")}>New Arrivals</button>
          <button onClick={() => scrollTo("collections")}>Collections</button>
          <button onClick={() => scrollTo("about")}>Our Story</button>
        </nav>
        <div className="header-actions">
          <button
            className="icon-btn"
            onClick={() => setSearchOpen(true)}
            aria-label="Search"
          >
            <Search size={20} />
          </button>
          <button
            className="icon-btn hide-mobile"
            onClick={() => scrollTo("shop")}
            aria-label="Wishlist"
          >
            <Heart size={20} />
            {wishlist.length > 0 && (
              <span className="count">{wishlist.length}</span>
            )}
          </button>
          <button
            className="icon-btn"
            onClick={() => setCartOpen(true)}
            aria-label={`Shopping bag with ${cartCount} items`}
          >
            <ShoppingBag size={20} />
            {cartCount > 0 && <span className="count">{cartCount}</span>}
          </button>
        </div>
      </header>

      <main>
        <section id="home" className="hero">
          <img
            src={photos.hero}
            alt="Woman wearing elegant heels in a refined ivory setting"
          />
          <div className="hero-shade" />
          <div className="hero-content">
            <p className="eyebrow light">The Spring Edit · 2025</p>
            <h1>
              Elegance begins
              <br />
              with every step.
            </h1>
            <p className="hero-copy">
              Discover heels designed to make every moment unforgettable.
            </p>
            <div className="hero-actions">
              <button
                className="button button-light"
                onClick={() => scrollTo("shop")}
              >
                Shop now <ArrowRight size={17} />
              </button>
              <button
                className="text-link light-link"
                onClick={() => scrollTo("collections")}
              >
                Explore collection
              </button>
            </div>
          </div>
          <div className="hero-note">
            <span>01</span>
            <div />
            <p>
              Confidence,
              <br />
              beautifully crafted.
            </p>
          </div>
          <button
            className="scroll-cue"
            onClick={() => scrollTo("collections")}
          >
            Scroll to discover
          </button>
        </section>

        <section id="collections" className="section categories-section">
          <div className="section-heading split-heading">
            <div>
              <p className="eyebrow">Curated for every occasion</p>
              <h2>Shop by silhouette</h2>
            </div>
            <p>
              From commanding stilettos to graceful kitten heels, find the pair
              that speaks your language.
            </p>
          </div>
          <div className="category-grid">
            {categories.map((category, index) => (
              <button
                key={category.name}
                className="category-card"
                onClick={() =>
                  scrollTo(`category-${category.name.replace(" ", "-")}`)
                }
              >
                <img src={category.image} alt={`${category.name} collection`} />
                <div className="category-overlay" />
                <span className="category-number">0{index + 1}</span>
                <div>
                  <h3>{category.name}</h3>
                  <span className="category-link">
                    Explore <ArrowRight size={15} />
                  </span>
                </div>
              </button>
            ))}
          </div>
        </section>

        <section id="shop" className="section product-section">
          <div className="section-heading centered-heading">
            <p className="eyebrow">Most coveted</p>
            <h2>The SOLEÉ icons</h2>
            <p>Enduring silhouettes, designed to be remembered.</p>
          </div>
          <div className="product-grid">
            {products.slice(0, 8).map((product) => (
              <div
                id={`category-${product.category.replace(" ", "-")}`}
                key={product.id}
              >
                <ProductCard
                  product={product}
                  wished={wishlist.includes(product.id)}
                  onWish={() => toggleWish(product)}
                  onAdd={() => addToCart(product)}
                />
              </div>
            ))}
          </div>
          <button
            className="button button-outline view-all"
            onClick={() => setSearchOpen(true)}
          >
            View all shoes <ArrowRight size={17} />
          </button>
        </section>

        <section className="confidence-banner">
          <img
            src={photos.promo}
            alt="Luxury fashion styling with statement heels"
          />
          <div className="confidence-overlay" />
          <div className="confidence-copy">
            <p className="eyebrow light">The confidence collection</p>
            <h2>
              A little height.
              <br />
              <em>A lot of confidence.</em>
            </h2>
            <p>
              Made for the woman who knows where she is going—even if she is
              still choosing the shoes.
            </p>
            <button
              className="button button-light"
              onClick={() => scrollTo("new")}
            >
              Shop the collection <ArrowRight size={17} />
            </button>
          </div>
        </section>

        <section id="new" className="section new-section">
          <div className="section-heading split-heading">
            <div>
              <p className="eyebrow">Just arrived</p>
              <h2>New expressions</h2>
            </div>
            <button className="text-link" onClick={() => setSearchOpen(true)}>
              Discover the edit <ArrowRight size={16} />
            </button>
          </div>
          <div className="product-grid new-grid">
            {products.slice(8).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                wished={wishlist.includes(product.id)}
                onWish={() => toggleWish(product)}
                onAdd={() => addToCart(product)}
              />
            ))}
          </div>
        </section>

        <section id="about" className="craft-section">
          <div className="craft-image">
            <img
              src={photos.editorial}
              alt="Woman in an ivory dress styled with elegant shoes"
            />
          </div>
          <div className="craft-copy">
            <p className="eyebrow">The SOLEÉ promise</p>
            <h2>
              Beauty you can
              <br />
              <em>feel.</em>
            </h2>
            <p className="craft-intro">
              We believe confidence should never come at the cost of comfort.
              Every pair is considered from first sketch to final stitch.
            </p>
            <div className="promise-grid">
              <div>
                <Sparkles size={22} />
                <h3>Premium quality</h3>
                <p>Considered materials, refined by skilled hands.</p>
              </div>
              <div>
                <PackageCheck size={22} />
                <h3>Comfortable fit</h3>
                <p>Cushioned insoles shaped for all-day grace.</p>
              </div>
              <div>
                <Star size={22} />
                <h3>Elegant design</h3>
                <p>Timeless proportions with a modern point of view.</p>
              </div>
              <div>
                <LockKeyhole size={22} />
                <h3>Secure shopping</h3>
                <p>Protected payments and thoughtful delivery.</p>
              </div>
            </div>
            <button className="text-link" onClick={() => scrollTo("shop")}>
              Discover our craftsmanship <ArrowRight size={16} />
            </button>
          </div>
        </section>

        <section className="reviews-section">
          <div className="section-heading centered-heading">
            <p className="eyebrow">Letters from you</p>
            <h2>Worn with love</h2>
          </div>
          <div className="reviews-wrap">
            <button
              className="review-arrow"
              onClick={() =>
                setReviewIndex(
                  (reviewIndex + reviews.length - 1) % reviews.length,
                )
              }
              aria-label="Previous review"
            >
              <ChevronLeft />
            </button>
            <div
              className="review-cards"
              style={{ transform: `translateX(-${reviewIndex * 100}%)` }}
            >
              {reviews.map((review, index) => (
                <article
                  className={`review-card ${
                    index === reviewIndex ? "featured" : ""
                  }`}
                  key={review.name}
                >
                  <div className="review-stars">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} size={14} fill="currentColor" />
                    ))}
                  </div>
                  <blockquote>“{review.quote}”</blockquote>
                  <div className="reviewer">
                    <span>{review.initials}</span>
                    <div>
                      <strong>{review.name}</strong>
                      <p>{review.detail}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <button
              className="review-arrow"
              onClick={() => setReviewIndex((reviewIndex + 1) % reviews.length)}
              aria-label="Next review"
            >
              <ChevronRight />
            </button>
          </div>
          <div className="review-dots">
            {reviews.map((review, index) => (
              <button
                key={review.name}
                className={index === reviewIndex ? "active" : ""}
                onClick={() => setReviewIndex(index)}
                aria-label={`Show review ${index + 1}`}
              />
            ))}
          </div>
        </section>

        <section className="service-strip">
          <div>
            <Truck />
            <span>
              <strong>Complimentary shipping</strong>
              <small>On orders above ₹2,999</small>
            </span>
          </div>
          <div>
            <PackageCheck />
            <span>
              <strong>Easy returns</strong>
              <small>Within 7 days of delivery</small>
            </span>
          </div>
          <div>
            <ShieldCheck />
            <span>
              <strong>Secure payment</strong>
              <small>100% protected checkout</small>
            </span>
          </div>
          <div>
            <Mail />
            <span>
              <strong>Here to help</strong>
              <small>care@solee.in</small>
            </span>
          </div>
        </section>

        <section className="newsletter">
          <div>
            <p className="eyebrow light">A note from SOLEÉ</p>
            <h2>Stay in style.</h2>
            <p>
              Join our world for first access to new collections, private events
              and stories of craft.
            </p>
          </div>
          <form onSubmit={subscribe} noValidate>
            <div className="newsletter-input">
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value)
                  setEmailState("idle")
                }}
                aria-label="Email address"
                aria-invalid={emailState === "error"}
              />
              <button type="submit">
                Subscribe <ArrowRight size={17} />
              </button>
            </div>
            {emailState === "error" && (
              <p className="form-message error">
                Please enter a valid email address.
              </p>
            )}
            {emailState === "success" && (
              <p className="form-message success">
                <Check size={15} /> Welcome to the world of SOLEÉ.
              </p>
            )}
          </form>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-main">
          <div className="footer-brand">
            <button
              className="brand footer-logo"
              onClick={() => scrollTo("home")}
            >
              SOLEÉ<span>PARIS · MUMBAI</span>
            </button>
            <p>
              Thoughtfully crafted heels for women who move through the world
              with purpose and poise.
            </p>
            <div className="socials">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
              >
                <Camera size={18} />
              </a>
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Pinterest"
              >
                P
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
              >
                f
              </a>
            </div>
          </div>
          <div>
            <h3>Explore</h3>
            <button onClick={() => scrollTo("new")}>New arrivals</button>
            <button onClick={() => scrollTo("shop")}>Bestsellers</button>
            <button onClick={() => scrollTo("collections")}>Collections</button>
            <button onClick={() => scrollTo("about")}>Our story</button>
          </div>
          <div>
            <h3>Client care</h3>
            <a href="mailto:care@solee.in">Contact us</a>
            <button onClick={() => setToast("Size guide coming soon")}>
              Size guide
            </button>
            <button
              onClick={() => setToast("Shipping information coming soon")}
            >
              Shipping & returns
            </button>
            <button onClick={() => setToast("Care guide coming soon")}>
              Product care
            </button>
          </div>
          <div>
            <h3>Visit & connect</h3>
            <p>
              hello@solee.in
              <br />
              +91 22 4601 8800
            </p>
            <p>
              Monday–Saturday
              <br />
              10:00–18:00 IST
            </p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2025 SOLEÉ. Made with intention in India.</p>
          <div>
            <button>Privacy</button>
            <button>Terms</button>
            <button>Accessibility</button>
          </div>
        </div>
      </footer>

      {menuOpen && (
        <div className="mobile-menu overlay-panel">
          <div className="panel-top">
            <span className="brand">
              SOLEÉ<small>PARIS · MUMBAI</small>
            </span>
            <button onClick={() => setMenuOpen(false)} aria-label="Close menu">
              <X />
            </button>
          </div>
          <nav>
            {[
              ["Home", "home"],
              ["Shop", "shop"],
              ["New Arrivals", "new"],
              ["Collections", "collections"],
              ["Our Story", "about"],
            ].map(([label, id], index) => (
              <button key={id} onClick={() => scrollTo(id)}>
                <span>0{index + 1}</span>
                {label}
                <ArrowRight />
              </button>
            ))}
          </nav>
          <div className="mobile-menu-foot">
            <p>Step Into Your Confidence.</p>
            <a href="mailto:hello@solee.in">hello@solee.in</a>
          </div>
        </div>
      )}

      {searchOpen && (
        <div className="search-overlay">
          <button
            className="overlay-close"
            onClick={() => {
              setSearchOpen(false)
              setSearch("")
            }}
            aria-label="Close search"
          >
            <X />
          </button>
          <div className="search-inner">
            <p className="eyebrow">Find your pair</p>
            <div className="search-field">
              <Search />
              <input
                autoFocus
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search by style, colour or collection"
              />
            </div>
            <p className="result-count">
              {search
                ? `${searchResults.length} results for “${search}”`
                : "Popular right now"}
            </p>
            <div className="search-results">
              {searchResults.map((product) => (
                <button
                  key={product.id}
                  onClick={() => {
                    setSearchOpen(false)
                    scrollTo("shop")
                  }}
                >
                  <img src={product.image} alt="" />
                  <span>
                    <strong>{product.name}</strong>
                    <small>
                      {product.category} · {money(product.price)}
                    </small>
                  </span>
                  <ArrowRight />
                </button>
              ))}
              {searchResults.length === 0 && (
                <div className="empty-state">
                  <Search />
                  <h3>No styles found</h3>
                  <p>Try “stiletto”, “ivory” or “party wear”.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div
        className={`drawer-backdrop ${cartOpen ? "visible" : ""}`}
        onClick={() => setCartOpen(false)}
      />
      <aside
        className={`cart-drawer ${cartOpen ? "open" : ""}`}
        aria-hidden={!cartOpen}
      >
        <div className="cart-header">
          <div>
            <p className="eyebrow">Your selection</p>
            <h2>
              Shopping bag <span>({cartCount})</span>
            </h2>
          </div>
          <button onClick={() => setCartOpen(false)} aria-label="Close bag">
            <X />
          </button>
        </div>
        <div className="cart-body">
          {cartProducts.length === 0 ? (
            <div className="empty-cart">
              <ShoppingBag />
              <h3>Your bag is waiting</h3>
              <p>Discover pieces made to move beautifully with you.</p>
              <button
                className="button button-dark"
                onClick={() => {
                  setCartOpen(false)
                  scrollTo("shop")
                }}
              >
                Explore the collection
              </button>
            </div>
          ) : (
            cartProducts.map((product) => (
              <div className="cart-item" key={product.id}>
                <img src={product.image} alt={product.name} />
                <div>
                  <span>{product.category}</span>
                  <h3>{product.name}</h3>
                  <p>{product.color}</p>
                  <strong>{money(product.price)}</strong>
                  <div className="quantity">
                    <button
                      onClick={() => updateQuantity(product.id, -1)}
                      aria-label="Decrease quantity"
                    >
                      <Minus />
                    </button>
                    <span>{cart[product.id]}</span>
                    <button
                      onClick={() => updateQuantity(product.id, 1)}
                      aria-label="Increase quantity"
                    >
                      <Plus />
                    </button>
                  </div>
                </div>
                <button
                  className="remove-item"
                  onClick={() => updateQuantity(product.id, -cart[product.id])}
                  aria-label={`Remove ${product.name}`}
                >
                  <X />
                </button>
              </div>
            ))
          )}
        </div>
        {cartProducts.length > 0 && (
          <div className="cart-footer">
            <div>
              <span>Subtotal</span>
              <strong>{money(cartTotal)}</strong>
            </div>
            <p>Shipping and taxes calculated at checkout.</p>
            <button
              className="button button-dark"
              onClick={() =>
                setToast("Checkout is ready for backend integration")
              }
            >
              Secure checkout <LockKeyhole size={16} />
            </button>
          </div>
        )}
      </aside>

      {toast && (
        <div className="toast">
          <Check size={16} />
          {toast}
        </div>
      )}
    </div>
  )
}
