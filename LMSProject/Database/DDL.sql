create table categories(
category varchar(100) primary key,
);

create table materials(
material varchar(100) primary key,
);

create table item_master (
item_id varchar(100) primary key,
issue_status varchar(1),
item_description varchar(25),
item_make varchar(100) references materials(material),
item_category varchar(100) references categories(category),
item_valuation int
);

create table employee_credentials(
employee_id varchar(100) primary key,
employee_password varchar(100) not null,
employee_role varchar(100) not null
);

create table employee_master(
employee_id varchar(100) primary key references employee_credentials(employee_id)  ON DELETE CASCADE,
employee_name varchar(20) not null,
designation varchar(20),
department varchar(25),
gender varchar(1),
date_of_birth date,
date_of_joining date
);

create table employee_issue_details(
issue_id varchar(6) primary key,
employee_id varchar(100) references employee_master(employee_id) ON DELETE CASCADE,
item_id varchar(100) references item_master(item_id) ON DELETE CASCADE,
issue_date date,
return_date date
);

create table loan_card_master(
loan_id varchar(100) primary key,
loan_type varchar(100) references categories(category) ON DELETE CASCADE,
duration_in_years int
valuation int
);


create table employee_card_details(
employee_id varchar(100) references employee_master(employee_id) ON DELETE CASCADE,
loan_id varchar(100) references loan_card_master(loan_id) ON DELETE CASCADE,
card_issue_date date
);

