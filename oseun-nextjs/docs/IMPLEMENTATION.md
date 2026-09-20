# Implementation map

## Current phase

Standalone frontend foundation. Customer interactions are functional simulations. Staff screens use isolated in-memory samples. Admin, company, rider and logistics screens are clearly labelled planned-workflow starters. No real orders, accounts, API endpoints or integrations exist yet.

## Actors and identity

There are six business actor categories. Inventory is an entity, not a seventh actor.

| Actor                    | Intended access boundary                                                          |
| ------------------------ | --------------------------------------------------------------------------------- |
| Customer                 | Their own profile, orders and gift-card activity                                  |
| Admin / restaurant owner | Restaurant-wide management; separate named accounts even with shared permissions  |
| Restaurant staff         | Assigned restaurant menu and inventory                                            |
| Company                  | Organization represented by individually authenticated authorized representatives |
| Rider                    | Assigned deliveries and only the delivery details needed to complete them         |
| Logistics agency         | Own agency users, riders and assigned deliveries                                  |

Implement permissions on every server operation. Hiding a link or adding a frontend role selector is insufficient. This starter intentionally has no pretend login or hardcoded credentials.

## Suggested entities and relationships

- User → Role assignments → Restaurant or Organization scope.
- Company → CompanyMembership → User (representative).
- LogisticsAgency → AgencyMembership → User; Agency → Rider → Delivery.
- Restaurant → MenuItem; Restaurant → InventoryItem.
- InventoryItem (id, restaurantId, name, unit, quantityOnHand, reorderLevel, createdAt, updatedAt).
- User (staff) → StockMovement (id, inventoryItemId, actorUserId, type, quantity, reason, occurredAt).
- MenuItem → RecipeIngredient → InventoryItem. Raw rice measured in kg is distinct from cooked rice sold by portion. Define recipe yields before calculating stock deductions.
- Order → OrderLine → MenuItem; Order → Delivery; Order → PaymentAttempt.
- GiftCard → GiftCardLedgerEntry; ledger entries link to payments/orders where applicable.

These are implementation suggestions, not an updated authoritative ERD. The uploaded architecture workbook has not been modified in this task.

## Connect the customer flow

1. Replace `lib/menu.ts` sample data with a menu API or server-loaded data.
2. Keep menu pricing, availability, rice minimums and delivery rules authoritative on the server.
3. Submit only item IDs, quantities, selected extras and necessary delivery details. Recompute prices; never trust browser totals.
4. Persist orders and reserve/deduct stock atomically with explicit cancellation/refund policies.
5. Add verified payment webhooks, unique event IDs and idempotent processing. A browser redirect is not proof of payment.
6. Update the order history from persisted customer-scoped records.

## Gift cards and payments

Current payment options are UI illustrations only. Decide on a supported Nigerian payment provider before implementation. Keep its secret keys server-side. Store provider references and payment state, not raw card numbers or CVV.

Gift-card issuance should follow verified funding. Redemption must atomically debit a ledger and handle partial balance, expiry policy, reversals and failed split payments. Reserve balance during checkout and release it on cancellation/timeout. No static gift codes or editable browser balances should determine value.

## Inventory and menu

Replace local inventory controls with server-authorized stock movement commands containing a reason and actor ID. Store movements as an audit history. Guard against concurrent deductions and negative stock. Menu availability needs one shared source used by both staff and customer screens. Existing demo switches deliberately do not claim to update other pages.

## Production privacy work

Minimize collected fields, isolate organization data, scope delivery PII, define retention/deletion policies, record auditable privileged actions, protect secrets, and review backups, provider contracts and hosting/data-transfer arrangements against applicable Nigerian requirements. Add reviewed privacy notices before collecting real personal information. Legal compliance is not established by this starter.
