delimiter $$

CREATE  TABLE `hosts` (
  `idHost` INT NOT NULL AUTO_INCREMENT ,
  `idGroup` INT NULL ,
  `Name` VARCHAR(100) NOT NULL ,
  `Url` VARCHAR(255) NOT NULL ,
  PRIMARY KEY (`idHost`) ,
  UNIQUE INDEX `Url_UNIQUE` (`Url` ASC) ,
  UNIQUE INDEX `Name_UNIQUE` (`Name` ASC) )
ENGINE = MyISAM$$

CREATE  TABLE `groups` (
  `idGroup` INT NOT NULL AUTO_INCREMENT ,
  `Name` VARCHAR(100) NOT NULL ,
  PRIMARY KEY (`idGroup`) ,
  UNIQUE INDEX `Name_UNIQUE` (`Name` ASC) )
ENGINE = MyISAM$$

INSERT INTO groups SET Name='All Hosts'$$

INSERT INTO hosts SET Name='Localhost', Url='http://localhost:9001', idGroup=1$$

delimiter ;