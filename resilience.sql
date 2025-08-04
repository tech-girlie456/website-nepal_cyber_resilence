-- -----------------------------------------------------
-- Table `activity_logs`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `activity_logs` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `action` VARCHAR(100) NOT NULL,
  `resource_type` VARCHAR(50) NOT NULL,
  `resource_id` VARCHAR(100) NULL DEFAULT NULL,
  `details` TEXT NULL DEFAULT NULL,
  `ip_address` VARCHAR(45) NULL DEFAULT NULL,
  `user_agent` VARCHAR(255) NULL DEFAULT NULL,
  `status` VARCHAR(20) NOT NULL DEFAULT 'success',
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `user_id` (`user_id` ASC) VISIBLE,
  CONSTRAINT `activity_logs_ibfk_1`
    FOREIGN KEY (`user_id`)
    REFERENCES `users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `files`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `files` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `filename` VARCHAR(255) NOT NULL,
  `user_id` INT NOT NULL,
  `original_name` VARCHAR(255) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `type` VARCHAR(255) NOT NULL,
  `mime_type` VARCHAR(255) NULL DEFAULT NULL,
  `size` VARCHAR(255) NOT NULL,
  `path` VARCHAR(255) NOT NULL,
  `encrypted` TINYINT(1) NOT NULL DEFAULT '1',
  `uploaded` DATETIME NOT NULL,
  `iv` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `user_id` (`user_id` ASC) VISIBLE,
  CONSTRAINT `files_ibfk_1`
    FOREIGN KEY (`user_id`)
    REFERENCES `users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `system_metrics`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `system_metrics` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `type` VARCHAR(50) NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  `value` FLOAT NOT NULL,
  `metadata` JSON NULL DEFAULT NULL,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `two_factor_secret` VARCHAR(255) NULL DEFAULT NULL,
  `two_factor_enabled` TINYINT(1) NULL DEFAULT '0',
  `google_id` VARCHAR(100) NULL DEFAULT NULL,
  `email_verified` TINYINT(1) NULL DEFAULT '0',
  `email_verification_token` VARCHAR(255) NULL DEFAULT NULL,
  `email_verification_expires` DATETIME NULL DEFAULT NULL,
  `remember_token` VARCHAR(255) NULL DEFAULT NULL,
  `name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NULL DEFAULT NULL,
  `profile_picture` VARCHAR(255) NULL DEFAULT NULL,
  `role` ENUM('user', 'admin') NOT NULL DEFAULT 'user',
  `last_login` DATETIME NULL DEFAULT NULL,
  `is_active` TINYINT(1) NOT NULL DEFAULT '1',
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `users_email_unique` (`email` ASC) VISIBLE,
  UNIQUE INDEX `users_email_index` (`email` ASC) VISIBLE,
  UNIQUE INDEX `google_id` (`google_id` ASC) VISIBLE,
  UNIQUE INDEX `users_google_id_index` (`google_id` ASC) VISIBLE,
  INDEX `users_role_active_index` (`role` ASC, `is_active` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `files`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `files` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `userId` INT NOT NULL,
  `originalName` VARCHAR(255) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `type` VARCHAR(255) NOT NULL,
  `mimeType` VARCHAR(255) NULL DEFAULT NULL,
  `size` VARCHAR(255) NOT NULL,
  `path` VARCHAR(255) NOT NULL,
  `encrypted` TINYINT(1) NOT NULL DEFAULT '1',
  `uploaded` DATETIME NOT NULL,
  `iv` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `userId` (`userId` ASC) VISIBLE,
  CONSTRAINT `files_ibfk_1`
    FOREIGN KEY (`userId`)
    REFERENCES `users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `googleId` VARCHAR(255) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NULL DEFAULT NULL,
  `picture` VARCHAR(255) NULL DEFAULT NULL,
  `profilePicture` VARCHAR(255) NULL DEFAULT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `googleId` (`googleId` ASC) VISIBLE,
  UNIQUE INDEX `email` (`email` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;