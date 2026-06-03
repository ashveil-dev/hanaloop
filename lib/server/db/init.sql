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
-- EMISSION RECORDS (diverse factors)
-- =========================

-- HanaLoop Holdings
INSERT INTO emission_records (group_id, emission_factor_id, scope_type, amount, unit, recorded_at)
VALUES (1, 2, 'SCOPE1', 320.00, 'Nm3', '2026-01-15');

INSERT INTO emission_records (group_id, emission_factor_id, scope_type, amount, unit, recorded_at)
VALUES (1, 9, 'SCOPE3', 1250.00, 't·km', '2026-01-15');

INSERT INTO emission_records (group_id, emission_factor_id, scope_type, amount, unit, recorded_at)
VALUES (1, 10, 'SCOPE3', 480.00, 'kg', '2026-02-10');

-- Korea Branch
INSERT INTO emission_records (group_id, emission_factor_id, scope_type, amount, unit, recorded_at)
VALUES (2, 2, 'SCOPE1', 540.80, 'Nm3', '2026-02-20');

INSERT INTO emission_records (group_id, emission_factor_id, scope_type, amount, unit, recorded_at)
VALUES (2, 3, 'SCOPE1', 210.00, 'L', '2026-03-05');

INSERT INTO emission_records (group_id, emission_factor_id, scope_type, amount, unit, recorded_at)
VALUES (2, 8, 'SCOPE2', 1500.00, 'kg', '2026-03-05');

-- Japan Branch
INSERT INTO emission_records (group_id, emission_factor_id, scope_type, amount, unit, recorded_at)
VALUES (3, 4, 'SCOPE1', 380.50, 'L', '2026-04-12');

INSERT INTO emission_records (group_id, emission_factor_id, scope_type, amount, unit, recorded_at)
VALUES (3, 9, 'SCOPE3', 890.00, 't·km', '2026-04-12');

-- Seoul Factory
INSERT INTO emission_records (group_id, emission_factor_id, scope_type, amount, unit, recorded_at)
VALUES (4, 2, 'SCOPE1', 920.40, 'Nm3', '2026-05-10');

INSERT INTO emission_records (group_id, emission_factor_id, scope_type, amount, unit, recorded_at)
VALUES (4, 3, 'SCOPE1', 650.00, 'L', '2026-05-10');

INSERT INTO emission_records (group_id, emission_factor_id, scope_type, amount, unit, recorded_at)
VALUES (4, 8, 'SCOPE2', 2200.00, 'kg', '2026-06-01');

INSERT INTO emission_records (group_id, emission_factor_id, scope_type, amount, unit, recorded_at)
VALUES (4, 10, 'SCOPE3', 320.50, 'kg', '2026-06-01');

-- Busan Factory
INSERT INTO emission_records (group_id, emission_factor_id, scope_type, amount, unit, recorded_at)
VALUES (5, 2, 'SCOPE1', 710.20, 'Nm3', '2026-05-15');

INSERT INTO emission_records (group_id, emission_factor_id, scope_type, amount, unit, recorded_at)
VALUES (5, 5, 'SCOPE1', 145.00, 'kg', '2026-06-03');

-- Tokyo Factory
INSERT INTO emission_records (group_id, emission_factor_id, scope_type, amount, unit, recorded_at)
VALUES (6, 6, 'SCOPE1', 290.00, 'L', '2026-04-20');

INSERT INTO emission_records (group_id, emission_factor_id, scope_type, amount, unit, recorded_at)
VALUES (6, 7, 'SCOPE1', 88.50, 'kg', '2026-05-20');

-- Incheon Logistics Center
INSERT INTO emission_records (group_id, emission_factor_id, scope_type, amount, unit, recorded_at)
VALUES (10, 3, 'SCOPE1', 1250.80, 'L', '2026-03-18');

INSERT INTO emission_records (group_id, emission_factor_id, scope_type, amount, unit, recorded_at)
VALUES (10, 4, 'SCOPE1', 980.20, 'L', '2026-04-08');

