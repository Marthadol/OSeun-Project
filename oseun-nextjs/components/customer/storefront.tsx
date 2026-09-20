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
  ReceiptText,
  Leaf,
  Flame,
  Check,
  ShieldCheck,
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
  extraOptions,
  money,
  lineTotal,
  type Meal,
  type Line,
} from "@/lib/menu";
import Link from "next/link";
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
    [checkout, setCheckout] = useState(false),
    [confirmed, setConfirmed] = useState(false),
    [payment, setPayment] = useState("card");
  const [giftAmount, setGiftAmount] = useState(10000),
    [giftPreview, setGiftPreview] = useState(false),
    [info, setInfo] = useState(false),
    [message, setMessage] = useState("");
  const subtotal = cart.reduce((s, l) => s + lineTotal(l), 0),
    count = cart.reduce((s, l) => s + l.qty, 0),
    delivery = cart.length ? 1500 : 0;
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
            setConfirmed(false);
          }}
        >
          Continue to checkout <ArrowRight size={17} />
        </Button>
        <p className="cart-foot">
          <ShieldCheck size={14} /> UI preview · no payment collected
        </p>
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
            ["orders", "My orders"],
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
          <span className="preview-pill">UI preview</span>
          <button
            className="cart-mobile icon-button"
            aria-label={"Open cart, " + count + " items"}
            onClick={() => setCartOpen(true)}
          >
            <ShoppingBag size={21} />
            {count > 0 && <sup>{count}</sup>}
          </button>
          <Link className="workspace-link" href="/workspaces">
            Workspaces
          </Link>
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
                  <small>Rice from {money(1500)} / portion · minimum 2</small>
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
                <span>Sample menu & prices for design review</span>
              </div>
            </>
          ) : view === "orders" ? (
            <section className="secondary-page">
              <span className="eyebrow">YOUR TABLE, YOUR WAY</span>
              <h1>My orders</h1>
              <div className="empty-page">
                <ReceiptText size={46} strokeWidth={1.2} />
                <h2>Your next favourite is waiting.</h2>
                <p>
                  Your real order history will appear here once accounts and
                  ordering are connected.
                </p>
                <Button className="primary" onClick={() => setView("menu")}>
                  Explore the menu <ArrowRight size={16} />
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
                Preview gift card <ArrowRight size={16} />
              </Button>
              <p className="muted">
                Gift-card purchasing will be available when payments are
                connected.
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
        <span>O’Seun · Interface preview</span>
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
          <DialogTitle>
            {confirmed
              ? "Your order preview is ready"
              : "Let’s bring it to you"}
          </DialogTitle>
          <DialogDescription>
            {confirmed
              ? "This was a preview. No order was sent and no payment was taken."
              : "Preview checkout with sample details. Nothing entered here is sent to a server."}
          </DialogDescription>
          {confirmed ? (
            <div className="confirmation">
              <span className="bag-circle">
                <Check size={36} />
              </span>
              <h3>
                {count} items · {money(subtotal + delivery)}
              </h3>
              <p>
                Your chosen meals and payment option are ready for the next
                stage of development.
              </p>
              <Button className="primary" onClick={() => setCheckout(false)}>
                Back to menu
              </Button>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setConfirmed(true);
              }}
            >
              <div className="form-grid">
                <div>
                  <Label htmlFor="name">Recipient name</Label>
                  <Input
                    id="name"
                    required
                    autoComplete="off"
                    placeholder="Sample recipient"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    required
                    pattern="[+0-9 ]{10,18}"
                    placeholder="0800 000 0000"
                    autoComplete="off"
                  />
                </div>
              </div>
              <Label htmlFor="address">Delivery address</Label>
              <Input
                id="address"
                required
                minLength={8}
                placeholder="Street, area and city"
                autoComplete="off"
              />
              <fieldset className="payment-choices">
                <legend>Payment method preview</legend>
                {[
                  ["card", "Debit card"],
                  ["transfer", "Bank transfer"],
                  ["gift", "Gift card + balance"],
                ].map(([id, label]) => (
                  <label key={id}>
                    <input
                      type="radio"
                      name="payment"
                      value={id}
                      checked={payment === id}
                      onChange={() => setPayment(id)}
                    />
                    {label}
                  </label>
                ))}
              </fieldset>
              {payment === "gift" && (
                <p className="helper">
                  A connected gift card will cover its available balance. Any
                  remaining amount can be paid online.
                </p>
              )}
              <div className="checkout-summary">
                <span>Order + estimated delivery</span>
                <strong>{money(subtotal + delivery)}</strong>
              </div>
              <Button type="submit" className="primary">
                Preview order <ArrowRight size={17} />
              </Button>
              <p className="helper">
                Payment processing and delivery availability are not connected
                in this UI preview.
              </p>
            </form>
          )}
        </DialogContent>
      </Dialog>
      <Dialog open={giftPreview} onOpenChange={setGiftPreview}>
        <DialogContent>
          <DialogTitle>A little gift, a lovely meal</DialogTitle>
          <DialogDescription>
            Your selected design. Purchasing is not enabled in this preview.
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
            The company workspace will let an authorized representative browse
            corporate menus, place bulk orders and track company deliveries.
          </DialogDescription>
          <p>
            Company accounts and bulk pricing are planned for the next UI stage.
            You can explore the customer menu now.
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
