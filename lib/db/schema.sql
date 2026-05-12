CREATE TABLE countries (
    id UUID PRIMARY KEY,
    name TEXT NOT NULL,
    code VARCHAR(10) NOT NULL UNIQUE
);

CREATE TABLE country_emissions (
    id UUID PRIMARY KEY,
    country_id UUID NOT NULL REFERENCES countries(id) ON DELETE CASCADE,
    year_month VARCHAR(7) NOT NULL,
    emissions NUMERIC NOT NULL
);

CREATE TABLE companies (
    id UUID PRIMARY KEY,
    country_id UUID NOT NULL REFERENCES countries(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    country VARCHAR(10) NOT NULL
);

CREATE TABLE company_emissions (
    id UUID PRIMARY KEY,
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    year_month VARCHAR(7) NOT NULL,
    emissions NUMERIC NOT NULL
);

CREATE TABLE posts (
    id UUID PRIMARY KEY,
    title TEXT NOT NULL,
    resource_uid UUID NOT NULL,
    date_time TIMESTAMP NOT NULL,
    content TEXT NOT NULL
);