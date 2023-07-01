-- Filters to set categories to main ones

-- Entertainment
UPDATE places
SET category = "entertainment"
WHERE category ="museum" 
	OR category ="theater" 
	OR category ="attraction" 
	OR category ="library" 
	OR category ="arts_center" 
	OR category ="public_art" 
	OR category ="themepark" 
	OR category ="cinema" 
	OR category ="books" 
	OR category ="sports_center";

-- Health
UPDATE places 
SET category = "health" 
WHERE category ="pharmacy" 
	OR category ="ophthalmologist" 
	OR category ="hospital";

-- Restaurant
UPDATE places 
SET category = "restaurant" 
WHERE category ="fastfood" 
	OR category ="bar" 
	OR category="pub";

-- Hotel
UPDATE places 
SET category = "hotel" 
WHERE category ="hostel";

-- Public Transport
UPDATE places 
SET category = "public_transport" 
WHERE category ="train_station" 
	OR category ="bus_stop" 
	OR category ="subway_station";

-- Shop
UPDATE places 
SET category = "shop" 
WHERE category ="car_dealer" 
	OR category ="department_store" 
	OR category ="pet_store" 
	OR category ="electronics" 
	OR category ="flowers" 
	OR category ="deli" 
	OR category ="confectionery" 
	OR category ="bread" 
	OR category="fuel" 
	OR category ="diy" 
	OR category ="mobile_phones" 
	OR category ="mall" 
	OR category ="convenience_store" 
	OR category ="supermarket";

-- Can't really use this can we...
-- This is to change the places that have as category 'undefined', those will be set to shop
UPDATE places 
SET category = "shop" 
WHERE place_id ="220" 
	OR place_id ="165" 
	OR place_id ="235" 
	OR place_id ="224" 
	OR place_id ="260" 
	OR place_id ="214" 
	OR place_id ="191" 
	OR place_id ="185" 
	OR place_id ="180" 
	OR place_id ="170" 
	OR place_id ="168" 
	OR place_id ="167" 
	OR place_id ="162" 
	OR place_id ="161" 
	OR place_id ="153" 
	OR place_id ="152" 
	OR place_id ="149" 
	OR place_id ="148" 
	OR place_id ="147" 
	OR place_id ="141" 
	OR place_id ="135" 
	OR place_id ="123" 
	OR place_id ="122" 
	OR place_id ="120" 
	OR place_id ="117" 
	OR place_id ="116" 
	OR place_id ="113" 
	OR place_id ="112" 
	OR place_id ="82" 
	OR place_id ="36" 
	OR place_id ="30";
