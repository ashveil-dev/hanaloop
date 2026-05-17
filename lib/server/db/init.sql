-- =========================
-- EXTRA GROUPS
-- =========================

INSERT INTO groups (id, name, parent_id)
VALUES

-- Korea Branch Additional
(10, 'Incheon Logistics Center', 2),
(11, 'Daegu Factory', 2),
(12, 'Daejeon Research Center', 2),

-- Japan Branch Additional
(13, 'Osaka Factory', 3),
(14, 'Nagoya Logistics Center', 3),

-- Seoul Factory Children
(15, 'Seoul QA Center', 4),
(16, 'Seoul AI Control Room', 4),

-- Busan Factory Children
(17, 'Busan Cold Storage', 5),
(18, 'Busan Export Hub', 5),

-- Tokyo Factory Children
(19, 'Tokyo Packaging Line', 6),
(20, 'Tokyo Research Lab', 6),

-- Deeper Hierarchy
(21, 'Seoul Factory Line A - Unit 1', 7),
(22, 'Seoul Factory Line A - Unit 2', 7),
(23, 'Seoul Factory Line B - Unit 1', 8),
(24, 'Seoul Factory Line B - Unit 2', 8),

(25, 'Osaka Smart Grid Center', 13),
(26, 'Nagoya Carbon Monitoring Team', 14),
(27, 'Daejeon Renewable Energy Team', 12),
(28, 'Incheon Shipping Dock', 10),
(29, 'Busan Export Automation Room', 18);


-- =========================
-- EXTRA EMISSION RECORDS
-- =========================

INSERT INTO emission_records
(group_id, scope_type, amount, recorded_at)
VALUES

-- Incheon Logistics Center
(10, 'SCOPE1', 180.20, '2026-05-02'),
(10, 'SCOPE2', 130.10, '2026-05-02'),
(10, 'SCOPE3', 420.50, '2026-05-02'),

-- Daegu Factory
(11, 'SCOPE1', 340.00, '2026-05-02'),
(11, 'SCOPE2', 240.40, '2026-05-02'),
(11, 'SCOPE3', 780.10, '2026-05-02'),

-- Daejeon Research Center
(12, 'SCOPE1', 120.10, '2026-05-02'),
(12, 'SCOPE2', 98.20, '2026-05-02'),
(12, 'SCOPE3', 210.00, '2026-05-02'),

-- Osaka Factory
(13, 'SCOPE1', 500.50, '2026-05-02'),
(13, 'SCOPE2', 370.80, '2026-05-02'),
(13, 'SCOPE3', 990.30, '2026-05-02'),

-- Nagoya Logistics Center
(14, 'SCOPE1', 240.10, '2026-05-02'),
(14, 'SCOPE2', 180.40, '2026-05-02'),
(14, 'SCOPE3', 460.00, '2026-05-02'),

-- Seoul QA Center
(15, 'SCOPE1', 88.50, '2026-05-02'),
(15, 'SCOPE2', 65.10, '2026-05-02'),
(15, 'SCOPE3', 140.20, '2026-05-02'),

-- Seoul AI Control Room
(16, 'SCOPE1', 72.40, '2026-05-02'),
(16, 'SCOPE2', 55.90, '2026-05-02'),
(16, 'SCOPE3', 130.50, '2026-05-02'),

-- Busan Cold Storage
(17, 'SCOPE1', 150.00, '2026-05-02'),
(17, 'SCOPE2', 110.50, '2026-05-02'),
(17, 'SCOPE3', 320.40, '2026-05-02'),

-- Busan Export Hub
(18, 'SCOPE1', 210.20, '2026-05-02'),
(18, 'SCOPE2', 170.60, '2026-05-02'),
(18, 'SCOPE3', 430.90, '2026-05-02'),

-- Tokyo Packaging Line
(19, 'SCOPE1', 190.00, '2026-05-02'),
(19, 'SCOPE2', 140.00, '2026-05-02'),
(19, 'SCOPE3', 350.70, '2026-05-02'),

-- Tokyo Research Lab
(20, 'SCOPE1', 95.50, '2026-05-02'),
(20, 'SCOPE2', 70.10, '2026-05-02'),
(20, 'SCOPE3', 180.00, '2026-05-02'),

-- Seoul Factory Line A - Unit 1
(21, 'SCOPE1', 60.20, '2026-05-02'),
(21, 'SCOPE2', 42.50, '2026-05-02'),
(21, 'SCOPE3', 95.10, '2026-05-02'),

-- Seoul Factory Line A - Unit 2
(22, 'SCOPE1', 58.90, '2026-05-02'),
(22, 'SCOPE2', 40.20, '2026-05-02'),
(22, 'SCOPE3', 90.40, '2026-05-02'),

-- Seoul Factory Line B - Unit 1
(23, 'SCOPE1', 54.00, '2026-05-02'),
(23, 'SCOPE2', 38.20, '2026-05-02'),
(23, 'SCOPE3', 82.60, '2026-05-02'),

-- Seoul Factory Line B - Unit 2
(24, 'SCOPE1', 50.50, '2026-05-02'),
(24, 'SCOPE2', 35.40, '2026-05-02'),
(24, 'SCOPE3', 79.20, '2026-05-02'),

-- Osaka Smart Grid Center
(25, 'SCOPE1', 130.20, '2026-05-02'),
(25, 'SCOPE2', 99.90, '2026-05-02'),
(25, 'SCOPE3', 260.00, '2026-05-02'),

-- Nagoya Carbon Monitoring Team
(26, 'SCOPE1', 44.20, '2026-05-02'),
(26, 'SCOPE2', 30.10, '2026-05-02'),
(26, 'SCOPE3', 70.50, '2026-05-02'),

-- Daejeon Renewable Energy Team
(27, 'SCOPE1', 38.10, '2026-05-02'),
(27, 'SCOPE2', 25.00, '2026-05-02'),
(27, 'SCOPE3', 60.30, '2026-05-02'),

-- Incheon Shipping Dock
(28, 'SCOPE1', 115.60, '2026-05-02'),
(28, 'SCOPE2', 80.40, '2026-05-02'),
(28, 'SCOPE3', 210.70, '2026-05-02'),

-- Busan Export Automation Room
(29, 'SCOPE1', 66.00, '2026-05-02'),
(29, 'SCOPE2', 48.20, '2026-05-02'),
(29, 'SCOPE3', 120.90, '2026-05-02');