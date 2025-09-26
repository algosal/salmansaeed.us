# ⚖️ Karmic Ledger Formula Variables

$$
\text{KarmicScore} = \text{BaseValue} \times \text{SeverityMultiplier} \times \text{ContextModifier} \times \text{DomainAdjustments} \times \text{ContextFactor}
$$

---

## 1. **BaseValue** (weight of the virtue/vice itself)

- **Purpose:** Represents the intrinsic gravity of the action.
- **Range:** `1 → 100`

  - **1** = trivial act (e.g., minor white lie, forgetting to call).
  - **100** = core ethical transgression (betrayal, abuse, sacrilege).

- **Neutral actions:** default `0` (but careful: 0 cancels the formula; we might instead use `1` to mean “neutral baseline”).

---

## 2. **SeverityMultiplier** (scale of the specific instance)

- **Purpose:** Distinguishes between _small breach_ vs. _catastrophic betrayal_.
- **Range:** `0.1 → 5.0`

  - **0.1** = negligible (tiny slip-up, forgivable instantly).
  - **1.0** = standard severity.
  - **5.0** = extreme (life-altering consequences, e.g., stealing life savings, infidelity).

---

## 3. **ContextModifier** (adjusted by situation, need, or intent)

- **Purpose:** Adjusts score based on surrounding conditions.
- **Range:** `–1.0 → +1.0`

  - **+1.0** = context redeems the act (e.g., lie to save a life).
  - **0.0** = context neutral, no shift.
  - **–1.0** = context worsens it (e.g., lie + greed motive).

---

## 4. **DomainAdjustments** (cross-check against opposite virtue/vice)

- **Purpose:** Anchors the event in the moral ecosystem (honesty vs. lying, generosity vs. greed).
- **Range:** `–2.0 → +2.0`

  - **+2.0** = strongly aligned with virtue.
  - **0.0** = neutral or irrelevant.
  - **–2.0** = strongly aligned with vice.

---

## 5. **ContextFactor** (economic/ethical cap adjustment)

- **Purpose:** Prevents billionaires or powerful people from being excused by wealth.
- **Formula Example:**

  $$
  1 + \frac{\text{ExcessiveAsk}}{\text{FairCap}}
  $$

- **Range (practical):** `0.5 → 2.0`

  - **0.5** = act is very light compared to capacity.
  - **1.0** = proportionate ask.
  - **2.0** = exploitative beyond ethical threshold.

---

# 🔢 Example Calculation

Scenario: **Sheela’s family asking \$25K despite history of manipulation.**

- BaseValue = `60` (greed/betrayal = medium-high weight)
- SeverityMultiplier = `2.5` (large financial demand)
- ContextModifier = `–0.7` (extortion context)
- DomainAdjustments = `–1.5` (aligned with selfishness)
- ContextFactor = `1.5` (exceeds ethical cap of “reasonable ask”)

$$
KarmicScore = 60 \times 2.5 \times (-0.7) \times (-1.5) \times 1.5
$$

\= **+236.25 (DR debit)** → heavy negative entry.

---

⚡ With this bounded system, your React component can:

- Take **sliders/inputs** for each variable.
- Display the **calculated score**.
- Show a **ledger balance (CR/DR)** style bank entry.
- Render a **quadrant placement** for visualization.
