/*
  mysql -h 111.231.200.44 -uroot -p123123

  create database test character set utf8 collate utf8_general_ci;

  show databases;
  drop database base001
  create table t01 (addx int,id int,name varchar(100));

  show tables


  alter table  t02 modify column name varhar(200);

  drop table t02
  insert into t02 (addx,name,id) values (1,'xxx',22);
  update t02 set name='xoioi' where id=1
  delete from t02 where id=1;



  select * from t02;
  select count(*) ,id from t01 group by id;
  truncate table t02;


  select a.name,a.id from t01 a left join t02 b on  b.id=a.id ;





    */