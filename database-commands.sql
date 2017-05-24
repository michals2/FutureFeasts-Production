-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2017-05-23 05:01:05.321

-- tables
-- Table: recipes
CREATE TABLE recipes (
    r_id serial  NOT NULL,
    title varchar(50)  NOT NULL,
    url text  NOT NULL,
    ingredients json  NOT NULL,
    nutrition_info json  NOT NULL,
    health_tag json  NOT NULL,
    CONSTRAINT recipes_pk PRIMARY KEY (r_id)
);

-- Table: user_recipe
CREATE TABLE user_recipe (
    u_id int  NOT NULL,
    r_id int  NOT NULL,
    day varchar(10)  NOT NULL,
    CONSTRAINT user_recipe_pk PRIMARY KEY (u_id,r_id,day)
);

-- Table: users
CREATE TABLE users (
    u_id serial  NOT NULL,
    first_name varchar(20)  NOT NULL,
    last_name varchar(20)  NOT NULL,
    username varchar(50)  NOT NULL,
    password varchar(20)  NOT NULL,
    CONSTRAINT sff PRIMARY KEY (u_id)
);

-- foreign keys
-- Reference: recipes_user_recipe (table: user_recipe)
ALTER TABLE user_recipe ADD CONSTRAINT recipes_user_recipe
    FOREIGN KEY (r_id)
    REFERENCES recipes (r_id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: user_recipe_users (table: user_recipe)
ALTER TABLE user_recipe ADD CONSTRAINT user_recipe_users
    FOREIGN KEY (u_id)
    REFERENCES users (u_id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- End of file.

-- Queries
SELECT * FROM recipes;
SELECT * FROM users;

-- Insert entries into table
INSERT INTO users (first_name, last_name, username, password) VALUES ('fname#', 'lname#', 'username#', 'pass#');
INSERT INTO recipes (title, url, ingredients, nutrition_info, health_tag) VALUES ('recipe#', 'www.recipe#.com', '{"ing1":2, "ing2":6, "ing3":20}', '{"nut1":2, "nut2":6, "nut3":20}','{"ht1":2, "ht2":6, "ht3":20}');
INSERT INTO user_recipe (u_id, r_id, day) VALUES (1, 1, 'Tuesday');


SELECT users.first_name, user_recipe.day, recipes.title
    FROM users
    INNER JOIN user_recipe ON users.u_id=user_recipe.u_id
    INNER JOIN recipes ON user_recipe.r_id=recipes.r_id
    WHERE users.u_id=#;