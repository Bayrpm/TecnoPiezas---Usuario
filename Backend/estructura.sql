-- MariaDB dump 10.19  Distrib 10.4.28-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: backend-tecnopiezas
-- ------------------------------------------------------
-- Server version	10.4.28-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `api_administrador`
--

DROP TABLE IF EXISTS `api_administrador`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `api_administrador` (
  `admin_id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(30) NOT NULL,
  `password` varchar(128) NOT NULL,
  `correo` varchar(254) NOT NULL,
  `fecha_creacion` date NOT NULL,
  `tipo_administrador` varchar(13) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`admin_id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `correo` (`correo`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_administrador`
--

LOCK TABLES `api_administrador` WRITE;
/*!40000 ALTER TABLE `api_administrador` DISABLE KEYS */;
INSERT INTO `api_administrador` VALUES (1,'Bayron','1234','bayron@gmail.com','2023-10-23','gerente',1,1,1,NULL),(2,'Francisco','1234','francisco@gmail.com','2023-10-23','gerente',1,0,0,NULL),(3,'Cristobal Aravena','1234','cristobala@gmail.com','2023-10-23','administrador',1,0,0,NULL),(4,'Cristobal','1234','cristobal@gmail.com','2023-10-23','administrador',1,0,0,NULL),(5,'Pedro','pedrito123','pedro@gmail.com','2023-10-24','gerente',1,1,1,'2023-10-24 03:01:56.000000');
/*!40000 ALTER TABLE `api_administrador` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `api_administrador_groups`
--

DROP TABLE IF EXISTS `api_administrador_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `api_administrador_groups` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `administrador_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `api_administrador_groups_administrador_id_group_id_4c4fb846_uniq` (`administrador_id`,`group_id`),
  KEY `api_administrador_groups_group_id_5457c55d_fk_auth_group_id` (`group_id`),
  CONSTRAINT `api_administrador_gr_administrador_id_7bce3cb2_fk_api_admin` FOREIGN KEY (`administrador_id`) REFERENCES `api_administrador` (`admin_id`),
  CONSTRAINT `api_administrador_groups_group_id_5457c55d_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_administrador_groups`
--

LOCK TABLES `api_administrador_groups` WRITE;
/*!40000 ALTER TABLE `api_administrador_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `api_administrador_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `api_administrador_user_permissions`
--

DROP TABLE IF EXISTS `api_administrador_user_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `api_administrador_user_permissions` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `administrador_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `api_administrador_user_p_administrador_id_permiss_48cd8e23_uniq` (`administrador_id`,`permission_id`),
  KEY `api_administrador_us_permission_id_8f328592_fk_auth_perm` (`permission_id`),
  CONSTRAINT `api_administrador_us_administrador_id_5026812c_fk_api_admin` FOREIGN KEY (`administrador_id`) REFERENCES `api_administrador` (`admin_id`),
  CONSTRAINT `api_administrador_us_permission_id_8f328592_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_administrador_user_permissions`
--

LOCK TABLES `api_administrador_user_permissions` WRITE;
/*!40000 ALTER TABLE `api_administrador_user_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `api_administrador_user_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `api_categoria`
--

DROP TABLE IF EXISTS `api_categoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `api_categoria` (
  `categoria_id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_categoria` varchar(255) NOT NULL,
  PRIMARY KEY (`categoria_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_categoria`
--

LOCK TABLES `api_categoria` WRITE;
/*!40000 ALTER TABLE `api_categoria` DISABLE KEYS */;
INSERT INTO `api_categoria` VALUES (1,'Tarjetas De Video'),(2,'Procesadores'),(3,'Placas Madre'),(4,'Ram'),(5,'Discos Duros'),(6,'SSD (Unidades De Estado Sólido)'),(7,'Gabinetes'),(8,'Fuentes De Poder'),(9,'Cooler CPU'),(10,'Ventiladores');
/*!40000 ALTER TABLE `api_categoria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `api_cliente`
--

DROP TABLE IF EXISTS `api_cliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `api_cliente` (
  `cliente_id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(30) NOT NULL,
  `apellidos` varchar(50) NOT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `genero` varchar(10) NOT NULL,
  `direccion` longtext NOT NULL,
  `telefono` varchar(17) NOT NULL,
  PRIMARY KEY (`cliente_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_cliente`
--

LOCK TABLES `api_cliente` WRITE;
/*!40000 ALTER TABLE `api_cliente` DISABLE KEYS */;
/*!40000 ALTER TABLE `api_cliente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `api_clienteperfil`
--

DROP TABLE IF EXISTS `api_clienteperfil`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `api_clienteperfil` (
  `perfil_id` int(11) NOT NULL AUTO_INCREMENT,
  `cliente_id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  PRIMARY KEY (`perfil_id`),
  UNIQUE KEY `cliente_id` (`cliente_id`),
  UNIQUE KEY `usuario_id` (`usuario_id`),
  CONSTRAINT `api_clienteperfil_cliente_id_943867d6_fk_api_cliente_cliente_id` FOREIGN KEY (`cliente_id`) REFERENCES `api_cliente` (`cliente_id`),
  CONSTRAINT `api_clienteperfil_usuario_id_443748d4_fk_api_usuario_usuario_id` FOREIGN KEY (`usuario_id`) REFERENCES `api_usuario` (`usuario_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_clienteperfil`
--

LOCK TABLES `api_clienteperfil` WRITE;
/*!40000 ALTER TABLE `api_clienteperfil` DISABLE KEYS */;
/*!40000 ALTER TABLE `api_clienteperfil` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `api_locales`
--

DROP TABLE IF EXISTS `api_locales`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `api_locales` (
  `id_locales` int(11) NOT NULL AUTO_INCREMENT,
  `direccion` varchar(80) NOT NULL,
  `descripcion` longtext DEFAULT NULL,
  `correo` varchar(80) NOT NULL,
  `telefono` varchar(19) NOT NULL,
  PRIMARY KEY (`id_locales`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_locales`
--

LOCK TABLES `api_locales` WRITE;
/*!40000 ALTER TABLE `api_locales` DISABLE KEYS */;
/*!40000 ALTER TABLE `api_locales` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `api_producto`
--

DROP TABLE IF EXISTS `api_producto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `api_producto` (
  `producto_id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `precio` int(10) unsigned NOT NULL CHECK (`precio` >= 0),
  `stock` int(10) unsigned NOT NULL CHECK (`stock` >= 0),
  `descripcion` longtext DEFAULT NULL,
  `imagen` varchar(100) DEFAULT NULL,
  `categoria_id` int(11) NOT NULL,
  `subcategoria_id` int(11) NOT NULL,
  PRIMARY KEY (`producto_id`),
  KEY `api_producto_categoria_id_id_2600cc05` (`categoria_id`),
  KEY `api_producto_subcategoria_id_id_b34300d8` (`subcategoria_id`),
  CONSTRAINT `api_producto_categoria_id_c2e48405_fk_api_categoria_categoria_id` FOREIGN KEY (`categoria_id`) REFERENCES `api_categoria` (`categoria_id`),
  CONSTRAINT `api_producto_subcategoria_id_b2a8d814_fk_api_subca` FOREIGN KEY (`subcategoria_id`) REFERENCES `api_subcategoria` (`subcategoria_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_producto`
--

LOCK TABLES `api_producto` WRITE;
/*!40000 ALTER TABLE `api_producto` DISABLE KEYS */;
INSERT INTO `api_producto` VALUES (1,'Nvidia RTX4090',890000,35,'La tarjeta gráfica Nvidia GeForce RTX 4090 es una potente unidad de procesamiento gráfico (GPU) diseñada para ofrecer un rendimiento de vanguardia en aplicaciones de gráficos, juegos y computación de alto rendimiento.','productos/rtx4090.jpg',1,1),(2,'RTX 4060',650000,25,'Potente RTX 4060','productos/rtx4060.jpg',1,1);
/*!40000 ALTER TABLE `api_producto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `api_subcategoria`
--

DROP TABLE IF EXISTS `api_subcategoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `api_subcategoria` (
  `subcategoria_id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_subcategoria` varchar(255) NOT NULL,
  `categoria_id` int(11) NOT NULL,
  PRIMARY KEY (`subcategoria_id`),
  KEY `api_subcategoria_categoria_id_b2705323_fk_api_categ` (`categoria_id`),
  CONSTRAINT `api_subcategoria_categoria_id_b2705323_fk_api_categ` FOREIGN KEY (`categoria_id`) REFERENCES `api_categoria` (`categoria_id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_subcategoria`
--

LOCK TABLES `api_subcategoria` WRITE;
/*!40000 ALTER TABLE `api_subcategoria` DISABLE KEYS */;
INSERT INTO `api_subcategoria` VALUES (1,'NVIDIA GeForce',1),(2,'AMD Radeon',1),(3,'Intel',2),(4,'AMD',2),(5,'Intel 1200',3),(6,'Intel 1700',3),(7,'AMD AM4',3),(8,'AMD AM5',3),(9,'DDR4 Desktop',4),(10,'DDR5 Desktop',4),(11,'DDR4 Notebook',4),(12,'DDR5 Notebook',4),(13,'Desktop',5),(14,'Notebook',5),(15,'2,5\" SATA',6),(16,'M.2 SATA',6),(17,'M.2 PCIe NVMe',6),(18,'Mini ITX',7),(19,'Micro ATX',7),(20,'ATX',7),(21,'Certificadas',8),(22,'Modulares',8),(23,'Por aire',9),(24,'Refrigeración Líquida',9),(25,'120 mm.',10),(26,'140 mm.',10);
/*!40000 ALTER TABLE `api_subcategoria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `api_usuario`
--

DROP TABLE IF EXISTS `api_usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `api_usuario` (
  `usuario_id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(30) NOT NULL,
  `password` varchar(30) NOT NULL,
  `correo` varchar(254) NOT NULL,
  `fecha_creacion` date NOT NULL,
  PRIMARY KEY (`usuario_id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `correo` (`correo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_usuario`
--

LOCK TABLES `api_usuario` WRITE;
/*!40000 ALTER TABLE `api_usuario` DISABLE KEYS */;
/*!40000 ALTER TABLE `api_usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group`
--

DROP TABLE IF EXISTS `auth_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_group` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group`
--

LOCK TABLES `auth_group` WRITE;
/*!40000 ALTER TABLE `auth_group` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group_permissions`
--

DROP TABLE IF EXISTS `auth_group_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_group_permissions` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `group_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group_permissions`
--

LOCK TABLES `auth_group_permissions` WRITE;
/*!40000 ALTER TABLE `auth_group_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_permission`
--

DROP TABLE IF EXISTS `auth_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_permission` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `content_type_id` int(11) NOT NULL,
  `codename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add log entry',1,'add_logentry'),(2,'Can change log entry',1,'change_logentry'),(3,'Can delete log entry',1,'delete_logentry'),(4,'Can view log entry',1,'view_logentry'),(5,'Can add permission',2,'add_permission'),(6,'Can change permission',2,'change_permission'),(7,'Can delete permission',2,'delete_permission'),(8,'Can view permission',2,'view_permission'),(9,'Can add group',3,'add_group'),(10,'Can change group',3,'change_group'),(11,'Can delete group',3,'delete_group'),(12,'Can view group',3,'view_group'),(13,'Can add user',4,'add_user'),(14,'Can change user',4,'change_user'),(15,'Can delete user',4,'delete_user'),(16,'Can view user',4,'view_user'),(17,'Can add content type',5,'add_contenttype'),(18,'Can change content type',5,'change_contenttype'),(19,'Can delete content type',5,'delete_contenttype'),(20,'Can view content type',5,'view_contenttype'),(21,'Can add session',6,'add_session'),(22,'Can change session',6,'change_session'),(23,'Can delete session',6,'delete_session'),(24,'Can view session',6,'view_session'),(25,'Can add producto',7,'add_producto'),(26,'Can change producto',7,'change_producto'),(27,'Can delete producto',7,'delete_producto'),(28,'Can view producto',7,'view_producto'),(29,'Can add subcategoria',8,'add_subcategoria'),(30,'Can change subcategoria',8,'change_subcategoria'),(31,'Can delete subcategoria',8,'delete_subcategoria'),(32,'Can view subcategoria',8,'view_subcategoria'),(33,'Can add categoria',9,'add_categoria'),(34,'Can change categoria',9,'change_categoria'),(35,'Can delete categoria',9,'delete_categoria'),(36,'Can view categoria',9,'view_categoria'),(37,'Can add administrador',10,'add_administrador'),(38,'Can change administrador',10,'change_administrador'),(39,'Can delete administrador',10,'delete_administrador'),(40,'Can view administrador',10,'view_administrador'),(41,'Can add locales',11,'add_locales'),(42,'Can change locales',11,'change_locales'),(43,'Can delete locales',11,'delete_locales'),(44,'Can view locales',11,'view_locales'),(45,'Can add cliente perfil',12,'add_clienteperfil'),(46,'Can change cliente perfil',12,'change_clienteperfil'),(47,'Can delete cliente perfil',12,'delete_clienteperfil'),(48,'Can view cliente perfil',12,'view_clienteperfil'),(49,'Can add cliente',13,'add_cliente'),(50,'Can change cliente',13,'change_cliente'),(51,'Can delete cliente',13,'delete_cliente'),(52,'Can view cliente',13,'view_cliente'),(53,'Can add usuario',14,'add_usuario'),(54,'Can change usuario',14,'change_usuario'),(55,'Can delete usuario',14,'delete_usuario'),(56,'Can view usuario',14,'view_usuario'),(57,'Can add Token',15,'add_token'),(58,'Can change Token',15,'change_token'),(59,'Can delete Token',15,'delete_token'),(60,'Can view Token',15,'view_token'),(61,'Can add token',16,'add_tokenproxy'),(62,'Can change token',16,'change_tokenproxy'),(63,'Can delete token',16,'delete_tokenproxy'),(64,'Can view token',16,'view_tokenproxy');
/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user`
--

DROP TABLE IF EXISTS `auth_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `email` varchar(254) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user`
--

LOCK TABLES `auth_user` WRITE;
/*!40000 ALTER TABLE `auth_user` DISABLE KEYS */;
INSERT INTO `auth_user` VALUES (1,'pbkdf2_sha256$600000$krH0NBb2Af1oQXFYYK1e8y$scJnt6bAxLncinfCeBoYHsGNAUVcwokqFzJb1XFGcYo=','2023-10-23 23:26:17.577087',1,'admin','','','admin@admin.com',1,1,'2023-10-02 03:47:14.132326');
/*!40000 ALTER TABLE `auth_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_groups`
--

DROP TABLE IF EXISTS `auth_user_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_user_groups` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_groups_user_id_group_id_94350c0c_uniq` (`user_id`,`group_id`),
  KEY `auth_user_groups_group_id_97559544_fk_auth_group_id` (`group_id`),
  CONSTRAINT `auth_user_groups_group_id_97559544_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  CONSTRAINT `auth_user_groups_user_id_6a12ed8b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user_groups`
--

LOCK TABLES `auth_user_groups` WRITE;
/*!40000 ALTER TABLE `auth_user_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_user_permissions`
--

DROP TABLE IF EXISTS `auth_user_user_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_user_user_permissions` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_user_permissions_user_id_permission_id_14a6b632_uniq` (`user_id`,`permission_id`),
  KEY `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user_user_permissions`
--

LOCK TABLES `auth_user_user_permissions` WRITE;
/*!40000 ALTER TABLE `auth_user_user_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user_user_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `authtoken_token`
--

DROP TABLE IF EXISTS `authtoken_token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `authtoken_token` (
  `key` varchar(40) NOT NULL,
  `created` datetime(6) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`key`),
  UNIQUE KEY `user_id` (`user_id`),
  CONSTRAINT `authtoken_token_user_id_35299eff_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `authtoken_token`
--

LOCK TABLES `authtoken_token` WRITE;
/*!40000 ALTER TABLE `authtoken_token` DISABLE KEYS */;
/*!40000 ALTER TABLE `authtoken_token` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_admin_log`
--

DROP TABLE IF EXISTS `django_admin_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `django_admin_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext DEFAULT NULL,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint(5) unsigned NOT NULL CHECK (`action_flag` >= 0),
  `change_message` longtext NOT NULL,
  `content_type_id` int(11) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6_fk_auth_user_id` (`user_id`),
  CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_admin_log`
--

LOCK TABLES `django_admin_log` WRITE;
/*!40000 ALTER TABLE `django_admin_log` DISABLE KEYS */;
INSERT INTO `django_admin_log` VALUES (1,'2023-10-02 05:08:15.161184','1','Nvidia RTX4090',1,'[{\"added\": {}}]',7,1),(2,'2023-10-03 02:48:56.211879','2','RTX 4060',1,'[{\"added\": {}}]',7,1),(3,'2023-10-03 02:52:11.829388','1','Nvidia RTX4090',2,'[{\"changed\": {\"fields\": [\"Imagen\"]}}]',7,1),(4,'2023-10-23 23:27:44.407624','1','Administrador object (1)',1,'[{\"added\": {}}]',10,1),(5,'2023-10-23 23:29:16.588605','2','Francisco',1,'[{\"added\": {}}]',10,1),(6,'2023-10-23 23:29:35.854021','3','Cristobal Aravena',1,'[{\"added\": {}}]',10,1),(7,'2023-10-23 23:29:49.748343','4','Cristobal',1,'[{\"added\": {}}]',10,1),(8,'2023-10-24 03:01:42.959194','1','Bayron - gerente',2,'[{\"changed\": {\"fields\": [\"Superuser status\", \"Is staff\"]}}]',10,1),(9,'2023-10-24 03:02:10.135302','5','Pedro - gerente',1,'[{\"added\": {}}]',10,1);
/*!40000 ALTER TABLE `django_admin_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_content_type`
--

DROP TABLE IF EXISTS `django_content_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `django_content_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_content_type`
--

LOCK TABLES `django_content_type` WRITE;
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
INSERT INTO `django_content_type` VALUES (1,'admin','logentry'),(10,'api','administrador'),(9,'api','categoria'),(13,'api','cliente'),(12,'api','clienteperfil'),(11,'api','locales'),(7,'api','producto'),(8,'api','subcategoria'),(14,'api','usuario'),(3,'auth','group'),(2,'auth','permission'),(4,'auth','user'),(15,'authtoken','token'),(16,'authtoken','tokenproxy'),(5,'contenttypes','contenttype'),(6,'sessions','session');
/*!40000 ALTER TABLE `django_content_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_migrations`
--

DROP TABLE IF EXISTS `django_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `django_migrations` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'contenttypes','0001_initial','2023-10-02 03:33:21.955378'),(2,'auth','0001_initial','2023-10-02 03:33:22.261666'),(3,'admin','0001_initial','2023-10-02 03:33:22.334999'),(4,'admin','0002_logentry_remove_auto_add','2023-10-02 03:33:22.342626'),(5,'admin','0003_logentry_add_action_flag_choices','2023-10-02 03:33:22.348651'),(6,'contenttypes','0002_remove_content_type_name','2023-10-02 03:33:22.394098'),(7,'auth','0002_alter_permission_name_max_length','2023-10-02 03:33:22.430617'),(8,'auth','0003_alter_user_email_max_length','2023-10-02 03:33:22.446696'),(9,'auth','0004_alter_user_username_opts','2023-10-02 03:33:22.454009'),(10,'auth','0005_alter_user_last_login_null','2023-10-02 03:33:22.484782'),(11,'auth','0006_require_contenttypes_0002','2023-10-02 03:33:22.486955'),(12,'auth','0007_alter_validators_add_error_messages','2023-10-02 03:33:22.494390'),(13,'auth','0008_alter_user_username_max_length','2023-10-02 03:33:22.509230'),(14,'auth','0009_alter_user_last_name_max_length','2023-10-02 03:33:22.523894'),(15,'auth','0010_alter_group_name_max_length','2023-10-02 03:33:22.540359'),(16,'auth','0011_update_proxy_permissions','2023-10-02 03:33:22.546164'),(17,'auth','0012_alter_user_first_name_max_length','2023-10-02 03:33:22.562420'),(18,'sessions','0001_initial','2023-10-02 03:33:22.585513'),(19,'api','0001_initial','2023-10-02 04:20:21.576362'),(20,'api','0002_alter_producto_categoria_id_and_more','2023-10-02 04:34:37.402002'),(21,'api','0003_rename_categoria_id_producto_categoria_and_more','2023-10-02 05:35:40.854516'),(22,'api','0004_administrador_cliente_locales_usuario_clienteperfil','2023-10-23 23:15:56.717610'),(23,'api','0005_alter_administrador_fecha_creacion_and_more','2023-10-23 23:41:02.295718'),(24,'authtoken','0001_initial','2023-10-24 02:03:23.930031'),(25,'authtoken','0002_auto_20160226_1747','2023-10-24 02:03:23.952091'),(26,'authtoken','0003_tokenproxy','2023-10-24 02:03:23.955649'),(27,'api','0006_administrador_token','2023-10-24 02:18:42.878893'),(28,'api','0007_administrador_groups_administrador_is_active_and_more','2023-10-24 02:49:32.018946'),(29,'api','0008_alter_administrador_token','2023-10-24 03:01:18.408500'),(30,'api','0009_remove_administrador_token','2023-10-24 03:34:01.036065');
/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_session`
--

DROP TABLE IF EXISTS `django_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_expire_date_a5c62663` (`expire_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_session`
--

LOCK TABLES `django_session` WRITE;
/*!40000 ALTER TABLE `django_session` DISABLE KEYS */;
INSERT INTO `django_session` VALUES ('3onj6ffq0ol1lkhhnsfjll5icco7a8yw','.eJxVjEEOwiAQRe_C2pAMhTK4dO8ZyMCMUjWQlHbVeHdt0oVu_3vvbyrSupS4dpnjxOqsQJ1-t0T5KXUH_KB6bzq3usxT0ruiD9r1tbG8Lof7d1Col2_tUQC9CUCGrDeDEwQa0xASWxArIaAXIczgDAdBBsku8GgzI9KN1fsDz8Q4Jg:1qv4JN:ajz8vrQLpRAjQWsXHTMBbkrJfAXpeMdY-m9hUIp-ddI','2023-11-06 23:26:17.580841'),('uut1i4vtdr0fgdi9b0fzpakjv5viouvy','.eJxVjEEOwiAQRe_C2pAMhTK4dO8ZyMCMUjWQlHbVeHdt0oVu_3vvbyrSupS4dpnjxOqsQJ1-t0T5KXUH_KB6bzq3usxT0ruiD9r1tbG8Lof7d1Col2_tUQC9CUCGrDeDEwQa0xASWxArIaAXIczgDAdBBsku8GgzI9KN1fsDz8Q4Jg:1qnB89:hRctr7CJbAOctryIfbNbzpw-1hFU8kMQ8oRFnC195sA','2023-10-16 05:06:05.433382');
/*!40000 ALTER TABLE `django_session` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-10-24  0:38:18
