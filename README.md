# Galae : a Mailcow Algoo fork

Galae is a [MailCow](https://github.com/mailcow/mailcow-dockerized) fork managed by the [Algoo](https://www.algoo.fr/) company.

It was created with two guiding principles:
1. Implement missing functionalities mandatory for the [Galae service](https://galae.net/) launch (see below for a complete list)
2. Build a scalable production ready stack.


## MailCow customizations

Here is a list of Galae customizations submitted to Mailcow but not yet implemented, with their corresponding issues and PR both on Galae and MailCow sides. Note that since initial Galae implementation, subsequent commits were made when merging from upstream (MailCow to Galae).

MailCow issues and PR states are represent with the following emoji:
- ⏳️ Still open
- ❌ Closed as staled
- 👥 Closed as duplicate
- ⛔️ Closed as refused
- ☑️ Closed with no implementation
- ✅ Closed as completed

| Functionality                                | Galae Issues                                  | Corresponding MailCow Issues / PR                                                                                                                                                                                                                                                     |
|----------------------------------------------|-----------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| DB : allow to use external server            | algoo/galae#1, algoo/galae#9                  | ⛔️ mailcow/mailcow-dockerized#190, <br> ✅ mailcow/mailcow-dockerized#456, <br> 👥 mailcow/mailcow-dockerized#1539, <br> 👥 mailcow/mailcow-dockerized#1774, <br> ⛔️ mailcow/mailcow-dockerized#5395, <br> 👥 mailcow/mailcow-dockerized#5437, <br> ⏳️ mailcow/mailcow-dockerized#5869 |
| Allow "0" as local_part (eg "0@example.com") | algoo/galae#7                                 | ⏳️ mailcow/mailcow-dockerized#5190, <br> ⛔️ mailcow/mailcow-dockerized#5563 with PR ⛔️ mailcow/mailcow-dockerized#5565 and ❌ mailcow/mailcow-dockerized#5619                                                                                                                          |
| Wildcard email alias                         | algoo/galae#3, algoo/galae#13, algoo/galae#16 | ❌ mailcow/mailcow-dockerized#1787, <br>  ☑️ mailcow/mailcow-dockerized#2077 with PR ❌ mailcow/mailcow-dockerized#5881, <br> ❌ mailcow/mailcow-dockerized#2507 with PR ⏳️ mailcow/mailcow-dockerized#4015                                                                              |


## Update existing MailCow installation for Galae wildcard aliases support

The wildcard aliases support introduced in PR #5 requires a database schema update for existing mailcow installations. For the moment, this need
to be done manually. Below is a (very) succinct explanation:

- connect to the MySQL mailcow database
- run the following SQL commands:

```SQL
ALTER TABLE alias ADD COLUMN is_wildcard tinyint(1) NOT NULL DEFAULT '0' AFTER public_comment;
ALTER TABLE domain ADD COLUMN allow_wildcard_aliases tinyint(1) NOT NULL DEFAULT '0' AFTER relay_unknown_only;
```
