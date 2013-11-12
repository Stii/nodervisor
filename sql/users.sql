delimiter $$

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(45) NOT NULL,
  `Email` varchar(128) NOT NULL,
  `Password` varchar(128) NOT NULL,
  `Role` varchar(45) NOT NULL DEFAULT 'User',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=latin1$$

INSERT INTO users(Name, Email, Password, Role) VALUES('Admin', 'admin@nodervisor', '$2a$10$OI5bfzPATM2358vQlDYKweliWYI2FyJwqsDJUMXuqaSzM.7vNa3xu', 'Admin')$$

delimiter ;