CREATE TABLE groups (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    parent_id BIGINT REFERENCES groups(id) ON DELETE SET NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE emission_factors (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    factor NUMERIC(15, 6) NOT NULL,
    input_unit VARCHAR(50) NOT NULL,
    output_unit VARCHAR(50) NOT NULL DEFAULT 'kgCO2e',
    description VARCHAR(500),
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_emission_factors_category ON emission_factors(category);

CREATE TABLE emission_records (
    id BIGSERIAL PRIMARY KEY,
    group_id BIGINT NOT NULL REFERENCES groups(id) ON DELETE CASCADE,
    emission_factor_id BIGINT NOT NULL REFERENCES emission_factors(id) ON DELETE RESTRICT,
    scope_type VARCHAR(20) NOT NULL CHECK (
        scope_type IN ('SCOPE1', 'SCOPE2', 'SCOPE3')
    ),
    amount NUMERIC(15, 2) NOT NULL,
    unit VARCHAR(20) NOT NULL DEFAULT 'tCO2e',
    recorded_at DATE NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_emission_records_group_id
ON emission_records(group_id);

CREATE INDEX idx_emission_records_emission_factor_id
ON emission_records(emission_factor_id);

CREATE INDEX idx_emission_records_recorded_at
ON emission_records(recorded_at);

CREATE INDEX idx_emission_records_scope_type
ON emission_records(scope_type);

-- =========================
-- EXTRA GROUPS
-- =========================

INSERT INTO groups (id, name, parent_id)
VALUES

(1, 'HanaLoop Holdings', NULL),

-- 2단계
(2, 'Korea Branch', 1),
(3, 'Japan Branch', 1),

-- 3단계
(4, 'Seoul Factory', 2),
(5, 'Busan Factory', 2),
(6, 'Tokyo Factory', 3),

-- 4단계
(7, 'Seoul Factory Line A', 4),
(8, 'Seoul Factory Line B', 4),
(9, 'Busan Packaging Center', 5),

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
-- EMISSION FACTORS
-- =========================

INSERT INTO emission_factors (id, name, category, factor, input_unit, output_unit, description)
VALUES (1, '전기', 'ELECTRICITY', 0.456000, 'kWh', 'kgCO2e', '한국 전력망 전력 사용 배출 계수');

INSERT INTO emission_factors (id, name, category, factor, input_unit, output_unit, description)
VALUES (2, '도시가스', 'GAS', 2.176000, 'Nm3', 'kgCO2e', '도시가스 연소 배출 계수');

INSERT INTO emission_factors (id, name, category, factor, input_unit, output_unit, description)
VALUES (3, '경유', 'FUEL', 2.610000, 'L', 'kgCO2e', '경유 연료 배출 계수');

INSERT INTO emission_factors (id, name, category, factor, input_unit, output_unit, description)
VALUES (4, '휘발유', 'FUEL', 2.097000, 'L', 'kgCO2e', '휘발유 연료 배출 계수');

INSERT INTO emission_factors (id, name, category, factor, input_unit, output_unit, description)
VALUES (5, 'LPG', 'GAS', 3.003000, 'kg', 'kgCO2e', 'LPG 연소 배출 계수');

INSERT INTO emission_factors (id, name, category, factor, input_unit, output_unit, description)
VALUES (6, '등유', 'FUEL', 2.519000, 'L', 'kgCO2e', '등유(케로신) 연소 배출 계수');

INSERT INTO emission_factors (id, name, category, factor, input_unit, output_unit, description)
VALUES (7, '프로판', 'GAS', 2.984000, 'kg', 'kgCO2e', '프로판 연소 배출 계수');

INSERT INTO emission_factors (id, name, category, factor, input_unit, output_unit, description)
VALUES (8, '스팀(외부)', 'HEAT', 0.059000, 'kg', 'kgCO2e', '외부 공급 스팀 사용 배출 계수');

INSERT INTO emission_factors (id, name, category, factor, input_unit, output_unit, description)
VALUES (9, '화물 운송', 'TRANSPORT', 0.162000, 't·km', 'kgCO2e', '도로 화물 운송(5톤급) 배출 계수');

INSERT INTO emission_factors (id, name, category, factor, input_unit, output_unit, description)
VALUES (10, '폐기물 매립', 'WASTE', 0.586000, 'kg', 'kgCO2e', '일반 폐기물 매립 배출 계수');

-- =========================
-- EXTRA EMISSION RECORDS
-- =========================

INSERT INTO emission_records
(group_id, emission_factor_id, scope_type, amount, unit, recorded_at)
VALUES

-- =========================
-- HanaLoop Holdings
-- =========================
(1, 1, 'SCOPE1', 1200.50, 'kWh', '2026-05-01'),
(1, 1, 'SCOPE2', 980.30, 'kWh', '2026-05-01'),
(1, 1, 'SCOPE3', 2500.80, 'kWh', '2026-05-01'),

-- =========================
-- Korea Branch
-- =========================
(2, 1, 'SCOPE1', 800.20, 'kWh', '2026-05-01'),
(2, 1, 'SCOPE2', 620.10, 'kWh', '2026-05-01'),
(2, 1, 'SCOPE3', 1400.00, 'kWh', '2026-05-01'),

-- =========================
-- Japan Branch
-- =========================
(3, 1, 'SCOPE1', 650.00, 'kWh', '2026-05-01'),
(3, 1, 'SCOPE2', 540.40, 'kWh', '2026-05-01'),
(3, 1, 'SCOPE3', 1200.70, 'kWh', '2026-05-01'),

-- =========================
-- Seoul Factory
-- =========================
(4, 1, 'SCOPE1', 420.00, 'kWh', '2026-05-01'),
(4, 1, 'SCOPE2', 310.20, 'kWh', '2026-05-01'),
(4, 1, 'SCOPE3', 900.50, 'kWh', '2026-05-01'),

-- =========================
-- Busan Factory
-- =========================
(5, 1, 'SCOPE1', 380.30, 'kWh', '2026-05-01'),
(5, 1, 'SCOPE2', 290.10, 'kWh', '2026-05-01'),
(5, 1, 'SCOPE3', 850.00, 'kWh', '2026-05-01'),

-- =========================
-- Tokyo Factory
-- =========================
(6, 1, 'SCOPE1', 410.00, 'kWh', '2026-05-01'),
(6, 1, 'SCOPE2', 330.00, 'kWh', '2026-05-01'),
(6, 1, 'SCOPE3', 910.20, 'kWh', '2026-05-01'),

-- =========================
-- Seoul Factory Line A
-- =========================
(7, 1, 'SCOPE1', 210.50, 'kWh', '2026-05-01'),
(7, 1, 'SCOPE2', 150.00, 'kWh', '2026-05-01'),
(7, 1, 'SCOPE3', 420.30, 'kWh', '2026-05-01'),

-- =========================
-- Seoul Factory Line B
-- =========================
(8, 1, 'SCOPE1', 190.20, 'kWh', '2026-05-01'),
(8, 1, 'SCOPE2', 140.50, 'kWh', '2026-05-01'),
(8, 1, 'SCOPE3', 390.80, 'kWh', '2026-05-01'),

-- =========================
-- Busan Packaging Center
-- =========================
(9, 1, 'SCOPE1', 120.00, 'kWh', '2026-05-01'),
(9, 1, 'SCOPE2', 90.20, 'kWh', '2026-05-01'),
(9, 1, 'SCOPE3', 210.50, 'kWh', '2026-05-01'),

-- Incheon Logistics Center
(10, 1, 'SCOPE1', 180.20, 'kWh', '2026-05-02'),
(10, 1, 'SCOPE2', 130.10, 'kWh', '2026-05-02'),
(10, 1, 'SCOPE3', 420.50, 'kWh', '2026-05-02'),

-- Daegu Factory
(11, 1, 'SCOPE1', 340.00, 'kWh', '2026-05-02'),
(11, 1, 'SCOPE2', 240.40, 'kWh', '2026-05-02'),
(11, 1, 'SCOPE3', 780.10, 'kWh', '2026-05-02'),

-- Daejeon Research Center
(12, 1, 'SCOPE1', 120.10, 'kWh', '2026-05-02'),
(12, 1, 'SCOPE2', 98.20, 'kWh', '2026-05-02'),
(12, 1, 'SCOPE3', 210.00, 'kWh', '2026-05-02'),

-- Osaka Factory
(13, 1, 'SCOPE1', 500.50, 'kWh', '2026-05-02'),
(13, 1, 'SCOPE2', 370.80, 'kWh', '2026-05-02'),
(13, 1, 'SCOPE3', 990.30, 'kWh', '2026-05-02'),

-- Nagoya Logistics Center
(14, 1, 'SCOPE1', 240.10, 'kWh', '2026-05-02'),
(14, 1, 'SCOPE2', 180.40, 'kWh', '2026-05-02'),
(14, 1, 'SCOPE3', 460.00, 'kWh', '2026-05-02'),

-- Seoul QA Center
(15, 1, 'SCOPE1', 88.50, 'kWh', '2026-05-02'),
(15, 1, 'SCOPE2', 65.10, 'kWh', '2026-05-02'),
(15, 1, 'SCOPE3', 140.20, 'kWh', '2026-05-02'),

-- Seoul AI Control Room
(16, 1, 'SCOPE1', 72.40, 'kWh', '2026-05-02'),
(16, 1, 'SCOPE2', 55.90, 'kWh', '2026-05-02'),
(16, 1, 'SCOPE3', 130.50, 'kWh', '2026-05-02'),

-- Busan Cold Storage
(17, 1, 'SCOPE1', 150.00, 'kWh', '2026-05-02'),
(17, 1, 'SCOPE2', 110.50, 'kWh', '2026-05-02'),
(17, 1, 'SCOPE3', 320.40, 'kWh', '2026-05-02'),

-- Busan Export Hub
(18, 1, 'SCOPE1', 210.20, 'kWh', '2026-05-02'),
(18, 1, 'SCOPE2', 170.60, 'kWh', '2026-05-02'),
(18, 1, 'SCOPE3', 430.90, 'kWh', '2026-05-02'),

-- Tokyo Packaging Line
(19, 1, 'SCOPE1', 190.00, 'kWh', '2026-05-02'),
(19, 1, 'SCOPE2', 140.00, 'kWh', '2026-05-02'),
(19, 1, 'SCOPE3', 350.70, 'kWh', '2026-05-02'),

-- Tokyo Research Lab
(20, 1, 'SCOPE1', 95.50, 'kWh', '2026-05-02'),
(20, 1, 'SCOPE2', 70.10, 'kWh', '2026-05-02'),
(20, 1, 'SCOPE3', 180.00, 'kWh', '2026-05-02'),

-- Seoul Factory Line A - Unit 1
(21, 1, 'SCOPE1', 60.20, 'kWh', '2026-05-02'),
(21, 1, 'SCOPE2', 42.50, 'kWh', '2026-05-02'),
(21, 1, 'SCOPE3', 95.10, 'kWh', '2026-05-02'),

-- Seoul Factory Line A - Unit 2
(22, 1, 'SCOPE1', 58.90, 'kWh', '2026-05-02'),
(22, 1, 'SCOPE2', 40.20, 'kWh', '2026-05-02'),
(22, 1, 'SCOPE3', 90.40, 'kWh', '2026-05-02'),

-- Seoul Factory Line B - Unit 1
(23, 1, 'SCOPE1', 54.00, 'kWh', '2026-05-02'),
(23, 1, 'SCOPE2', 38.20, 'kWh', '2026-05-02'),
(23, 1, 'SCOPE3', 82.60, 'kWh', '2026-05-02'),

-- Seoul Factory Line B - Unit 2
(24, 1, 'SCOPE1', 50.50, 'kWh', '2026-05-02'),
(24, 1, 'SCOPE2', 35.40, 'kWh', '2026-05-02'),
(24, 1, 'SCOPE3', 79.20, 'kWh', '2026-05-02'),

-- Osaka Smart Grid Center
(25, 1, 'SCOPE1', 130.20, 'kWh', '2026-05-02'),
(25, 1, 'SCOPE2', 99.90, 'kWh', '2026-05-02'),
(25, 1, 'SCOPE3', 260.00, 'kWh', '2026-05-02'),

-- Nagoya Carbon Monitoring Team
(26, 1, 'SCOPE1', 44.20, 'kWh', '2026-05-02'),
(26, 1, 'SCOPE2', 30.10, 'kWh', '2026-05-02'),
(26, 1, 'SCOPE3', 70.50, 'kWh', '2026-05-02'),

-- Daejeon Renewable Energy Team
(27, 1, 'SCOPE1', 38.10, 'kWh', '2026-05-02'),
(27, 1, 'SCOPE2', 25.00, 'kWh', '2026-05-02'),
(27, 1, 'SCOPE3', 60.30, 'kWh', '2026-05-02'),

-- Incheon Shipping Dock
(28, 1, 'SCOPE1', 115.60, 'kWh', '2026-05-02'),
(28, 1, 'SCOPE2', 80.40, 'kWh', '2026-05-02'),
(28, 1, 'SCOPE3', 210.70, 'kWh', '2026-05-02'),

-- Busan Export Automation Room
(29, 1, 'SCOPE1', 66.00, 'kWh', '2026-05-02'),
(29, 1, 'SCOPE2', 48.20, 'kWh', '2026-05-02'),
(29, 1, 'SCOPE3', 120.90, 'kWh', '2026-05-02');