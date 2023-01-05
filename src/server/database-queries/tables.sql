create table meals(
id int unsigned auto_increment primary key ,
title varchar(255) not null ,
img_url varchar(255) not null ,
description text not null ,
location varchar(255) not null,
max_reservation int unsigned not null,
price int unsigned not null,
vegetarian boolean default 0,
created_date  date  not null,
isActive boolean default 1,
updated_date date default null,
isBlocked boolean default 0,
blocked_date date default null
);


create table reservations(
id int unsigned auto_increment primary key ,
number_of_guests  int unsigned not null ,  
meal_id int unsigned not null,
created_date date not null,
contact_phonenumber varchar(255) not null,
contact_name varchar(255) not null,
contact_email varchar(255)  not null,
 foreign key (meal_id) references meals(id) on update cascade  on delete cascade
);

create table reviews(
id int unsigned auto_increment primary key ,
title varchar(255),
description text ,
meal_id int unsigned not null, 
stars int unsigned not null,
created_date date not null,
user_name varchar(255) not null,
user_email varchar(255)  not null,
foreign key (meal_id) references meals(id)  on update cascade on delete cascade
);
