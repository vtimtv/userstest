DROP TABLE IF EXISTS `banners`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `banners` (
                          `id` int(10) NOT NULL AUTO_INCREMENT PRIMARY KEY,
                          `ip` varchar(255) DEFAULT NULL,
                          `user_agent` TEXT DEFAULT NULL,
                          `view_date` DATE,
                          `page_url`TEXT DEFAULT NULL,
                          `views_count` int(10) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
