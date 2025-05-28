CREATE DATABASE GISdb;
USE GISdb;

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
duration_in_years int,
valuation int
);

create table employee_card_details(
employee_id varchar(100) references employee_master(employee_id) ON DELETE CASCADE,
loan_id varchar(100) references loan_card_master(loan_id) ON DELETE CASCADE,
card_issue_date date
);


insert into employee_credentials values 
('E0001','713bfda78870bf9d1b261f565286f85e97ee614efe5f0faf7c34e7ca4f65baca','admin'),
('E0002','25efd29860a4f83a7c971bdcfb3eb771c95dab9356b7dec0aa165eb80bfd817f','customer'),
('E0003','25efd29860a4f83a7c971bdcfb3eb771c95dab9356b7dec0aa165eb80bfd817f','customer'),
('E0004','25efd29860a4f83a7c971bdcfb3eb771c95dab9356b7dec0aa165eb80bfd817f','customer');

insert into categories values ('furniture'),('crockery'),('stationery');


insert into materials values ('plastic');
insert into materials values ('glass');
insert into materials values ('wood');


insert into employee_master values ('E0001','Bob','manager','it','M','1995-05-01','2021-05-02'), ('E0002','Dylan','ca','finance','M','1993-02-03','2019-02-06'), ('E0003','Tara','dgm','sales','F','1997-07-10','2015-03-11'),('E0004','Barney','associate','hr','M','1991-10-11','2022-07-08');


insert into loan_card_master values ('L0001','furniture', 1,1000), 
('L0002', 'crockery', 2,100),
('L0003', 'stationery', 3,50),
('L0004', 'furniture', 2,500);


insert into item_master values 
('I0001','Y','Table','wood', 'furniture', 1000),
('I0002','Y','Plates','glass', 'crockery', 100),
('I0003','Y','Scissors','plastic', 'stationery', 50),
('I0004','Y','Chair','wood', 'furniture', 500);


insert into employee_card_details values ('E0002','L0001','2023-08-23'),
('E0002','L0002','2023-07-24')
,('E0003','L0003','2023-08-22'),
('E0004','L0004','2023-09-01');


insert into employee_issue_details values
('IS0001','E0002','I0001', '2023-08-23', '2024-08-23' ),
('IS0002','E0002','I0002', '2023-07-24', '2025-07-24' ),
('IS0003','E0003','I0003', '2023-08-22', '2026-08-22' ),
('IS0004','E0004','I0004', '2023-09-01', '2025-09-01' );
