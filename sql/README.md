# sql 常用函数

## charindex() 和 patindex() 函数

charindex()是原始的SQL函数，用于寻找在一个字符串中某子字符串第一次出现的位置。如函数名所示，这个函数返回一个整型值，表示某子字符串的第一个字符在整个字符串中的位置索引。以下脚本用于在字符串Washington中寻找子字符串sh的出现位置:

SELECT charindex('sh', 'Washington')

返回的结果是3，表明s是字符串Washington中的第3个字符。这说明charindex函数匹配字符的索引是从1开始的。如果没有匹配到任何结果，函数将返回0。在这个例子中使用两个字符作为子字符串并没有特别意义，但是如果字符串包含多个s字符，就有意义了。

patindex()函数和charindexO函数类似，它执行相同的操作，但方法稍许不同，该函数增加了对通配符(即Like运算符中使用的字符)的支持。顾名思义，它将返回一个字符模式的索引。这个函数也可以和ntext、nchar(max)和nvarchar(max)等大字符类型一起使用。注意，如果和这些大字符类型一起使用，patindex()函数将返回bigint类型的值，而不是int类型的值。以下是一个例子：

SELECT patindex('%M_rs%', 'The stars near Mars are far from ours')

注意，如果想找到一个字符串，在所比较的字符串的前后各有0个或者多个字符，则两个百分符都是必须的。下划线表明这个位置上的字符不必匹配，它可以是任意字符。

和使用相同字符串的charindex()函数作一下比较：

SELECT charindex('Mars', 'The stars near Mars are far from ours')

这两个函数都返回索引值16。请注意这些函数的执行过程。下一节将把这两个函数和SUBSTRING()函数组合在一起，演示如何使用界定符解析字符串。

## LEFT() 和 RIGHT() 函数

LEFT()与RIGHT()函数是相似的，它们都返回一定长度的子字符串。这两个函数的区别是，它们返回的分别是字符串的不同部分。LEFT()函数返回字符串最左边的字符，顺序从左数到右。RIGHT()函数正好相反，它从最右边的字符开始，以从右到左的顺序返回特定数量的字符。看一看使用这两个函数返回"GeorgeWashington"这个字符串的子字符串的例子。

如果使用LEFT()函数返回一个5字符的子字符串，则函数先定位最左边的字符，向右数5个字符，然后返回这个子字符串，如下所示。

```SQL
DECLARE @FullName varchar(25)

SET @FullName = 'George Washington'

SELECT LEFT(@FullName, 5)
```

 结果为：Georg

如果使用RIGHT()函数返回一个5字符的子字符串，则函数先定位最右边的字符，向左数5个字符，然后返回这个子字符串，如下所示。

```SQL
DECLARE @FullName varchar(25)

SET @FullName = 'George Washington'

SELECT RIGHT (@FullName, 5)
```

 结果为：ngton

要想返回字符串中有意义的部分，这两个函数都不是特别有用。如果想返回全名中的姓氏或者名字，该怎么办？这需要多做一点工作。如果能确定每个姓名中空格的位置，就可以使用LEFT()函数在全名中读取名字。在这种情况下，可以使用CHARINDEX()或者PATINDEX()函数来定位空格，然后使用LEFT()函数返回空格前的字符。下面是第一个用过程方法编写的例子，它将处理过程分解成以下步骤：

```SQL
DECLARE @FullName varchar(25), @SpaceIndex tinyint

SET @FullName = 'George Washington'

-- Get index of the delimiting space:

SET @SpaceIndex = CHARINDEX(' ' , @FullName)

-- Return all characters to the left of the space:

SELECT LEFT(@FullName, @SpaceIndex - 1)
```

 结果为：George

如果不想在结果中包含空格，就需要从@SpaceIndex值中减去1，这样结果中就只有名字了。

## 常用函数

### instr 查询某一字符在字段中的位置，例如 ```instr(url,'?')```，如没查找到返回 0

### substr 截取字符串，例如 ```substr(url, 1, 20)```， 注意从 1 开始；```substr(url, 20)```表示截取 20 以后的内容

  ```sql
    select
    (case when instr(url,'?') = 0 then url else substr(url, 1, instr(url,'?') - 1) end) as _url
    from xxx
    where
    dt = '2020-12-09'
  ```

  具体实例，截取url中https:// 或 http://

  ```sql
  select
    (case when instr(url,'https://') = 0 then
        (case when instr(url,'http://') = 0 then
        url
        else substr(url, 8) end)
    else substr(url, 9) end)
    as _url
    from xxx
    where
    dt = '2021-05-08'
  ```

### get_json_object

  注意：该函数返回的不是字符串类型，需要使用 cast 强制转换为字符串

  ```sql
  select
    cls,
    v,
    cast(get_json_object(v, '$.xxx') as string) as orderid
  from
    xxx
  where
    cast(get_json_object(v, '$.xx') as string) <> ''
  ```

  下面为具体的示例

  ```sql
  select dt, count(distinct xx) UV
  from
  (select
      param_json, dt,
      cast(get_json_object(param_json, '$.a') as string) as a,
      cast(get_json_object(param_json, '$.b') as string) as b
      from xxx
      where dt between '2021-02-01' and '2021-02-07'
  )
  where a like 'xxxx%'
  group by dt
  order by cast(UV as double) desc
  ```

### length 查询某一列长度，例如 ```length(url)```，如没查找到返回 0

### regexp_extract

  正则表达式函数，示例

  ```sql
    select regexp_extract(url, '/$'), concat(
        parse_url(url, 'HOST'),
        parse_url(url, 'PATH')
      ) as url1, * from
     xxx
    where
    dt='2021-09-22'
  ```

### parse_url 格式化url

* parse_url(url, 'HOST') 返回 host部分
* parse_url(url, 'PATH') 返回 path部分
* parse_url(url, 'PROTOCOL') 返回协议部分，如：https或http
* parse_url(url, 'QUERY', 'channel') 返回URL参数 channel 的值

### concat 字符串连接

### from_unixtime 格式化日期

```sql
  from_unixtime(cast(substr(stm,1,10) as bigint), 'yyyy-MM-dd HH:mm:ss')
```

其中 stm 为毫秒，截取后为秒

### sum 求和函数

```sql
  select sum(pv) pv from xxx where dt='2021-09-20'
```

### 特殊字符转义

* ; 用 \073 代替，使用引擎 MR 或 Tez 查询

### limit

* limit 如果只指定一个参数，则表示从0开始查询
* 使用 limit 查询多页数据时，应该结合 order by col ，列 col 最好是主键或唯一值

```sql
  select * from table1 order by col limit 10
  -- 与下面功能一样
  select * from table1 order by col limit 0,10
```

第二页

```sql
  select * from table1 order by col limit 10,10
```

只能使用MR或Tez引擎查询

### nvl 空值转换为空字符串

```sql
  select nvl(url) from table1
```

### concat_ws 连接字符串

```sql
  select concat_ws('%', url, 'abc') from table1
```

### 日期处理函数

* date_sub
  date_sub('2021-12-01', 3) 传两个参数，第一个为日期格式，第二个为减去的天数

```sql
  select date_sub('2021-12-01',3), date_sub('{TX_DATE}',2), * from table1
```

### 特殊字符格式

* '{TX_DATE}' 返回昨天日期

  ```sql
    select '{TX_DATE}', * from table1
  ```

## 参考

* https://www.cnblogs.com/accumulater/p/6255003.html
