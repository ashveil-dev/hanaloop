CREATE TABLE groups (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    parent_id BIGINT REFERENCES groups(id) ON DELETE SET NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE emission_records (
    id BIGSERIAL PRIMARY KEY,
    group_id BIGINT NOT NULL REFERENCES groups(id) ON DELETE CASCADE,
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

CREATE INDEX idx_emission_records_recorded_at
ON emission_records(recorded_at);

CREATE INDEX idx_emission_records_scope_type
ON emission_records(scope_type);