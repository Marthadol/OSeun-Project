"use client";
import { useState, useEffect } from "react";
import {
  ArrowRight,
  ShoppingBag,
  Search,
  Plus,
  Minus,
  X,
  MapPin,
  Utensils,
  Gift,
  Leaf,
  Flame,
  Check,
  Bike,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  meals,
  DELIVERY_FEE,
  extraOptions,
  money,
  lineTotal,
  type Meal,
  type Line,
} from "@/lib/menu";
import { Brand } from "@/components/brand";
export default function Home() {
  const [view, setView] = useState("menu"),
    [category, setCategory] = useState("All meals"),
    [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Meal | null>(null),
    [qty, setQty] = useState(2),
    [extras, setExtras] = useState<string[]>([]),
    [note, setNote] = useState("");
  const [cart, setCart] = useState<Line[]>([]),
    [cartOpen, setCartOpen] = useState(false),
    [checkout, setCheckout] = useState(false);
  const [giftAmount, setGiftAmount] = useState(10000),
    [giftPreview, setGiftPreview] = useState(false),
    [info, setInfo] = useState(false),
    [message, setMessage] = useState("");
  const subtotal = cart.reduce((s, l) => s + lineTotal(l), 0),
    count = cart.reduce((s, l) => s + l.qty, 0),
    delivery = cart.length ? DELIVERY_FEE : 0;
  const filtered = meals.filter(
    (m) =>
      (category === "All meals" || m.category === category) &&
      (m.name + " " + m.desc).toLowerCase().includes(query.toLowerCase()),
  );
  function openMeal(m: Meal) {
    setSelected(m);
    setQty(m.min);
    setExtras([]);
    setNote("");
  }
  function addMeal() {
    if (!selected) return;
    const key = [selected.id, ...extras.slice().sort(), note.trim()].join("|");
    setCart((old) =>
      old.some((l) => l.key === key)
        ? old.map((l) => (l.key === key ? { ...l, qty: l.qty + qty } : l))
        : [...old, { key, id: selected.id, qty, extras, note: note.trim() }],
    );
    setMessage(selected.name + " added to your order");
    setSelected(null);
  }
  function changeQty(key: string, delta: number) {
    setCart((old) =>
      old.map((l) =>
        l.key === key
          ? {
              ...l,
              qty: Math.max(
                meals.find((m) => m.id === l.id)!.min,
                l.qty + delta,
              ),
            }
          : l,
      ),
    );
  }
  useEffect(() => {
    if (!message) return;
    const t = setTimeout(() => setMessage(""), 3500);
    return () => clearTimeout(t);
  }, [message]);
  function Cart() {
    return (
      <div className="cart-inner">
        <div className="cart-title">
          <h2>Your order</h2>
          <span>{count} items</span>
        </div>
        <div className="delivery-note">
          <Bike size={19} />
          <div>
            <strong>Made fresh. Delivered warm.</strong>
            <p>Delivery details at checkout</p>
          </div>
        </div>
        {!cart.length ? (
          <div className="empty-cart">
            <span className="bag-circle">
              <ShoppingBag size={35} strokeWidth={1.3} />
            </span>
            <h3>
              Something delicious
              <br />
              belongs here.
            </h3>
            <p>
              Pick a favourite from the menu
              <br />
              to start your order.
            </p>
          </div>
        ) : (
          <div className="cart-lines">
            {cart.map((l) => {
              const m = meals.find((m) => m.id === l.id)!;
              return (
                <div className="cart-line" key={l.key}>
                  <div className="line-top">
                    <strong>{m.name}</strong>
                    <button
                      className="icon-button"
                      aria-label={"Remove " + m.name}
                      onClick={() =>
                        setCart(cart.filter((i) => i.key !== l.key))
                      }
                    >
                      <X size={16} />
                    </button>
                  </div>
                  {l.extras.length > 0 && (
                    <small>
                      With{" "}
                      {extraOptions
                        .filter((e) => l.extras.includes(e.id))
                        .map((e) => e.name.toLowerCase())
                        .join(" & ")}{" "}
                      per portion
                    </small>
                  )}
                  {l.note && <small>{l.note}</small>}
                  <div className="line-bottom">
                    <div className="stepper compact">
                      <button
                        aria-label={"Decrease " + m.name}
                        disabled={l.qty <= m.min}
                        onClick={() => changeQty(l.key, -1)}
                      >
                        <Minus size={13} />
                      </button>
                      <span>{l.qty}</span>
                      <button
                        aria-label={"Increase " + m.name}
                        onClick={() => changeQty(l.key, 1)}
                      >
                        <Plus size={13} />
                      </button>
                    </div>
                    <b>{money(lineTotal(l))}</b>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        <div className="cart-totals">
          <div>
            <span>Subtotal</span>
            <span>{money(subtotal)}</span>
          </div>
          <div>
            <span>Delivery estimate</span>
            <span>{cart.length ? money(delivery) : "—"}</span>
          </div>
          <div className="total">
            <strong>Total</strong>
            <strong>{money(subtotal + delivery)}</strong>
          </div>
        </div>
        <Button
          className="primary checkout-button"
          disabled={!cart.length}
          onClick={() => {
            setCartOpen(false);
            setCheckout(true);
          }}
        >
          Review your order <ArrowRight size={17} />
        </Button>
        <p className="cart-foot">Delivery: {money(DELIVERY_FEE)} per order</p>
      </div>
    );
  }
  return (
    <div className="app">
      <a className="skip" href="#main">
        Skip to menu
      </a>
      <header className="topbar">
        <button
          className="wordmark"
          onClick={() => setView("menu")}
          aria-label="O’Seun home"
        >
          <Brand />
        </button>
        <nav aria-label="Main navigation">
          {[
            ["menu", "Our menu"],
            ["about", "Our kitchen"],
            ["gifts", "Gift cards"],
          ].map(([id, label]) => (
            <button
              key={id}
              className={view === id ? "nav-active" : ""}
              onClick={() => setView(id)}
            >
              {label}
            </button>
          ))}
        </nav>
        <div className="top-actions">
          <button
            className="cart-mobile icon-button"
            aria-label={"Open cart, " + count + " items"}
            onClick={() => setCartOpen(true)}
          >
            <ShoppingBag size={21} />
            {count > 0 && <sup>{count}</sup>}
          </button>
          <span className="header-tagline">Tasty. Healthy. Delightful.</span>
        </div>
      </header>
      <div className="subbar">
        <span>
          <MapPin size={16} /> O’Seun kitchen{" "}
          <span className="sub-separator">/</span>{" "}
          <strong>Delivery menu</strong>
        </span>
        <button onClick={() => setInfo(true)}>
          Ordering for your team? <ArrowRight size={15} />
        </button>
      </div>
      <div className="workspace">
        <main id="main">
          {view === "menu" ? (
            <>
              <div className="page-heading">
                <div>
                  <span className="eyebrow">GOOD FOOD. GOOD MOOD.</span>
                  <h1>What are you craving?</h1>
                  <p>
                    Your favourites, freshly made. Just the way you like them.
                  </p>
                </div>
                <span className="kitchen-stamp">
                  <Utensils size={19} /> The O’Seun kitchen
                </span>
              </div>
              <section className="feature" aria-label="Featured meal">
                <div className="feature-copy">
                  <span className="feature-label">
                    <Flame size={15} /> THE HOUSE FAVOURITE
                  </span>
                  <h2>
                    A little taste
                    <br />
                    of home.
                  </h2>
                  <p>
                    Smoky jollof. Rich flavours.
                    <br />A plate worth looking forward to.
                  </p>
                  <Button
                    className="feature-button"
                    onClick={() => openMeal(meals[0])}
                  >
                    Make it yours <ArrowRight size={17} />
                  </Button>
                  <small>
                    Rice from{" "}
                    {money(
                      Math.min(
                        ...meals
                          .filter((m) => m.category === "Rice")
                          .map((m) => m.price),
                      ),
                    )}{" "}
                    / portion · minimum 2
                  </small>
                </div>
                <div className="feature-photo">
                  <img
                    src="/jollof.jpg"
                    alt="Nigerian jollof rice with grilled chicken and golden plantain"
                  />
                  <span className="photo-note">
                    Serving inspiration · extras sold separately
                  </span>
                </div>
              </section>
              <div className="menu-heading">
                <div>
                  <h2>Made for your appetite</h2>
                  <p>Good choices, however you fill your plate.</p>
                </div>
                <label className="search">
                  <Search size={18} />
                  <Input
                    aria-label="Search meals"
                    placeholder="Find your favourite…"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </label>
              </div>
              <div
                className="categories"
                role="group"
                aria-label="Meal categories"
              >
                {["All meals", "Rice", "Proteins", "Sides", "Drinks"].map(
                  (c) => (
                    <button
                      key={c}
                      aria-pressed={category === c}
                      className={category === c ? "selected" : ""}
                      onClick={() => setCategory(c)}
                    >
                      {c === "All meals" && <Utensils size={15} />} {c}
                    </button>
                  ),
                )}
              </div>
              <div className="menu-grid">
                {filtered.map((m) => (
                  <article className={"meal-card tone-" + m.tone} key={m.id}>
                    <div className="meal-overline">
                      <span>{m.category}</span>
                      <span className="meal-number">
                        0{meals.indexOf(m) + 1}
                      </span>
                    </div>
                    <h3>{m.name}</h3>
                    <p>{m.desc}</p>
                    <span className="meal-tag">
                      {m.category === "Rice" ? (
                        <Flame size={13} />
                      ) : (
                        <Leaf size={13} />
                      )}{" "}
                      {m.tag}
                    </span>
                    <div className="meal-bottom">
                      <div>
                        <strong>{money(m.price)}</strong>
                        <small>
                          / {m.unit}
                          {m.min > 1 ? " · min. 2" : ""}
                        </small>
                      </div>
                      <Button
                        variant="outline"
                        className="add-button"
                        aria-label={"Choose " + m.name}
                        onClick={() => openMeal(m)}
                      >
                        <Plus size={18} />
                      </Button>
                    </div>
                  </article>
                ))}
              </div>
              {filtered.length === 0 && (
                <div className="no-results">
                  <Search />
                  <h3>No meals found</h3>
                  <p>Try another search or browse all meals.</p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setQuery("");
                      setCategory("All meals");
                    }}
                  >
                    Clear filters
                  </Button>
                </div>
              )}
              <div className="menu-footer">
                <span>Freshly prepared. Full of flavour.</span>
                <span>
                  Rice portions start at 2 · Extras charged separately
                </span>
              </div>
            </>
          ) : view === "about" ? (
            <section className="secondary-page about-kitchen">
              <span className="eyebrow">WELCOME TO O’SEUN FOODS</span>
              <h1>Tasty. Healthy. Delightful.</h1>
              <p>A little taste of home, made your way.</p>
              <img
                className="kitchen-image"
                src="/jollof.jpg"
                alt="A serving of jollof rice, chicken and plantain"
              />
              <div className="kitchen-details">
                <h2>Your plate, your choice.</h2>
                <p>
                  Explore our rice dishes, proteins, sides and drinks. Choose
                  your portions and add the extras you love.
                </p>
                <div className="service-facts">
                  <span>
                    Rice from{" "}
                    {money(
                      Math.min(
                        ...meals
                          .filter((m) => m.category === "Rice")
                          .map((m) => m.price),
                      ),
                    )}{" "}
                    / portion
                  </span>
                  <span>Minimum 2 rice portions</span>
                  <span>Delivery {money(DELIVERY_FEE)}</span>
                </div>
                <Button className="primary" onClick={() => setView("menu")}>
                  Explore our menu <ArrowRight size={16} />
                </Button>
              </div>
            </section>
          ) : (
            <section className="secondary-page">
              <span className="eyebrow">
                A LITTLE THOUGHT. A LOT OF FLAVOUR.
              </span>
              <h1>Give a delicious moment.</h1>
              <p>A meal to celebrate, say thank you, or just make their day.</p>
              <div className="gift-design">
                <span className="wordmark">O’Seun Foods</span>
                <Gift size={42} strokeWidth={1} />
                <div>
                  <small>A GOOD-FOOD GIFT</small>
                  <h2>{money(giftAmount)}</h2>
                </div>
              </div>
              <h3>Choose a gift amount</h3>
              <div className="gift-amounts">
                {[5000, 10000, 20000, 50000].map((a) => (
                  <button
                    key={a}
                    className={giftAmount === a ? "selected" : ""}
                    onClick={() => setGiftAmount(a)}
                  >
                    {money(a)}
                  </button>
                ))}
              </div>
              <Button className="primary" onClick={() => setGiftPreview(true)}>
                View gift card <ArrowRight size={16} />
              </Button>
              <p className="muted">
                Gift cards are coming soon. They are not available to buy or
                redeem yet.
              </p>
            </section>
          )}
        </main>
        <aside className="cart-panel" aria-label="Shopping cart">
          <Cart />
        </aside>
      </div>
      <footer className="site-footer">
        <span className="wordmark">O’Seun Foods</span>
        <span>Good food brings us together.</span>
        <span>Tasty. Healthy. Delightful.</span>
      </footer>
      {count > 0 && (
        <Button className="mobile-cart-bar" onClick={() => setCartOpen(true)}>
          <ShoppingBag size={19} />
          <span>View order ({count})</span>
          <b>{money(subtotal)}</b>
        </Button>
      )}
      {message && (
        <div className="toast" role="status">
          <Check size={18} />
          {message}
        </div>
      )}
      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="meal-dialog">
          <DialogTitle>{selected?.name}</DialogTitle>
          <DialogDescription>{selected?.desc}</DialogDescription>
          {selected && (
            <>
              <div className="detail-price">
                {money(selected.price)} <small>per {selected.unit}</small>
              </div>
              <div className="quantity-row">
                <div>
                  <Label>How many {selected.unit}s?</Label>
                  <p>
                    Minimum {selected.min} {selected.unit}
                    {selected.min > 1 ? "s" : ""}
                  </p>
                </div>
                <div className="stepper">
                  <button
                    aria-label="Decrease quantity"
                    disabled={qty <= selected.min}
                    onClick={() => setQty(qty - 1)}
                  >
                    <Minus size={16} />
                  </button>
                  <span aria-live="polite">{qty}</span>
                  <button
                    aria-label="Increase quantity"
                    onClick={() => setQty(qty + 1)}
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
              {selected.category === "Rice" && (
                <fieldset className="extras">
                  <legend>
                    Make it a full plate{" "}
                    <small>Optional · extras per portion</small>
                  </legend>
                  {extraOptions.map((e) => (
                    <label key={e.id}>
                      <input
                        type="checkbox"
                        checked={extras.includes(e.id)}
                        onChange={() =>
                          setExtras(
                            extras.includes(e.id)
                              ? extras.filter((id) => id !== e.id)
                              : [...extras, e.id],
                          )
                        }
                      />
                      <span>{e.name}</span>
                      <b>+{money(e.price)}</b>
                    </label>
                  ))}
                </fieldset>
              )}
              <Label htmlFor="meal-note">
                Anything we should know?{" "}
                <span className="muted">(optional)</span>
              </Label>
              <Input
                id="meal-note"
                value={note}
                maxLength={160}
                placeholder="E.g. pack the sauce separately"
                onChange={(e) => setNote(e.target.value)}
              />
              <Button className="primary" onClick={addMeal}>
                Add {qty} to order{" "}
                <span>
                  {money(
                    (selected.price +
                      extraOptions
                        .filter((e) => extras.includes(e.id))
                        .reduce((s, e) => s + e.price, 0)) *
                      qty,
                  )}
                </span>
              </Button>
            </>
          )}
        </DialogContent>
      </Dialog>
      <Dialog open={cartOpen} onOpenChange={setCartOpen}>
        <DialogContent className="mobile-cart-dialog">
          <DialogTitle className="sr-only">Your cart</DialogTitle>
          <DialogDescription className="sr-only">
            Review your meals before checkout.
          </DialogDescription>
          <Cart />
        </DialogContent>
      </Dialog>
      <Dialog open={checkout} onOpenChange={setCheckout}>
        <DialogContent className="checkout-dialog">
          <DialogTitle>Your order summary</DialogTitle>
          <DialogDescription>
            Review your meals, portions and delivery charge.
          </DialogDescription>
          <ul className="review-lines">
            {cart.map((line) => {
              const meal = meals.find((m) => m.id === line.id)!;
              return (
                <li key={line.key}>
                  <div>
                    <strong>
                      {line.qty} × {meal.name}
                    </strong>
                    {line.extras.length > 0 && (
                      <small>
                        With{" "}
                        {extraOptions
                          .filter((e) => line.extras.includes(e.id))
                          .map((e) => e.name)
                          .join(", ")}{" "}
                        per portion
                      </small>
                    )}
                    {line.note && <small>{line.note}</small>}
                  </div>
                  <b>{money(lineTotal(line))}</b>
                </li>
              );
            })}
          </ul>
          <div className="cart-totals">
            <div>
              <span>Meals and extras</span>
              <span>{money(subtotal)}</span>
            </div>
            <div>
              <span>Delivery</span>
              <span>{money(delivery)}</span>
            </div>
            <div className="total">
              <strong>Total</strong>
              <strong>{money(subtotal + delivery)}</strong>
            </div>
          </div>
          <div className="ordering-notice">
            <h3>Online ordering opens soon</h3>
            <p>
              You can explore the menu and build your meal. We are not accepting
              orders or payments through this website yet.
            </p>
          </div>
          <Button className="primary" onClick={() => setCheckout(false)}>
            Continue browsing <ArrowRight size={17} />
          </Button>
        </DialogContent>
      </Dialog>
      <Dialog open={giftPreview} onOpenChange={setGiftPreview}>
        <DialogContent>
          <DialogTitle>A little gift, a lovely meal</DialogTitle>
          <DialogDescription>
            A thoughtful way to share good food. Gift cards are coming soon;
            purchasing and redemption are not available yet.
          </DialogDescription>
          <div className="gift-design small">
            <span className="wordmark">O’Seun Foods</span>
            <Gift size={30} />
            <h2>{money(giftAmount)}</h2>
          </div>
          <Button className="primary" onClick={() => setGiftPreview(false)}>
            Looks good
          </Button>
        </DialogContent>
      </Dialog>
      <Dialog open={info} onOpenChange={setInfo}>
        <DialogContent>
          <DialogTitle>Good food for the whole team</DialogTitle>
          <DialogDescription>
            Meals for meetings, office lunches and team celebrations.
          </DialogDescription>
          <p>
            Online company ordering is coming soon. Explore our menu while we
            prepare this service.
          </p>
          <Button
            className="primary"
            onClick={() => {
              setInfo(false);
              setView("menu");
            }}
          >
            Browse the menu
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
