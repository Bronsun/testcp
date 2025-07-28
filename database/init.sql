-- Create database schema for Sci-Fi game
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- People table
CREATE TABLE people (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    mass INTEGER,
    height INTEGER,
    gender VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Starships table
CREATE TABLE starships (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    model VARCHAR(255),
    crew INTEGER NOT NULL,
    passengers INTEGER,
    starship_class VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample people data
INSERT INTO people (name, mass, height, gender) VALUES
('Alex Nova', 77, 172, 'male'),
('Captain Steel', 136, 202, 'male'),
('Dr. Elena Cross', 49, 150, 'female'),
('Commander Rex', 120, 178, 'male'),
('Admiral Sarah Blake', 75, 165, 'female'),
('Robot Unit R2', 32, 96, 'n/a'),
('Android C3', 75, 167, 'n/a'),
('Major Ben Griffin', 77, 182, 'male'),
('Lieutenant Anna Storm', 84, 188, 'female'),
('Chief Marcus Stone', 112, 228, 'male'),
('General Maya Frost', 17, 66, 'female'),
('Director Kane Shadow', 75, 170, 'male'),
('Captain Lisa Vega', 45, 165, 'female'),
('Colonel Jack Thunder', 84, 188, 'male'),
('Admiral Quinn Ross', 89, 193, 'male');

-- Insert sample starships data
INSERT INTO starships (name, model, crew, passengers, starship_class) VALUES
('Titan Station', 'DS-1 Orbital Battle Platform', 342953, 843342, 'Deep Space Mobile Station'),
('Phoenix Runner', 'YT-1300 light freighter', 4, 6, 'Light freighter'),
('Viper Wing', 'BTL Y-wing', 2, 0, 'Assault fighter'),
('Eagle Strike', 'T-65 X-wing', 1, 0, 'Starfighter'),
('Shadow Interceptor', 'Twin Ion Engine Advanced', 1, 0, 'Starfighter'),
('Dreadnought Prime', 'Executor-class star dreadnought', 279144, 38000, 'Star dreadnought'),
('Freedom Transport', 'GR-75 medium transport', 6, 90, 'Medium transport'),
('Nova Destroyer', 'Imperial I-class Star Destroyer', 47060, 0, 'Star Destroyer'),
('Liberty Cruiser', 'MC80 Liberty type Star Cruiser', 5400, 1200, 'Star Cruiser'),
('Falcon Interceptor', 'RZ-1 A-wing Interceptor', 1, 0, 'Starfighter'),
('Thunder Strike', 'A/SF-01 B-wing starfighter', 1, 0, 'Assault Starfighter'),
('Alliance Cruiser', 'Consular-class cruiser', 9, 16, 'Space cruiser');