INSERT INTO emission_records (group_id, emission_factor_id, scope_type, amount, unit, recorded_at)
VALUES (10, 9, 'SCOPE3', 3420.00, 't·km', '2026-05-25');

INSERT INTO emission_records (group_id, emission_factor_id, scope_type, amount, unit, recorded_at)
VALUES (10, 9, 'SCOPE3', 2980.50, 't·km', '2026-06-02');

-- Daegu Factory
INSERT INTO emission_records (group_id, emission_factor_id, scope_type, amount, unit, recorded_at)
VALUES (11, 5, 'SCOPE1', 220.00, 'kg', '2026-02-28');

INSERT INTO emission_records (group_id, emission_factor_id, scope_type, amount, unit, recorded_at)
VALUES (11, 2, 'SCOPE1', 430.60, 'Nm3', '2026-06-01');

-- Nagoya Logistics Center
INSERT INTO emission_records (group_id, emission_factor_id, scope_type, amount, unit, recorded_at)
VALUES (14, 3, 'SCOPE1', 760.00, 'L', '2026-05-08');

INSERT INTO emission_records (group_id, emission_factor_id, scope_type, amount, unit, recorded_at)
VALUES (14, 9, 'SCOPE3', 1850.00, 't·km', '2026-06-04');

-- Busan Cold Storage
INSERT INTO emission_records (group_id, emission_factor_id, scope_type, amount, unit, recorded_at)
VALUES (17, 7, 'SCOPE1', 195.30, 'kg', '2026-01-22');

INSERT INTO emission_records (group_id, emission_factor_id, scope_type, amount, unit, recorded_at)
VALUES (17, 5, 'SCOPE1', 110.00, 'kg', '2026-04-15');

-- Busan Export Hub
INSERT INTO emission_records (group_id, emission_factor_id, scope_type, amount, unit, recorded_at)
VALUES (18, 3, 'SCOPE1', 540.00, 'L', '2026-03-30');

INSERT INTO emission_records (group_id, emission_factor_id, scope_type, amount, unit, recorded_at)
VALUES (18, 9, 'SCOPE3', 2100.00, 't·km', '2026-05-18');

INSERT INTO emission_records (group_id, emission_factor_id, scope_type, amount, unit, recorded_at)
VALUES (18, 10, 'SCOPE3', 890.00, 'kg', '2026-06-02');

-- Incheon Shipping Dock
INSERT INTO emission_records (group_id, emission_factor_id, scope_type, amount, unit, recorded_at)
VALUES (28, 3, 'SCOPE1', 1680.40, 'L', '2026-02-14');

INSERT INTO emission_records (group_id, emission_factor_id, scope_type, amount, unit, recorded_at)
VALUES (28, 9, 'SCOPE3', 4560.00, 't·km', '2026-04-25');

INSERT INTO emission_records (group_id, emission_factor_id, scope_type, amount, unit, recorded_at)
VALUES (28, 9, 'SCOPE3', 5120.80, 't·km', '2026-06-03');

-- Seoul Factory Line A
INSERT INTO emission_records (group_id, emission_factor_id, scope_type, amount, unit, recorded_at)
VALUES (7, 2, 'SCOPE1', 180.50, 'Nm3', '2026-05-28');

INSERT INTO emission_records (group_id, emission_factor_id, scope_type, amount, unit, recorded_at)
VALUES (7, 6, 'SCOPE1', 95.00, 'L', '2026-06-01');

-- Daejeon Research Center
INSERT INTO emission_records (group_id, emission_factor_id, scope_type, amount, unit, recorded_at)
VALUES (12, 1, 'SCOPE2', 450.00, 'kWh', '2026-01-10');

INSERT INTO emission_records (group_id, emission_factor_id, scope_type, amount, unit, recorded_at)
VALUES (12, 8, 'SCOPE2', 680.00, 'kg', '2026-03-22');