

function mysql() {
  /*
  show databases;
  create database databaseName;
  drop database databaseName;
  use databaseName;
  
  show tables; 
  CREATE TABLE table_name (column_name column_type);
  insert into tablename (field,field...) values ()
  drop table tablename;

  select cloumnname,columnname,from tablename [where  ] [limit ][offset] 
  update tablename set field=newvalue,field=newvalue where
  delete from tablename where [...]
        
      where field like %condition%
      where field REGEXP '^SP$'   正则表达式
      order by field [asc desc] ,field [asc desc]
      group by fieldname
      inner join left join right join
  


  ALTER TABLE testalter_tbl  DROP i;    删除表字段
  ALTER TABLE testalter_tbl ADD i INT;增加字段
  > SHOW COLUMNS FROM testalter_tbl;    展示表字段
  如果你需要指定新增字段的位置，可以使用MySQL提供的关键字 FIRST (设定位第一列)， AFTER 字段名（设定位于某个字段之后）。

  ALTER TABLE testalter_tbl MODIFY c CHAR(10);

    使用 CHANGE 子句, 语法有很大的不同。 在 CHANGE 关键字之后，紧跟着的是你要修改的字段名，然后指定新字段名及类型。

     ALTER TABLE testalter_tbl CHANGE i j BIGINT;
  ALTER TABLE testalter_tbl RENAME TO alter_tbl;

  索引
      创建索引
      CREATE INDEX indexName ON table_name (column_name)

    修改表结构(添加索引)
      ALTER table tableName ADD INDEX indexName(columnName)

    创建表的时候直接指定
      CREATE TABLE mytable(  
 
          ID INT NOT NULL,   
          
          username VARCHAR(16) NOT NULL,  
          
          INDEX [indexName] (username(length))  
          
          );  

      删除索引的语法
          DROP INDEX [indexName] ON mytable; 


      导出  
        show variables like ‘%secure%’;  查看mysql可以导出的文件地址
          SELECT * FROM runoob_tbl  INTO OUTFILE '/tmp/runoob.txt'; 导出到对应文件中


      导入
        mysql -u用户名    -p密码    <  要导入的数据库数据(runoob.sql)

        source 命令导入
            source /home/abc/abc.sql  # 导入备份数据
      使用 LOAD DATA 导入数据
        LOAD DATA LOCAL INFILE 'dump.txt' INTO TABLE mytbl;
      使用 mysqlimport 导入数据
  */
}