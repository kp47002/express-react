-- MySQL dump 10.13  Distrib 8.0.15, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: storedb2
-- ------------------------------------------------------
-- Server version	8.0.15

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `product` (
  `id_product` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `description` varchar(500) DEFAULT NULL,
  `price` decimal(10,0) NOT NULL,
  `fk_user` int(11) NOT NULL,
  `fk_buyer` int(11) DEFAULT NULL,
  `productcol` varchar(45) DEFAULT NULL,
  `image` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_product`),
  UNIQUE KEY `id_product_UNIQUE` (`id_product`),
  KEY `fk_user` (`fk_user`),
  KEY `fk_sell_idx` (`fk_buyer`),
  CONSTRAINT `fk_buy` FOREIGN KEY (`fk_buyer`) REFERENCES `user` (`id`),
  CONSTRAINT `product_ibfk_1` FOREIGN KEY (`fk_user`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (2,'Arctic Air Ultra','Hot New Arctic Air Personal Space Cooler Humidifier Purifies LED Mood Light',250,48,24,NULL,NULL),(3,'Prisma Colors (150)','Prismacolor Premier Colored Pencils Complete Set of 150 Assorted Colors',90,48,45,NULL,NULL),(4,'Muslady LP Electric Guitar','A brand-new, unused, unopened, undamaged item in its original packaging (where packaging is applicable). Packaging should be the same as what is found in a retail store, unless the item is handmade or was packaged by the manufacturer in non-retail packaging, such as an unprinted box or plastic bag.',71,48,51,NULL,NULL),(5,'Portable Home Theater','Protect your eyes from TV & Cellphone, Save your penny from Cinema. Your best Private Home Theater, and your best choice!!!',10,48,NULL,NULL,NULL),(6,'Sport Loop iWatch','The high quality velcro connector enables you to wear and tear on the band up to 500 times. It\'s sturdy and easy to put on and take off. It is more comfortable and adjustable. You can fasten it exactly how tight you want.',5,51,NULL,NULL,NULL),(7,'SanDisk 8GB USB','A brand-new, unused, unopened, undamaged item in its original packaging (where packaging is applicable). Packaging should be the same as what is found in a retail store, unless the item is handmade or was packaged by the manufacturer in non-retail packaging, such as an unprinted box or plastic bag.',4,51,48,NULL,NULL),(8,'Car Scratch Remover','A brand-new, unused, unopened, undamaged item in its original packaging (where packaging is applicable). Packaging should be the same as what is found in a retail store, unless the item is handmade or was packaged by the manufacturer in non-retail packaging, such as an unprinted box or plastic bag.',1,24,NULL,NULL,NULL),(9,'Huawei Selfie Stick','Huawei AF15 360°Rotation Selfie Stick Tripod Portable Wireless Bluetooth Monopod',18,24,NULL,NULL,NULL),(10,'Women Golf Shoes','FootJoy Womens Leisure Golf Shoes offer lightweight comfort and cushioning for all players. The soft mesh uppers and DuraMax spikeless outsole let you take your game to a new level.',65,45,51,NULL,NULL),(11,'Garmin nuvi 760','The Garmin Nuvi 760 automotive mountable GPS navigational device is a powerful tool to get you to your destination. It goes beyond simple GPS mapping to provide you with the information you need to navigate a complicated world. Having a reliable device like the Garmin Nuvi can eliminate much of the stress that comes with traveling.',28,45,NULL,NULL,NULL),(12,'Vitamin D3 10000iu','Healthy Origins Vitamin D3 10000iu X 360 Caps UK Stock',30,51,48,NULL,NULL),(13,'40lbs ArcheryBow','30/40lbs Archery Straight Bow Hunting Shooting Longbow Takedown Glass Fiber 30\"',17,51,NULL,NULL,NULL);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (24,'Ivan','ivan','new'),(45,'Ana','ana','new3'),(48,'Rea','rea','a'),(51,'Karlo','karlo','jelena'),(52,'Mate','mate','mate');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-06-13  0:30:27
