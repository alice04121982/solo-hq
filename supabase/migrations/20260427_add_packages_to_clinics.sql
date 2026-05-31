-- Migration: add packages column to clinics
-- Run this in the Supabase dashboard → SQL Editor

ALTER TABLE clinics
  ADD COLUMN IF NOT EXISTS packages jsonb DEFAULT NULL;

COMMENT ON COLUMN clinics.packages IS
  'Array of multi-cycle or guarantee packages. Schema per item:
   { name: string, cycles?: number, price_gbp?: number, includes_meds?: boolean,
     money_back?: boolean, money_back_terms?: string, saves_gbp?: number, description?: string }';

-- Example UPDATE to seed packages for a clinic (replace slug as needed):
-- UPDATE clinics SET packages = '[
--   {
--     "name": "3-Cycle IVF Package",
--     "cycles": 3,
--     "price_gbp": 12500,
--     "includes_meds": false,
--     "money_back": true,
--     "money_back_terms": "Full refund if no live birth after all 3 cycles",
--     "saves_gbp": 3500,
--     "description": "Three complete IVF cycles. If the third cycle is unsuccessful, you receive a full refund."
--   },
--   {
--     "name": "2-Cycle IVF Package",
--     "cycles": 2,
--     "price_gbp": 8500,
--     "includes_meds": false,
--     "money_back": false,
--     "saves_gbp": 1500,
--     "description": "Two IVF cycles at a reduced combined rate."
--   }
-- ]'::jsonb
-- WHERE slug = 'your-clinic-slug';
