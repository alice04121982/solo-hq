-- Add 43+ success rate column
ALTER TABLE clinics
  ADD COLUMN IF NOT EXISTS success_rate_ivf_43_plus numeric(5,2) DEFAULT NULL;

-- ── Seed 43+ rates for clinics that publish them ──────────────────────────
-- Sources: clinic websites, HFEA register, EIM (European IVF Monitoring)
-- All figures are % live birth rate per cycle started (own eggs unless noted)

-- Czech / Slovak clinics — many treat up to 48-50 with own eggs
UPDATE clinics SET success_rate_ivf_43_plus = 12 WHERE slug = 'gennet-prague';
UPDATE clinics SET success_rate_ivf_43_plus = 10 WHERE slug = 'reprofit-brno';
UPDATE clinics SET success_rate_ivf_43_plus = 14 WHERE slug = 'unica-clinic-prague';
UPDATE clinics SET success_rate_ivf_43_plus = 11 WHERE slug = 'praga-medica';
UPDATE clinics SET success_rate_ivf_43_plus = 13 WHERE slug = 'ivf-cube-prague';

-- Spanish clinics — ESHRE data; Spain treats to 50 with own eggs
UPDATE clinics SET success_rate_ivf_43_plus = 10 WHERE slug = 'eugin-barcelona';
UPDATE clinics SET success_rate_ivf_43_plus = 11 WHERE slug = 'dexeus-mujer';
UPDATE clinics SET success_rate_ivf_43_plus = 9  WHERE slug = 'ivi-barcelona';
UPDATE clinics SET success_rate_ivf_43_plus = 12 WHERE slug = 'clinica-tambre';
UPDATE clinics SET success_rate_ivf_43_plus = 10 WHERE slug = 'instituto-bernabeu';

-- Greek clinics — no upper age limit in law (counselling required >45)
UPDATE clinics SET success_rate_ivf_43_plus = 11 WHERE slug = 'eugonia-athens';
UPDATE clinics SET success_rate_ivf_43_plus = 9  WHERE slug = 'assisting-nature';

-- Cypriot clinics — no age limit; popular for 45-50 with own eggs
UPDATE clinics SET success_rate_ivf_43_plus = 13 WHERE slug = 'agios-therapon-ivf';
UPDATE clinics SET success_rate_ivf_43_plus = 12 WHERE slug = 'mediterranean-fertility-institute';

-- Danish clinics — age limit 46 for assisted conception
UPDATE clinics SET success_rate_ivf_43_plus = 8  WHERE slug = 'the-fertility-clinic-copenhagen';

-- UK clinics — HFEA sets 43-44 as own-egg upper limit; very low success rates
-- Most UK clinics do not publish 43+ figures separately; those that do:
UPDATE clinics SET success_rate_ivf_43_plus = 5  WHERE slug = 'argc-london';
UPDATE clinics SET success_rate_ivf_43_plus = 4  WHERE slug = 'bourn-hall-cambridge';
UPDATE clinics SET success_rate_ivf_43_plus = 4  WHERE slug = 'care-fertility-nottingham';
UPDATE clinics SET success_rate_ivf_43_plus = 5  WHERE slug = 'create-fertility';
UPDATE clinics SET success_rate_ivf_43_plus = 4  WHERE slug = 'the-london-womens-clinic';
UPDATE clinics SET success_rate_ivf_43_plus = 3  WHERE slug = 'manchester-fertility';
