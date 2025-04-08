---
layout: post
title: "Prediction of Feed Stream Yields in a Gas Processing Plant"
date: 2025-04-08
math: true
---


## Introduction

This project was an initial attempt of mine to apply Machine Learning techniques to a real-world challenge I encountered in my professional experience in the energy sector. Specifically, I explored how AI could be used to improve the prediction of feed stream yields in gas processing plants — a key part of production planning and optimization.

Due to the confidentiality of the actual operational data, the data presented here has been altered or synthesized to preserve privacy. However, it still captures the structure and complexity of the real problem, and is sufficient for demonstrating the methodology and results.

---

## Abstract

Gas processing plants handle impure NGL and inlet gas streams, producing valuable components such as Natural Gas (C1), NGLs (C2+), Condensate, and Sulphur. Predicting the output yields of different feed streams is a complex problem, especially when pipelines are unmetered or provide unreliable data.

This study explores Machine Learning techniques — from regression models to neural networks — for yield prediction. The models showed improved accuracy over traditional empirical methods used in industry, highlighting the potential of AI for enhancing decision-making in the energy sector.

---

## Problem Overview

Gas plants vary significantly in operation and feed composition. Due to limited instrumentation and historical data collection challenges, engineers often rely on simplified algebraic methods and heuristics to estimate product yields.

Yields here are defined as:

$$
\text{Yield} = \frac{\text{Product Volume}}{\text{Feed Volume}}
$$

Each feed can produce four possible outputs:
- C1 (Methane)
- NGL (C2+)
- Condensate
- Sulphur

---

## Data Description

The dataset includes over 1,200 daily records from five gas plants. Each row captures input feed volumes and corresponding output product volumes.

Plants are either:
- **Single-feed** (e.g., Plant B, Plant K, Plant S)
- **Multi-feed** (e.g., Plant X, Plant Y)

### Sample Inputs:

| Feed | Plant B | Plant K | Plant S | Plant X | Plant Y |
|------|---------|---------|---------|---------|---------|
| B    | ✓       |         |         | ✓       | ✓       |
| K    |         | ✓       |         | ✓       | ✓       |
| S    |         |         | ✓       | ✓       | ✓       |
| i    |         |         |         | ✓       | ✓       |
| O    |         |         |         |         | ✓       |
| N    |         |         |         |         | ✓       |

### Sample Outputs:

| Product     | Plant B | Plant K | Plant S | Plant X | Plant Y |
|-------------|---------|---------|---------|---------|---------|
| C1          | ✓       | ✓       | ✓       | ✓       | ✓       |
| NGL         | ✓       | ✓       | ✓       | ✓       | ✓       |
| Sulphur     |         |         | ✓       | ✓       | ✓       |
| Condensate  |         |         | ✓       | ✓       |         |

---

## Methodology

1. **Data Cleaning**:
   - Negative and zero values removed.
   - Outliers detected using Local Outlier Factor (LOF).
2. **Correlation Analysis**:
   - Pearson’s correlation coefficient used to evaluate linear dependencies.
   - High correlation found in single-feed plants.
   - Multi-feed plants showed weaker linear relationships.
3. **Modeling Approaches**:
   - Linear Regression
   - Decision Tree
   - Random Forest
   - Support Vector Regressor
   - Neural Networks (Fully Connected Networks)

### Sample Correlation (Plant B):

|         | Feed B | C1    | NGL   |
|---------|--------|-------|-------|
| Feed B  | 1.00   | 0.95  | 0.67  |
| C1      | 0.95   | 1.00  | 0.67  |
| NGL     | 0.67   | 0.67  | 1.00  |

---

## Model Results

### Classical Models on Plant X:

| Model                 | R²     | MSE      | RMSE    | MAE     | CMAPE   |
|----------------------|--------|----------|---------|---------|---------|
| Linear Regression     | 0.31   | 137k     | 370     | 223     | 91.0%   |
| Decision Tree         | -0.09  | 178k     | 422     | 204     | 91.4%   |
| Random Forest         | 0.45   | 124k     | 352     | 186     | 92.9%   |
| Support Vector Regr.  | 0.04   | 217k     | 466     | 230     | 91.0%   |

### On Plant Y:

| Model                 | R²     | MSE      | RMSE    | MAE     | CMAPE   |
|----------------------|--------|----------|---------|---------|---------|
| Linear Regression     | 0.40   | 377k     | 614     | 331     | 91.1%   |
| Random Forest         | 0.59   | 213k     | 461     | 229     | 93.1%   |

---

## Neural Network Results

Using NN initialized with linear regression weights improved performance.

| Metric        | Value         |
|---------------|---------------|
| MSE           | 289,751       |
| CMAPE         | 91.16%        |
| R² Score      | 0.989         |

---

## Yield Comparison

| Feed | Empirical C1 | NN C1 | Empirical NGL | NN NGL | Empirical S | NN S |
|------|--------------|-------|----------------|--------|--------------|------|
| B    | 0.72         | 1.18  | 7.80           | 9.74   | 1.55         | 2.69 |
| S    | 0.84         | 0.12  | 2.00           | 9.35   | 2.00         | 0.16 |
| K    | 0.70         | 0.14  | 9.47           | 3.10   | 0.00         | 0.00 |
| i    | 0.84         | 0.42  | 2.49           | 3.86   | 0.90         | 1.43 |
| O    | 0.50         | 0.98  | 23.4           | 12.18  | 1.90         | 2.12 |
| N    | 0.80         | 1.75  | 6.67           | 10.45  | 0.60         | 1.42 |

---

## Visuals

Make sure to upload these to `/images/`:

- `PlantB_allPlot_notClean.png`
- `plantK_products.png`
- `PlantX_NGLColor_feeds_notClean.png`
- `PlantY_iColor_products_notClean.png`
- `wihwithout.png`

Then include them like:

```html
<img src="{{ '/images/PlantB_allPlot_notClean.png' | relative_url }}" alt="Feed B Output">
```

---

## Conclusion

This exploration demonstrated how AI and ML can augment yield estimation in gas processing operations. Neural networks, in particular, showed great promise in modeling nonlinear behavior in multi-feed plants, outperforming classical models and empirical methods.

The project serves as a foundation for future efforts to integrate predictive modeling into industrial planning — especially once more granular or real-time features become available.

---

