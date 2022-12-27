
create table meals(
id int unsigned auto_increment primary key ,
title varchar(255) not null ,
img_url varchar(255) not null ,
description text not null ,
location varchar(255) not null, -- To be City and country
max_reservation int unsigned not null,
price decimal(10,2) unsigned not null,
created_date  date not null,
isActive boolean  
-- updated date => when isActive changed
);


create table reservations(
id int unsigned auto_increment primary key ,
number_of_guests  int unsigned not null ,  
meal_id int unsigned not null,
created_date date not null,
contact_phonenumber varchar(255) not null,
contact_name varchar(255) not null,
contact_email varchar(255) unique not null,
 foreign key (meal_id) references meals(id) on update cascade 
);

create table reviews(
id int unsigned auto_increment primary key ,
title varchar(255),
description text ,
meal_id int unsigned not null, 
stars int unsigned not null,
created_date date not null,
user_name varchar(255) not null,
user_email varchar(255) unique not null,
foreign key (meal_id) references meals(id)  on update cascade
);
