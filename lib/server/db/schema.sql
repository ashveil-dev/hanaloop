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